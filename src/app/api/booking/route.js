import { NextResponse } from 'next/server'
import { getDbPool } from '@/lib/db'

export const runtime = 'nodejs'

/**
 * GET  /api/booking
 * Nếu có ?roomId thì chỉ trả về booking của phòng đó, không thì trả về tất cả.
 */
export async function GET(request) {
  try {
    const url        = new URL(request.url)
    const roomIdParm = url.searchParams.get('roomId')
    const pool       = await getDbPool()

    let sql = `
      SELECT
        booking_id     AS bookingId,
        room_id        AS roomId,
        customer_name  AS customerName,
        customer_email AS customerEmail,
        customer_phone AS customerPhone,
        adult_count    AS adultCount,
        child_count    AS childCount,
        check_in       AS checkIn,
        check_out      AS checkOut,
        total_price    AS totalPrice
      FROM dbo.bookings
    `
    if (roomIdParm) {
      const rid = parseInt(roomIdParm, 10)
      if (Number.isNaN(rid) || rid <= 0) {
        return NextResponse.json({ success: false, message: 'Invalid roomId' }, { status: 400 })
      }
      sql += ' WHERE room_id = @roomId'
    }
    sql += ' ORDER BY booking_id ASC;'

    const req = pool.request()
    if (roomIdParm) req.input('roomId', parseInt(roomIdParm, 10))
    const result = await req.query(sql)

    return NextResponse.json({ success: true, bookings: result.recordset })
  } catch (err) {
    console.error('GET /api/booking error:', err)
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
  }
}

/**
 * POST /api/booking
 * Tạo mới một booking kèm thông tin liên hệ.
 */
export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid JSON body' }, { status: 400 })
  }

  const {
    roomId,
    adultCount = 1,
    childCount = 0,
    customerName,
    customerEmail,
    customerPhone,
  } = body

  // Validate đầu vào
  if (
    typeof roomId !== 'number' ||
    roomId <= 0 ||
    typeof adultCount !== 'number' ||
    adultCount < 0 ||
    typeof childCount !== 'number' ||
    childCount < 0 ||
    !customerName ||
    !customerEmail ||
    !customerPhone
  ) {
    return NextResponse.json(
      { success: false, message: 'Vui lòng gửi đầy đủ thông tin đặt phòng' },
      { status: 400 }
    )
  }

  // DEBUG: log payload
  console.log('📦 POST /api/booking payload:', body)

  try {
    const pool = await getDbPool()

    // 1. Lấy thông tin phòng
    const roomRes = await pool
      .request()
      .input('roomId', roomId)
      .query(`
        SELECT 
          r.status,
          rt.capacity        AS capacity,
          rt.base_price      AS basePrice,
          rt.extra_fee_adult AS extraAdultFee,
          rt.extra_fee_child AS extraChildFee
        FROM dbo.rooms r
        JOIN dbo.room_types rt ON rt.type_id = r.type_id
        WHERE r.room_id = @roomId;
      `)

    if (roomRes.recordset.length === 0) {
      return NextResponse.json({ success: false, message: 'Room not found' }, { status: 404 })
    }
    const room = roomRes.recordset[0]
    if (room.status !== 'available') {
      return NextResponse.json({ success: false, message: 'Room is not available' }, { status: 400 })
    }

    // 2. Tính giờ checkIn/checkOut
    const now      = new Date()
    const today    = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const checkIn  = new Date(today.getTime() + 14 * 3600 * 1000)
    const checkOut = new Date(today.getTime() + 36 * 3600 * 1000)

    // 3. Tính tổng giá
    const extraAdults = Math.max(0, adultCount - room.capacity)
    const totalPrice  =
      room.basePrice +
      extraAdults * room.extraAdultFee +
      childCount * room.extraChildFee

    // 4. Chèn booking + thông tin khách
    const insertRes = await pool
      .request()
      .input('roomId', roomId)
      .input('checkIn', checkIn)
      .input('checkOut', checkOut)
      .input('adultCount', adultCount)
      .input('childCount', childCount)
      .input('totalPrice', totalPrice)
      .input('customerName', customerName)
      .input('customerEmail', customerEmail)
      .input('customerPhone', customerPhone)
      .query(`
        INSERT INTO dbo.bookings
          (room_id, check_in, check_out, adult_count, child_count, total_price,
           customer_name, customer_email, customer_phone)
        VALUES
          (@roomId, @checkIn, @checkOut, @adultCount, @childCount, @totalPrice,
           @customerName, @customerEmail, @customerPhone);
        SELECT CAST(SCOPE_IDENTITY() AS int) AS bookingId;
      `)

    const bookingId = insertRes.recordset?.[0]?.bookingId
    if (!bookingId) {
      throw new Error('Failed to create booking')
    }

    // 5. Cập nhật trạng thái phòng
    await pool
      .request()
      .input('roomId', roomId)
      .query(`
        UPDATE dbo.rooms
        SET status = 'occupied'
        WHERE room_id = @roomId;
      `)

    return NextResponse.json({ success: true, bookingId, totalPrice }, { status: 201 })
  } catch (err) {
    console.error('POST /api/booking error:', err)
    return NextResponse.json({ success: false, message: err.message || 'Internal Server Error' }, { status: 500 })
  }
}