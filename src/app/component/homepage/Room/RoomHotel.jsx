'use client'
import React, { useState, useEffect } from 'react'
import { StarIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"

const priceRanges = [
  { label: '< 1 000 000₫',         min: 0,        max: 1000000 },
  { label: '1 000 000 - 2 000 000₫', min: 1000000, max: 2000000 },
  { label: '2 000 000 - 5 000 000₫', min: 2000000, max: 5000000 },
  { label: '> 5 000 000₫',          min: 5000000,  max: Infinity },
]
const capacities = [1, 2, 3, 4]
const itemsPerPage = 6

function RoomCard({ room }) {
  const router = useRouter()
  const [idx, setIdx] = useState(0)

  // room.images được trả về dạng ['/uploads/rooms/D101-1.jpg', ...]
  // hoặc 'rooms/D101-1.jpg' nếu bạn lưu như vậy trong DB
  const images = room.images.map(src => {
    if (src.startsWith('/uploads/')) return src
    if (src.startsWith('/')) return src
    return `/uploads/${src}`
  })

  const prev = () => setIdx(i => (i - 1 + images.length) % images.length)
  const next = () => setIdx(i => (i + 1) % images.length)

  // Chọn ảnh, fallback về placeholder nếu lỗi
  const currentSrc = images[idx] || '/uploads/placeholder.jpg'

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <img
          src={currentSrc}
          alt={`Phòng ${room.number}`}
          onError={e => { e.currentTarget.src = '/uploads/placeholder.jpg' }}
          className="object-cover w-full h-full"
        />
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-1 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-1 rounded-full"
        >
          ›
        </button>
      </div>
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold">
          {room.type} – {room.number}
        </h3>
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className="h-4 w-4 text-amber-400" />
          ))}
        </div>
        <p>Giá: {room.basePrice.toLocaleString()}₫ /đêm</p>
        <p>Sức chứa: {room.capacity} khách</p>
        <button
          onClick={() => router.push(`/booking?roomId=${room.id}`)}
          className="mt-2 w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition"
        >
          Đặt ngay
        </button>
      </div>
    </div>
  )
}

export default function RoomHotel() {
  const [rooms,         setRooms]         = useState([])
  const [filteredRooms, setFilteredRooms] = useState([])
  const [loading,       setLoading]       = useState(true)
  const [error,         setError]         = useState('')
  const [currentPage,   setCurrentPage]   = useState(1)
  const [filters,       setFilters]       = useState({
    priceRange: null,
    capacity:   [],
    ratings:    [],
  })

  useEffect(() => {
    fetch('/api/rooms')
      .then(res => res.json())
      .then(data => setRooms(data.rooms || []))
      .catch(() => setError('Không tải được danh sách phòng'))
      .finally(() => setLoading(false))
  }, [])

  // Áp dụng filter
  useEffect(() => {
    const tmp = rooms.filter(room => {
      const pr      = filters.priceRange
      const okPrice = !pr || (room.basePrice >= pr.min && room.basePrice <= pr.max)
      const okCap   = filters.capacity.length === 0
        ? true
        : filters.capacity.some(c => room.capacity >= c)
      const okRate  = !room.rating || filters.ratings.length === 0
        ? true
        : filters.ratings.includes(Math.floor(room.rating))
      return okPrice && okCap && okRate
    })
    setFilteredRooms(tmp)
    setCurrentPage(1)
  }, [rooms, filters])

  function toggleArray(arr, val) {
    return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]
  }

  if (loading) return <div className="p-6">Đang tải…</div>
  if (error)   return <div className="p-6 text-red-500">{error}</div>

  // Phân trang
  const totalPages   = Math.ceil(filteredRooms.length / itemsPerPage)
  const startIdx     = (currentPage - 1) * itemsPerPage
  const displayRooms = filteredRooms.slice(startIdx, startIdx + itemsPerPage)

  return (
    <div className="flex mt-[70px] bg-gray-100 min-h-screen">
      <div className="w-64 self-start sticky top-[80px] p-4 space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Khoảng giá</h3>
          {priceRanges.map((pr, i) => (
            <label key={i} className="flex items-center mb-1 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={filters.priceRange === pr}
                onChange={() =>
                  setFilters(f => ({ ...f, priceRange: f.priceRange === pr ? null : pr }))
                }
                className="rounded text-amber-500"
              />
              <span className="ml-2">{pr.label}</span>
            </label>
          ))}
        </div>
        <div>
          <h3 className="font-semibold mb-2">Số người</h3>
          {capacities.map(c => (
            <label key={c} className="flex items-center mb-1 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.capacity.includes(c)}
                onChange={() =>
                  setFilters(f => ({ ...f, capacity: toggleArray(f.capacity, c) }))
                }
                className="rounded text-amber-500"
              />
              <span className="ml-2">{c} khách trở lên</span>
            </label>
          ))}
        </div>
        <div>
          <h3 className="font-semibold mb-2">Đánh giá</h3>
          {[5,4,3,2,1].map(r => (
            <label key={r} className="flex items-center mb-1 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.ratings.includes(r)}
                onChange={() =>
                  setFilters(f => ({ ...f, ratings: toggleArray(f.ratings, r) }))
                }
                className="rounded text-amber-500"
              />
              <div className="flex ml-2">
                {Array.from({ length: r }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 text-amber-400" />
                ))}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Danh sách phòng ({filteredRooms.length})
        </h1>

        {displayRooms.length === 0 && <p>Không có phòng phù hợp.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              ‹ Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  page === currentPage ? 'bg-amber-500 text-white' : 'bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next ›
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
