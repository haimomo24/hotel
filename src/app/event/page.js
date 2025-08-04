'use client'
import React, { useRef, useEffect, useState } from 'react'

const events = [
  {
    image: 'https://clu.1cdn.vn/2025/04/13/20250413_074653(2)-fc6a7f55d0ca625c6eb381d46d3477f2.jpg',
    title: 'Lễ Hội Tràng An 2025 – Tràng An Festival 2025',
    description: `Sự kiện quy tụ hơn 700 nghệ sĩ, cùng 20 sân khấu thực cảnh quy mô lớn.`,
    link: '/su-kien/le-hoi-trang-an-2025'
  },
  {
    image: 'https://salt.tkbcdn.com/ts/ds/54/89/88/8514f83803c10102dd8b61658602431a.jpg',
    title: 'Forestival 2025 – Combo vé Tràng An Bái Đính',
    description: `Combo giúp bạn tiết kiệm chi phí và trải nghiệm toàn diện.`,
    link: '/su-kien/forestival-combo-2025'
  },
  {
    image: 'https://apibeta.baoninhbinh.org.vn/user-blob/15088545-560b-d200-1fa2-cc31adda5a44/2025/03/27/forestival-ninhbinh-nghesi-1-_1743068051454.jpg',
    title: 'FORESTIVAL – Âm nhạc, thiên nhiên và di sản',
    description: `FORESTIVAL diễn ra từ 24 - 31/5/2025 cùng sự kiện “Trái tim di sản”.`,
    link: '/su-kien/forestival-2025'
  },
  {
    image: 'https://apibeta.baoninhbinh.org.vn/user-blob/15088545-560b-d200-1fa2-cc31adda5a44/2025/03/27/forestival-ninhbinh-nghesi-1-_1743068051454.jpg',
    title: 'FORESTIVAL mở rộng',
    description: `FORESTIVAL là điểm nhấn trong chuỗi sự kiện văn hóa của Ninh Bình.`,
    link: '/su-kien/forestival-2025'
  }
]

const Page = () => {
  const scrollRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const slider = scrollRef.current
    let isDown = false
    let startX
    let scrollLeft

    const mouseDown = (e) => {
      isDown = true
      slider.classList.add('cursor-grabbing')
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    }

    const mouseUpOrLeave = () => {
      isDown = false
      slider.classList.remove('cursor-grabbing')
    }

    const mouseMove = (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = (x - startX) * 2
      slider.scrollLeft = scrollLeft - walk
    }

    slider.addEventListener('mousedown', mouseDown)
    slider.addEventListener('mouseleave', mouseUpOrLeave)
    slider.addEventListener('mouseup', mouseUpOrLeave)
    slider.addEventListener('mousemove', mouseMove)

    return () => {
      slider.removeEventListener('mousedown', mouseDown)
      slider.removeEventListener('mouseleave', mouseUpOrLeave)
      slider.removeEventListener('mouseup', mouseUpOrLeave)
      slider.removeEventListener('mousemove', mouseMove)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const slider = scrollRef.current
      const scrollPosition = slider.scrollLeft
      const width = slider.offsetWidth
      const newIndex = Math.round(scrollPosition / width)
      setCurrentIndex(newIndex)
    }

    const slider = scrollRef.current
    slider.addEventListener('scroll', handleScroll)

    return () => slider.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDotClick = (index) => {
    const slider = scrollRef.current
    const width = slider.offsetWidth
    slider.scrollTo({
      left: index * width,
      behavior: 'smooth'
    })
    setCurrentIndex(index)
  }

  return (
    <div className="w-full px-4 md:px-10 lg:px-24 py-10 mt-[80px] mb-[10px] bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-green-700">Sự kiện </h2>

      {/* Slider Sự kiện */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory cursor-grab select-none"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {events.map((event, index) => (
          <div
            key={index}
            className="flex-shrink-0 snap-start w-[90%] sm:w-[50%] md:w-[33.33%] bg-white shadow-lg rounded-xl overflow-hidden transition hover:shadow-2xl"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-64 object-cover"
            />
            <div className="flex flex-col justify-between flex-1 p-5 h-full">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
              <div className="mt-5">
                <a
                  href={event.link}
                  className="block text-center bg-green-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Xem chi tiết
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div>

      {/* Sự kiện mới nhất */}
      <h3 className="text-2xl font-bold mt-12 mb-6 text-green-700 text-center mx-auto block">
  sự kiện nổi bật  
  
</h3>
<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
  {events.slice(0, 2).map((event, index) => (
    <div key={index} className="flex items-center p-4 border-b last:border-b-0">
      <img
        src={event.image}
        alt={event.title}
        className="w-14 h-14 object-cover rounded-md mr-4"
      />
      <div>
        <h3 className="text-base font-semibold text-gray-800">{event.title}</h3>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <span className="bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded mr-2 animate-pulse">Mới</span>
          <span>{new Date().toLocaleDateString('vi-VN')}</span>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  )
}

export default Page
