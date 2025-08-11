import { NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const pool = await getDbPool();
    await pool.request()
      .input("id", id)
      .query(`DELETE FROM service_survey WHERE id = @id`);

    return NextResponse.json({ success: true, message: "Xóa thành công" });
  } catch (error) {
    console.error("DELETE Survey Error:", error);
    return NextResponse.json({ success: false, message: "Lỗi khi xóa" }, { status: 500 });
  }
}
