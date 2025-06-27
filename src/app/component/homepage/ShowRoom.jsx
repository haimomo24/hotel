
'use client';
import React from "react";
import { useRouter } from 'next/navigation';
import {
  CheckCircleIcon,
  WifiIcon,
} from "@heroicons/react/24/solid";

const rooms = [
  {
    id: 1,
    name: "Phòng Deluxe 2 Giường",
    img: "https://images.getaroom-cdn.com/image/upload/s--GjUqD_nu--/c_limit,e_improve,fl_lossy.immutable_cache,h_460,q_auto:good,w_460/v1720388137/c5afb73f856267678d2f65df66cf80e9ab648798?_a=BACAEuDL&atc=e7cd1cfa",
  },
  {
    id: 2,
    name: "Sang Trọng",
    img: "https://images.getaroom-cdn.com/image/upload/s--LiRgguQK--/c_limit,e_improve,fl_lossy.immutable_cache,h_460,q_auto:good,w_460/v1720388138/9c2d465799dcf626dea49595747991def8316872?_a=BACAEuDL&atc=e7cd1cfa",
  },
  {
    id: 3,
    name: "3 Giường Đơn",
    img: "https://images.getaroom-cdn.com/image/upload/s--baR87U5y--/c_limit,e_improve,fl_lossy.immutable_cache,h_460,q_auto:good,w_460/v1720388140/e6e731616e0e25f6d55ee7e1749a2a43f0486251?_a=BACAEuDL&atc=e7cd1cfa",
  },
];

export default function ShowRoom() {
  const router = useRouter();

  return (
    <section className="max-w-5xl  mx-auto px-4 py-8 font-sans space-y-5">
      {/* Tiêu đề */}
      <h2 className="text-xl text-gray-700 font-semibold">Phòng & Giá</h2>

      {/* Hộp danh sách phòng */}
      <div className="bg-white border rounded-2xl divide-y">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="flex flex-col md:flex-row gap-4 p-6 last:rounded-b-2xl first:rounded-t-2xl">
            {/* Thumbnail */}
            <div className="w-full md:w-60 h-40 flex-shrink-0">
              <img
                src={room.img}
                alt={room.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Thông tin chi tiết */}
            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-medium text-gray-700 leading-snug">
                {room.name}
              </h3>
              <p className="text-sm text-gray-500">Với kỳ nghỉ của bạn:</p>
              {/* Tiện nghi */}
              <div className="flex items-center gap-1 text-sm text-gray-700">
                <WifiIcon className="w-4 h-4 text-gray-400" />
                <span>Internet miễn phí</span>
              </div>
              {/* Link chi tiết */}
              <button className="text-sm text-blue-600 text-gray-700 hover:underline pt-2 flex items-center gap-1">
                Tiện nghi phòng, chi tiết và chính sách
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Cột hành động */}
            <div className="md:w-56 flex flex-col text-gray-700 justify-center items-start md:items-center gap-2">
              <button 
                onClick={() => router.push('/roomate')}
                className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg px-8 py-3"
              >
                Xem chi tiết  
              </button>
              <div className="flex items-center text-xs text-emerald-600 gap-1">
                <CheckCircleIcon className="w-4 h-4" />
                <span>Tỷ giá thấp hôm nay</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
