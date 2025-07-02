import { NextResponse } from 'next/server'
import { getDbPool } from '@/lib/db'

export const runtime = 'nodejs'

/** Utility: parse & validate bookingId */
function parseBookingId(id) {
  const bid = parseInt(id, 10)
  if (Number.isNaN(bid) || bid <= 0) {
    throw new Error('Invalid bookingId')
  }
  return bid
}

/**
 * GET /api/booking/:bookingId
 */
export async function GET(request, { params }) {
  let bookingId
  try {
    bookingId = parseBookingId(params.bookingId)
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid bookingId' },
      { status: 400 }
    )
  }

  try {
    const pool   = await getDbPool()
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
    return NextResponse.json({ success: true, booking: result.recordset[0] })
  } catch (err) {
    console.error('GET /api/booking/[bookingId] error:', err)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/booking/:bookingId
 */
export async function PUT(request, { params }) {
  let bookingId
  try {
    bookingId = parseBookingId(params.bookingId)
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid bookingId' },
      { status: 400 }
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid JSON body' },
      { status: 400 }
    )
  }

  const { customerName, customerEmail, customerPhone, adultCount, childCount } = body
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
    const pool   = await getDbPool()
    const result = await pool
      .request()
      .input('bid', bookingId)
      .input('name', customerName)
      .input('email', customerEmail)
      .input('phone', customerPhone)
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

        SELECT @@ROWCOUNT AS affectedRows;
      `)

    const updated = result.recordset?.[0]?.affectedRows
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('PUT /api/booking/[bookingId] error:', err)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/booking/:bookingId
 */
export async function DELETE(request, { params }) {
  let bookingId
  try {
    bookingId = parseBookingId(params.bookingId)
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid bookingId' },
      { status: 400 }
    )
  }

  try {
    const pool   = await getDbPool()
    const result = await pool
      .request()
      .input('bid', bookingId)
      .query(`
        DELETE FROM dbo.bookings
        WHERE booking_id = @bid;

        SELECT @@ROWCOUNT AS deletedRows;
      `)

    const deleted = result.recordset?.[0]?.deletedRows
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/booking/[bookingId] error:', err)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
