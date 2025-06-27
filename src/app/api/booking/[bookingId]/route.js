import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';

export async function GET(request, { params }) {
  const { bookingId } = await params;
  try {
    const pool = await getDbPool();
    const result = await pool
      .request()
      .input('bid', bookingId)
      .query(`
        SELECT 
          booking_id      AS bookingId,
          room_id         AS roomId,
          adult_count     AS adultCount,
          child_count     AS childCount,
          check_in        AS checkIn,
          check_out       AS checkOut,
          total_price     AS totalPrice,
          customer_email  AS customerEmail,
          customer_phone  AS customerPhone
        FROM dbo.bookings
        WHERE booking_id = @bid;
      `);

    if (!result.recordset.length) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      booking: result.recordset[0]
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
