'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const menuItems = [
    {
      title: "Trang chủ ",
      submenu: [
       
        { name: "Đặt phòng khách sạn ", link: "/oderpage" },       
        { name: "Nhà hàng ", link: "/restaurant" },
        { name: "Hội nghị, sự kiện ", link: "/" },
        { name: "Phòng trưng bày ", link: "/" }
      ]
    },
    {
      title: "Liên hệ ",
      submenu: [
        { name: "Liên hệ với chúng tôi  ", link: "/diagrams/diskonti" },
        { name: "Tin tức  ", link: "/diagrams/usa" },
        { name: "Khuyến mại ", link: "/diagrams/europe" }
      ]
    }
  ];

  return (
    <div className="font-serif">
      <div className="fixed top-0 w-full z-50 bg-[#713309] border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-light tracking-wider text-white">
            Bai Dinh Hotel
          </Link>

          <div className="hidden md:flex space-x-10">
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

          <button 
            className="md:hidden text-sm uppercase tracking-wider text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            MENU
          </button>
        </div>
      </div>

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
