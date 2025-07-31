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
}
from 'react-icons/io5'

const slides = [
  { image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/6c/22/59/bai-dinh-hotel.jpg?w=900&h=500&s=1' },
  { image: 'https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/12000000/11780000/11779500/11779494/37053f7c_z.jpg' },
  { image: 'https://owa.bestprice.vn/images/hotels/uploads/bai-dinh-hotel-5f3a083481393.jpg' },
]

const ImageSlider = () => {
  const [current, setCurrent] = useState(0)
  const [service, setService] = useState('Đặt phòng')
  const [tickets, setTickets] = useState([{ type: 'Chạm nét tâm linh NL', quantity: 1 }])
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showTicketTooltip, setShowTicketTooltip] = useState(false); // State để điều khiển hiển thị tooltip
  const router = useRouter()

  // Đối tượng prices chứa tất cả các loại vé và giá tương ứng
  // Ghi chú: NL = Người lớn, TE = Trẻ em
  const prices = {
    'Chạm nét tâm linh NL': 150000, // NL = Người lớn
    'Chạm nét tâm linh TE': 100000, // TE = Trẻ em
    'Hành trình vui vẻ NL': 300000, // NL = Người lớn
    'Hành trình vui vẻ TE': 210000, // TE = Trẻ em
    'Đồng hành An Nhiên NL': 100000, // NL = Người lớn
    'Đồng hành An Nhiên TE': 70000,  // TE = Trẻ em
    'Vé xe VIP': 4000000,
    'Vé thượng hành tự tại': 5000000, // Mới: Vé cho 10 người
  }

  // Tính tổng tiền cho tất cả các vé
  const total = tickets.reduce((sum, ticket) => {
    const price = prices[ticket.type] || 0;
    return sum + (price * ticket.quantity);
  }, 0);

  // Hàm thêm loại vé mới
  const addTicket = () => {
    setTickets([...tickets, { type: 'Chạm nét tâm linh NL', quantity: 1 }]);
  };

  // Hàm xóa loại vé
  const removeTicket = (index) => {
    if (tickets.length > 1) {
      const newTickets = [...tickets];
      newTickets.splice(index, 1);
      setTickets(newTickets);
    }
  };

  // Hàm cập nhật loại vé
  const updateTicketType = (index, type) => {
    const newTickets = [...tickets];
    newTickets[index].type = type;
    setTickets(newTickets);
  };

  // Hàm cập nhật số lượng vé
  const updateTicketQuantity = (index, quantity) => {
    const newTickets = [...tickets];
    newTickets[index].quantity = Math.max(1, quantity);
    setTickets(newTickets);
  };

  // useEffect để tự động chuyển slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Hàm chuyển slide trước
  const prev = () => setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1))
  // Hàm chuyển slide tiếp theo
  const next = () => setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1))
  // Hàm xử lý khi click nút tìm kiếm (chuyển hướng trang)
  const handleSearchClick = () => router.push('/oderpage')

  return (
    <section className="relative w-full mb-[280px]">
      
      {/* Hình ảnh slide */}
      <img
        src={slides[current].image}
        alt=""
        className="w-full h-[250px] sm:h-[300px] md:h-[500px] lg:h-[700px] xl:h-[800px] mb-[180px] object-cover"
      />

      {/* Nút chuyển slide trái */}
      <button onClick={prev} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white rounded-full shadow-lg">
        <FaChevronLeft className="text-gray-700 text-sm sm:text-base" />
      </button>
      {/* Nút chuyển slide phải */}
      <button onClick={next} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white rounded-full shadow-lg">
        <FaChevronRight className="text-gray-700 text-sm sm:text-base" />
      </button>

      {/* Khối đặt dịch vụ nhanh chóng */}
      <div className="absolute inset-x-0 bottom-0 translate-y-1/2 flex justify-center px-2 sm:px-4">
        <div className="w-full max-w-[95%] sm:max-w-3xl md:max-w-4xl bg-white bg-opacity-95 rounded-xl shadow-2xl p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 text-center mb-3 sm:mb-5">
            Đặt dịch vụ nhanh chóng
          </h2>

          {/* Chọn dịch vụ (Đặt phòng hoặc Đặt vé xe điện) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Dịch vụ</label>
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

          {/* Form Đặt phòng (hiển thị khi service là 'Đặt phòng') */}
          {service === 'Đặt phòng' && (
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Loại phòng</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2">
                    <FaBed className="text-gray-400 mr-2" />
                    <select className="flex-1 outline-none bg-transparent text-xs sm:text-sm">
                      <option>Phòng Standard</option>
                      <option>Phòng Deluxe</option>
                      <option>Phòng Suite</option>
                      <option>Phòng VIP</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Số khách</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2">
                    <IoPeople className="text-gray-400 mr-2" />
                    <select className="flex-1 outline-none bg-transparent text-xs sm:text-sm">
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
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Nhận phòng</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2">
                    <IoCalendarClearOutline className="text-gray-400 mr-2" />
                    <input
                      type="date"
                      className="flex-1 outline-none text-xs sm:text-sm bg-transparent"
                      defaultValue="2025-07-19"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Trả phòng</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2">
                    <IoCalendarClearOutline className="text-gray-400 mr-2" />
                    <input
                      type="date"
                      className="flex-1 outline-none text-xs sm:text-sm bg-transparent"
                      defaultValue="2025-07-21"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-3 sm:mt-4 md:mt-5">
                <button
                  onClick={handleSearchClick}
                  className="flex items-center gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-6 py-1.5 sm:py-2 rounded-md shadow-md transition text-xs sm:text-sm"
                >
                  <FaSearch />
                  Tìm dịch vụ
                </button>
              </div>
            </form>
          )}

          {/* Form Đặt vé xe điện (hiển thị khi service là 'Đặt vé xe điện') */}
          {service === 'Đặt vé xe điện' && (
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-700">
              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Họ và tên</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1 outline-none bg-transparent text-sm"
                      placeholder="Nhập họ tên"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Email</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 outline-none bg-transparent text-sm"
                      placeholder="Nhập email"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Số điện thoại</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 outline-none bg-transparent text-sm"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1 relative">
                    Loại vé
                    {/* Dấu sao và tooltip */}
                    <span
                      className="ml-1 text-blue-500 cursor-pointer"
                      onClick={() => setShowTicketTooltip(!showTicketTooltip)}
                    >
                      *
                    </span>
                    {showTicketTooltip && (
                      <div className="absolute z-10 bg-white p-3 rounded-md shadow-lg border border-gray-200 text-xs text-gray-700 w-48 top-full left-0 mt-1">
                        <p>NL = Người lớn</p>
                        <p>TE = Trẻ em</p>
                        <p>Vé thượng hành tự tại: cho 10 người</p>
                      </div>
                    )}
                  </label>
                  
                  {/* Render multiple ticket type rows */}
                  {tickets.map((ticket, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 mb-2">
                      <div className="col-span-7">
                        <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2">
                          <select
                            value={ticket.type}
                            onChange={(e) => updateTicketType(index, e.target.value)}
                            className="flex-1 outline-none bg-transparent text-sm"
                          >
                            {/* Duyệt qua các khóa của đối tượng prices để tạo các option động */}
                            {Object.keys(prices).map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2">
                          <input
                            type="number"
                            min="1"
                            value={ticket.quantity}
                            onChange={(e) => updateTicketQuantity(index, Number(e.target.value))}
                            className="flex-1 outline-none bg-transparent text-sm"
                          />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <button
                          type="button"
                          onClick={() => removeTicket(index)}
                          className="w-full h-full flex items-center justify-center bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add ticket button */}
                  <button
                    type="button"
                    onClick={addTicket}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                  >
                    + Thêm loại vé
                  </button>
                </div>
              </div>
              
              {/* Display total price */}
              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Tổng tiền</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50">
                    <span className="text-xs sm:text-sm font-medium text-blue-600">
                      {total.toLocaleString()}đ
                    </span>
                  </div>
                </div>
              </div>

              {/* Tổng tiền */}
              <div className="text-center py-2">
                <div className="text-sm sm:text-base font-bold text-blue-600">
                  Tổng tiền: {total.toLocaleString()}đ
                </div>
              </div>

              {/* Nút Đặt vé */}
              <div className="flex justify-center mt-3 sm:mt-4 md:mt-5">
                <button
                  onClick={async () => {
                    // Prepare booking data
                    const bookingData = {
                      name,
                      email,
                      phone: phoneNumber,
                      tickets: tickets.map(ticket => ({
                        type: ticket.type,
                        quantity: ticket.quantity,
                        price: prices[ticket.type] || 0
                      })),
                      total
                    };
                    
                    try {
                      const response = await fetch('/api/ticket-booking', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(bookingData),
                      });
                      
                      if (response.ok) {
                        const result = await response.json();
                        alert('Đặt vé thành công! Mã đặt vé: ' + result.bookingId);
                      } else {
                        const error = await response.json();
                        alert('Đã có lỗi xảy ra: ' + error.message);
                      }
                    } catch (error) {
                      console.error('Error:', error);
                      alert('Đã có lỗi xảy ra. Vui lòng thử lại.');
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 sm:px-6 py-1.5 sm:py-2 rounded-md shadow-md transition text-xs sm:text-sm"
                >
                  Đặt vé
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
