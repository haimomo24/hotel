// File: app/api/survey/route.js
import { getDbPool } from "@/lib/db";
import { NextResponse } from "next/server";
import sql from "mssql";

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      name,
      email,
      serviceUsed,
      staff,
      room,
      cleanliness,
      facilities,
      price,
      overall,
      suggestion,
    } = data;

    const pool = await getDbPool();
    await pool.request()
      .input("full_name", sql.NVarChar(100), name)
      .input("email", sql.NVarChar(100), email)
      .input("service_used", sql.NVarChar(255), serviceUsed)
      .input("staff_attitude", sql.NVarChar(50), staff)
      .input("room_quality", sql.NVarChar(50), room)
      .input("cleanliness", sql.NVarChar(50), cleanliness)
      .input("facility_convenience", sql.NVarChar(50), facilities)
      .input("price_value", sql.NVarChar(50), price)
      .input("overall_experience", sql.NVarChar(50), overall)
      .input("suggestion", sql.NVarChar(sql.MAX), suggestion)
      .query(`
        INSERT INTO service_survey (
          full_name, email, service_used, staff_attitude, room_quality, cleanliness,
          facility_convenience, price_value, overall_experience, suggestion
        )
        VALUES (
          @full_name, @email, @service_used, @staff_attitude, @room_quality, @cleanliness,
          @facility_convenience, @price_value, @overall_experience, @suggestion
        )
      `);

    return NextResponse.json({ success: true, message: "Khảo sát đã được gửi!" });
  } catch (error) {
    console.error("Survey API Error:", error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}
