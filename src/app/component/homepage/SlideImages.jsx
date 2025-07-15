'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlaneDeparture,
  FaHotel,
  FaGlobe,
  FaUmbrellaBeach,
  FaThLarge,
  FaSearch,
  FaExchangeAlt,
  FaBed,
  FaCalendarAlt,
} from 'react-icons/fa'
import { IoPeople, IoCalendarClearOutline, IoLocationSharp } from 'react-icons/io5'

const slides = [
  {
    image:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/6c/22/59/bai-dinh-hotel.jpg?w=900&h=500&s=1',
  },
  {
    image:
      'https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/12000000/11780000/11779500/11779494/37053f7c_z.jpg?_src=imagekit&tr=c-at_max,f-jpg,h-720,pr-true,q-40,w-1280',
  },
  {
    image:
      'https://owa.bestprice.vn/images/hotels/uploads/bai-dinh-hotel-5f3a083481393.jpg',
  },
]

const tabList = [
  { icon: FaHotel, label: 'Khách sạn' },
  { icon: FaPlaneDeparture, label: 'Vé máy bay' },
  { icon: FaGlobe, label: 'Visa' },
  { icon: FaUmbrellaBeach, label: 'Du lịch' },
  { icon: FaThLarge, label: 'Combo' },
]

const ImageSlider = () => {
  const [current, setCurrent] = useState(0)
  const router = useRouter()

  /* ----- auto change slide mỗi 5s ----- */
  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1)),
      5000
    )
    return () => clearInterval(timer)
  }, [])

  /* ----- helper ----- */
  const prev = () =>
    setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1))
  const next = () =>
    setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1))

  /* ----- handle search button click ----- */
  const handleSearchClick = () => {
    router.push('/oderpage')
  }

  /* ----- UI ----- */
  return (
    <section className="relative w-full  mb-24 md:mb-32">
      {/* layer hình nền  */}
      <img
        src={slides[current].image}
        alt=""
        className="w-full h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
      />

      {/* nút điều hướng slide */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200"
      >
        <FaChevronLeft className="text-gray-700" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200"
      >
        <FaChevronRight className="text-gray-700" />
      </button>

      {/* booking box  */}
      <div className="absolute inset-x-0  bottom-0 translate-y-1/2 flex justify-center px-4">
        <div className="w-full max-w-4xl bg-[#eddcdc] rounded-xl shadow-2xl p-4 md:p-6">
          {/* title  */}
          <h2 className="text-base md:text-lg font-bold mb-4 text-gray-800 text-center md:text-left">
            Đặt phòng khách sạn - Trải nghiệm tuyệt vời
          </h2>

        
         

          {/* form fields  */}
          <form className="space-y-4">
            {/* hàng 1: điểm đến và loại phòng */}
            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              {/* điểm đến/thành phố */}
              <div>
                <label className="block mb-1">
                  <span className="text-xs font-medium text-gray-700">Thành phố/Điểm đến</span>
                </label>
                <div className="flex items-center border border-gray-200 rounded-md px-2 py-2 focus-within:border-blue-500 transition-colors">
                  <IoLocationSharp className="text-gray-400 mr-2 text-sm flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Ninh Bình "
                    className="flex-1 outline-none text-xs"
                  />
                </div>
              </div>

              {/* loại phòng */}
              <div>
                <label className="block mb-1">
                  <span className="text-xs font-medium text-gray-700">Loại phòng</span>
                </label>
                <div className="flex items-center border border-gray-200 rounded-md px-2 py-2 focus-within:border-blue-500 transition-colors">
                  <FaBed className="text-gray-400 mr-2 text-sm flex-shrink-0" />
                  <select className="flex-1 outline-none bg-transparent text-xs">
                    <option>Phòng Standard</option>
                    <option>Phòng Deluxe</option>
                    <option>Phòng Suite</option>
                    <option>Phòng VIP</option>
                  </select>
                </div>
              </div>
            </div>

            {/* hàng 2: ngày nhận phòng, ngày trả phòng, số khách */}
            <div className="grid md:grid-cols-3 gap-3 md:gap-4">
              {/* ngày nhận phòng */}
              <div>
                <label className="block mb-1">
                  <span className="text-xs font-medium text-gray-700">Ngày nhận phòng</span>
                </label>
                <div className="flex items-center border border-gray-200 rounded-md px-2 py-2 focus-within:border-blue-500 transition-colors">
                  <IoCalendarClearOutline className="text-gray-400 mr-2 text-sm flex-shrink-0" />
                  <input
                    type="date"
                    defaultValue="2025-07-19"
                    className="flex-1 outline-none text-xs"
                  />
                </div>
              </div>

              {/* ngày trả phòng */}
              <div>
                <label className="block mb-1">
                  <span className="text-xs font-medium text-gray-700">Ngày trả phòng</span>
                </label>
                <div className="flex items-center border border-gray-200 rounded-md px-2 py-2 focus-within:border-blue-500 transition-colors">
                  <IoCalendarClearOutline className="text-gray-400 mr-2 text-sm flex-shrink-0" />
                  <input
                    type="date"
                    defaultValue="2025-07-21"
                    className="flex-1 outline-none text-xs"
                  />
                </div>
              </div>

              {/* số khách */}
              <div>
                <label className="block mb-1">
                  <span className="text-xs font-medium text-gray-700">Số khách</span>
                </label>
                <div className="flex items-center border border-gray-200 rounded-md px-2 py-2 focus-within:border-blue-500 transition-colors">
                  <IoPeople className="text-gray-400 mr-2 text-sm flex-shrink-0" />
                  <select className="flex-1 outline-none bg-transparent text-xs">
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
          </form>

          {/* nút submit  */}
          <div className="mt-5 flex justify-center">
            <button 
              onClick={handleSearchClick}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md shadow-lg hover:shadow-xl transition-all duration-200 text-xs"
            >
              <FaSearch className="text-xs" />
              Tìm phòng khách sạn
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageSlider
