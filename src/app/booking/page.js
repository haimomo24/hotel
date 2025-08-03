'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon
} from '@heroicons/react/24/solid'

export default function BookingPage() {
  const params  = useSearchParams()
  const router  = useRouter()
  const roomId  = params.get('roomId')

  const [room, setRoom]             = useState(null)
  const [loading, setLoading]       = useState(true)
  const [slideIdx, setSlideIdx]     = useState(0)
  const [name, setName]             = useState('')
  const [email, setEmail]           = useState('')
  const [phone, setPhone]           = useState('')
  const [adultCount, setAdultCount] = useState(1)
  const [childCount, setChildCount] = useState(0)
  const [bookingState, setBookingState] = useState({
    loading: false,
    message: '',
    error: ''
  })

  /** ----------------- LẤY DỮ LIỆU PHÒNG ------------------ */
  useEffect(() => {
    if (!roomId) return
    setLoading(true)
    fetch('/api/rooms')
      .then(res => res.json())
      .then(data => {
        const found = (data.rooms || []).find(r => String(r.id) === roomId)
        if (found) {
          setRoom(found)
          setSlideIdx(0)
          setAdultCount(found.capacity)
          setChildCount(0)
        } else {
          setRoom(null)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [roomId])

  if (loading) return <div className="p-6 text-center">Đang tải chi tiết…</div>
  if (!room) {
    return (
      <div className="p-6 text-center text-red-500">
        Không tìm thấy phòng #{roomId}
      </div>
    )
  }

  /** ----------------- SLIDER ẢNH ------------------ */
  const prevSlide = () =>
    setSlideIdx(i => (i - 1 + room.images.length) % room.images.length)
  const nextSlide = () =>
    setSlideIdx(i => (i + 1) % room.images.length)
  const goToSlide = i => setSlideIdx(i)

  /** ----------------- TÍNH GIÁ ------------------ */
  const extraAdults   = Math.max(0, adultCount - room.capacity)
  const estimatePrice =
    room.basePrice +
    extraAdults * room.extraAdultFee +
    childCount * room.extraChildFee

  /** ----------------- VALIDATION ------------------ */
  const isFormValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    phone.trim().length > 0

  /** ----------------- ĐẶT PHÒNG ------------------ */
  const handleBooking = async () => {
    if (!isFormValid) {
      setBookingState({
        loading: false,
        message: '',
        error: '❌ Vui lòng nhập đủ Họ tên, Email và Số điện thoại'
      })
      return
    }

    setBookingState({ loading: true, message: '', error: '' })
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId:        room.id,
          adultCount,
          childCount,
          customerName:  name,
          customerEmail: email,
          customerPhone: phone
        })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        router.push(`/booking/success?bookingId=${data.bookingId}`)
      } else {
        setBookingState({
          loading: false,
          error: data.message || '❌ Đặt phòng thất bại'
        })
      }
    } catch (err) {
      console.error(err)
      setBookingState({
        loading: false,
        error: '❌ Lỗi mạng, thử lại sau'
      })
    }
  }

  /** ----------------- JSX ------------------ */
  return (
    <div className="max-w-4xl mx-auto mt-[80px] p-6 bg-white shadow-lg rounded-lg space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Phòng {room.number} – {room.type}
      </h1>

      {/* ----------- SLIDER ẢNH ----------- */}
      <div className="relative overflow-hidden rounded-lg h-64 md:h-96">
        <img
          src={room.images[slideIdx]}
          alt={`Phòng ${room.number} ảnh ${slideIdx + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full hover:bg-black/50"
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full hover:bg-black/50"
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </button>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
          {room.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 w-2 rounded-full ${
                idx === slideIdx ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ----------- CHI TIẾT PHÒNG ----------- */}
        <ul className="space-y-2 text-gray-700">
          <li>
            <span className="font-medium">Giá cơ bản:</span>{' '}
            {room.basePrice.toLocaleString()}₫ / đêm
          </li>
          <li>
            <span className="font-medium">Sức chứa:</span>{' '}
            {room.capacity} khách
          </li>
          <li className="flex items-center">
            <span className="font-medium mr-2">Đánh giá:</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="h-5 w-5 text-amber-400" />
            ))}
          </li>
          <li>
            <span className="font-medium">Trạng thái:</span>{' '}
            <span className={room.status === 'available' ? 'text-green-600' : 'text-red-600'}>
              {room.status === 'available' ? 'Trống' : 'Đã đặt'}
            </span>
          </li>
        </ul>

        {/* ----------- FORM ĐẶT PHÒNG ----------- */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold">Xác nhận đặt phòng</h2>

          <div>
            <label className="block mb-1">Họ và tên</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1">Số điện thoại</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1">Người lớn</label>
            <input
              type="number"
              min={room.capacity}
              value={adultCount}
              onChange={e => setAdultCount(Math.max(room.capacity, +e.target.value))}
              className="w-full border rounded px-3 py-2"
            />
            <small className="text-gray-500">
              (Tối thiểu {room.capacity} khách)
            </small>
          </div>

          <div>
            <label className="block mb-1">Trẻ em</label>
            <input
              type="number"
              min={0}
              value={childCount}
              onChange={e => setChildCount(Math.max(0, +e.target.value))}
              className="w-full border rounded px-3 py-2"
            />
            <small className="text-gray-500">(Phụ phí theo trẻ em)</small>
          </div>

          <p className="font-medium">
            Tổng tạm tính:{' '}
            <span className="text-indigo-600">
              {estimatePrice.toLocaleString()}₫
            </span>
          </p>

          <button
            onClick={handleBooking}
            disabled={
              bookingState.loading ||
              room.status !== 'available' ||
              !isFormValid
            }
            className={`w-full px-6 py-2 text-white rounded-lg font-semibold ${
              room.status === 'available'
                ? 'bg-indigo-600 hover:bg-indigo-500'
                : 'bg-gray-400 cursor-not-allowed'
            } ${
              bookingState.loading || !isFormValid ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {bookingState.loading ? 'Đang đặt…' : 'Xác nhận đặt phòng'}
          </button>

          {bookingState.error && (
            <p className="mt-2 text-center text-red-600">{bookingState.error}</p>
          )}
        </div>
      </div>
    </div>
  )
}
