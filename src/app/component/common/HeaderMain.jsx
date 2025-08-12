'use client'
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";

export default function BookingForm() {
  const [checkIn, setCheckIn] = useState("2025-08-12");
  const [checkOut, setCheckOut] = useState("2025-08-13");
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [guestDropdown, setGuestDropdown] = useState(false);

  const containerRef = useRef(null);
  const inInputRef = useRef(null);
  const outInputRef = useRef(null);
  const inFpRef = useRef(null);
  const outFpRef = useRef(null);
  const guestRef = useRef(null);

  const formatDisplay = (iso) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  // Date pickers setup
  useEffect(() => {
    if (inInputRef.current) {
      inFpRef.current = flatpickr(inInputRef.current, {
        defaultDate: checkIn,
        dateFormat: "Y-m-d",
        appendTo: containerRef.current || document.body,
        onChange: (dates, str) => setCheckIn(str),
      });
    }
    if (outInputRef.current) {
      outFpRef.current = flatpickr(outInputRef.current, {
        defaultDate: checkOut,
        dateFormat: "Y-m-d",
        appendTo: containerRef.current || document.body,
        onChange: (dates, str) => setCheckOut(str),
      });
    }

    return () => {
      inFpRef.current?.destroy();
      outFpRef.current?.destroy();
    };
  }, []);

  // Close guest dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (guestRef.current && !guestRef.current.contains(e.target)) {
        setGuestDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateGuests = (type, delta) => {
    setGuests((prev) => {
      const newVal = { ...prev, [type]: Math.max(0, prev[type] + delta) };
      return newVal;
    });
  };

  // Nút tăng giảm đẹp hơn
  const StepButton = ({ onClick, disabled, children }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-9 h-9 flex items-center justify-center rounded-full border border-gray-400 transition-all 
        ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-[#356D3D] hover:text-white cursor-pointer"}`}
    >
      {children}
    </button>
  );

  return (
    <div
      ref={containerRef}
      className="bg-[#DBE2DD] mt-20 px-4 py-6 rounded flex flex-col md:flex-row md:items-center md:justify-center md:gap-6 mx-auto relative"
    >
      {/* Title */}
      <div className="flex flex-col justify-center min-w-[150px] mb-4 md:mb-0">
        <h2 className="text-lg font-semibold">ĐẶT PHÒNG</h2>
      </div>

      {/* Check-in */}
      <div className="relative w-full md:w-[200px] mb-4 md:mb-0">
        <input
          ref={inInputRef}
          type="text"
          className="absolute -z-10 opacity-0 pointer-events-none"
        />
        <div
          onClick={() => inFpRef.current?.open()}
          className="border-2 border-gray-700 rounded px-3 py-2 w-full min-h-[48px] bg-white flex items-center justify-between cursor-pointer"
        >
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] text-gray-500">Ngày nhận phòng</span>
            <span className="text-sm">{formatDisplay(checkIn)}</span>
          </div>
          <svg
            className="h-8 w-8 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {/* Check-out */}
      <div className="relative w-full md:w-[200px] mb-4 md:mb-0">
        <input
          ref={outInputRef}
          type="text"
          className="absolute -z-10 opacity-0 pointer-events-none"
        />
        <div
          onClick={() => outFpRef.current?.open()}
          className="border-2 border-gray-700 rounded px-3 py-2 w-full min-h-[48px] bg-white flex items-center justify-between cursor-pointer"
        >
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] text-gray-500">Ngày trả phòng</span>
            <span className="text-sm">{formatDisplay(checkOut)}</span>
          </div>
          <svg
            className="h-8 w-8 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {/* Guests */}
     {/* Guests */}
<div ref={guestRef} className="relative w-full md:w-[200px] mb-4 md:mb-0">
  <div
    className="border-2 border-gray-700 rounded px-3 py-2 w-full min-h-[48px] bg-white flex flex-col leading-tight cursor-pointer"
    onClick={() => setGuestDropdown(!guestDropdown)}
  >
    <span className="text-[10px] text-gray-500">Số lượng khách</span>
    <span className="text-sm font-medium">
      {guests.adults} người lớn, {guests.children} trẻ em
    </span>
  </div>

  {guestDropdown && (
    <div className="absolute top-full left-0 mt-2 w-[260px] bg-white rounded-2xl shadow-xl z-50 p-4 border border-gray-200">
      {/* Người lớn */}
      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <div>
          <p className="font-semibold text-gray-800">Người lớn</p>
          <p className="text-xs text-gray-500">Từ 13 tuổi trở lên</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateGuests("adults", -1)}
            disabled={guests.adults <= 0}
            className={`w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 
              text-lg font-bold shadow-sm transition-all
              ${guests.adults <= 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-[#356D3D] hover:text-white"}`}
          >
            −
          </button>
          <span className="min-w-[24px] text-center text-gray-800 font-medium">
            {guests.adults}
          </span>
          <button
            onClick={() => updateGuests("adults", 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 
              text-lg font-bold shadow-sm hover:bg-[#356D3D] hover:text-white transition-all"
          >
            +
          </button>
        </div>
      </div>

      {/* Trẻ em */}
      <div className="flex justify-between items-center py-2">
        <div>
          <p className="font-semibold text-gray-800">Trẻ em</p>
          <p className="text-xs text-gray-500">Từ 2 - 12 tuổi</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateGuests("children", -1)}
            disabled={guests.children <= 0}
            className={`w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 
              text-lg font-bold shadow-sm transition-all
              ${guests.children <= 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-[#356D3D] hover:text-white"}`}
          >
            −
          </button>
          <span className="min-w-[24px] text-center text-gray-800 font-medium">
            {guests.children}
          </span>
          <button
            onClick={() => updateGuests("children", 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 
              text-lg font-bold shadow-sm hover:bg-[#356D3D] hover:text-white transition-all"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )}
</div>


      {/* Button */}
      <div className="w-full md:w-auto">
        <Link href="/oderpage">
          <button className="w-full md:w-auto bg-[#356D3D] text-white px-6 py-2 rounded text-sm font-semibold hover:bg-[#00252b] transition">
            Tìm phòng
          </button>
        </Link>
      </div>
    </div>
  );
}
