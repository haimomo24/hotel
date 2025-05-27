'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const Footer = () => {
  const router = useRouter()
  
  return (
    <div>
        <section className="pt-16 pb-7 bg-[#713309]">
          <div className="mx-auto bg-[#713309] max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-14 border-b-2 border-gray-200">
              <div className="flex flex-col gap-8 xl:gap-14 w-full lg:max-w-full mx-auto">
                <div className="flex flex-col gap-8">
                  <h2 className="font-manrope font-bold text-4xl leading-snug text-gray-900 max-[470px]:text-center">
                    BaiDinh Hotel
                  </h2>
                  <p className="text-base font-normal text-gray-500 max-[470px]:text-center">
                    Take the First Step Towards Success!
                  </p>
                  <div className="flex items-center max-[470px]:justify-center gap-5">
                    <a
                      href="#"
                      className="p-2 text-black rounded transition-all duration-500 hover:bg-yellow-800 focus-within:bg-yellow-800 hover:text-white focus-within:outline-0 focus-within:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <path d="M13.5854 10.7242L19.79 3.66699H18.3197L12.9323 9.79466L8.62939 3.66699H3.6665L10.1733 12.9331L3.6665 20.3337H5.13687L10.8261 13.8626L15.3703 20.3337H20.3332L13.5851 10.7242H13.5854ZM11.5716 13.0147L10.9123 12.092L5.66666 4.75005H7.92505L12.1583 10.6753L12.8176 11.598L18.3204 19.2999H16.062L11.5716 13.0151V13.0147Z" fill="currentColor"/>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="p-2 h-10 w-10 flex items-center justify-center text-black rounded transition-all duration-500 hover:bg-yellow-800 focus-within:outline-0 focus-within:bg-yellow-800 hover:text-white focus-within:text-white"
                    >
                      {/* Instagram SVG */}
                    </a>
                    <a
                      href="#"
                      className="p-2 text-black rounded transition-all duration-500 hover:bg-yellow-800 focus-within:bg-yellow-800 hover:text-white focus-within:outline-0 focus-within:text-white"
                    >
                      {/* Facebook SVG */}
                    </a>
                    <a
                      href="#"
                      className="p-2 text-black group rounded transition-all duration-500 hover:bg-yellow-800 focus-within:bg-yellow-800 hover:text-white focus-within:outline-0 focus-within:text-white"
                    >
                      {/* YouTube SVG */}
                    </a>
                  </div>
                </div>
                <div className="flex flex-col min-[470px]:flex-row min-[470px]:items-center gap-3">
                  <button 
                    onClick={() => router.push('/dashboard')}
                    className="flex items-center max-[470px]:justify-center gap-2 py-3 pr-5 pl-7 rounded-full text-base font-semibold text-white bg-yellow-800 shadow-transparent shadow-sm transition-all duration-500 hover:shadow-yellow-300 hover:bg-yellow-900"
                  >
                    Dashboard
                  </button>
                  <button className="flex items-center max-[470px]:justify-center gap-2 border-2 border-yellow-800 py-2.5 pr-5 pl-7 rounded-full text-base font-semibold text-yellow-800 bg-white shadow-transparent shadow-sm transition-all duration-500 hover:shadow-yellow-300 hover:bg-yellow-800 hover:text-white">
                    Contact Us
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                      <path d="M11.1675 16.2888L11.7331 15.7231L11.1675 16.2888ZM3.71117 8.83253L3.14549 9.39822L3.14549 9.39822L3.71117 8.83253ZM17.0155 13.9496L17.5812 13.3839L17.5812 13.3839L17.0155 13.9496ZM14.9443 11.8784L14.3787 12.4441L14.3787 12.4441L14.9443 11.8784ZM7.78046 4.71452L7.21477 5.28021L7.21477 5.28021L7.78046 4.71452ZM6.0504 2.98447L6.61609 2.41878L6.61609 2.41878L6.0504 2.98447ZM11.533 11.8784L10.9673 12.4441L10.9673 12.4441L11.533 11.8784ZM7.78046 8.1259L8.34614 7.56021L8.34614 7.56021L7.78046 8.1259ZM7.78046 6.42021L8.34614 6.9859L8.34614 6.9859L7.78046 6.42021ZM13.2387 11.8784L13.8043 12.4441L13.8043 12.4441L13.2387 11.8784ZM3.71118 2.98447L3.14549 2.41878L3.71118 2.98447ZM17.0155 16.2888L17.5812 16.8545L17.5812 16.8545L17.0155 16.2888ZM12.4788 4.30734C12.0397 4.25754 11.6435 4.57306 11.5937 5.01208C11.5439 5.45109 11.8594 5.84735 12.2984 5.89714L12.4788 4.30734ZM14.0745 7.5725C14.1473 8.00829 14.5596 8.30255 14.9954 8.22976C15.4312 8.15697 15.7254 7.74468 15.6526 7.30889L14.0745 7.5725ZM11.5122 6.98575C11.0732 6.93595 10.6769 7.25147 10.6271 7.69048C10.5773 8.1295 10.8928 8.52576 11.3319 8.57555L11.5122 6.98575ZM11.5607 8.78902C11.6335 9.22481 12.0458 9.51908 12.4816 9.44628C12.9174 9.37349 13.2116 8.96121 13.1388 8.52541L11.5607 8.78902ZM13.5861 1.71878C13.1457 1.6833 12.7599 2.01155 12.7244 2.45195C12.689 2.89236 13.0172 3.27813 13.4576 3.31362L13.5861 1.71878ZM16.666 6.35769C16.7246 6.79562 17.1271 7.10315 17.565 7.04458C18.003 6.98601 18.3105 6.58352 18.2519 6.14559L16.666 6.35769Z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="w-full lg:max-w-full mx-auto flex flex-col min-[470px]:flex-row justify-between gap-6 sm:gap-20 md:gap-10 xl:gap-24">
                <div className="">
                  <h6 className="text-lg font-medium text-gray-900 mb-7 max-[470px]:text-center">
                    Pagedone
                  </h6>
                  <ul className="flex flex-col max-[470px]:items-center max-[470px]:justify-center gap-6">
                    <li><a href="#" className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">Home</a></li>
                    <li><a href="#" className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">About</a></li>
                    <li><a href="#" className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">Pricing</a></li>
                    <li><a href="#" className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800">Pro Version</a></li>
                  </ul>
                </div>
                {/* Additional footer sections */}
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Footer
