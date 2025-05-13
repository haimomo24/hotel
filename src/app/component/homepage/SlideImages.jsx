'use client'
import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
      setShowDescription(false)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

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
    <div className=" from-[#f4f0ea] to-white py-8 md:py-16   w-full">
      
      
      <div className="w-full">
        <div className="relative">
          <div 
            className="cursor-pointer overflow-hidden shadow-2xl w-full"
            onClick={toggleDescription}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] object-cover"
            />
            
            {!showDescription && (
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 bg-white/90 p-2 md:p-3 rounded-full shadow-lg">
                <FaInfoCircle className="text-gray-800 text-lg md:text-xl" />
              </div>
            )}
          </div>

          {showDescription && (
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 bg-white/95 p-4 md:p-8 rounded-xl shadow-xl backdrop-blur-sm max-w-2xl">
              <p className="text-xs md:text-sm font-medium uppercase tracking-wider text-gray-500 mb-1 md:mb-2">
                {category}
              </p>
              <h3 className="text-xl md:text-2xl font-serif font-semibold mb-2 md:mb-3 text-gray-900">{title}</h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">{description}</p>
            </div>
          )}

          <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 flex gap-2 md:gap-3 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg"
            >
              <FaChevronLeft className="text-lg md:text-xl text-gray-800" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg"
            >
              <FaChevronRight className="text-lg md:text-xl text-gray-800" />
            </button>
          </div>

          <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1 md:gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                  current === index ? 'bg-white w-4 md:w-6' : 'bg-white/50'
                }`}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageSlider
