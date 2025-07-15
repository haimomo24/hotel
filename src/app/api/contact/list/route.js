import { NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 1999,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  connectionTimeout: 30000,
  requestTimeout: 30000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

export async function GET() {
  let pool;
  
  try {
    console.log('Attempting to connect to database...');
    
    pool = await sql.connect(config);
    console.log('Connected to database successfully');

    // Thử query đơn giản trước để xem cấu trúc bảng
    const result = await pool.request()
      .query(`
        SELECT id, fullname, email, phone, message
        FROM contact 
        ORDER BY id DESC
      `);

    console.log('Data fetched successfully');

    return NextResponse.json(
      { data: result.recordset },
      { status: 200 }
    );

  } catch (error) {
    console.error('Database error:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi lấy dữ liệu' },
      { status: 500 }
    );
  } finally {
    if (pool) {
      try {
        await pool.close();
      } catch (closeError) {
        console.error('Error closing connection:', closeError);
      }
    }
  }
}
