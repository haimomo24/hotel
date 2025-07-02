'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteBookingButton({ bookingId }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc muốn xóa booking này?')) return

    setLoading(true)
    try {
      const res = await fetch(`/api/booking/${bookingId}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Xóa thất bại')
      // thành công thì refresh lại page để cập nhật danh sách
      router.refresh()
    } catch (err) {
      alert('Lỗi: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`
        text-red-600 hover:text-white hover:bg-red-600 
        border border-red-600 px-3 py-1 rounded 
        transition-colors duration-200
        ${loading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {loading ? 'Đang xóa...' : 'Xóa'}
    </button>
  )
}
