'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const MapPage = () => {
  const router = useRouter()

  const handleMapClick = () => {
    router.push('/contact')
  }

  return (
    <div className="w-full py-8 md:py-16 ">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#FFFFF0] mb-4">
            Vị trí khách sạn
          </h2>
          <p className="text-[#FFFFF0] text-lg">
            Click vào bản đồ để xem thông tin chi tiết và liên hệ
          </p>
        </div>

        {/* Map Container */}
        <div className="max-w-6xl mx-auto">
          <div 
            className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group"
            onClick={handleMapClick}
          >
            {/* Map iframe */}
            <div className="h-96 md:h-[500px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.8234567890123!2d105.8637726!3d20.2736257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31367ea560375713%3A0xab30ab2390bc9816!2sBai%20Dinh%20Hotel!5e0!3m2!1svi!2s!4v1704123456789!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bai Dinh Hotel Location"
                className="pointer-events-none"
              ></iframe>
              
              {/* Overlay for click effect */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-[#410009] font-semibold flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Xem thông tin liên hệ
                  </span>
                </div>
              </div>
            </div>

            {/* Info bar at bottom bg-[#356D3D] */}
            <div className="p-6 bg-gradient-to-r from-[#356D3D] to-[#638E69] text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">Khách sạn Bái Đính</h3>
                  <p className="text-white/90 text-sm">Gia Sinh, Gia Viễn, Ninh Bình, Việt Nam</p>
                </div>
                <div className="flex items-center space-x-2 text-white/90">
                  <span className="text-sm">Click để xem chi tiết</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Quick info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-[#410009]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#410009]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Vị trí thuận lợi</h4>
              <p className="text-gray-600 text-sm">Gần chùa Bái Đính và các điểm du lịch nổi tiếng</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-[#410009]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#410009]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Dễ dàng di chuyển</h4>
              <p className="text-gray-600 text-sm">Kết nối thuận tiện với các phương tiện giao thông</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-[#410009]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#410009]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Hỗ trợ 24/7</h4>
              <p className="text-gray-600 text-sm">Đội ngũ nhân viên sẵn sàng hỗ trợ mọi lúc</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapPage
