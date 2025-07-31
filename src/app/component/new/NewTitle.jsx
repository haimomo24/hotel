import React from 'react';

const NewTitle = () => {
  return (
    <div className="max-w-4xl mx-auto mt-[70px] p-6">
      {/* Tiêu đề */}
      <h1 className="text-4xl font-bold  text-green-700 mb-6">
        Hoa Anh Đào Trong Vùng Đất Phật
      </h1>

      {/* Hình ảnh chính */}
      <img
        src="https://www.baidinhhotel.com/userfiles/cong_8_P(1).jpg"
        alt="Hoa Anh Đào"
        className="w-full h-auto rounded-lg shadow-md mb-6"
      />

      {/* Nội dung */}
      <div className="text-lg leading-relaxed text-gray-700">
        <p className="mb-4">
          Vùng đất Phật Bái Đính không chỉ nổi tiếng với vẻ đẹp linh thiêng và kiến trúc đồ sộ, mà còn là nơi hội tụ của những sắc hoa tuyệt đẹp. Trong đó, hoa anh đào – biểu tượng của sự thanh khiết và vẻ đẹp mong manh – đã tô điểm thêm cho không gian nơi đây một vẻ đẹp thơ mộng và yên bình.
        </p>

        <p className="mb-4">
          Mỗi độ xuân về, những cây hoa anh đào tại khuôn viên chùa Bái Đính lại nở rộ, tạo nên một khung cảnh tuyệt đẹp, thu hút hàng ngàn du khách đến tham quan và chiêm ngưỡng. Những cánh hoa hồng nhạt, nhẹ nhàng rơi trong gió, như một lời nhắc nhở về sự vô thường và vẻ đẹp của cuộc sống.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Ý Nghĩa Của Hoa Anh Đào
        </h2>
        <p className="mb-4">
          Hoa anh đào không chỉ là biểu tượng của mùa xuân mà còn mang ý nghĩa sâu sắc về sự tái sinh và hy vọng. Tại vùng đất Phật, hoa anh đào như một lời nhắc nhở về sự hòa hợp giữa con người và thiên nhiên, giữa vẻ đẹp vật chất và giá trị tinh thần.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Trải Nghiệm Đặc Biệt
        </h2>
        <p className="mb-4">
          Khi đến thăm chùa Bái Đính vào mùa hoa anh đào, du khách không chỉ được chiêm ngưỡng vẻ đẹp của loài hoa này mà còn có cơ hội tham gia các hoạt động tâm linh, tìm về sự bình yên trong tâm hồn. Đây chắc chắn sẽ là một trải nghiệm khó quên đối với mỗi người.
        </p>

        <p className="mb-4">
          Hãy đến với vùng đất Phật Bái Đính để cảm nhận vẻ đẹp của hoa anh đào và tìm lại sự thanh thản trong tâm hồn. Một chuyến đi không chỉ để ngắm hoa mà còn để tìm về giá trị đích thực của cuộc sống.
        </p>
      </div>
    </div>
  );
};

export default NewTitle;