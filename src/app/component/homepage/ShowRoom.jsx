'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  CheckCircleIcon,
  WifiIcon,
} from '@heroicons/react/24/solid'

export default function ShowRoom() {
  const router = useRouter()
  const [rooms, setRooms] = useState([])
  const [typesSummary, setTypesSummary] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [noRoomTypeId, setNoRoomTypeId] = useState(null)

  // 1. Ảnh cho mỗi typeId
  const typeImages = {
    1: 'https://owa.bestprice.vn/images/hotels/large/bai-dinh-hotel-5f3a2df20f5b3-450x252.jpg',
    2: 'https://owa.bestprice.vn/images/hotels/large/bai-dinh-hotel-5f3a2d56b7bcb-450x252.jpg',
    3: 'https://owa.bestprice.vn/images/hotels/large/bai-dinh-hotel-5f3a2d68e2d45-450x252.jpg',
    4: 'https://owa.bestprice.vn/images/hotels/large/bai-dinh-hotel-5f3a2d68e2cc9-450x252.jpg',
  }

  // 2. Tên phòng FIX CỨNG theo typeId
  const typeTitles = {
    1: 'Phòng deluxe/double',
    2: 'Phòng Baidinh Triple',
    3: 'Phòng extrabed',
    4: 'Phòng president',
  }

  useEffect(() => {
    async function fetchAndGroup() {
      setLoading(true)
      try {
        const res  = await fetch('/api/rooms')
        const data = await res.json()
        const allRooms = data.rooms || []
        setRooms(allRooms)

        // Build summary grouped by typeId
        const map = new Map()
        allRooms.forEach(r => {
          const key = r.typeId
          // Lấy tên từ typeTitles thay vì từ API
          const title = typeTitles[key] || 'Phòng'
          if (!map.has(key)) {
            map.set(key, {
              typeId: key,
              typeTitle: title,
              totalRooms: 0,
              bookedCount: 0,
              availableCount: 0,
            })
          }
          const entry = map.get(key)
          entry.totalRooms++
          if (r.status === 'available') entry.availableCount++
          else entry.bookedCount++
        })
        setTypesSummary(Array.from(map.values()))
      } catch (err) {
        console.error(err)
        setError('Lỗi khi tải dữ liệu phòng.')
      } finally {
        setLoading(false)
      }
    }
    fetchAndGroup()
  }, [])

  // Khi click Xem chi tiết
  const handleViewDetail = (typeId, availableCount) => {
    if (availableCount === 0) {
      setNoRoomTypeId(typeId)
      return
    }
    const room = rooms.find(r => r.typeId === typeId && r.status === 'available')
    if (!room) {
      setNoRoomTypeId(typeId)
      return
    }
    router.push(`/booking?roomId=${room.id}`)
  }

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto px-4 py-8">
        <p>Đang tải danh sách phòng…</p>
      </section>
    )
  }
  if (error) {
    return (
      <section className="max-w-5xl mx-auto px-4 py-8">
        <p className="text-red-500">{error}</p>
      </section>
    )
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 font-sans space-y-5">
      <h2 className="text-xl text-gray-700 font-semibold">Phòng & Giá</h2>
      <div className="bg-white border rounded-2xl divide-y divide-gray-100">
        {typesSummary.map((t, idx) => (
          <div
            key={t.typeId}
            className={`
              flex flex-col md:flex-row gap-4 p-6
              ${idx === 0 ? 'rounded-t-2xl' : ''}
              ${idx === typesSummary.length - 1 ? 'rounded-b-2xl' : ''}
            `}
          >
            {/* Ảnh */}
            <div className="w-full md:w-60 h-40 flex-shrink-0">
              <img
                src={typeImages[t.typeId] || '/uploads/placeholder.jpg'}
                alt={t.typeTitle}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Thông tin */}
            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-medium text-gray-700 leading-snug">
                {t.typeTitle}
              </h3>
              <p className="text-sm text-gray-500">
                Tổng: {t.totalRooms} phòng
              </p>
              <div className="text-sm text-gray-700">
                <div>Đã đặt: {t.bookedCount}</div>
                <div>Chưa đặt: {t.availableCount}</div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-700 pt-1">
                <WifiIcon className="w-4 h-4 text-gray-400" />
                <span>Internet miễn phí</span>
              </div>
              {noRoomTypeId === t.typeId && (
                <p className="mt-2 text-red-500 text-sm">
                  Đã đầy, không còn phòng trống!
                </p>
              )}
            </div>

            {/* Button Xem chi tiết */}
            <div className="md:w-56 flex flex-col text-gray-700 justify-center items-start md:items-center gap-2">
              <button
                onClick={() => handleViewDetail(t.typeId, t.availableCount)}
                className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg px-8 py-3"
              >
                Xem chi tiết
              </button>
              <div className="flex items-center text-xs text-emerald-600 gap-1">
                <CheckCircleIcon className="w-4 h-4" />
                <span>Tỷ giá thấp hôm nay</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
