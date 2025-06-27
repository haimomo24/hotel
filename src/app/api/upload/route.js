import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Bắt buộc chạy trên Node.js để dùng fs
export const runtime = "nodejs"

export async function POST(request) {
  try {
    // Lấy FormData từ request
    const formData = await request.formData()
    const file = formData.get("file")

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Missing file" }, { status: 400 })
    }

    // Đọc content của file
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Tạo tên file duy nhất
    const ext = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}.${ext}`

    // Đường dẫn lưu vào public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    fs.mkdirSync(uploadDir, { recursive: true })
    const filePath = path.join(uploadDir, fileName)

    // Ghi file
    fs.writeFileSync(filePath, buffer)

    // Trả về URL có thể truy cập
    const url = `/uploads/${fileName}`
    return NextResponse.json({ url })
  } catch (err) {
    console.error("API POST /api/upload error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
