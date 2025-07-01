'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const router = useRouter()

  // 1. Fetch data
  async function fetchRooms() {
    setLoading(true)
    try {
      const res = await fetch('/api/rooms')
      const data = await res.json()
      setRooms(data.rooms || [])
    } catch (err) {
      console.error('Failed to fetch rooms', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  // 2. Xóa phòng
  async function handleDelete(id) {
    if (!confirm('Bạn có chắc muốn xóa phòng này?')) return
    try {
      await fetch(`/api/rooms?id=${id}`, { method: 'DELETE' })
      setRooms(prev => {
        const next = prev.filter(r => r.id !== id)
        // nếu xóa giảm số trang thì lùi page
        const maxPage = Math.ceil(next.length / pageSize) || 1
        if (currentPage > maxPage) setCurrentPage(maxPage)
        return next
      })
    } catch (err) {
      console.error('Xóa thất bại', err)
    }
  }

  // 3. Chuyển đến trang sửa
  function handleEdit(id) {
    router.push(`/dashboard/rooms/${id}/edit`)
  }

  if (loading) {
    return <p className="p-4">Đang tải danh sách phòng…</p>
  }

  // 4. Tính phân trang
  const totalItems = rooms.length
  const totalPages = Math.ceil(totalItems / pageSize) || 1
  const start = (currentPage - 1) * pageSize
  const pageRooms = rooms.slice(start, start + pageSize)

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Quản trị phòng khách sạn</h1>
        <Link
          href="/dashboard/rooms/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Thêm phòng mới
        </Link>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-100 uppercase text-xs text-gray-700">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Số phòng</th>
              <th className="px-6 py-3">Loại</th>
              <th className="px-6 py-3">Giá gốc</th>
              <th className="px-6 py-3">Trạng thái</th>
              <th className="px-6 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {pageRooms.map((room, idx) => (
              <tr
                key={room.id}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-6 py-4">{room.id}</td>
                <td className="px-6 py-4">{room.number}</td>
                <td className="px-6 py-4">{room.type}</td>
                <td className="px-6 py-4">{room.basePrice}  vnd</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      room.status === 'occupied'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {room.status === 'occupied' ? 'Đã đặt' : 'Chưa đặt'}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-4">
                  <button
                    onClick={() => handleEdit(room.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="text-red-600 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {pageRooms.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  Chưa có phòng nào trên trang này
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              onClick={() => setCurrentPage(n)}
              className={`px-3 py-1 rounded ${
                n === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {n}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
