import React from 'react';

const OderRoom = () => {
  return (
    <div className="w-full bg-white mt-[60px]">
      {/* Image Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {/* Chỉ hiển thị ảnh đầu tiên trên điện thoại */}
        <div className="md:col-span-2 md:row-span-2 h-[300px] md:h-[600px]">
          <img
            src="https://images.getaroom-cdn.com/image/upload/s--mcGj3qlu--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1704379900/647bccec55c79a147d711a68a71b5ee5f7008bcc?_a=BACAEuDL&atc=e7cd1cfa"
            alt="Bai Dinh"
            className="w-full h-full object-cover rounded-lg shadow-lg hover:opacity-90 transition duration-300"
          />
        </div>

        {/* Các ảnh khác chỉ hiển thị trên màn hình lớn */}
        <div className="hidden md:block h-[200px] md:h-[290px]">
          <img
            src="https://images.getaroom-cdn.com/image/upload/s--BSBLzL18--/c_limit,e_improve,fl_lossy.immutable_cache,h_460,q_auto:good,w_460/v1710243213/20d711dffaa8418ab4d628f27bbe7c4fa9531773?_a=BACAEuDL&atc=e7cd1cfa"
            alt="View 1"
            className="w-full h-full object-cover rounded-lg shadow-lg hover:opacity-90 transition duration-300"
          />
        </div>
        <div className="hidden md:block h-[200px] md:h-[290px]">
          <img
            src="https://images.getaroom-cdn.com/image/upload/s--6rPjOf2D--/c_limit,e_improve,fl_lossy.immutable_cache,h_460,q_auto:good,w_460/v1710243213/c1d3edfc7cd1f6c5c7cc94eca6693bdeff3fba5f?_a=BACAEuDL&atc=e7cd1cfa"
            alt="View 2"
            className="w-full h-full object-cover rounded-lg shadow-lg hover:opacity-90 transition duration-300"
          />
        </div>
        <div className="hidden md:block h-[200px] md:h-[290px]">
          <img
            src="https://images.getaroom-cdn.com/image/upload/s--4aTrJTwi--/c_limit,e_improve,fl_lossy.immutable_cache,h_460,q_auto:good,w_460/v1710243213/587c86e306a3fd2fe1cebe63fa2077b0bfcea39b?_a=BACAEuDL&atc=e7cd1cfa"
            alt="View 3"
            className="w-full h-full object-cover rounded-lg shadow-lg hover:opacity-90 transition duration-300"
          />
        </div>
        <div className="hidden md:block h-[200px] md:h-[290px]">
          <img
            src="https://images.getaroom-cdn.com/image/upload/s--4aTrJTwi--/c_limit,e_improve,fl_lossy.immutable_cache,h_460,q_auto:good,w_460/v1710243213/587c86e306a3fd2fe1cebe63fa2077b0bfcea39b?_a=BACAEuDL&atc=e7cd1cfa"
            alt="View 3"
            className="w-full h-full object-cover rounded-lg shadow-lg hover:opacity-90 transition duration-300"
          />
        </div>
      </div>

      {/* Hotel Info */}
      <div className="px-4 py-6 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Khách sạn Bái Đính</h1>
        <p className="text-gray-600 text-lg">Chùa Bái Đính, làng Gia Sinh, Ninh Bình, Việt Nam</p>
      </div>
    </div>
  );
};

export default OderRoom;