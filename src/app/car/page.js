import React from 'react';

const ElectricCarReview = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto mt-[70px]">
      <h1 className="text-3xl font-bold  mb-6">
        Review Xe Điện Bái Đính
      </h1>

      <img
        src="https://thesinhtour.com/wp-content/uploads/2025/04/ve-xe-dien-bai-dinh.jpg"
        alt="Xe Điện Bái Đính"
        className="w-full h-auto rounded-lg shadow-md mb-6"
      />

      <p className="text-lg mb-4">
        Xe điện Bái Đính là một phương tiện di chuyển thân thiện với môi trường, được sử dụng phổ biến tại khu du lịch chùa Bái Đính. Với thiết kế hiện đại, tiện nghi và an toàn, xe điện mang đến cho du khách trải nghiệm thoải mái khi tham quan quần thể chùa lớn nhất Đông Nam Á.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Giá Vé Xe Điện</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Người lớn: <strong>30.000₫/lượt</strong></li>
        <li>Trẻ em: <strong>15.000₫/lượt</strong></li>
      </ul>
      <p className="text-lg mb-4">
        Giá vé xe điện rất hợp lý, phù hợp với mọi đối tượng du khách. Bạn có thể mua vé tại quầy vé gần cổng vào khu du lịch.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Lịch Trình Hoạt Động</h2>
      <p className="text-lg mb-4">
        Xe điện hoạt động từ <strong>7:00 sáng</strong> đến <strong>6:00 chiều</strong> hàng ngày. Tần suất xe chạy liên tục, đảm bảo du khách không phải chờ đợi lâu.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Ưu Điểm</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Thân thiện với môi trường, không gây ô nhiễm.</li>
        <li>Di chuyển nhanh chóng và tiện lợi trong khu vực rộng lớn.</li>
        <li>Giá vé hợp lý, phù hợp với mọi đối tượng.</li>
        <li>Nhân viên lái xe thân thiện và nhiệt tình.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Kết Luận</h2>
      <p className="text-lg">
        Xe điện Bái Đính là lựa chọn tuyệt vời cho du khách muốn khám phá quần thể chùa Bái Đính một cách tiện lợi và thân thiện với môi trường. Với giá vé hợp lý và dịch vụ chuyên nghiệp, đây chắc chắn là phương tiện di chuyển bạn không nên bỏ qua khi đến thăm khu du lịch này.
      </p>
    </div>
  );
};

export default ElectricCarReview;