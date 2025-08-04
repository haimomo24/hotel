'use client'
import React, { useState } from 'react'

const RecruitmentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    cv: null,
  })

  const positions = [
    'Lễ tân',
    'Nhân viên phục vụ',
    'Bảo vệ',
    'Quản lý khu nghỉ dưỡng',
    'Hướng dẫn viên',
  ]

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    alert('Thông tin ứng tuyển đã được gửi thành công!')
  }

  return (
    <div className="min-h-screen mt-[80px] bg-gradient-to-br from-[#f0f9f3] to-white py-12 px-4 md:px-10 lg:px-32 font-[serif]">
      <div className="bg-white rounded-2xl shadow-xl border border-[#cce3d5] p-8 md:p-12">
        <h2 className="text-4xl font-bold text-[#356D3D] mb-10 tracking-wide">
          Tuyển dụng 
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Họ và tên */}
          <div>
            <label className="block text-base font-medium text-[#356D3D] mb-1">Họ và tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#356D3D] rounded-md focus:ring-2 focus:ring-[#356D3D] outline-none bg-[#f9fefb]"
              placeholder="Nhập họ và tên"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-base font-medium text-[#356D3D] mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#356D3D] rounded-md focus:ring-2 focus:ring-[#356D3D] outline-none bg-[#f9fefb]"
              placeholder="Nhập email"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-base font-medium text-[#356D3D] mb-1">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#356D3D] rounded-md focus:ring-2 focus:ring-[#356D3D] outline-none bg-[#f9fefb]"
              placeholder="Nhập số điện thoại"
            />
          </div>

          {/* Vị trí ứng tuyển */}
          <div>
            <label className="block text-base font-medium text-[#356D3D] mb-1">Vị trí ứng tuyển</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#356D3D] rounded-md focus:ring-2 focus:ring-[#356D3D] outline-none bg-[#f9fefb]"
            >
              <option value="">-- Chọn vị trí --</option>
              {positions.map((pos, index) => (
                <option key={index} value={pos}>{pos}</option>
              ))}
            </select>
          </div>

          {/* Tin nhắn */}
          <div>
            <label className="block text-base font-medium text-[#356D3D] mb-1">Tin nhắn (nếu cần thiết)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-[#356D3D] rounded-md focus:ring-2 focus:ring-[#356D3D] outline-none resize-none bg-[#f9fefb]"
              placeholder="Viết thêm thông tin bạn muốn chia sẻ..."
            ></textarea>
          </div>

          {/* Gửi CV */}
          <div>
            <label className="block text-base font-medium text-[#356D3D] mb-1">Tải lên CV (PDF/DOC)</label>
            <input
              type="file"
              name="cv"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#356D3D] rounded-md bg-white text-[#356D3D]"
            />
          </div>

          {/* Nút gửi */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-[#356D3D] text-white px-8 py-3 rounded-full shadow-md hover:bg-[#2e5e34] hover:scale-105 transition-all duration-300"
            >
              Gửi thông tin
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RecruitmentPage
