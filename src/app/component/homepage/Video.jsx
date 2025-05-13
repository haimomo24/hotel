import React from 'react';

const Video = () => {
  return (
    <div className="bg-[#f4f0ea] flex justify-center md:min-h-screen md:items-center">
      <div className="w-full max-w-6xl aspect-video relative overflow-hidden rounded-xl shadow-lg">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="images/video1.mp4" type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      </div>
    </div>
  );
};

export default Video;
