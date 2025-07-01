import { NextResponse } from 'next/server'
import { getDbPool }   from '@/lib/db'

// Bắt buộc chạy trên Node.js để getDbPool (mssql) hoạt động
export const runtime = 'nodejs'

/**
 * GET /api/booking/:bookingId
 * Trả về chi tiết booking
 */
export async function GET(request, { params }) {
  const bookingId = params.bookingId

  try {
    const pool = await getDbPool()
    const result = await pool
      .request()
      .input('bid', bookingId)
      .query(`
        SELECT 
          booking_id       AS bookingId,
          room_id          AS roomId,
          customer_name    AS customerName,
          customer_email   AS customerEmail,
          customer_phone   AS customerPhone,
          adult_count      AS adultCount,
          child_count      AS childCount,
          check_in         AS checkIn,
          check_out        AS checkOut,
          total_price      AS totalPrice
        FROM dbo.bookings
        WHERE booking_id = @bid;
      `)

    if (result.recordset.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      booking: result.recordset[0]
    })
  } catch (err) {
    console.error('API GET /api/booking/[bookingId] error:', err)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/booking/:bookingId
 * Cập nhật thông tin liên hệ + số người
 */
export async function PUT(request, { params }) {
  const bookingId = params.bookingId
  const {
    customerName,
    customerEmail,
    customerPhone,
    adultCount,
    childCount
  } = await request.json()

  if (
    !customerName ||
    !customerEmail ||
    !customerPhone ||
    adultCount == null ||
    childCount == null
  ) {
    return NextResponse.json(
      { success: false, message: 'Vui lòng gửi đầy đủ dữ liệu.' },
      { status: 400 }
    )
  }

  try {
    const pool = await getDbPool()
    await pool
      .request()
      .input('bid',        bookingId)
      .input('name',       customerName)
      .input('email',      customerEmail)
      .input('phone',      customerPhone)
      .input('adultCount', adultCount)
      .input('childCount', childCount)
      .query(`
        UPDATE dbo.bookings
        SET
          customer_name  = @name,
          customer_email = @email,
          customer_phone = @phone,
          adult_count    = @adultCount,
          child_count    = @childCount
        WHERE booking_id = @bid;
      `)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('API PUT /api/booking/[bookingId] error:', err)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
