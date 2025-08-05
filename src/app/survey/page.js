'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceUsed: '',
    staff: '',
    room: '',
    cleanliness: '',
    facilities: '',
    price: '',
    overall: '',
    suggestion: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await res.json()
      if (result.success) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          serviceUsed: '',
          staff: '',
          room: '',
          cleanliness: '',
          facilities: '',
          price: '',
          overall: '',
          suggestion: '',
        })

        // Sau 3 giây chuyển về trang chủ
        setTimeout(() => {
          router.push('/')
        }, 3000)
      } else {
        alert('Lỗi khi gửi khảo sát: ' + result.message)
      }
    } catch (err) {
      console.error('Survey Submit Error:', err)
      alert('Không thể gửi khảo sát. Vui lòng thử lại sau.')
    }
  }

  const ratings = ['Rất không hài lòng', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Rất hài lòng']

  return (
    <div className="min-h-screen mt-[80px] bg-gradient-to-br from-[#f0f9f3] to-white py-12 px-4 md:px-10 lg:px-32 font-[serif]">
      <div className="bg-white rounded-2xl shadow-xl border border-[#cce3d5] p-8 md:p-12">
        <h2 className="text-4xl font-bold text-[#356D3D] mb-10 tracking-wide">
          Phiếu Khảo Sát Chất Lượng Dịch Vụ
        </h2>

        {/* Thông báo sau khi gửi */}
        {submitted && (
          <div className="p-4 mb-6 text-green-800 bg-green-100 border border-green-400 rounded-lg text-center text-lg font-medium">
            🎉 Cảm ơn bạn! Khảo sát đã được gửi thành công. Đang chuyển về trang chủ...
          </div>
        )}

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
              className="w-full px-4 py-2 border border-[#356D3D] rounded-md bg-[#f9fefb] focus:ring-2 focus:ring-[#356D3D] outline-none"
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
              className="w-full px-4 py-2 border border-[#356D3D] rounded-md bg-[#f9fefb] focus:ring-2 focus:ring-[#356D3D] outline-none"
              placeholder="Nhập địa chỉ email"
            />
          </div>

          {/* Dịch vụ đã sử dụng */}
          <div>
            <label className="block text-base font-medium text-[#356D3D] mb-1">Dịch vụ đã sử dụng</label>
            <input
              type="text"
              name="serviceUsed"
              value={formData.serviceUsed}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#356D3D] rounded-md bg-[#f9fefb] focus:ring-2 focus:ring-[#356D3D] outline-none"
              placeholder="Ví dụ: Phòng nghỉ, Nhà hàng, Xe điện..."
            />
          </div>

          {/* Các đánh giá */}
          {[
            { label: 'Thái độ phục vụ của nhân viên', name: 'staff' },
            { label: 'Chất lượng phòng nghỉ', name: 'room' },
            { label: 'Sự sạch sẽ và vệ sinh', name: 'cleanliness' },
            { label: 'Tiện nghi và cơ sở vật chất', name: 'facilities' },
            { label: 'Giá cả so với chất lượng', name: 'price' },
            { label: 'Tổng quan về trải nghiệm dịch vụ', name: 'overall' },
          ].map((item) => (
            <div key={item.name}>
              <label className="block text-base font-medium text-[#356D3D] mb-1">{item.label}</label>
              <select
                name={item.name}
                value={formData[item.name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#356D3D] rounded-md bg-[#f9fefb] focus:ring-2 focus:ring-[#356D3D] outline-none"
              >
                <option value="">Chọn mức độ hài lòng</option>
                {ratings.map((rate, idx) => (
                  <option key={idx} value={rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Góp ý */}
          <div>
            <label className="block text-base font-medium text-[#356D3D] mb-1">Góp ý / Đề xuất</label>
            <textarea
              name="suggestion"
              rows="4"
              value={formData.suggestion}
              onChange={handleChange}
              placeholder="Hãy chia sẻ góp ý hoặc mong muốn cải thiện dịch vụ..."
              className="w-full px-4 py-2 border border-[#356D3D] rounded-md bg-[#f9fefb] focus:ring-2 focus:ring-[#356D3D] outline-none resize-none"
            ></textarea>
          </div>

          {/* Nút gửi */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-[#356D3D] text-white px-8 py-3 rounded-full shadow-md hover:bg-[#2e5e34] hover:scale-105 transition-all duration-300"
            >
              Gửi khảo sát
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
