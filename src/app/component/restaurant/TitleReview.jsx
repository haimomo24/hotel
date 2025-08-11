'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";

const TitleReview = () => {
  const [showImage, setShowImage] = useState(false);
  const [zoom, setZoom] = useState(false);

  // Thoát popup khi nhấn ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowImage(false);
        setZoom(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div>
      <section className="w-full px-4 md:px-10 lg:px-24 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột trái – nội dung */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Khách xá Bái Đính
            </h2>
            <hr className="mb-6 border-gray-300" />
            <div className="space-y-4 text-justify text-gray-800 leading-relaxed">
              <p>
                Nằm trong lòng quần thể chùa Bái Đính linh thiêng – ngôi chùa
                lớn nhất Việt Nam với hàng loạt kỷ lục ấn tượng, khách xá Bái
                Đính hiện lên như một viên ngọc ẩn mình giữa non nước hữu tình.
                Được xây dựng theo lối kiến trúc cổ kính đậm chất Á Đông, nơi đây
                vừa mang dáng vẻ uy nghiêm, vừa toát lên sự thanh tao, sang
                trọng. Tựa lưng vào những dãy núi trập trùng hùng vĩ, khách sạn
                là chốn dừng chân lý tưởng cho du khách hành hương về miền đất
                Phật, tổ chức hội họp, hay đắm mình trong những trải nghiệm đa
                sắc màu của vùng đất Ninh Bình thơ mộng.
              </p>

              {/* Ảnh xen giữa */}
              <div className="flex justify-center my-6">
                <img
                  src="/images/DSC09995-HDR.JPG"
                  alt="Bản đồ dịch vụ"
                  className="w-full max-w-[800px] max-h-[800px] object-contain rounded-lg cursor-pointer border border-gray-300 shadow-md transform transition-transform duration-300 hover:scale-105"
                 
                />
              </div>

              <p>
                Khách xá Bái Đính được chăm chút tỉ mỉ trong từng chi tiết thiết
                kế, với không gian trang nghiêm và nội thất chế tác từ những loại
                gỗ quý hiếm, tạo nên cảm giác ấm áp, thư thái. Khi đặt chân đến
                nơi đây, mọi mệt mỏi, lo toan thường nhật dường như tan biến,
                nhường chỗ cho sự bình yên và thanh tịnh trong tâm hồn. Giữa
                không gian thiên nhiên thanh vắng, du khách có thể lắng nghe
                tiếng chuông chùa ngân vang trong gió, như lời thức tỉnh dịu dàng
                từ cõi tâm linh, hòa quyện cùng những lời giảng sâu sắc về đạo
                Phật và đạo làm người – giúp ta sống chậm lại, sống tốt hơn, và
                sống trọn vẹn từng khoảnh khắc.
              </p>
             
              <p>
                Khách xá Bái Đính nằm ngay trong khuôn viên chùa Bái Đính – ngôi
                chùa lớn nhất Đông Nam Á. Từ khách xá, bạn chỉ cần vài phút đi bộ
                là có thể tham quan các công trình nổi bật như:
              </p>
              <ul className="list-disc list-inside text-gray-800 ml-4">
                <li>Tượng Phật Di Lặc bằng đồng lớn nhất Đông Nam Á</li>
                <li>Hành lang La Hán dài hun hút</li>
                <li>Bảo tháp 13 tầng linh thiêng</li>
                <li>Điện Tam Thế, Điện Pháp Chủ...</li>
                <li>
                  Sáng sớm hoặc chiều tà, đi dạo quanh khuôn viên chùa, hít thở
                  không khí trong lành và nghe tiếng chuông chùa ngân vang là một
                  trải nghiệm vô cùng an yên.
                </li>
              </ul>
              <p>
                Phòng ốc tiện nghi, mang đậm chất thiền. Khách xá được xây dựng
                theo kiến trúc truyền thống, kết hợp giữa gỗ, đá và mái ngói cổ
                kính. Nội thất trong phòng đơn giản nhưng đầy đủ tiện nghi:
              </p>
              <div className="flex justify-center my-6">
                <img
                  src="/images/phongnghi.JPG"
                  alt="Phòng nghỉ"
                  className="w-full max-w-[800px] max-h-[800px] object-contain rounded-lg cursor-pointer border border-gray-300 shadow-md transform transition-transform duration-300 hover:scale-105"
                />
              </div>
              <ul className="list-disc list-inside text-gray-800 ml-4">
                <li>Điều hòa, nước nóng, TV, wifi...</li>
                <li>Giường đệm sạch sẽ, thoải mái</li>
                <li>Một số phòng có view nhìn ra núi hoặc khu chùa</li>
                <li>
                  Không gian yên tĩnh tuyệt đối, rất thích hợp cho những ai muốn
                  tĩnh tâm, thiền định, hoặc đơn giản chỉ là nghỉ ngơi trọn vẹn.
                </li>
              </ul>
              <p>
                Bên cạnh không gian yên tĩnh, cổ điển, sang trọng thì ẩm thực là
                một điểm nhấn thú vị của Tâm An – Thiên An. Thực đơn với các món
                ăn thuần chay phong phú cùng các món đặc sản địa phương, các món
                Âu – Á đặc trưng đều được đội ngũ đầu bếp có chuyên môn, nghiệp
                vụ thể hiện tinh tế trong cả hương vị và cách trình bày. Thức uống
                cũng là một phần thiết yếu trong thực đơn của Tâm An – Thiên An,
                đa dạng về các loại nước uống “chay” hấp dẫn, lạ miệng, cùng ly
                trà thảo mộc ấm nóng đủ để thức tỉnh vị giác, khứu giác của bạn.
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
              <Link rel="stylesheet" href="/oderpage" >
                <button className="bg-green-900 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-md border-2 border-yellow-500 rounded-[10px]">
                  ĐẶT NGAY
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popup ảnh to */}
      {showImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button
            className="absolute top-6 left-6 bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-200"
            onClick={() => setShowImage(false)}
          >
            X
          </button>
          <img
            src="/images/Ban Do-01.jpg"
            alt="Ảnh phóng to"
            onDoubleClick={() => setZoom(!zoom)}
            className={`object-contain rounded-lg shadow-lg transition-transform duration-300 ${
              zoom ? "scale-150" : "scale-100"
            } max-w-[90%] max-h-[90%] cursor-zoom-in`}
          />
        </div>
      )}

      <section className="w-[600px] px-4 md:px-10 lg:px-24 pt-12 pb-16">
        <h2 className="text-2xl font-semibold mb-2">Gợi ý khác</h2>
        <hr className="mb-6 border-gray-300" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gợi ý 1 */}
          <Link href="/oderpage">
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
          <Link href="/oderpage">
            <div>
              <img
                src="https://www.baidinhhotel.com/baidinhhotel-images/banner/img/QPPI4VRBB_DSC_9431.jpg"
                alt="Phòng họp Bái Đính"
                className="w-full h-auto rounded-md"
              />
              <h3 className="mt-4 text-xl font-medium">Phòng họp Bái Đính</h3>
              <p className="text-gray-600 text-sm">
                Xe điện đồng hành mang đến những trải nghiệm ấn tượng
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TitleReview;
