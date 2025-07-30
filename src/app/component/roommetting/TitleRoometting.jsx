import Link from 'next/link'
import React from 'react'

const TitleRoometting = () => {
  return (
    <div>
        <div>
         <section className="w-full px-4 md:px-10 lg:px-24 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cột trái – nội dung */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Phòng họp Bái Đính 
          </h2>
          <hr className="mb-6 border-gray-300" />
          <div className="space-y-4 text-justify text-gray-800 leading-relaxed">
            <p>
              Ẩn mình giữa khuôn viên Chùa Bái Đính – ngôi chùa lớn nhất Đông
              Nam Á với nhiều kỷ lục được xác lập, xen lẫn bên cạnh những ngọn
              núi cao thấp trên xã Gia Sinh, huyện Gia Viễn, Tâm An_Thiên An là
              một nhà hàng sang trọng với lối kiến trúc mang dáng dấp kết hợp
              giữa 2 phong cách Á Đông cổ điển và Tây Âu hiện đại.
            </p>
            <p>
              Toàn bộ nhà hàng là một không gian mở, thực khách có thể phóng
              tầm mắt ngắm nhìn cảnh sắc thiên nhiên còn đậm nét hoang sơ của
              núi rừng Bái Đính. Lấy tông màu chủ đạo là “nâu gụ”, Tâm An_Thiên
              An mang lại cảm giác bình yên, gần gũi nhưng không kém phần hoài
              cổ, uy nghiêm.
            </p>
            <p>
              Với những tấm bình phong được trạm khắc hoa văn tinh tế, đặc sắc
              mang hơi hướng của bốn mùa Xuân, Hạ, Thu, Đông, đến những bộ bàn
              ghế, chậu hoa, cây cảnh cũng được bày đặt tinh tế, khoa học, tạo
              sự ấm cúng, lãng mạn. Quả thật đây là nơi độc đáo để thực khách
              thỏa sức khám phá nét đẹp văn hóa ẩm thực “Chay Thiền”, cũng như
              những món đặc sản của mảnh đất Cố đô hay làm mới vị giác của mình
              bằng các món ăn Á – Âu.
            </p>
            <p>
              Điều đặc biệt ở đây, quý khách có thể tự lựa chọn cho mình vị trí,
              không gian ngồi vừa ý nhất trong nhà hàng với 2 khu riêng biệt
              Chay – Mặn với phong cách trang trí theo 4 mùa đặc trưng của năm,
              hứa hẹn mang đến cảm giác đa dạng khó quên trong lòng du khách.
            </p>
            <p>
              Bên cạnh không gian yên tĩnh, cổ điển, sang trọng thì ẩm thực là
              một điểm nhấn thú vị của Tâm An – Thiên An. Thực đơn với các món
              ăn thuần Chay phong phú cùng các món đặc sản địa phương, các món
              Âu – Á đặc trưng đều được đội ngũ đầu bếp có chuyên môn, nghiệp
              vụ thể hiện tinh tế trong cả hương vị và cách trình bày. Thức
              uống cũng là một phần thiết yếu trong thực đơn của Tâm An– Thiên
              An, đa dạng về các loại nước uống “chay” hấp dẫn, lạ miệng còn có
              thêm ly trà thảo mộc ấm nóng đủ để thức tỉnh vị giác, khứu giác
              của bạn.
            </p>
          </div>
        </div>

        {/* Cột phải – đặt dịch vụ */}
        <div className="border-l border-gray-200 pl-6">
          <h3 className="text-xl font-semibold mb-4">Đặt dịch vụ</h3>
          <div className="flex flex-col gap-4">
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
            <button className="bg-green-900 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-md border-2 border-yellow-500 rounded-[10px]">
              ĐẶT NGAY
            </button>
          </div>
        </div>
      </div>
    </section>


    <section className="w-[600px] px-4 md:px-10 lg:px-24 pt-12 pb-16">
      <h2 className="text-2xl font-semibold mb-2">Gợi ý khác</h2>
      <hr className="mb-6 border-gray-300" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gợi ý 1 */}
        <Link href='/oderpage'>
        <div>
          <img
            src="https://www.baidinhhotel.com/baidinhhotel-images/banner/img/k.jpg"
            alt="Khách xá Bái Đính"
            className="w-full h-auto rounded-md"
          />
          <h3 className="mt-4 text-xl font-medium">Khách xá Bái Đính</h3>
          <p className="text-gray-600 text-sm">
            Khách xá Bái Đính tọa lạc trong khuôn viên chùa Bái Đính
          </p>
        </div>
        </Link>
       

        {/* Gợi ý 2 */}
        <Link href='/oderpage'>
        <div>
          <img
            src="https://www.baidinhhotel.com/baidinhhotel-images/banner/img/QPPI4VRBB_DSC_9431.jpg"
            alt="Xe điện Bái Đính"
            className="w-full h-auto rounded-md"
          />
          <h3 className="mt-4 text-xl font-medium">
            Phòng họp Bái Đính
          </h3>
          <p className="text-gray-600 text-sm">
            Xe điện đồng hành mang đến những trải nghiệm ấn tượng
          </p>
        </div>
        </Link>
       
      </div>
    </section>
    </div>
    </div>
  )
}

export default TitleRoometting