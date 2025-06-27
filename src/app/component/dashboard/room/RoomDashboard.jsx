'use client';
import React from 'react';

const RoomDashboard = () => {
  const rooms = [
    {
      id: 1,
      name: "Phòng Deluxe 2 Giường",
      type: "Deluxe",
      status: "Available",
      price: "2,000,000",
      capacity: "2-4 người"
    },
    // Add more room data as needed
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý phòng</h1>
        <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600">
          Thêm phòng mới
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm phòng..."
          className="px-4 py-2 border rounded-lg w-64"
        />
        <select className="px-4 py-2 border rounded-lg">
          <option value="">Tất cả trạng thái</option>
          <option value="available">Còn trống</option>
          <option value="occupied">Đã đặt</option>
          <option value="maintenance">Đang bảo trì</option>
        </select>
      </div>

      {/* Room Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên phòng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại phòng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sức chứa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="px-6 py-4 whitespace-nowrap">{room.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{room.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {room.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{room.price} VND</td>
                <td className="px-6 py-4 whitespace-nowrap">{room.capacity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    Sửa
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded-lg border hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 rounded-lg border bg-amber-500 text-white">
            1
          </button>
          <button className="px-3 py-1 rounded-lg border hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 rounded-lg border hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 rounded-lg border hover:bg-gray-50">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default RoomDashboard;
