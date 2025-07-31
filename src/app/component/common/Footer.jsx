'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Footer = () => {
  const router = useRouter()
  
  return (
    <div>
        <section className="pt-8 pb-4 bg-[#356D3D]"> {/* Giảm padding top và bottom */}
          <div className="mx-auto bg-[#356D3D] max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6 border-b-2 border-gray-200"> {/* Giảm gap và padding bottom */}
              <div className="flex flex-col gap-4 xl:gap-6 w-full lg:max-w-full mx-auto"> {/* Giảm gap */}
                <div className="flex flex-col gap-4"> {/* Giảm gap */}
                   <Link href="/" className="flex items-center space-x-3">
                              <img 
                                src="/images/logo3.png" 
                                alt="Logo" 
                                className="h-15 w-20 object-contain    " 
                              />
                              {/* <span className="text-2xl font-extrabold tracking-wide text-white">
                                Tràng An Group
                              </span> */}
                            </Link>
                 
                  <div className="flex items-center max-[470px]:justify-center gap-3"> {/* Giảm gap */}
                    {/* Social media icons */}
                    <a href="#" className="p-1.5 text-black rounded transition-all duration-500 hover:bg-yellow-800 focus-within:bg-yellow-800 hover:text-white focus-within:outline-0 focus-within:text-white">
                      {/* Twitter icon */}
                    </a>
                    {/* Other social media icons */}
                  </div>
                </div>
                <div className="flex flex-col min-[470px]:flex-row min-[470px]:items-center gap-2"> {/* Giảm gap */}
                  <button 
                    onClick={() => router.push('/login')}
                    className="flex items-center max-[470px]:justify-center gap-2 py-2 px-4 rounded-full text-sm font-semibold text-white bg-yellow-800 shadow-transparent hover:shadow-yellow-300 hover:bg-yellow-900"
                  >
                    Dashboard
                  </button>
                  <button
                   onClick={() => router.push('/contact')}
                   className="flex items-center max-[470px]:justify-center gap-2 border-2 border-yellow-800 py-1.5 px-4 rounded-full text-sm font-semibold text-yellow-800 bg-white hover:bg-yellow-800 hover:text-white">
                    Contact Us
                  </button>
                </div>
              </div>
              <div className="w-full lg:max-w-full mx-auto flex flex-col min-[470px]:flex-row justify-between gap-4 sm:gap-10 md:gap-6 xl:gap-12"> {/* Giảm gaps */}
                <div className="">
                  <h6 className="text-base font-medium text-white mb-4 max-[470px]:text-center"> {/* Giảm margin bottom và font size */}
                    Dịch vụ 
                  </h6>
                  <ul className="flex flex-col max-[470px]:items-center max-[470px]:justify-center gap-3"> {/* Giảm gap */}
                    <li><a href="#" className="text-white font-normal text-gray-600 hover:text-yellow-800">Khách sạn </a></li>
                    <li><a href="#" className="text-white font-normal text-gray-600 hover:text-yellow-800">Xe điện </a></li>
                    <li><a href="#" className="text-white font-normal text-gray-600 hover:text-yellow-800">Liên hệ với chúng tôi</a></li>
                    <li><a href="#" className="text-white font-normal text-gray-600 hover:text-yellow-800">Liên kết khác </a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Footer
