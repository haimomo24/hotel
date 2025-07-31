// File: app/api/ticket/route.js
import { getDbPool } from '@/lib/db';
import sql from 'mssql';
import { NextResponse } from 'next/server';


export async function POST(req) {
    let pool;
    try {
      const data = await req.json();
  
      const {
        name,
        email,
        phoneNumber,
        bookingTime, // Giá trị HH:MM từ frontend
        selectedTickets,
        total,
      } = data;
  
      // Định dạng bookingTime để đảm bảo có giây (HH:MM:SS)
      let timeForDb = null;
      if (bookingTime) {
        const [hours, minutes] = bookingTime.split(':');
        const dummyDate = new Date();
        dummyDate.setHours(parseInt(hours, 10));
        dummyDate.setMinutes(parseInt(minutes, 10));
        dummyDate.setSeconds(0);
        dummyDate.setMilliseconds(0);
        timeForDb = dummyDate;
      }
  
      // Ánh xạ tên loại vé từ frontend sang tên cột trong DB
      const ticketMap = {
        'Chạm nét tâm linh người lớn': 'adult_spiritual_ticket',
        'Chạm nét tâm linh trẻ em ': 'child_spiritual_ticket',
        'Hành trình vui vẻ người lớn': 'adult_fun_trip_ticket',
        'Hành trình vui vẻ trẻ em': 'child_fun_trip_ticket',
        'Đồng hành An Nhiên người lớn': 'adult_peace_ticket',
        'Đồng hành An Nhiên trẻ em': 'child_peace_ticket',
        'Vé thượng hành tự tại': 'private_ticket',
      };
  
      // Khởi tạo số lượng vé cho từng loại về 0
      const ticketQuantities = {
        adult_spiritual_ticket: 0,
        child_spiritual_ticket: 0,
        adult_fun_trip_ticket: 0,
        child_fun_trip_ticket: 0,
        adult_peace_ticket: 0,
        child_peace_ticket: 0,
        private_ticket: 0,
      };
  
      // Cập nhật số lượng vé dựa trên selectedTickets từ frontend
      selectedTickets.forEach(ticket => {
        const dbColumn = ticketMap[ticket.type];
        if (dbColumn) {
          ticketQuantities[dbColumn] = ticket.quantity;
        }
      });
  
      pool = await getDbPool();
      const request = pool.request();
  
      const result = await request
        .input('full_name', sql.NVarChar(100), name)
        .input('email', sql.NVarChar(100), email)
        .input('phone', sql.NVarChar(20), phoneNumber)
        .input('booking_time', sql.Time, timeForDb) // Sử dụng đối tượng Date
        .input('adult_spiritual_ticket', sql.Int, ticketQuantities.adult_spiritual_ticket)
        .input('child_spiritual_ticket', sql.Int, ticketQuantities.child_spiritual_ticket)
        .input('adult_fun_trip_ticket', sql.Int, ticketQuantities.adult_fun_trip_ticket)
        .input('child_fun_trip_ticket', sql.Int, ticketQuantities.child_fun_trip_ticket)
        .input('adult_peace_ticket', sql.Int, ticketQuantities.adult_peace_ticket)
        .input('child_peace_ticket', sql.Int, ticketQuantities.child_peace_ticket)
        .input('private_ticket', sql.Int, ticketQuantities.private_ticket)
        .input('total_amount', sql.Decimal(18, 2), total)
        .query(`
          INSERT INTO ticket_orders (
            full_name, email, phone, booking_time,
            adult_spiritual_ticket, child_spiritual_ticket, adult_fun_trip_ticket,
            child_fun_trip_ticket, adult_peace_ticket, child_peace_ticket,
            private_ticket, total_amount
          ) VALUES (
            @full_name, @email, @phone, @booking_time,
            @adult_spiritual_ticket, @child_spiritual_ticket, @adult_fun_trip_ticket,
            @child_fun_trip_ticket, @adult_peace_ticket, @child_peace_ticket,
            @private_ticket, @total_amount
          )
        `);
  
      return NextResponse.json({ message: 'Đặt vé thành công!', data: result }, { status: 200 });
    } catch (err) {
      console.error('Lỗi khi đặt vé:', err);
      return NextResponse.json({ message: 'Lỗi khi đặt vé.', error: err.message }, { status: 500 });
    }
  }
  
  // --- API để LẤY DANH SÁCH VÉ (GET) ---
  export async function GET(req) {
    let pool;
    try {
      pool = await getDbPool();
      const request = pool.request();
  
      const result = await request.query(`
        SELECT
          id,
          full_name,
          email,
          phone,
          booking_time,
          adult_spiritual_ticket,
          child_spiritual_ticket,
          adult_fun_trip_ticket,
          child_fun_trip_ticket,
          adult_peace_ticket,
          child_peace_ticket,
          private_ticket,
          total_amount,
          created_at
        FROM ticket_orders
        ORDER BY created_at DESC;
      `);
  
      return NextResponse.json({ success: true, data: result.recordset }, { status: 200 });
  
    } catch (err) {
      console.error('Lỗi khi lấy danh sách đặt vé:', err);
      return NextResponse.json(
        { success: false, message: 'Lỗi khi lấy danh sách đặt vé.', error: err.message },
        { status: 500 }
      );
    }
  }