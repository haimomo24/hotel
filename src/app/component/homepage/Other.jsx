import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

const Other = () => {
  const locations = [
    {
      title: "Khoá tu mùa hè  ",
      description: " Các bạn sẽ được kết giao với nhiều bạn mới, được cùng nhau tu tập dưới mái chùa Bái Đính linh thiêng, với sự hướng dẫn chỉ bảo tận tình của các quý Thầy cùng Ban tổ chức",
      image: "https://storage-phatsuonline.sgp1.digitaloceanspaces.com/files/2020/07/20200728-DSC08389.jpg"
    },
    {
      title: "In the City",
      description: "Summer in the city, the skyline gilded with sunlight and opportunities for cultural discovery abound.",
      image: "https://www.chudu24.com/wp-content/uploads/2016/12/Tuong-tam-the-phat-chua-bai-dinh1-e1453322400603.jpg"
    },
    {
      title: "Bái Đính Về đêm  ",
      description: "Vé tráng lệ và rộng lớn của chùa Bái Đính càng được nhấn mạnh hơn khi về đêm",
      image: "https://images.vietnamtourism.gov.vn/vn/images/2016/anhInternet/ChuaBaiDinhvedem.jpg"
    }
  ]

  return (
    <section className="bg-[#f8f5f0] py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-[#374151] mb-4 tracking-wide">Trải nhiệm du lịch tâm linh </h2>
          <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
          Những mệt mỏi của cuộc sống sẽ tan biến ngay lập tức, là nơi tuyệt vời để tận hưởng vẻ đẹp của thiên nhiên
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-80 overflow-hidden">
                <img
                  src={location.image}
                  alt={location.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80">
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-light mb-3 tracking-wide">{location.title}</h3>
                  <p className="text-sm text-gray-200 mb-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {location.description}
                  </p>
                  <button className="flex items-center text-sm font-light text-white hover:text-gray-200 transition-all duration-300 group-hover:translate-x-2">
                    <span className="mr-2">Discover more</span>
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-3">
            <button className="w-2.5 h-2.5 rounded-full bg-[#a1a1aa] hover:bg-[#374151] transition-colors duration-300"></button>
            <button className="w-3.5 h-3.5 rounded-full bg-[#374151] transition-colors duration-300"></button>
            <button className="w-2.5 h-2.5 rounded-full bg-[#a1a1aa] hover:bg-[#374151] transition-colors duration-300"></button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Other
