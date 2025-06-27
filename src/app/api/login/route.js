import { NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const pool = await getDbPool();
    const result = await pool
      .request()
      .input("email", email)
      .input("password", password)
      .query(`
        SELECT *
        FROM users
        WHERE email = @email AND password = @password
      `);

    if (result.recordset.length > 0) {
      return NextResponse.json({ success: true, user: result.recordset[0] });
    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
