import { NextResponse }       from "next/server"
import fs                     from "fs"
import path                   from "path"
import { getDbPool }          from "@/lib/db"    // <— import pool

export const runtime = "nodejs"

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file     = formData.get("file")
    const roomId   = formData.get("roomId")       // <— roomId từ client

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Missing file" }, { status: 400 })
    }

    // chuyển về Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer      = Buffer.from(arrayBuffer)

    // tạo tên file
    const ext      = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2,8)}.${ext}`

    // ghi vào public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    fs.mkdirSync(uploadDir, { recursive: true })
    const filePath = path.join(uploadDir, fileName)
    fs.writeFileSync(filePath, buffer)

    const url = `/uploads/${fileName}`

    // — TỰ ĐỘNG LƯU VÀO DB nếu có roomId —
    if (roomId) {
      const pool = await getDbPool()
      // strip tất cả dấu "/" ở đầu, lưu img_url chỉ là 'xyz.jpg'
      const clean = fileName
      await pool
        .request()
        .input("room_id", roomId)
        .input("img_url", clean)
        .query(`
          INSERT INTO dbo.room_images (room_id, img_url)
          VALUES (@room_id, @img_url);
        `)
    }

    return NextResponse.json({ url })
  } catch (err) {
    console.error("API POST /api/upload error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
