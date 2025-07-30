import Link from 'next/link'
import React from 'react'

const NewPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-light text-center mb-8 text-[#FFFFF0]">
        Tin tức
        <div className="w-20 h-1 bg-blue-500 mx-auto mt-2"></div>
      </h2>

      <ul className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto divide-y divide-gray-200">
      <Link href='/dashboard'>
        <li className="hover:bg-gray-50 transition duration-300">
          <div className="flex items-center p-4 cursor-pointer">
         
            <div className="shrink-0">
             
              <img
                className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
                src="https://www.baidinhhotel.com/baidinhhotel-images/news/img1/RBA4UW17GS_3-20.jpg"
                alt="Hoa anh đào"
              />
              
              
            </div>
           
            <div className="ml-4 flex-1">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                Hoa anh đào ở đất Phật
              </h3>
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Mới</span>
                <span className="text-gray-500 text-sm ml-2">12/12/2023</span>
              </div>
            </div>
          </div>
        </li>
        </Link>

        <li className="hover:bg-gray-50 transition duration-300">
          <div className="flex items-center p-4 cursor-pointer">
            <div className="shrink-0">
              <img
                className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
                src="https://www.baidinhhotel.com/baidinhhotel-images/news/img1/R2KK6658A_1.jpg"
                alt="Tràng An"
              />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                Quần thể du lịch Tràng An
              </h3>
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Mới</span>
                <span className="text-gray-500 text-sm ml-2">11/12/2023</span>
              </div>
            </div>

            
          </div>
        </li>

        {/* Repeat similar structure for other news items */}
      </ul>
    </div>
  )
}

export default NewPage
