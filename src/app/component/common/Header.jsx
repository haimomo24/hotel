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
    { title: "Sự Kiện", link: "/thuvien" },
    { title: "Thư Viện", link: "/thuvien" },
    {
      title: "Liên hệ",
      link: "/contact",
      submenu: [
        { name: "Liên hệ với chúng tôi", link: "/contact" },
        { name: "Tuyển dụng", link: "/recruitment" },
        { name: "Khảo sát", link: "/survey" },
        { name: "Bản đồ", link: "/map" }
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
        <button className="text-sm font-bold uppercase tracking-wider text-black hover:text-gray-600 pb-2">
          {item.title}
        </button>
      ) : (
        <Link href={item.link} className="text-sm font-bold uppercase tracking-wider text-black hover:text-gray-600 pb-2">
          {item.title}
        </Link>
      )}

      {item.submenu && item.submenu.length > 0 && activeSubmenu === originalIndex && (
        <div className="absolute left-0 top-full mt-0 w-64 bg-white shadow-lg py-2 border border-gray-200">
          {item.submenu.map((subItem, subIndex) => (
            <Link
              key={subIndex}
              href={subItem.link}
              className="block px-4 py-2 text-sm font-bold text-black hover:bg-gray-100 transition-transform duration-300 ease-in-out hover:scale-105"
            >
              {subItem.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="font-sans">
      <div className="fixed top-0 w-full z-50 border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="hidden md:flex space-x-10 flex-1 justify-end pr-8">
            {leftMenuItems.map((item, index) => renderMenuItem(item, index))}
          </div>

          <Link href="/" className="flex-shrink-0">
            <img
              src="/images/logo4.png"
              alt="Logo"
              className="h-15 w-20 object-contain"
            />
          </Link>

          <div className="hidden md:flex space-x-10 flex-1 justify-start pl-8">
            {rightMenuItems.map((item, index) => renderMenuItem(item, leftMenuItems.length + index))}
          </div>

          <button
            className="md:hidden text-sm font-poppins uppercase tracking-wider text-black transition-transform duration-300 ease-in-out hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            menu
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 mt-[30px] pt-20 px-6 overflow-y-auto bg-white">
          <div className="container mx-auto">
            {menuItems.map((item, index) => (
              <div key={index} className="mb-8">
                {item.submenu ? (
                  <>
                    <h2 className="text-2xl font-bold mb-4 text-black font-['Philosopher',sans-serif] transition-transform duration-300 ease-in-out hover:scale-105">
                      {item.title}
                    </h2>
                    <div className="space-y-2">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.link}
                          className="block text-black font-bold font-['Philosopher',sans-serif] hover:text-gray-600 transition-transform duration-300 ease-in-out hover:scale-105"
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
                    className="block text-2xl font-bold mb-4 text-black font-['Philosopher',sans-serif] hover:text-gray-600 transition-transform duration-300 ease-in-out hover:scale-105"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}

            <div className="mt-8 pt-8 border-t border-gray-300">
              <div className="text-black">
                <div className="text-lg font-bold mb-2">Hotline</div>
                <div className="text-2xl font-bold">02293868789</div>
              </div>
            </div>
          </div>
          <button
            className="absolute top-6 right-6 text-2xl text-black transition-transform duration-300 ease-in-out hover:scale-110"
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
