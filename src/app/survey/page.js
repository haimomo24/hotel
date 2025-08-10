'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceUsed: '',
    // Phòng nghỉ
    staff: '',
    room: '',
    cleanliness: '',
    facilities: '',
    price: '',
    overall: '',
    // Nhà hàng
    food_quality: '',
    dining_cleanliness: '',
    waiting_time: '',
    service_speed: '',
    restaurant_overall: '',
    // Xe điện
    driver_attitude: '',
    vehicle_condition: '',
    safety: '',
    convenience: '',
    electric_overall: '',
    // Góp ý
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
          phone: '',
          serviceUsed: '',
          staff: '',
          room: '',
          cleanliness: '',
          facilities: '',
          price: '',
          overall: '',
          food_quality: '',
          dining_cleanliness: '',
          waiting_time: '',
          service_speed: '',
          restaurant_overall: '',
          driver_attitude: '',
          vehicle_condition: '',
          safety: '',
          convenience: '',
          electric_overall: '',
          suggestion: '',
        })

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
  const serviceOptions = ['Phòng nghỉ', 'Nhà hàng', 'Xe điện']

  return (
    <div className="min-h-screen mt-[80px] bg-[#FAFAFA] py-10 px-4 font-sans">
      <div className="bg-white max-w-3xl mx-auto rounded-lg shadow-md border border-gray-200 p-6 md:p-10">
        <h2 className="text-3xl md:text-4xl text-center text-green-800 mb-8">
          Phiếu Khảo Sát Chất Lượng Dịch Vụ
        </h2>

        {submitted && (
          <div className="p-4 mb-6 text-green-800 bg-green-100 border border-green-400 rounded text-center text-base font-medium">
            🎉 Cảm ơn bạn! Khảo sát đã được gửi thành công. Đang chuyển về trang chủ...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Họ và tên" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="Email" name="email" value={formData.email} onChange={handleChange} required type="email" />
          <Input label="Số điện thoại" name="phone" value={formData.phone} onChange={handleChange} required type="tel" />

          {/* Chọn dịch vụ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dịch vụ đã sử dụng</label>
            <select
              name="serviceUsed"
              value={formData.serviceUsed}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">-- Chọn dịch vụ --</option>
              {serviceOptions.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Nếu chọn Phòng nghỉ */}
          {formData.serviceUsed === 'Phòng nghỉ' && (
            <>
              {[
                { label: 'Thái độ phục vụ của nhân viên', name: 'staff' },
                { label: 'Chất lượng phòng nghỉ', name: 'room' },
                { label: 'Sự sạch sẽ và vệ sinh', name: 'cleanliness' },
                { label: 'Tiện nghi và cơ sở vật chất', name: 'facilities' },
                { label: 'Giá cả so với chất lượng', name: 'price' },
                { label: 'Tổng quan về trải nghiệm dịch vụ', name: 'overall' },
              ].map((item) => (
                <RatingGroup key={item.name} item={item} value={formData[item.name]} onChange={handleChange} ratings={ratings} />
              ))}
            </>
          )}

          {/* Nếu chọn Nhà hàng */}
          {formData.serviceUsed === 'Nhà hàng' && (
            <>
              {[
                { label: 'Chất lượng món ăn', name: 'food_quality' },
                { label: 'Sự sạch sẽ của khu vực ăn uống', name: 'dining_cleanliness' },
                { label: 'Thời gian chờ món ăn', name: 'waiting_time' },
                { label: 'Tốc độ phục vụ', name: 'service_speed' },
                { label: 'Đánh giá tổng quan về nhà hàng', name: 'restaurant_overall' },
              ].map((item) => (
                <RatingGroup key={item.name} item={item} value={formData[item.name]} onChange={handleChange} ratings={ratings} />
              ))}
            </>
          )}

          {/* Nếu chọn Xe điện */}
          {formData.serviceUsed === 'Xe điện' && (
            <>
              {[
                { label: 'Thái độ của tài xế', name: 'driver_attitude' },
                { label: 'Tình trạng phương tiện', name: 'vehicle_condition' },
                { label: 'Mức độ an toàn', name: 'safety' },
                { label: 'Sự thuận tiện', name: 'convenience' },
                { label: 'Đánh giá tổng quan về dịch vụ xe điện', name: 'electric_overall' },
              ].map((item) => (
                <RatingGroup key={item.name} item={item} value={formData[item.name]} onChange={handleChange} ratings={ratings} />
              ))}
            </>
          )}

          {/* Góp ý */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Góp ý / Đề xuất</label>
            <textarea
              name="suggestion"
              value={formData.suggestion}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
              placeholder="Hãy chia sẻ góp ý hoặc mong muốn cải thiện dịch vụ..."
            ></textarea>
          </div>

          {/* Nút gửi */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-green-700 text-white px-8 py-2 rounded-full hover:bg-green-800 transition"
            >
              Gửi
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const Input = ({ label, name, value, onChange, required = false, type = 'text' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
      placeholder={`Nhập ${label.toLowerCase()}`}
    />
  </div>
)

const RatingGroup = ({ item, value, onChange, ratings }) => (
  <div className="text-sm">
    <label className="block font-medium text-gray-700 mb-1">{item.label}</label>
    <div className="grid grid-cols-5 gap-4">
      {ratings.map((rate, idx) => (
        <label key={idx} className="flex items-center gap-2">
          <input
            type="radio"
            name={item.name}
            value={rate}
            checked={value === rate}
            onChange={onChange}
          />
          <span className="text-gray-600 text-xs">{rate}</span>
        </label>
      ))}
    </div>
  </div>
)

export default Page
