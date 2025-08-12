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

 

  return (
    <section className='relative mt-[80px] bg-[#356D3D] sm:mt-0 sm:mb-0  w-full '>
      <img
        src={slides[current].image}
        alt=""
        className="w-full h-[250px] sm:h-[300px] md:h-[500px] lg:h-[700px] xl:h-[800px]  object-cover"
      />
      <button onClick={prev} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white rounded-full shadow-lg">
        <FaChevronLeft className="text-gray-700 text-sm sm:text-base" />
      </button>
      <button onClick={next} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white rounded-full shadow-lg">
        <FaChevronRight className="text-gray-700 text-sm sm:text-base" />
      </button>

                       
    </section>
  )
}

export default ImageSlider