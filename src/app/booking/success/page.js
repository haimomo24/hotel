'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  CheckCircleIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  WalletIcon,
  EnvelopeIcon,
  PhoneIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/solid'

export default function BookingSuccess() {
  const params    = useSearchParams()
  const router    = useRouter()
  const bookingId = params.get('bookingId')

  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    if (!bookingId) {
      router.replace('/')
      return
    }

    setLoading(true)
    fetch(`/api/booking/${bookingId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.booking) {
          setBooking(data.booking)
        } else {
          setError(data.message || 'Không tìm thấy booking.')
        }
      })
      .catch(err => {
        console.error(err)
        setError('Lỗi khi lấy thông tin booking.')
      })
      .finally(() => setLoading(false))
  }, [bookingId, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 space-y-4">
        <ExclamationTriangleIcon className="h-12 w-12 text-red-500" />
        <p className="text-red-600 text-lg">{error}</p>
        <button
          onClick={() => router.push('/')}
          className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
        >
          Quay về trang chủ
        </button>
      </div>
    )
  }

  const {
    roomId,
    adultCount,
    childCount,
    checkIn,
    checkOut,
    totalPrice,
    customerEmail,
    customerPhone
  } = booking

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white p-6">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <CheckCircleIcon className="h-16 w-16 text-green-500" />
          <h1 className="text-3xl font-bold text-gray-800">Đặt phòng thành công!</h1>
          <p className="text-gray-600">
            Mã booking: <span className="font-mono text-indigo-600">#{bookingId}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 text-gray-700">
          <div className="flex items-center space-x-3">
            <UserGroupIcon className="h-6 w-6 text-indigo-500" />
            <span>
              Người lớn: <strong>{adultCount}</strong>, Trẻ em: <strong>{childCount}</strong>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <CalendarDaysIcon className="h-6 w-6 text-indigo-500" />
            <span>
              Check-in: <strong>{new Date(checkIn).toLocaleString()}</strong>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <CalendarDaysIcon className="h-6 w-6 text-indigo-500" />
            <span>
              Check-out: <strong>{new Date(checkOut).toLocaleString()}</strong>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <WalletIcon className="h-6 w-6 text-indigo-500" />
            <span>
              Tổng giá: <strong>{totalPrice.toLocaleString()}₫</strong>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <EnvelopeIcon className="h-6 w-6 text-indigo-500" />
            <span>Email: <strong>{customerEmail}</strong></span>
          </div>
          <div className="flex items-center space-x-3">
            <PhoneIcon className="h-6 w-6 text-indigo-500" />
            <span>SĐT: <strong>{customerPhone}</strong></span>
          </div>
        </div>

        <div className="flex justify-center space-x-4 pt-4">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
          >
            Về trang chủ
          </button>
          <button
            onClick={() => router.push(`/booking/details?bookingId=${bookingId}`)}
            className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  )
}
