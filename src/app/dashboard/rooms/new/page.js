'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewRoomPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    number: '',
    status: 'available',
    type: '',
    basePrice: '',
  })

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function onSubmit(e) {
    e.preventDefault()
    await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    router.push('/dashboard')
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Thêm phòng mới</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="number"
          value={form.number}
          onChange={onChange}
          placeholder="Số phòng"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="type"
          value={form.type}
          onChange={onChange}
          placeholder="Loại phòng"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="basePrice"
          value={form.basePrice}
          onChange={onChange}
          type="number"
          placeholder="Giá gốc"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option value="available">Chưa đặt</option>
          <option value="occupied">Đã đặt</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Tạo
        </button>
      </form>
    </div>
)
}
