'use client'
import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaInfoCircle } from 'react-icons/fa'

const ImageSlider = () => {
  const slides = [
    {
      image:
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/6c/22/59/bai-dinh-hotel.jpg?w=900&h=500&s=1',
      category: 'BIỆT THỰ AMAN',
      title: 'Nơi ẩn náu độc đáo',
      description:
        'Mùa hè này, hãy dành thời gian bên gia đình và bạn bè trong không gian rộng rãi được thiết kế cho những khoảnh khắc vui vẻ bên nhau.',
    },
    {
      image:
        'https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/12000000/11780000/11779500/11779494/37053f7c_z.jpg?_src=imagekit&tr=c-at_max,f-jpg,h-720,pr-true,q-40,w-1280',
      category: 'THẾ GIỚI ĐẢO',
      title: 'Quần đảo mùa hè',
      description: 'Khám phá các đảo Aman ở vùng Caribe, Philippines và Indonesia.',
    },
    {
      image:
        'https://owa.bestprice.vn/images/hotels/uploads/bai-dinh-hotel-5f3a083481393.jpg',
      category: 'ẨN MÌNH NƠI NÚI CAO',
      title: 'Không gian yên bình',
      description:
        'Trải nghiệm sự yên tĩnh tuyệt đối giữa thiên nhiên hùng vĩ và không khí trong lành.',
    },
  ]

  const [current, setCurrent] = useState(0)
  const [showDescription, setShowDescription] = useState(false)

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    setShowDescription(false)
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    setShowDescription(false)
  }

  const toggleDescription = () => {
    setShowDescription(!showDescription)
  }

  const { image, category, title, description } = slides[current]

  return (
    <div className="bg-[#f4f0ea] py-8 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Thumbnails bên trái - ẩn trên mobile */}
        <div className="hidden md:flex flex-col gap-4">
          {slides.slice(0, 2).map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={`Thumbnail ${index}`}
              className={`w-full rounded-md cursor-pointer border-2 ${
                index === current
                  ? 'border-gray-800'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              onClick={() => {
                setCurrent(index)
                setShowDescription(false)
              }}
            />
          ))}
        </div>

        {/* Ảnh chính */}
        <div className="md:col-span-2 relative">
          <div 
            className="relative cursor-pointer" 
            onClick={toggleDescription}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover rounded-md shadow-md"
            />
            
            {/* Biểu tượng thông tin khi mô tả đang ẩn */}
            {!showDescription && (
              <div className="absolute bottom-3 left-3 bg-white/80 p-2 rounded-full shadow">
                <FaInfoCircle className="text-gray-700" />
              </div>
            )}
          </div>

          {/* Nội dung mô tả - hiển thị khi được nhấp */}
          {showDescription && (
            <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-4 rounded-b-md shadow transition-all sm:bottom-4 sm:left-4 sm:right-auto sm:rounded-md sm:max-w-md">
              <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
                {category}
              </p>
              <h3 className="text-lg sm:text-xl font-semibold mt-1 text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-700">{description}</p>
            </div>
          )}

          {/* Nút điều hướng */}
          <div className="absolute bottom-3 right-3 flex gap-2 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="bg-white/80 hover:bg-white p-2 rounded-full shadow"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="bg-white/80 hover:bg-white p-2 rounded-full shadow"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageSlider
