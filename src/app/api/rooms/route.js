import { NextResponse } from "next/server"
import { getDbPool }   from "@/lib/db"

async function fetchAllRooms(pool) {
  const result = await pool
    .request()
    .query(`
      SELECT
        r.room_id           AS id,
        r.room_no           AS number,
        r.status,
        r.type_id           AS typeId,
        rt.type_name        AS typeName,
        rt.capacity         AS capacity,
        rt.base_price       AS basePrice,
        rt.extra_fee_child  AS extraChildFee,
        rt.extra_fee_adult  AS extraAdultFee,
        ri.img_url          AS imageUrl
      FROM dbo.rooms r
      JOIN dbo.room_types rt   ON rt.type_id    = r.type_id
      LEFT JOIN dbo.room_images ri ON ri.room_id = r.room_id
      ORDER BY r.room_id, ri.img_id;
    `)

  const map = new Map()
  for (const row of result.recordset) {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id:             row.id,
        number:         row.number,
        status:         row.status,
        type:           row.typeName,     // <-- thêm field "type" để DashboardPage dùng
        typeId:         row.typeId,
        capacity:       row.capacity,
        basePrice:      row.basePrice,
        extraChildFee:  row.extraChildFee,
        extraAdultFee:  row.extraAdultFee,
        images:         [],
      })
    }
    if (row.imageUrl) {
      let url = row.imageUrl
      if (url.startsWith("/images/")) {
        url = url.replace(/^\/images/, "/uploads")
      } else if (!url.startsWith("/")) {
        url = `/uploads/${url}`
      }
      map.get(row.id).images.push(url)
    }
  }

  // Đảm bảo mỗi room có tối thiểu 3 ảnh
  const rooms = Array.from(map.values()).map((room) => {
    while (room.images.length < 3) {
      room.images.push("/uploads/placeholder.jpg")
    }
    return room
  })

  return rooms
}

async function fetchTypesSummary(pool) {
  const result = await pool
    .request()
    .query(`
      SELECT
        rt.type_id     AS typeId,
        rt.type_name   AS typeName,
        COUNT(r.room_id) AS totalRooms,
        SUM(CASE WHEN r.status = 'booked'    THEN 1 ELSE 0 END) AS bookedCount,
        SUM(CASE WHEN r.status = 'available' THEN 1 ELSE 0 END) AS availableCount,
        MIN(ri.img_url) AS rawImageUrl
      FROM dbo.room_types rt
      LEFT JOIN dbo.rooms r       ON r.type_id   = rt.type_id
      LEFT JOIN dbo.room_images ri ON ri.room_id = r.room_id
      GROUP BY rt.type_id, rt.type_name
      ORDER BY rt.type_id;
    `)

  // Map rawImageUrl thành URL public
  return result.recordset.map((row) => {
    let url = row.rawImageUrl || "/uploads/placeholder.jpg"
    if (url.startsWith("/images/")) {
      url = url.replace(/^\/images/, "/uploads")
    } else if (!url.startsWith("/")) {
      url = `/uploads/${url}`
    }
    return {
      typeId:        row.typeId,
      typeName:      row.typeName,
      totalRooms:    row.totalRooms,
      bookedCount:   row.bookedCount,
      availableCount: row.availableCount,
      imageUrl:      url,
    }
  })
}

export async function GET(request) {
  try {
    const pool    = await getDbPool()
    const urlObj  = new URL(request.url)
    const groupBy = urlObj.searchParams.get("groupBy")
    const id      = urlObj.searchParams.get("id")

    // Nếu client cần summary theo type
    if (groupBy === "type") {
      const types = await fetchTypesSummary(pool)
      return NextResponse.json({ types })
    }

    // Ngược lại lấy full list rooms
    const rooms = await fetchAllRooms(pool)

    // Nếu có id → trả chi tiết 1 room
    if (id) {
      const room = rooms.find((r) => String(r.id) === id)
      if (!room) {
        return NextResponse.json({ error: "Not Found" }, { status: 404 })
      }
      return NextResponse.json({ room })
    }

    // Mặc định trả toàn bộ rooms
    return NextResponse.json({ rooms })
  } catch (err) {
    console.error("API GET /api/rooms error:", err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function PATCH(request) {
  try {
    const urlObj = new URL(request.url);
    const id = urlObj.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const { status } = await request.json();
    if (!status) {
      return NextResponse.json({ error: "Missing status" }, { status: 400 });
    }

    const pool = await getDbPool();
    await pool
      .request()
      .input("id", id)
      .input("status", status)
      .query(`
        UPDATE dbo.rooms
        SET status = @status
        WHERE room_id = @id;
      `);

    return NextResponse.json({ message: "Status updated successfully" });
  } catch (err) {
    console.error("API PATCH /api/rooms error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { number, status, typeId } = await request.json()
    const pool = await getDbPool()
    const result = await pool
      .request()
      .input("room_no", number)
      .input("status", status)
      .input("type_id", typeId)
      .query(`
        INSERT INTO dbo.rooms (room_no, status, type_id)
        VALUES (@room_no, @status, @type_id);
        SELECT SCOPE_IDENTITY() AS newId;
      `)

    const newId = result.recordset[0].newId
    return NextResponse.json({ id: newId }, { status: 201 })
  } catch (err) {
    console.error("API POST /api/rooms error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const urlObj = new URL(request.url)
    const id     = urlObj.searchParams.get("id")
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 })
    }
    const { number, status, typeId } = await request.json()
    const pool = await getDbPool()
    await pool
      .request()
      .input("id", id)
      .input("room_no", number)
      .input("status", status)
      .input("type_id", typeId)
      .query(`
        UPDATE dbo.rooms
        SET room_no = @room_no,
            status  = @status,
            type_id = @type_id
        WHERE room_id = @id;
      `)

    return NextResponse.json({ message: "Updated" })
  } catch (err) {
    console.error("API PUT /api/rooms error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const urlObj = new URL(request.url)
    const id     = urlObj.searchParams.get("id")
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 })
    }
    const pool = await getDbPool()
    await pool
      .request()
      .input("id", id)
      .query(`
        DELETE FROM dbo.room_images WHERE room_id = @id;
        DELETE FROM dbo.rooms       WHERE room_id = @id;
      `)

    return NextResponse.json(null, { status: 204 })
  } catch (err) {
    console.error("API DELETE /api/rooms error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
