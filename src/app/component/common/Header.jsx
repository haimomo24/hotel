// File: src/app/component/common/Header.jsx
'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null); // Lưu trữ index của menu cha đang active

  // Định nghĩa tất cả các mục menu
  const menuItems = [
    {
      title: "Giới Thiệu",
      link: "/review" // Đây là mục không có submenu
    },
    {
      title: "Điểm Đến  ",
      submenu: [
        { name: "KDL Sinh Thái Tràng An  ", link: "https://disantrangan.vn/" },
        { name: "KDL Tam Cốc Bích Động ", link: "https://tamcocbichdong.vn/" },
        { name: "Sân golf, Hồ Đồng Chương  ", link: "https://trangangolfandresort.com/" },
        { name: "Phố Cổ Hoa Lư  ", link: "https://phocohoalu.com/" },
        { name: "Chùa Tam Chúc  ", link: "https://tamchuc.com.vn/" }
      ]
    },
    {
      title: "Dịch vụ  ",
      submenu: [
        { name: "Đặt phòng  ", link: "/oderpage" },
        { name: "Hội nghị, sự kiện ", link: "/roommetting" },
        { name: "Nhà hàng ", link: "/restaurant" },
        { name: "Đặt vé xe điện", link: "/carpage" },
        { name: "Bái Đính về đêm   ", link: "/nightbaidinh" },
      ]
    },
    {
      title: "Sự Kiện",
      link: "/event" // Đây là mục không có submenu
    },
    {
      title: "Thư Viện",
      link: "/contact" // Đây là mục không có submenu
    },
    {
      title: "Liên hệ",
      link: "/contact" ,
      submenu: [
        { name: " Khảo sát ", link: "/survey" },
        { name: "Tuyển Dụng  ", link: "/recruitment" }
        
       
      ]// Đây là mục không có submenu
    },
  ];

  // --- ĐIỀU CHỈNH CÁCH CHIA MENU ITEMS TẠI ĐÂY ---
  // Giới Thiệu, Điểm Đến, và Tiện ích ở bên trái
  const leftMenuItems = menuItems.slice(0, 3); // Lấy 3 phần tử đầu tiên (index 0, 1, 2)
  // Sự Kiện, Thư Viện, Liên hệ ở bên phải
  const rightMenuItems = menuItems.slice(3); // Lấy các phần tử còn lại từ index 3 trở đi
  // ------------------------------------------------

  // Hàm render một mục menu (dùng chung cho cả left và right menu)
  const renderMenuItem = (item, originalIndex) => (
    <div
      key={originalIndex}
      className="relative group font-Philosopher
                 transition-transform duration-300 ease-in-out hover:scale-110" // Áp dụng hiệu ứng hover vào đây
      onMouseEnter={() => setActiveSubmenu(originalIndex)}
      onMouseLeave={() => setActiveSubmenu(null)}
    >
      {item.submenu ? (
        <button className="text-sm uppercase font-Philosopher tracking-wider text-white hover:text-gray-200 pb-2">
          {item.title}
        </button>
      ) : (
        <Link href={item.link} className="text-sm uppercase font-Philosopher tracking-wider text-white hover:text-gray-200 pb-2">
          {item.title}
        </Link>
      )}

      {item.submenu && item.submenu.length > 0 && activeSubmenu === originalIndex && (
        <div className="absolute left-0 top-full mt-0 w-64 font-Philosopher bg-[#356D3D] shadow-lg py-2">
          {item.submenu.map((subItem, subIndex) => (
            <Link
              key={subIndex}
              href={subItem.link}
              className="block px-4 py-2 font-Philosopher text-sm font-Philosopher text-white hover:bg-[#8B4513]
                         transition-transform duration-300 ease-in-out hover:scale-105" // Giữ hiệu ứng cho submenu items
            >
              {subIndex === 0 ? <strong>{subItem.name}</strong> : subItem.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="font-sans">
      <div className="fixed top-0 w-full z-50 bg-[#356D3D] border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Menu bên trái - chỉ hiển thị trên desktop */}
          {/* flex-1 để chiếm không gian và justify-end để đẩy các mục menu về phía logo */}
          <div className="hidden md:flex font-Philosopher space-x-10 flex-1 justify-end pr-8">
            {leftMenuItems.map((item, index) => renderMenuItem(item, index))}
          </div>

          {/* Logo ở giữa */}
          {/* flex-shrink-0 để logo không bị co lại */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/images/logo3.png"
              alt="Logo"
              className="h-15 w-20 object-contain"
            />
          </Link>

          {/* Menu bên phải - chỉ hiển thị trên desktop */}
          {/* flex-1 để chiếm không gian và justify-start để đẩy các mục menu về phía logo */}
          <div className="hidden md:flex font-Philosopher space-x-10 flex-1 justify-start pl-8">
            {rightMenuItems.map((item, index) => renderMenuItem(item, leftMenuItems.length + index))}
          </div>

          {/* Menu button cho mobile (vẫn ở bên phải) */}
          <button
            className="md:hidden text-sm uppercase font-semibold tracking-wider text-white
                       transition-transform duration-300 ease-in-out hover:scale-110" // Hiệu ứng cho nút MENU
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            menu
          </button>
        </div>
      </div>

      {/* Mobile menu (vẫn hiển thị tất cả các mục menu theo thứ tự) */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#356D3D] z-40 mt-[30px] pt-20 px-6 font-Philosopher overflow-y-auto">
          <div className="container mx-auto">
            {menuItems.map((item, index) => (
              <div key={index} className="mb-8">
                {item.submenu ? (
                  <>
                    {/* Hiệu ứng cho tiêu đề menu cha trong mobile */}
                    <h2 className="text-2xl mb-4 text-white font-Philosopher
                                   transition-transform duration-300 ease-in-out hover:scale-105 transform origin-left">
                      {item.title}
                    </h2>
                    <div className="space-y-2">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.link}
                          className="block text-white ont-Philosopher hover:text-gray-200
                                     transition-transform duration-300 ease-in-out hover:scale-105 transform origin-left" // Hiệu ứng cho submenu items mobile
                          onClick={() => setIsMenuOpen(false)} // Đóng menu khi click vào link
                        >
                          {subIndex === 0 ? <strong>{subItem.name}</strong> : subItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.link}
                    className="block text-2xl mb-4 text-white font-Philosopher hover:text-gray-200
                               transition-transform duration-300 ease-in-out hover:scale-105 transform origin-left" // Hiệu ứng cho menu items không có submenu mobile
                    onClick={() => setIsMenuOpen(false)} // Đóng menu khi click vào link
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}

            {/* Hotline trong mobile menu (vẫn giữ lại nếu cần) */}
            <div className="mt-8 pt-8 border-t border-gray-600">
              <div className="text-white">
                <div className="text-lg mb-2 font-Philosopher">Hotline</div>
                <div className="text-2xl font-Philosopher">02293868789</div> {/* Sử dụng số hotline cố định */}
              </div>
            </div>
          </div>
          <button
            className="absolute top-6 right-6 text-2xl text-white
                       transition-transform duration-300 ease-in-out hover:scale-110" // Hiệu ứng cho nút đóng
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
