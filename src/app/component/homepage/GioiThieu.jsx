import React from "react";
import Link from "next/link";

export default function GioiThieu() {
  return (
    <section className="bg-white py-16 space-y-16">
      {/* Phần 1: Ảnh 7 - chữ 5 */}
      <div className="max-w-7xl mb-[20px] mx-auto grid md:grid-cols-12 gap-12 items-center">
        {/* Ảnh bên trái */}
        <div className="col-span-7 -ml-4 md:-ml-12">
          <img
            src="/images/DJI_20230529183534_0164_D.JPG"
            alt="Chùa Bái Đính"
            className="w-full h-[450px] object-cover rounded-xl shadow-xl"
          />
        </div>

        {/* Nội dung bên phải */}
        <div className="col-span-5 px-4 md:px-0">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Giới thiệu Chùa Bái Đính
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Chùa Bái Đính – quần thể chùa lớn nhất Việt Nam, nổi tiếng với kiến trúc
            hoành tráng, cảnh quan thanh tịnh và nhiều kỷ lục Phật giáo. Đây là điểm
            đến tâm linh hấp dẫn, thu hút hàng triệu du khách mỗi năm.
          </p>
          <Link href="/review">
            <button className="bg-[#356D3D] hover:bg-yellow-700 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg transition">
              Xem chi tiết
            </button>
          </Link>
        </div>
      </div>

      {/* Phần 2: Chữ 5 - ảnh 7 */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
        {/* Nội dung bên trái */}
        <div className="col-span-5 px-4 md:px-0">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Bái Đính Về Đêm
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Khi màn đêm buông xuống, quần thể chùa Bái Đính khoác lên mình một vẻ đẹp
            huyền ảo, lung linh dưới ánh sáng của hàng ngàn ngọn đèn
          </p>
          <Link href="/contact">
            <button className="bg-[#356D3D] hover:bg-red-700 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg transition">
              Xem chi tiết
            </button>
          </Link>
        </div>

        {/* Ảnh bên phải */}
        <div className="col-span-7">
          <img
            src="/images/DJI_20230529183534_0164_D.JPG"
            alt="Liên hệ Chùa Bái Đính"
            className="w-full h-[450px] object-cover rounded-xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
