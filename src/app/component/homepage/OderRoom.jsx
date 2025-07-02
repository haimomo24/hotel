import React from 'react';

const OderRoom = () => {
  return (
    <div className="w-full bg-white mt-[60px]">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <div className="md:col-span-2 md:row-span-2 h-[300px] md:h-[600px]">
          <img
            src="https://images.getaroom-cdn.com/image/upload/s--mcGj3qlu--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1704379900/647bccec55c79a147d711a68a71b5ee5f7008bcc?_a=BACAEuDL&atc=e7cd1cfa"
            alt="Bai Dinh"
            className="w-full h-full object-cover rounded-lg shadow-lg hover:opacity-90 transition duration-300"
          />
        </div>
        {[
          "https://images.getaroom-cdn.com/image/upload/s--BSBLzL18--/c_limit,e_improve,fl_lossy.immutable_cache,h_460,q_auto:good,w_460/v1710243213/20d711dffaa8418ab4d628f27bbe7c4fa9531773?_a=BACAEuDL&atc=e7cd1cfa",
          "https://images.getaroom-cdn.com/image/upload/s--6rPjOf2D--/c_limit,e_improve,fl_lossy.immutable_cache,h_460,q_auto:good,w_460/v1710243213/c1d3edfc7cd1f6c5c7cc94eca6693bdeff3fba5f?_a=BACAEuDL&atc=e7cd1cfa",
          "https://images.getaroom-cdn.com/image/upload/s--4aTrJTwi--/c_limit,e_improve,fl_lossy.immutable_cache,h_460,q_auto:good,w_460/v1710243213/587c86e306a3fd2fe1cebe63fa2077b0bfcea39b?_a=BACAEuDL&atc=e7cd1cfa",
          "https://images.getaroom-cdn.com/image/upload/s--FOP4_WmS--/c_limit,e_improve,fl_lossy.immutable_cache,h_460,q_auto:good,w_460/v1747896805/af1631578d8bfa1e460b2465c31337fc5412bc8d?_a=BACAEuDL&atc=e7cd1cfa"
        ].map((src, index) => (
          <div key={index} className="h-[200px] md:h-[290px]">
            <img
              src={src}
              alt={`View ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-lg hover:opacity-90 transition duration-300"
            />
          </div>
        ))}
      </div>

      {/* Hotel Info - Responsive */}
      <div className="px-4 py-6 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Khách sạn Bái Đính</h1>
        <p className="text-gray-600 text-lg">Chùa Bái Đính, làng Gia Sinh, Ninh Bình, Việt Nam</p>
      </div>

      {/* Booking Section - Responsive */}
      {/* <div className="bg-gray-100 px-4 py-8 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="booking-input">
              <label className="block text-sm font-medium text-gray-700 mb-2">Đăng ký vào</label>
              <input type="date" className="w-full p-3 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="booking-input">
              <label className="block text-sm font-medium text-gray-700 mb-2">Trả phòng</label>
              <input type="date" className="w-full p-3 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="booking-input">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phòng</label>
              <select className="w-full p-3 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500">
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div className="booking-input">
              <label className="block text-sm font-medium text-gray-700 mb-2">Người lớn</label>
              <select className="w-full p-3 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500">
                {[1,2,3,4].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div className="booking-input">
              <label className="block text-sm font-medium text-gray-700 mb-2">Trẻ em</label>
              <select className="w-full p-3 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500">
                {[0,1,2,3].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                TÌM PHÒNG
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default OderRoom;
