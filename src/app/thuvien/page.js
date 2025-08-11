'use client'

import React, { useState, useEffect } from "react";

const images = [
  {
    src: "/images/DJI_0664.JPG",
    title: "Toàn cảnh Chùa Bái Đính",
    desc: "Quần thể chùa rộng lớn với kiến trúc độc đáo.",
  },
  {
    src: "/images/DJI_20230527183627_0152_D copy.JPG",
    title: "Bảo Tháp",
    desc: "Ngọn tháp cao uy nghiêm giữa trời.",
  },
  {
    src: "/images/DJI_0611.JPG",
    title: "Điện Tam Thế",
    desc: "Không gian linh thiêng và tôn nghiêm.",
  },
  {
    src: "https://bizweb.dktcdn.net/thumb/grande/100/372/171/products/hanh-lang-la-han-chua-bai-dinh-e1507540182381.png?v=1667535614883",
    title: "Hành lang La Hán",
    desc: "Dãy hành lang dài với tượng La Hán.",
  },
];

const Page = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Thoát bằng phím ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="bg-gray-50 mt-[80px] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-700">
          Chùa Bái Đính
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Chiêm ngưỡng những khoảnh khắc đẹp và yên bình của chùa Bái Đính
        </p>

        {/* Lưới hình ảnh */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <div className="overflow-hidden">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {img.title}
                </h2>
                <p className="text-gray-600 text-sm mt-2">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal full màn hình */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage.src}
            alt={selectedImage.title}
            className="w-full h-full object-contain"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
