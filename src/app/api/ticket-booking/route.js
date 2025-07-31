import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';

export const runtime = 'nodejs';

/**
 * POST /api/ticket-booking
 * Create a new ticket booking with customer information.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid JSON body' }, { status: 400 });
  }

  const {
    name,
    email,
    phone,
    tickets,
    total
  } = body;

  // Validate inputs
  if (!name || !email || !phone || !tickets || !Array.isArray(tickets) || tickets.length === 0) {
    return NextResponse.json(
      { success: false, message: 'Vui lòng cung cấp đầy đủ thông tin đặt vé' },
      { status: 400 }
    );
  }

  // Validate each ticket
  for (const ticket of tickets) {
    if (!ticket.type || typeof ticket.quantity !== 'number' || ticket.quantity <= 0) {
      return NextResponse.json(
        { success: false, message: 'Thông tin vé không hợp lệ' },
        { status: 400 }
      );
    }
  }

  try {
    const pool = await getDbPool();
    
    // Insert booking and customer info
    const insertRes = await pool
      .request()
      .input('customerName', name)
      .input('customerEmail', email)
      .input('customerPhone', phone)
      .input('totalPrice', total)
      .input('bookingData', JSON.stringify(tickets))
      .query(`
        INSERT INTO ticket_bookings
          (customer_name, customer_email, customer_phone, total_price, booking_data)
        VALUES
          (@customerName, @customerEmail, @customerPhone, @totalPrice, @bookingData);
        SELECT CAST(SCOPE_IDENTITY() AS int) AS bookingId;
      `);

    const bookingId = insertRes.recordset?.[0]?.bookingId;
    if (!bookingId) {
      throw new Error('Failed to create booking');
    }

    return NextResponse.json({ success: true, bookingId, message: 'Đặt vé thành công!' }, { status: 201 });
  } catch (err) {
    console.error('POST /api/ticket-booking error:', err);
    return NextResponse.json({ success: false, message: err.message || 'Internal Server Error' }, { status: 500 });
  }
}