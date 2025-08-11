// File: app/survey/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";

export default function SurveyPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Số hàng mỗi trang

  const columnNames = {
    id: "ID",
    full_name: "Họ và tên",
    email: "Email",
    phone: "Số điện thoại",
    service_used: "Dịch vụ sử dụng",
    staff_attitude: "Thái độ nhân viên",
    room_quality: "Chất lượng phòng",
    cleanliness: "Độ sạch sẽ",
    facility_convenience: "Tiện nghi cơ sở vật chất",
    price_value: "Giá trị so với giá tiền",
    overall_experience: "Trải nghiệm chung",
    food_quality: "Chất lượng món ăn",
    dining_cleanliness: "Vệ sinh khu ăn uống",
    waiting_time: "Thời gian chờ",
    service_speed: "Tốc độ phục vụ",
    restaurant_overall: "Đánh giá nhà hàng",
    driver_attitude: "Thái độ tài xế",
    vehicle_condition: "Tình trạng xe",
    safety: "An toàn",
    convenience: "Tiện lợi",
    electric_overall: "Đánh giá xe điện",
    suggestion: "Góp ý",
    created_at: "Ngày tạo",
  };

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const res = await fetch("/api/survey");
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        } else {
          console.error("Không lấy được dữ liệu:", json.message);
        }
      } catch (err) {
        console.error("Lỗi fetch dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, []);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa khảo sát này?")) return;

    try {
      const res = await fetch(`/api/survey/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setData(data.filter((item) => item.id !== id));
      } else {
        alert("Xóa thất bại: " + json.message);
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };

  // Tính dữ liệu theo trang
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setExpandedRow(null); 
    }
  };

  if (loading) {
    return <div className="p-4">Đang tải dữ liệu...</div>;
  }

  if (data.length === 0) {
    return <div className="p-4">Không có dữ liệu</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Danh sách phản hồi khảo sát</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Họ và tên</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Số điện thoại</th>
            <th className="border border-gray-300 p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row) => (
            <React.Fragment key={row.id}>
              {/* Hàng chính */}
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{row.full_name}</td>
                <td className="border border-gray-300 p-2">{row.email}</td>
                <td className="border border-gray-300 p-2">{row.phone}</td>
                <td className="border border-gray-300 p-2 flex gap-2">
                  <button
                    onClick={() => toggleRow(row.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaSearch />
                  </button>
                  <button
                    onClick={() => handleDelete(row.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>

              {/* Hàng chi tiết */}
              {expandedRow === row.id && (
                <tr>
                  <td colSpan={4} className="border border-gray-300 p-4 bg-gray-50">
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(row).map(([key, value]) =>
                        key !== "full_name" &&
                        key !== "email" &&
                        key !== "phone" && (
                          <div key={key} className="p-2 border rounded bg-white">
                            <strong>{columnNames[key] || key}:</strong>{" "}
                            {value !== null ? value : ""}
                          </div>
                        )
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Thanh phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Trước
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}
