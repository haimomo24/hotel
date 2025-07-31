// File: src/app/component/homepage/SlideImages.jsx
'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaBed,
} from 'react-icons/fa'
import {
  IoPeople,
  IoCalendarClearOutline,
  IoLocationSharp,
} from 'react-icons/io5'

const slides = [
  { image: '/images/anhslider_1.jpg' },
  { image: '/images/anhslide_2.JPG' },
  { image: '/images/anhslide_3.jpg' },
  { image: '/images/anhslide_3.jpg' },
]

const prices = {
  'Chạm nét tâm linh người lớn': 150000,
  'Chạm nét tâm linh trẻ em': 100000,
  'Hành trình vui vẻ người lớn': 300000,
  'Hành trình vui vẻ trẻ em': 210000,
  'Đồng hành An Nhiên người lớn': 100000,
  'Đồng hành An Nhiên trẻ em': 70000,
  'Vé thượng hành tự tại': 4000000,
}

const ImageSlider = () => {
  const [current, setCurrent] = useState(0)
  const [service, setService] = useState('Đặt phòng')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const router = useRouter()

  const [ticketList, setTicketList] = useState(
    Object.keys(prices).map((type) => ({ type, quantity: 0 }))
  )

  const total = ticketList.reduce((sum, ticket) => {
    const price = prices[ticket.type] || 0
    return sum + price * ticket.quantity
  }, 0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1))
  const next = () => setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1))

  const handleGoToBookingPage = () => {
    if (service === 'Đặt phòng') {
      router.push('/oderpage')
    } else if (service === 'Đặt vé xe điện') {
      router.push('/carpage')
    }
  }

  const handleBooking = () => {
    const selectedTickets = ticketList.filter(t => t.quantity > 0)
    if (selectedTickets.length === 0) {
      alert("Vui lòng chọn ít nhất một loại vé")
      return
    }
    console.log({
      name,
      email,
      phoneNumber,
      selectedTickets,
      total,
    })
    alert("Đặt vé thành công!")
  }

  const sectionMarginBottom = service === 'Đặt phòng' ? 'mb-[80px]' : 'mb-[80px]';

  return (
    <section className={`relative w-full ${sectionMarginBottom}`}>
      <img
        src={slides[current].image}
        alt=""
        className="w-full h-[250px] sm:h-[300px] md:h-[500px] lg:h-[700px] xl:h-[800px] mb-[180px] object-cover"
      />
      <button onClick={prev} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white rounded-full shadow-lg">
        <FaChevronLeft className="text-gray-700 text-sm sm:text-base" />
      </button>
      <button onClick={next} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white rounded-full shadow-lg">
        <FaChevronRight className="text-gray-700 text-sm sm:text-base" />
      </button>

      <div className="absolute inset-x-0 bottom-0 translate-y-1/2 flex justify-center px-2 sm:px-4 mt-[100p] sm:mt-0">
        <div className="w-full max-w-[95%] sm:max-w-3xl md:max-w-4xl bg-white bg-opacity-95 rounded-xl shadow-2xl p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 text-center mb-3 sm:mb-5">
            ĐẶT DỊCH VỤ 
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">DỊCH VỤ</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <IoLocationSharp className="text-gray-400 mr-2" />
              <select
                className="flex-1 outline-none bg-transparent text-sm"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option>Đặt phòng</option>
                <option>Đặt vé xe điện</option>
              </select>
            </div>
          </div>

          {/* Form Đặt phòng */}
          {service === 'Đặt phòng' && (
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại phòng</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                    <FaBed className="text-gray-400 mr-2" />
                    <select className="flex-1 outline-none bg-transparent text-sm">
                      <option>Phòng Standard</option>
                      <option>Phòng Deluxe</option>
                      <option>Phòng Suite</option>
                      <option>Phòng VIP</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số khách</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                    <IoPeople className="text-gray-400 mr-2" />
                    <select className="flex-1 outline-none bg-transparent text-sm">
                      <option>1 người lớn</option>
                      <option>2 người lớn</option>
                      <option>2 người lớn, 1 trẻ em</option>
                      <option>2 người lớn, 2 trẻ em</option>
                      <option>3 người lớn</option>
                      <option>4 người lớn</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nhận phòng</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                    <IoCalendarClearOutline className="text-gray-400 mr-2" />
                    <input
                      type="date"
                      className="flex-1 outline-none text-sm bg-transparent"
                      defaultValue="2025-07-19"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trả phòng</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                    <IoCalendarClearOutline className="text-gray-400 mr-2" />
                    <input
                      type="date"
                      className="flex-1 outline-none text-sm bg-transparent"
                      defaultValue="2025-07-21"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="button" 
                  onClick={handleGoToBookingPage} 
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow-sm transition text-sm"
                >
                  <span>Tìm phòng</span>
                </button>
              </div>
            </form>
          )}

          {/* Form Đặt vé xe điện */}
          {service === 'Đặt vé xe điện' && (
  <div className="space-y-6"> {/* Tăng khoảng cách tổng thể để thoáng hơn */}
   

    {/* Bố cục 2 cột cho danh sách vé, với các nhãn nhỏ gọn */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3"> {/* Tăng khoảng cách giữa các mục */}
      {Object.keys(prices).map((ticketType) => (
        <div key={ticketType} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-md border border-gray-200"> {/* Thêm nền nhẹ và bo góc */}
          <span className="text-sm text-gray-800 font-medium">{ticketType}</span>
          <span className="text-sm font-bold text-blue-600">
            {prices[ticketType].toLocaleString()}đ
          </span>
        </div>
      ))}
    </div>

    {/* Nút "Đặt ngay" được tối ưu */}
    <div className="flex justify-center mt-6"> {/* Tăng khoảng cách với phần trên */}
      <button
        type="button"
        onClick={handleGoToBookingPage} // Vẫn giữ nguyên hàm điều hướng
        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow-sm transition text-sm"
      >
        <span>Đặt ngay</span>
      </button>
    </div>
  </div>
)}
        </div>
      </div>
    </section>
  )
}

export default ImageSlider