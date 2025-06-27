import { NextResponse } from "next/server"
import { getDbPool } from "@/lib/db"

async function fetchAllRooms(pool) {
  const result = await pool
    .request()
    .query(`
      SELECT
        r.room_id, r.room_no, r.status,
        rt.type_name       AS typeName,
        rt.capacity        AS capacity,
        rt.base_price      AS basePrice,
        rt.extra_fee_child AS extraChildFee,
        rt.extra_fee_adult AS extraAdultFee,
        ri.img_url         AS imageUrl
      FROM dbo.rooms r
      JOIN dbo.room_types rt ON rt.type_id = r.type_id
      LEFT JOIN dbo.room_images ri ON ri.room_id = r.room_id
      ORDER BY r.room_id, ri.img_id;
    `)

  const map = new Map()
  for (const row of result.recordset) {
    if (!map.has(row.room_id)) {
      map.set(row.room_id, {
        id: row.room_id,
        number: row.room_no,
        status: row.status,
        type: row.typeName,
        capacity: row.capacity,
        basePrice: row.basePrice,
        extraChildFee: row.extraChildFee,
        extraAdultFee: row.extraAdultFee,
        images: [],
      })
    }
    if (row.imageUrl) {
      let url = row.imageUrl

      // 1) nếu bắt đầu bằng "/images/..." thì đổi sang "/uploads/..."
      if (url.startsWith("/images/")) {
        url = url.replace(/^\/images/, "/uploads")

      // 2) nếu không có slash đầu (ví dụ "rooms/D101-1.jpg") thì prefix /uploads/
      } else if (!url.startsWith("/")) {
        url = `/uploads/${url}`
      }

      map.get(row.room_id).images.push(url)
    }
  }

  // đảm bảo mỗi room có ít nhất 3 ảnh
  const rooms = Array.from(map.values()).map((room) => {
    while (room.images.length < 3) {
      room.images.push("/uploads/placeholder.jpg")
    }
    return room
  })

  return rooms
}

export async function GET(request) {
  try {
    const pool = await getDbPool()
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    const rooms = await fetchAllRooms(pool)

    if (id) {
      const room = rooms.find((r) => String(r.id) === id)
      if (!room) {
        return NextResponse.json({ error: "Not Found" }, { status: 404 })
      }
      return NextResponse.json({ room })
    }

    return NextResponse.json({ rooms })
  } catch (err) {
    console.error("API GET /api/rooms error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const {
      number,
      status,
      typeId,
      capacity,
      basePrice,
      extraChildFee,
      extraAdultFee,
    } = await request.json()

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
    const url = new URL(request.url)
    const id = url.searchParams.get("id")
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 })
    }

    const {
      number,
      status,
      typeId,
      capacity,
      basePrice,
      extraChildFee,
      extraAdultFee,
      images,
    } = await request.json()

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

    // TODO: nếu muốn lưu images vào table dbo.room_images thì bổ sung cập nhật tại đây

    return NextResponse.json({ message: "Updated" })
  } catch (err) {
    console.error("API PUT /api/rooms error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get("id")
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
