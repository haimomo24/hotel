'use client'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    fetch('/api/recruitment')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setApplications(data.data)
        } else {
          alert('Lỗi khi lấy dữ liệu: ' + data.message)
        }
      })
      .catch(err => {
        console.error(err)
        alert('Không thể kết nối server')
      })
  }, [])

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className='text-4xl font-light  mb-8 pt-8'>Tuyển dụng </h2>
      
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Họ và tên</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Số điện thoại</th>
            <th className="px-6 py-3">Vị trí ứng tuyển</th>
            <th className="px-6 py-3">Tin nhắn</th>
            <th className="px-6 py-3">CV</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((item) => (
              <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b">
                <td className="px-6 py-4 font-medium text-gray-900">{item.full_name}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">{item.position_applied}</td>
                <td className="px-6 py-4">{item.message || '—'}</td>
                <td className="px-6 py-4">
                  {item.cv_file_name ? (
                    <a
                      href={item.cv_file_path || '#'}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                    >
                      {item.cv_file_name}
                    </a>
                  ) : '—'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Page
