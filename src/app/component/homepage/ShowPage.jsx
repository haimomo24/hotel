import React from 'react'
import Link from 'next/link'

const ShowPage = () => {
  const services = [
    {
      title: "Phòng nghỉ",
      image: "https://www.baidinhhotel.com/baidinhhotel-images/banner/img/k.jpg",
      description: "Không gian sang trọng, tiện nghi hiện đại với tầm nhìn tuyệt đẹp",
      link: "/oderpage" // Thêm đường dẫn cho từng dịch vụ
    },
    {
      title: "Nhà hàng",
      image: "https://www.baidinhhotel.com/baidinhhotel-images/banner/img/R2QN849RJ_WP_20150123_040.jpg",
      description: "Ẩm thực đa dạng với các món ăn đặc sắc trong không gian tinh tế",
      link: "/restaurant"
    },
    {
      title: "Phòng họp",
      image: "https://www.baidinhhotel.com/baidinhhotel-images/banner/img/QPPI4VRBB_DSC_9431.jpg", 
      description: "Phòng họp hiện đại, đầy đủ thiết bị cho mọi sự kiện quan trọng",
      link: "/meeting-rooms"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-light text-center mb-8 text-[#FFFFF0]">
        Dịch vụ của chúng tôi
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative h-64 overflow-hidden">
              <img 
                className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110" 
                src={service.image} 
                alt={service.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <Link href={service.link}>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 group">
                  Xem thêm
                  <svg
                    className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShowPage
