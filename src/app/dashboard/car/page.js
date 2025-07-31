'use client'; // Quan trọng: Đảm bảo đây là Client Component
import React, { useState, useEffect } from 'react';

const TicketListPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Thêm state cho trang hiện tại
  const [ticketsPerPage] = useState(10); // Thêm state cho số lượng vé mỗi trang
  const [totalTickets, setTotalTickets] = useState(0); // Thêm state để lưu tổng số vé

  // Hàm để lấy dữ liệu từ API
  const fetchTickets = async () => {
    try {
      setLoading(true);
      // Bạn có thể cần truyền các tham số phân trang tới API nếu backend hỗ trợ
      // Ví dụ: const response = await fetch(`/api/ticket?page=${currentPage}&limit=${ticketsPerPage}`);
      const response = await fetch('/api/ticket'); // Gọi API /api/ticket (mặc định là GET)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTickets(data.data); // Dữ liệu thực tế nằm trong data.data
      setTotalTickets(data.data.length); // Cập nhật tổng số vé
    } catch (err) {
      console.error('Lỗi khi fetch vé:', err);
      setError('Không thể tải dữ liệu đặt vé. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Sử dụng useEffect để fetch dữ liệu khi component được mount
  useEffect(() => {
    fetchTickets();
  }, []); // [] đảm bảo chỉ chạy một lần khi component mount, hoặc khi currentPage thay đổi nếu backend hỗ trợ phân trang

  // Hàm để định dạng các loại vé đã đặt và số lượng
  const formatTickets = (ticket) => {
    const ticketTypes = [];
    if (ticket.adult_spiritual_ticket > 0) ticketTypes.push(`Tâm linh NL: ${ticket.adult_spiritual_ticket}`);
    if (ticket.child_spiritual_ticket > 0) ticketTypes.push(`Tâm linh TE: ${ticket.child_spiritual_ticket}`);
    if (ticket.adult_fun_trip_ticket > 0) ticketTypes.push(`Vui vẻ NL: ${ticket.adult_fun_trip_ticket}`);
    if (ticket.child_fun_trip_ticket > 0) ticketTypes.push(`Vui vẻ TE: ${ticket.child_fun_trip_ticket}`);
    if (ticket.adult_peace_ticket > 0) ticketTypes.push(`An Nhiên NL: ${ticket.adult_peace_ticket}`);
    if (ticket.child_peace_ticket > 0) ticketTypes.push(`An Nhiên TE: ${ticket.child_peace_ticket}`);
    if (ticket.private_ticket > 0) ticketTypes.push(`Thượng hành Tự tại: ${ticket.private_ticket}`);
    return ticketTypes.length > 0 ? ticketTypes.join('; ') : 'Không có vé nào';
  };

  // Logic phân trang
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  // Tính tổng số trang
  const totalPages = Math.ceil(totalTickets / ticketsPerPage);

  // Hàm để thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Hiển thị trạng thái tải hoặc lỗi
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Đang tải danh sách đặt vé...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 mx-4">
      <h2 className="text-4xl font-light  mb-8 pt-8">
        Danh sách đặt vé xe điện
       
      </h2>
      {tickets.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 py-8">Chưa có đơn đặt vé nào.</p>
      ) : (
        <>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Tên Khách</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">SĐT</th>
                <th scope="col" className="px-6 py-3">Giờ đặt</th>
                <th scope="col" className="px-6 py-3">Loại vé & Số lượng</th>
                <th scope="col" className="px-6 py-3">Tổng tiền</th>
                <th scope="col" className="px-6 py-3">Thời gian đặt</th>
              </tr>
            </thead>
            <tbody>
              {currentTickets.map((ticket) => (
                <tr key={ticket.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {ticket.full_name}
                  </th>
                  <td className="px-6 py-4">{ticket.email}</td>
                  <td className="px-6 py-4">{ticket.phone}</td>
                  <td className="px-6 py-4">
                    {ticket.booking_time ? new Date(ticket.booking_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    {formatTickets(ticket)}
                  </td>
                  <td className="px-6 py-4">
                    {ticket.total_amount ? parseFloat(ticket.total_amount).toLocaleString('vi-VN') : '0'}đ
                  </td>
                  <td className="px-6 py-4">
                    {ticket.created_at ? new Date(ticket.created_at).toLocaleString('vi-VN') : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <nav className="flex items-center justify-between pt-4 px-4 pb-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Hiển thị{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {indexOfFirstTicket + 1}-{Math.min(indexOfLastTicket, totalTickets)}
              </span>{' '}
              trong tổng số{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{totalTickets}</span>
            </span>
            <ul className="inline-flex -space-x-px text-sm h-8">
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Trước
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i + 1}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                      currentPage === i + 1
                        ? 'text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Sau
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default TicketListPage;