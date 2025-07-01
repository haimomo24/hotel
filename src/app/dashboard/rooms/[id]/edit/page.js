'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditRoomPage() {
  const router = useRouter()
  const { id } = useParams()

  const roomTypes = [
    { id: 1, value: 'deluxe_double',   label: 'Deluxe/double',   basePrice: 1250000 },
    { id: 2, value: 'baidinh_triple',  label: 'Baidinh triple',   basePrice: 1600000 },
    { id: 3, value: 'executive_suite', label: 'Executive suite',  basePrice: 2800000 },
    { id: 4, value: 'president',       label: 'President',        basePrice: 10700000 },
  ]

  const [form, setForm] = useState({
    number: '',
    type: '',
    typeId: '',
    capacity: '',
    basePrice: '',
    extraChildFee: '',
    extraAdultFee: '',
    status: 'available',
    images: ['', '', ''],       // 3 slot cố định
    uploading: [false, false, false],
  })
  const [loading, setLoading] = useState(true)

  // 1. Load dữ liệu phòng
  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await fetch(`/api/rooms?id=${id}`)
        const { room } = await res.json()
        const found = roomTypes.find(t => t.value === room.type)
        // Normalize về [' /uploads/xxx', …] hoặc '' nếu không có
        const imgs = Array.isArray(room.images)
          ? room.images.map(src => {
              if (src.startsWith('/')) return src
              return `/uploads/${src.replace(/^\/+/, '')}`
            })
          : []
        // Đảm bảo có đúng 3 slot
        while (imgs.length < 3) imgs.push('')
        setForm({
          number: room.number,
          type: room.type,
          typeId: found ? found.id : '',
          capacity: room.capacity,
          basePrice: room.basePrice,
          extraChildFee: room.extraChildFee,
          extraAdultFee: room.extraAdultFee,
          status: room.status,
          images: imgs.slice(0, 3),
          uploading: [false, false, false],
        })
      } catch (err) {
        console.error('Load room error', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <p className="p-4">Đang tải dữ liệu…</p>

  // 2. Handlers chung
  function onTypeChange(e) {
    const newType = e.target.value
    const found = roomTypes.find(t => t.value === newType)
    setForm(prev => ({
      ...prev,
      type: newType,
      typeId: found ? found.id : '',
      basePrice: found ? found.basePrice : prev.basePrice,
    }))
  }

  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // 3. Upload file và insert vào room_images nếu cần
  async function handleFileUpload(idx, e) {
    const file = e.target.files?.[0]
    if (!file) return
    // đánh dấu uploading
    setForm(prev => {
      const up = [...prev.uploading]; up[idx] = true
      return { ...prev, uploading: up }
    })
    const fd = new FormData()
    fd.append('file', file)
    fd.append('roomId', id)     // để API tự insert vào room_images

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const { url } = await res.json()
      setForm(prev => {
        const imgs = [...prev.images]
        const up   = [...prev.uploading]
        imgs[idx] = url    // e.g. '/uploads/xyz.jpg'
        up[idx]   = false
        return { ...prev, images: imgs, uploading: up }
      })
    } catch (err) {
      console.error('Upload error', err)
      setForm(prev => {
        const up = [...prev.uploading]; up[idx] = false
        return { ...prev, uploading: up }
      })
    }
  }

  // 4. Xóa ảnh tại vị trí idx (chuyển về '')
  function handleRemove(idx) {
    setForm(prev => {
      const imgs = [...prev.images]
      imgs[idx] = ''
      return { ...prev, images: imgs }
    })
  }

  // 5. Submit form → PUT /api/rooms
  async function onSubmit(e) {
    e.preventDefault()
    if (form.uploading.some(u => u)) return

    try {
      await fetch(`/api/rooms?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      router.push('/dashboard')
    } catch (err) {
      console.error('Save room error', err)
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl mb-4">Sửa phòng #{id}</h1>
      <form onSubmit={onSubmit} className="space-y-4">

        {/* Số phòng */}
        <div>
          <label className="block mb-1">Số phòng</label>
          <input
            name="number"
            value={form.number}
            onChange={onChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Loại phòng */}
        <div>
          <label className="block mb-1">Loại phòng</label>
          <select
            name="type"
            value={form.type}
            onChange={onTypeChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Chọn loại phòng</option>
            {roomTypes.map(t => (
              <option key={t.id} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* Giá gốc */}
        <div>
          <label className="block mb-1">Giá gốc</label>
          <input
            name="basePrice"
            value={form.basePrice}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* Sức chứa & Trạng thái */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Sức chứa</label>
            <input
              name="capacity"
              type="number"
              value={form.capacity}
              onChange={onChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Trạng thái</label>
            <select
              name="status"
              value={form.status}
              onChange={onChange}
              className="w-full p-2 border rounded"
            >
              <option value="available">Chưa đặt</option>
              <option value="occupied">Đã đặt</option>
            </select>
          </div>
        </div>

        {/* Phí thêm */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Phí thêm trẻ em</label>
            <input
              name="extraChildFee"
              type="number"
              value={form.extraChildFee}
              onChange={onChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Phí thêm người lớn</label>
            <input
              name="extraAdultFee"
              type="number"
              value={form.extraAdultFee}
              onChange={onChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Upload, Preview & Remove ảnh */}
        <div>
          <label className="block mb-1">Ảnh phòng</label>
          {form.images.map((img, idx) => (
            <div key={idx} className="mb-4 relative">
              {img ? (
                <>
                  <img
                    src={img}
                    alt={`Ảnh ${idx + 1}`}
                    onError={e => { e.currentTarget.src = '/uploads/placeholder.jpg' }}
                    className="w-full h-40 object-cover border mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded"
                  >
                    X
                  </button>
                </>
              ) : null}

              <input
                type="file"
                accept="image/*"
                disabled={form.uploading[idx]}
                onChange={e => handleFileUpload(idx, e)}
                className="block"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={form.uploading.some(u => u)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  )
}
