import { NextResponse } from 'next/server';
import sql from 'mssql';

// Database configuration với port từ env
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME, // Sử dụng DB_NAME thay vì DB_DATABASE
  port: parseInt(process.env.DB_PORT) || 1999, // Sử dụng port 1999 từ env
  options: {
    encrypt: false, // Thử false cho local database
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  connectionTimeout: 30000, // 30 seconds
  requestTimeout: 30000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

export async function POST(request) {
  let pool;
  
  try {
    const { fullname, email, phone, message } = await request.json();

    // Validate required fields
    if (!fullname || !email || !message) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin bắt buộc' },
        { status: 400 }
      );
    }

    console.log('Attempting to connect to database...');
    console.log('Config:', {
      server: process.env.DB_SERVER,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      user: process.env.DB_USER
    });
    
    // Create connection pool
    pool = await sql.connect(config);
    
    console.log('Connected to database successfully');

    // Insert data into contact table
    const result = await pool.request()
      .input('fullname', sql.NVarChar(100), fullname)
      .input('email', sql.NVarChar(100), email)
      .input('phone', sql.NVarChar(20), phone || null)
      .input('message', sql.NVarChar(sql.MAX), message)
      .query(`
        INSERT INTO contact (fullname, email, phone, message)
        VALUES (@fullname, @email, @phone, @message)
      `);

    console.log('Data inserted successfully');

    return NextResponse.json(
      { message: 'Gửi tin nhắn thành công!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Database error:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại!' },
      { status: 500 }
    );
  } finally {
    // Close connection
    if (pool) {
      try {
        await pool.close();
      } catch (closeError) {
        console.error('Error closing connection:', closeError);
      }
    }
  }
}
