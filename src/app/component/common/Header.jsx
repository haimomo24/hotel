// File: src/app/component/common/Header.jsx
'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const menuItems = [
    { title: "Giới Thiệu", link: "/review" },
    {
      title: "Điểm Đến",
      submenu: [
        { name: "KDL Sinh Thái Tràng An", link: "https://disantrangan.vn/" },
        { name: "KDL Tam Cốc Bích Động", link: "https://tamcocbichdong.vn/" },
        { name: "Sân golf, Hồ Đồng Chương", link: "https://trangangolfandresort.com/" },
        { name: "Phố Cổ Hoa Lư", link: "https://phocohoalu.com/" },
        { name: "Chùa Tam Chúc", link: "https://tamchuc.com.vn/" }
      ]
    },
    {
      title: "Dịch vụ",
      submenu: [
        { name: "Đặt phòng", link: "/oderpage" },
        { name: "Hội nghị, sự kiện", link: "/roommetting" },
        { name: "Nhà hàng", link: "/restaurant" },
        { name: "Đặt vé xe điện", link: "/carpage" },
        { name: "Bái Đính về đêm", link: "/nightbaidinh" },
      ]
    },
    { title: "Sự Kiện", link: "/event" },
    { title: "Thư Viện", link: "/contact" },
    {
      title: "Liên hệ",
      link: "/contact",
      submenu: [
        { name: "Liên hệ với chúng tôi", link: "/contact" },
        { name: "Tuyển Dụng", link: "/recruitment" },
        { name: "Khảo sát", link: "/survey" }
      ]
    },
  ];

  const leftMenuItems = menuItems.slice(0, 3);
  const rightMenuItems = menuItems.slice(3);

  const renderMenuItem = (item, originalIndex) => (
    <div
      key={originalIndex}
      className="relative group font-['Philosopher',sans-serif] transition-transform duration-300 ease-in-out hover:scale-110"
      onMouseEnter={() => setActiveSubmenu(originalIndex)}
      onMouseLeave={() => setActiveSubmenu(null)}
    >
      {item.submenu ? (
        <button className="text-sm uppercase tracking-wider text-white hover:text-gray-200 pb-2">
          {item.title}
        </button>
      ) : (
        <Link href={item.link} className="text-sm uppercase tracking-wider text-white hover:text-gray-200 pb-2">
          {item.title}
        </Link>
      )}

      {item.submenu && item.submenu.length > 0 && activeSubmenu === originalIndex && (
        <div className="absolute left-0 top-full mt-0 w-64 bg-[#356D3D] shadow-lg py-2">
          {item.submenu.map((subItem, subIndex) => (
            <Link
              key={subIndex}
              href={subItem.link}
              className="block px-4 py-2 text-sm text-white hover:bg-[#8B4513] transition-transform duration-300 ease-in-out hover:scale-105"
            >
              {subItem.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="font-sans ">
      <div className="fixed top-0 w-full z-50 bg-[#356D3D] border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="hidden md:flex space-x-10 flex-1 justify-end pr-8">
            {leftMenuItems.map((item, index) => renderMenuItem(item, index))}
          </div>

          <Link href="/" className="flex-shrink-0">
            <img
              src="/images/logo3.png"
              alt="Logo"
              className="h-15 w-20 object-contain"
            />
          </Link>

          <div className="hidden md:flex space-x-10 flex-1 justify-start pl-8">
            {rightMenuItems.map((item, index) => renderMenuItem(item, leftMenuItems.length + index))}
          </div>

          <button
            className="md:hidden text-sm uppercase font-semibold tracking-wider text-white transition-transform duration-300 ease-in-out hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            menu
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#356D3D] z-40 mt-[30px] pt-20 px-6 overflow-y-auto">
          <div className="container mx-auto">
            {menuItems.map((item, index) => (
              <div key={index} className="mb-8">
                {item.submenu ? (
                  <>
                    <h2 className="text-2xl mb-4 text-white font-['Philosopher',sans-serif] transition-transform duration-300 ease-in-out hover:scale-105">
                      {item.title}
                    </h2>
                    <div className="space-y-2">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.link}
                          className="block text-white font-['Philosopher',sans-serif] hover:text-gray-200 transition-transform duration-300 ease-in-out hover:scale-105"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.link}
                    className="block text-2xl mb-4 text-white font-['Philosopher',sans-serif] hover:text-gray-200 transition-transform duration-300 ease-in-out hover:scale-105"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}

            <div className="mt-8 pt-8 border-t border-gray-600">
              <div className="text-white">
                <div className="text-lg mb-2">Hotline</div>
                <div className="text-2xl">02293868789</div>
              </div>
            </div>
          </div>
          <button
            className="absolute top-6 right-6 text-2xl text-white transition-transform duration-300 ease-in-out hover:scale-110"
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
