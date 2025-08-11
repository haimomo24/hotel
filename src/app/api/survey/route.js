// File: app/api/survey/route.js
import { getDbPool } from "@/lib/db";
import { NextResponse } from "next/server";
import sql from "mssql";

// ------------------ Lấy dữ liệu khảo sát ------------------
export async function GET() {
  try {
    const pool = await getDbPool();
    const result = await pool.request().query(`
      SELECT * 
      FROM service_survey
      ORDER BY id DESC
    `);

    return NextResponse.json({ success: true, data: result.recordset });
  } catch (error) {
    console.error("Survey GET API Error:", error);
    return NextResponse.json({ success: false, message: "Lỗi server khi lấy dữ liệu" }, { status: 500 });
  }
}

// ------------------ Gửi dữ liệu khảo sát ------------------
export async function POST(req) {
  try {
    const data = await req.json();

    const {
      name,
      email,
      phone,
      serviceUsed,
      staff,
      room,
      cleanliness,
      facilities,
      price,
      overall,
      // Nhà hàng
      food_quality,
      dining_cleanliness,
      waiting_time,
      service_speed,
      restaurant_overall,
      // Xe điện
      driver_attitude,
      vehicle_condition,
      safety,
      convenience,
      electric_overall,
      suggestion,
    } = data;

    const pool = await getDbPool();
    await pool.request()
      .input("full_name", sql.NVarChar(100), name)
      .input("email", sql.NVarChar(100), email)
      .input("phone", sql.NVarChar(20), phone)
      .input("service_used", sql.NVarChar(255), serviceUsed)
      // Các cột phòng nghỉ
      .input("staff_attitude", sql.NVarChar(50), staff || null)
      .input("room_quality", sql.NVarChar(50), room || null)
      .input("cleanliness", sql.NVarChar(50), cleanliness || null)
      .input("facility_convenience", sql.NVarChar(50), facilities || null)
      .input("price_value", sql.NVarChar(50), price || null)
      .input("overall_experience", sql.NVarChar(50), overall || null)
      // Nhà hàng
      .input("food_quality", sql.NVarChar(50), food_quality || null)
      .input("dining_cleanliness", sql.NVarChar(50), dining_cleanliness || null)
      .input("waiting_time", sql.NVarChar(50), waiting_time || null)
      .input("service_speed", sql.NVarChar(50), service_speed || null)
      .input("restaurant_overall", sql.NVarChar(50), restaurant_overall || null)
      // Xe điện
      .input("driver_attitude", sql.NVarChar(50), driver_attitude || null)
      .input("vehicle_condition", sql.NVarChar(50), vehicle_condition || null)
      .input("safety", sql.NVarChar(50), safety || null)
      .input("convenience", sql.NVarChar(50), convenience || null)
      .input("electric_overall", sql.NVarChar(50), electric_overall || null)
      // Góp ý
      .input("suggestion", sql.NVarChar(sql.MAX), suggestion || null)
      .query(`
        INSERT INTO service_survey (
          full_name, email, phone, service_used,
          staff_attitude, room_quality, cleanliness, facility_convenience, price_value, overall_experience,
          food_quality, dining_cleanliness, waiting_time, service_speed, restaurant_overall,
          driver_attitude, vehicle_condition, safety, convenience, electric_overall,
          suggestion
        )
        VALUES (
          @full_name, @email, @phone, @service_used,
          @staff_attitude, @room_quality, @cleanliness, @facility_convenience, @price_value, @overall_experience,
          @food_quality, @dining_cleanliness, @waiting_time, @service_speed, @restaurant_overall,
          @driver_attitude, @vehicle_condition, @safety, @convenience, @electric_overall,
          @suggestion
        )
      `);

    return NextResponse.json({ success: true, message: "Khảo sát đã được gửi!" });
  } catch (error) {
    console.error("Survey POST API Error:", error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}
