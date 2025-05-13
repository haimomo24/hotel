'use client'
import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const menuItems = [
    {
      title: "Destinations",
      submenu: [
        "Hotels & Resorts",
        "Experiences",
        "Exclusive Offers",
        "Villas",
        "Residences",
        "About Us",
        "Gift Card",
        "Aman at Sea",
        "Aman Shop",
        "Aman Interiors"
      ]
    },
    {
      title: "Janu",
      submenu: []
    },
    {
      title: "Diagrams",
      submenu: [
        "Diskonti Annis im...",
        "USA & the Caribbean",
        "Europe, Middle East & North Africa",
        "Asia"
      ]
    }
  ];

  return (
    <div className="font-serif">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-light tracking-wider">Bai Dinh Hotel</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10">
            {menuItems.map((item, index) => (
              <div 
                key={index}
                className="relative group"
                onMouseEnter={() => setActiveSubmenu(index)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <button className="text-sm uppercase tracking-wider hover:text-gray-600">
                  {item.title}
                </button>
                
                {item.submenu.length > 0 && activeSubmenu === index && (
                  <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg py-2">
                    {item.submenu.map((subItem, subIndex) => (
                      <a 
                        key={subIndex}
                        href="#" 
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        {subIndex === 0 ? <strong>{subItem}</strong> : subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-sm uppercase tracking-wider"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            MENU
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-20 px-6 overflow-y-auto">
          <div className="container mx-auto">
            {menuItems.map((item, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl mb-4">{item.title}</h2>
                {item.submenu.length > 0 && (
                  <div className="space-y-2">
                    {item.submenu.map((subItem, subIndex) => (
                      <a 
                        key={subIndex}
                        href="#" 
                        className="block text-gray-700 hover:text-black"
                      >
                        {subIndex === 0 ? <strong>{subItem}</strong> : subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button 
            className="absolute top-6 right-6 text-2xl"
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