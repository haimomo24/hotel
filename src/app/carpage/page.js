// File: src/app/component/homepage/ElectricCarBookingForm.jsx
'use client'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoCalendarClearOutline, IoTimeOutline, IoLocationSharp } from 'react-icons/io5'

// Định nghĩa giá vé xe điện (có thể lấy từ API hoặc context nếu cần)
const prices = {
  'Chạm nét tâm linh người lớn': 150000,
  'Chạm nét tâm linh trẻ em ': 100000,
  'Hành trình vui vẻ người lớn': 300000,
  'Hành trình vui vẻ trẻ em': 210000,
  'Đồng hành An Nhiên người lớn': 100000,
  'Đồng hành An Nhiên trẻ em': 70000,
  'Vé thượng hành tự tại': 4000000,
}

const ElectricCarBookingForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [bookingDate, setBookingDate] = useState('') // Giữ lại nếu bạn muốn dùng sau này, nếu không thì bỏ
  const [bookingTime, setBookingTime] = useState('')
  // Đã bỏ state cho pickupLocation và dropoffLocation

  const [ticketList, setTicketList] = useState(
    Object.keys(prices).map((type) => ({ type, quantity: 0 }))
  )

  const total = ticketList.reduce((sum, ticket) => {
    const price = prices[ticket.type] || 0
    return sum + price * ticket.quantity
  }, 0)

  const handleBookingSubmit = async (e) => {
    e.preventDefault()

    const selectedTickets = ticketList.filter(t => t.quantity > 0)

    // Đã sửa validation: bỏ pickupLocation và dropoffLocation
    if (!name || !email || !phoneNumber || !bookingTime) {
      alert("Vui lòng điền đầy đủ thông tin cá nhân và giờ đặt.")
      return
    }
    if (selectedTickets.length === 0) {
      alert("Vui lòng chọn ít nhất một loại vé.")
      return
    }
    if (total <= 0) {
      alert("Tổng tiền phải lớn hơn 0. Vui lòng chọn số lượng vé.")
      return
    }

    try {
      const response = await fetch('/api/ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          bookingTime,
          // Đã bỏ pickupLocation và dropoffLocation khỏi body
          selectedTickets,
          total,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        alert(result.message)
        // Reset form sau khi đặt vé thành công
        setName('');
        setEmail('');
        setPhoneNumber('');
        setBookingDate('');
        setBookingTime('');
        // Đã bỏ reset pickupLocation và dropoffLocation
        setTicketList(Object.keys(prices).map((type) => ({ type, quantity: 0 })));
      } else {
        alert(`Lỗi: ${result.message || 'Có lỗi xảy ra khi đặt vé.'}`)
      }
    } catch (error) {
      console.error('Lỗi gửi yêu cầu đặt vé:', error)
      alert('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.')
    }
  }

  return (
    <form onSubmit={handleBookingSubmit} className="space-y-4 mt-[150px] mb-[100px] mx-auto max-w-lg md:max-w-3xl px-4">
      <h2 className="text-4xl font-light text-center mb-8 ">
        Đặt vé xe điện
        <div className="w-20 h-1 bg-blue-500 mx-auto mt-2"></div>
      </h2>

      {/* Thông tin cá nhân */}
      <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <input
              id="fullName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 outline-none bg-transparent text-sm"
              placeholder="Nhập họ tên của bạn"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 outline-none bg-transparent text-sm"
              placeholder="Nhập email của bạn"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 outline-none bg-transparent text-sm"
              placeholder="Nhập số điện thoại của bạn"
              required
            />
          </div>
        </div>
        <div className="hidden md:block"></div>
      </div>

      {/* Thời gian */}
      <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor="bookingTime" className="block text-sm font-medium text-gray-700 mb-1">Giờ đặt</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <IoTimeOutline className="text-gray-400 mr-2" />
            <input
              id="bookingTime"
              type="time"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              className="flex-1 outline-none text-sm bg-transparent"
              required
            />
          </div>
        </div>
        {/* Đã bỏ trường input cho bookingDate để giữ layout nếu cần, nếu không thì bỏ cả div này */}
        <div className="hidden md:block"></div> 
      </div>

      {/* Đã bỏ phần Điểm đón và Điểm trả */}
      {/* <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">Điểm đón</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <IoLocationSharp className="text-gray-400 mr-2" />
            <input
              id="pickupLocation"
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="flex-1 outline-none bg-transparent text-sm"
              placeholder="Ví dụ: Cổng chùa Bái Đính"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 mb-1">Điểm trả</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <IoLocationSharp className="text-gray-400 mr-2" />
            <input
              id="dropoffLocation"
              type="text"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className="flex-1 outline-none bg-transparent text-sm"
              placeholder="Ví dụ: Tam Quan Nội"
              required
            />
          </div>
        </div>
      </div> */}

      {/* Chọn loại vé và số lượng */}
      <div className="space-y-2 pr-2">
        {ticketList.map((ticket, index) => (
          <div key={ticket.type} className="grid grid-cols-2 gap-2 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{ticket.type}</label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                <span className="text-sm font-medium text-blue-600">
                  {prices[ticket.type].toLocaleString()}đ / vé
                </span>
              </div>
            </div>
            <div>
              <label htmlFor={`quantity-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                <input
                  id={`quantity-${index}`}
                  type="number"
                  min="0"
                  value={ticket.quantity}
                  onChange={(e) => {
                    const updated = [...ticketList]
                    updated[index].quantity = Number(e.target.value)
                    setTicketList(updated)
                  }}
                  className="flex-1 outline-none bg-transparent text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tổng tiền */}
      <div className="text-center py-2">
        <div className="text-sm sm:text-base font-bold text-blue-600">
          Tổng tiền: {total.toLocaleString()}đ
        </div>
      </div>

      {/* Nút xác nhận đặt vé */}
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow-md transition text-sm"
        >
          <FaSearch />
          Xác nhận đặt vé
        </button>
      </div>
    </form>
  )
}

export default ElectricCarBookingForm