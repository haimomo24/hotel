import { getDbPool } from "@/lib/db"; 
import { NextResponse } from "next/server";
import sql from "mssql";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const full_name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const position_applied = formData.get("position");
    const message = formData.get("message");
    const cvFile = formData.get("cv");

    
    const cv_file_name = cvFile ? cvFile.name : null;
    const cv_file_path = ""; 

    const pool = await getDbPool();
    await pool.request()
      .input("full_name", sql.NVarChar(100), full_name)
      .input("email", sql.NVarChar(100), email)
      .input("phone", sql.NVarChar(20), phone)
      .input("position_applied", sql.NVarChar(100), position_applied)
      .input("message", sql.NVarChar(sql.MAX), message)
      .input("cv_file_name", sql.NVarChar(255), cv_file_name)
      .input("cv_file_path", sql.NVarChar(500), cv_file_path)
      .query(`
        INSERT INTO recruitment_applications
        (full_name, email, phone, position_applied, message, cv_file_name, cv_file_path)
        VALUES (@full_name, @email, @phone, @position_applied, @message, @cv_file_name, @cv_file_path)
      `);

    return NextResponse.json({ success: true, message: "Ứng tuyển thành công!" });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}