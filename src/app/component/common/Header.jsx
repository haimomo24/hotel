'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const menuItems = [
    {
      title: "Khách sạn ",
      submenu: [
       
        { name: "Đặt phòng khách sạn ", link: "/oderpage" },       
       
        { name: "Hội nghị, sự kiện ", link: "/" },
        { name: "Phòng trưng bày ", link: "/" }
      ]
    },
    {
      title: "Nhà Hàng ",
      submenu: [
       
             
        { name: "Nhà hàng ", link: "/restaurant" },
        { name: "Hội nghị, sự kiện ", link: "/" },
        { name: "Phòng trưng bày ", link: "/" }
      ]
    },
    {
      title: "Liên hệ ",
      submenu: [
        { name: "Liên hệ với chúng tôi  ", link: "/contact" },
        { name: "Tin tức  ", link: "/diagrams/usa" },
      
      ]
    }
  ];

  return (
    <div className="font-serif">
      <div className="fixed top-0 w-full z-50 bg-[#713309] border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo bên trái */}
          <Link href="/" className="text-3xl font-light tracking-wider text-white">
            Bai Dinh Hotel
          </Link>

          {/* Menu ở giữa - chỉ hiển thị trên desktop */}
          <div className="hidden md:flex space-x-10 absolute left-1/2 transform -translate-x-1/2">
            {menuItems.map((item, index) => (
              <div 
                key={index}
                className="relative group"
                onMouseEnter={() => setActiveSubmenu(index)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <button className="text-sm uppercase tracking-wider text-white hover:text-gray-200 pb-2">
                  {item.title}
                </button>
                
                {item.submenu.length > 0 && activeSubmenu === index && (
                  <div className="absolute left-0 top-full mt-0 w-64 bg-[#713309] shadow-lg py-2">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link 
                        key={subIndex}
                        href={subItem.link}
                        className="block px-4 py-2 text-sm text-white hover:bg-[#8B4513]"
                      >
                        {subIndex === 0 ? <strong>{subItem.name}</strong> : subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Hotline bên phải */}
          <div className="hidden md:flex items-center space-x-2 text-white">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            <div className="text-sm">
              <div className="text-xs opacity-80">Hotline</div>
              <div className="font-semibold">0123 456 789</div>
            </div>
          </div>

          {/* Menu button cho mobile */}
          <button 
            className="md:hidden text-sm uppercase tracking-wider text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            MENU
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#713309] z-40 pt-20 px-6 overflow-y-auto">
          <div className="container mx-auto">
            {menuItems.map((item, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl mb-4 text-white">{item.title}</h2>
                {item.submenu.length > 0 && (
                  <div className="space-y-2">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link 
                        key={subIndex}
                        href={subItem.link}
                        className="block text-white hover:text-gray-200"
                      >
                        {subIndex === 0 ? <strong>{subItem.name}</strong> : subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Hotline trong mobile menu */}
            <div className="mt-8 pt-8 border-t border-gray-600">
              <div className="text-white">
                <div className="text-lg mb-2">Hotline</div>
                <div className="text-2xl font-semibold">0123 456 789</div>
              </div>
            </div>
          </div>
          <button 
            className="absolute top-6 right-6 text-2xl text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
