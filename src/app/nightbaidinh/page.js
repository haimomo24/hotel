import React from "react";
import SlideRestaurant from "../component/restaurant/SlideRestaurant";
import Link from "next/link";

const NightBaiDinh = () => {
  return (
    <>
      <SlideRestaurant />

      <div className="max-w-4xl mx-auto mt-[70px] px-4">
        {/* Tiêu đề */}
        <h1 className="text-4xl font-bold mb-8 text-center text-yellow-700">
          Huyền Ảo Bái Đính Về Đêm
        </h1>

        {/* Ảnh chính */}
        <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://mia.vn/media/uploads/blog-du-lich/ninh-binh-ve-dem-top-diem-vui-choi-va-an-uong-nam-2022-1641194509.jpg"
            alt="Bái Đính về đêm"
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Nội dung */}
        <p className="text-lg leading-relaxed mb-6 text-gray-800">
          Khi màn đêm buông xuống, quần thể chùa Bái Đính khoác lên mình một vẻ
          đẹp huyền ảo, lung linh dưới ánh sáng của hàng ngàn ngọn đèn. Những
          ngọn đèn vàng rực rỡ chiếu sáng các công trình kiến trúc đồ sộ, từ cổng
          Tam Quan, tháp chuông, đến các dãy hành lang La Hán dài bất tận. Tất
          cả tạo nên một không gian vừa trang nghiêm, vừa thơ mộng.
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-yellow-700">
          Vẻ Đẹp Lung Linh
        </h2>
        <p className="text-lg leading-relaxed mb-6 text-gray-800">
          Ánh sáng từ những ngọn đèn không chỉ làm nổi bật vẻ đẹp kiến trúc của
          chùa mà còn tạo nên một không gian huyền bí, khiến du khách cảm nhận
          được sự thanh tịnh và linh thiêng. Đặc biệt, hình ảnh tháp chuông cao
          vút, rực sáng giữa bầu trời đêm, như một biểu tượng của sự kết nối giữa
          con người và cõi Phật.
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-yellow-700">
          Trải Nghiệm Đặc Biệt
        </h2>
        <p className="text-lg leading-relaxed mb-6 text-gray-800">
          Tham quan Bái Đính về đêm là một trải nghiệm khó quên. Du khách có thể
          tản bộ dưới ánh đèn, lắng nghe tiếng chuông chùa vang vọng trong không
          gian yên bình, hoặc tham gia các nghi lễ tâm linh tại chùa. Đây là thời
          điểm lý tưởng để cảm nhận sự giao hòa giữa con người và thiên nhiên,
          giữa hiện tại và quá khứ.
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-yellow-700">
          Kết Luận
        </h2>
        <p className="text-lg leading-relaxed text-gray-800">
          Bái Đính về đêm không chỉ là một điểm đến du lịch mà còn là nơi để tìm
          về sự bình yên trong tâm hồn. Với vẻ đẹp huyền ảo và không gian linh
          thiêng, nơi đây chắc chắn sẽ để lại ấn tượng sâu sắc trong lòng mỗi du
          khách.
        </p>
      </div>

      {/* Gợi ý */}
      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* Gợi ý 1 */}
        <Link href="/oderpage">
          <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <img
              src="https://www.baidinhhotel.com/baidinhhotel-images/banner/img/k.jpg"
              alt="Khách xá Bái Đính"
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Khách xá Bái Đính
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Khách xá Bái Đính tọa lạc trong khuôn viên chùa Bái Đính
              </p>
            </div>
          </div>
        </Link>

        {/* Gợi ý 2 */}
        <Link href="/oderpage">
          <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <img
              src="https://www.baidinhhotel.com/baidinhhotel-images/banner/img/QPPI4VRBB_DSC_9431.jpg"
              alt="Phòng họp Bái Đính"
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Phòng họp Bái Đính
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Xe điện đồng hành mang đến những trải nghiệm ấn tượng
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NightBaiDinh;
