import { NextResponse } from "next/server"
import { getDbPool } from "@/lib/db"

export async function POST(request) {
  try {
    const {
      roomId,
      adultCount = 1,
      childCount = 0
    } = await request.json()

    const pool = await getDbPool()

    // 1. Lấy thông tin phòng (status, capacity từ room_types, basePrice, extra fees)
    const roomRes = await pool
      .request()
      .input("roomId", roomId)
      .query(`
        SELECT 
          r.status,
          rt.capacity         AS capacity,
          rt.base_price       AS basePrice,
          rt.extra_fee_adult  AS extraAdultFee,
          rt.extra_fee_child  AS extraChildFee
        FROM dbo.rooms r
        JOIN dbo.room_types rt ON rt.type_id = r.type_id
        WHERE r.room_id = @roomId;
      `)

    if (!roomRes.recordset.length) {
      return NextResponse.json(
        { success: false, message: "Room not found" },
        { status: 404 }
      )
    }

    const room = roomRes.recordset[0]
    if (room.status !== "available") {
      return NextResponse.json(
        { success: false, message: "Room is not available" },
        { status: 400 }
      )
    }

    // 2. Tính check-in / check-out
    const now     = new Date()
    const today   = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const checkIn  = new Date(today.getTime() + 14 * 3600 * 1000)           // 14:00 hôm nay
    const checkOut = new Date(today.getTime() + 24 * 3600 * 1000 + 12 * 3600 * 1000) // 12:00 ngày mai

    // 3. Tính tổng tiền, chỉ tính phí người lớn vượt capacity
    const extraAdults = Math.max(0, adultCount - room.capacity)
    const totalPrice =
      room.basePrice +
      extraAdults * room.extraAdultFee +
      childCount * room.extraChildFee

    // 4. Chèn booking và lấy bookingId
    const insertResult = await pool
      .request()
      .input("roomId", roomId)
      .input("checkIn",  checkIn)
      .input("checkOut", checkOut)
      .input("adultCount", adultCount)
      .input("childCount", childCount)
      .input("totalPrice", totalPrice)
      .query(`
        INSERT INTO dbo.bookings
          (room_id, check_in, check_out, adult_count, child_count, total_price)
        VALUES
          (@roomId, @checkIn, @checkOut, @adultCount, @childCount, @totalPrice);
        SELECT CAST(SCOPE_IDENTITY() AS int) AS bookingId;
      `)

    const bookingId = insertResult.recordset[0]?.bookingId
    if (!bookingId) {
      throw new Error("Không lấy được bookingId sau khi insert")
    }

    // 5. Cập nhật status phòng
    await pool
      .request()
      .input("roomId", roomId)
      .query(`
        UPDATE dbo.rooms
        SET status = 'occupied'
        WHERE room_id = @roomId;
      `)

    return NextResponse.json({
      success: true,
      bookingId,
      totalPrice
    })
  } catch (err) {
    console.error("API /api/booking error:", err)
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}
