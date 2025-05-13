import React from 'react'

const Footer = () => {
  return (
    <div>
        <section className="pt-16 pb-7 bg-[#713309]  ">
  <div className="mx-auto bg-[#713309] max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-14 border-b-2 border-gray-200">
      <div className="flex flex-col gap-8 xl:gap-14 w-full lg:max-w-full mx-auto">
        <div className="flex flex-col gap-8">
          <h2 className="font-manrope font-bold text-4xl leading-snug text-gray-900 max-[470px]:text-center">
            BaiDinh Hotel
            
          </h2>
          <p className="text-base font-normal text-gray-500 max-[470px]:text-center">
            Take the First Step Towards Success!
          </p>
          <div className="flex items-center max-[470px]:justify-center gap-5">
            <a
              href="javascript:;"
              className="p-2 text-black rounded transition-all duration-500 hover:bg-yellow-800 focus-within:bg-yellow-800 hover:text-white focus-within:outline-0 focus-within:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13.5854 10.7242L19.79 3.66699H18.3197L12.9323 9.79466L8.62939 3.66699H3.6665L10.1733 12.9331L3.6665 20.3337H5.13687L10.8261 13.8626L15.3703 20.3337H20.3332L13.5851 10.7242H13.5854ZM11.5716 13.0147L10.9123 12.092L5.66666 4.75005H7.92505L12.1583 10.6753L12.8176 11.598L18.3204 19.2999H16.062L11.5716 13.0151V13.0147Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="javascript:;"
              className="p-2 h-10 w-10 flex items-center justify-center text-black rounded transition-all duration-500 hover:bg-yellow-800 focus-within:outline-0 focus-within:bg-yellow-800 hover:text-white focus-within:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M6.14869 8.92708C6.14869 7.39302 7.3927 6.14908 8.92769 6.14908C10.4627 6.14908 11.7074 7.39302 11.7074 8.92708C11.7074 10.4611 10.4627 11.7051 8.92769 11.7051C7.3927 11.7051 6.14869 10.4611 6.14869 8.92708ZM4.64605 8.92708C4.64605 11.2904 6.56294 13.2061 8.92769 13.2061C11.2924 13.2061 13.2093 11.2904 13.2093 8.92708C13.2093 6.56375 11.2924 4.64802 8.92769 4.64802C6.56294 4.64802 4.64605 6.56375 4.64605 8.92708ZM12.3782 4.47835C12.3781 4.67613 12.4368 4.86949 12.5466 5.03399C12.6565 5.19848 12.8127 5.32672 12.9955 5.40248C13.1783 5.47824 13.3795 5.49812 13.5736 5.45961C13.7678 5.42111 13.9461 5.32594 14.0861 5.18614C14.2261 5.04634 14.3214 4.8682 14.3601 4.67423C14.3988 4.48027 14.3791 4.27919 14.3034 4.09644C14.2278 3.91368 14.0996 3.75745 13.9351 3.6475C13.7706 3.53756 13.5771 3.47883 13.3792 3.47875H13.3788C13.1136 3.47887 12.8592 3.58422 12.6716 3.77164C12.484 3.95906 12.3785 4.21324 12.3782 4.47835V4.47835ZM5.559 15.7102C4.74605 15.6732 4.30418 15.5379 4.01054 15.4235C3.62124 15.2721 3.34347 15.0917 3.05143 14.8002C2.75939 14.5087 2.57861 14.2314 2.42772 13.8423C2.31326 13.549 2.17784 13.1073 2.14089 12.2948C2.10046 11.4164 2.09239 11.1525 2.09239 8.92715C2.09239 6.70175 2.10113 6.43862 2.14089 5.55948C2.17791 4.74702 2.31432 4.30615 2.42772 4.01195C2.57928 3.62288 2.75979 3.34528 3.05143 3.05342C3.34307 2.76155 3.62057 2.58088 4.01054 2.43008C4.30405 2.31568 4.74605 2.18035 5.559 2.14342C6.43793 2.10302 6.70195 2.09495 8.92769 2.09495C11.1534 2.09495 11.4177 2.10368 12.2974 2.14342C13.1103 2.18042 13.5515 2.31675 13.8458 2.43008C14.2351 2.58088 14.5129 2.76195 14.8049 3.05342C15.097 3.34488 15.2771 3.62288 15.4287 4.01195C15.5431 4.30528 15.6785 4.74702 15.7155 5.55948C15.7559 6.43862 15.764 6.70175 15.764 8.92715C15.764 11.1525 15.7559 11.4157 15.7155 12.2948C15.6785 13.1073 15.5424 13.5489 15.4287 13.8423C15.2771 14.2314 15.0966 14.509 14.8049 14.8002C14.5133 15.0914 14.2351 15.2721 13.8458 15.4235C13.5523 15.5379 13.1103 15.6733 12.2974 15.7102C11.4184 15.7506 11.1544 15.7587 8.92769 15.7587C6.70095 15.7587 6.43766 15.7506 5.559 15.7102V15.7102ZM5.48996 0.644217C4.6023 0.684617 3.99573 0.825283 3.46601 1.03128C2.91742 1.24402 2.45301 1.52942 1.98893 1.99248C1.52485 2.45555 1.24001 2.92042 1.02715 3.46868C0.821028 3.99842 0.680277 4.60428 0.639852 5.49142C0.598761 6.37995 0.589355 6.66402 0.589355 8.92708C0.589355 11.1901 0.598761 11.4742 0.639852 12.3627C0.680277 13.2499 0.821028 13.8557 1.02715 14.3855C1.24001 14.9334 1.52492 15.3988 1.98893 15.8617C2.45294 16.3245 2.91742 16.6096 3.46601 16.8229C3.99673 17.0289 4.6023 17.1695 5.48996 17.2099C6.37949 17.2503 6.66326 17.2604 8.92769 17.2604C11.1921 17.2604 11.4763 17.251 12.3654 17.2099C13.2531 17.1695 13.8593 17.0289 14.3894 16.8229C14.9376 16.6096 15.4024 16.3247 15.8664 15.8617C16.3305 15.3986 16.6148 14.9334 16.8282 14.3855C17.0343 13.8557 17.1758 13.2499 17.2155 12.3627C17.2559 11.4735 17.2654 11.1901 17.2654 8.92708C17.2654 6.66402 17.2559 6.37995 17.2155 5.49142C17.1751 4.60422 17.0343 3.99808 16.8282 3.46868C16.6148 2.92075 16.3298 2.45628 15.8664 1.99248C15.4031 1.52868 14.9376 1.24402 14.39 1.03128C13.8593 0.825283 13.2531 0.68395 12.3661 0.644217C11.477 0.603817 11.1928 0.59375 8.92836 0.59375C6.66393 0.59375 6.37949 0.60315 5.48996 0.644217Z"
                  fill="currentColor"
                />
                <path
                  d="M6.14869 8.92708C6.14869 7.39302 7.3927 6.14908 8.92769 6.14908C10.4627 6.14908 11.7074 7.39302 11.7074 8.92708C11.7074 10.4611 10.4627 11.7051 8.92769 11.7051C7.3927 11.7051 6.14869 10.4611 6.14869 8.92708ZM4.64605 8.92708C4.64605 11.2904 6.56294 13.2061 8.92769 13.2061C11.2924 13.2061 13.2093 11.2904 13.2093 8.92708C13.2093 6.56375 11.2924 4.64802 8.92769 4.64802C6.56294 4.64802 4.64605 6.56375 4.64605 8.92708ZM12.3782 4.47835C12.3781 4.67613 12.4368 4.86949 12.5466 5.03399C12.6565 5.19848 12.8127 5.32672 12.9955 5.40248C13.1783 5.47824 13.3795 5.49812 13.5736 5.45961C13.7678 5.42111 13.9461 5.32594 14.0861 5.18614C14.2261 5.04634 14.3214 4.8682 14.3601 4.67423C14.3988 4.48027 14.3791 4.27919 14.3034 4.09644C14.2278 3.91368 14.0996 3.75745 13.9351 3.6475C13.7706 3.53756 13.5771 3.47883 13.3792 3.47875H13.3788C13.1136 3.47887 12.8592 3.58422 12.6716 3.77164C12.484 3.95906 12.3785 4.21324 12.3782 4.47835V4.47835ZM5.559 15.7102C4.74605 15.6732 4.30418 15.5379 4.01054 15.4235C3.62124 15.2721 3.34347 15.0917 3.05143 14.8002C2.75939 14.5087 2.57861 14.2314 2.42772 13.8423C2.31326 13.549 2.17784 13.1073 2.14089 12.2948C2.10046 11.4164 2.09239 11.1525 2.09239 8.92715C2.09239 6.70175 2.10113 6.43862 2.14089 5.55948C2.17791 4.74702 2.31432 4.30615 2.42772 4.01195C2.57928 3.62288 2.75979 3.34528 3.05143 3.05342C3.34307 2.76155 3.62057 2.58088 4.01054 2.43008C4.30405 2.31568 4.74605 2.18035 5.559 2.14342C6.43793 2.10302 6.70195 2.09495 8.92769 2.09495C11.1534 2.09495 11.4177 2.10368 12.2974 2.14342C13.1103 2.18042 13.5515 2.31675 13.8458 2.43008C14.2351 2.58088 14.5129 2.76195 14.8049 3.05342C15.097 3.34488 15.2771 3.62288 15.4287 4.01195C15.5431 4.30528 15.6785 4.74702 15.7155 5.55948C15.7559 6.43862 15.764 6.70175 15.764 8.92715C15.764 11.1525 15.7559 11.4157 15.7155 12.2948C15.6785 13.1073 15.5424 13.5489 15.4287 13.8423C15.2771 14.2314 15.0966 14.509 14.8049 14.8002C14.5133 15.0914 14.2351 15.2721 13.8458 15.4235C13.5523 15.5379 13.1103 15.6733 12.2974 15.7102C11.4184 15.7506 11.1544 15.7587 8.92769 15.7587C6.70095 15.7587 6.43766 15.7506 5.559 15.7102V15.7102ZM5.48996 0.644217C4.6023 0.684617 3.99573 0.825283 3.46601 1.03128C2.91742 1.24402 2.45301 1.52942 1.98893 1.99248C1.52485 2.45555 1.24001 2.92042 1.02715 3.46868C0.821028 3.99842 0.680277 4.60428 0.639852 5.49142C0.598761 6.37995 0.589355 6.66402 0.589355 8.92708C0.589355 11.1901 0.598761 11.4742 0.639852 12.3627C0.680277 13.2499 0.821028 13.8557 1.02715 14.3855C1.24001 14.9334 1.52492 15.3988 1.98893 15.8617C2.45294 16.3245 2.91742 16.6096 3.46601 16.8229C3.99673 17.0289 4.6023 17.1695 5.48996 17.2099C6.37949 17.2503 6.66326 17.2604 8.92769 17.2604C11.1921 17.2604 11.4763 17.251 12.3654 17.2099C13.2531 17.1695 13.8593 17.0289 14.3894 16.8229C14.9376 16.6096 15.4024 16.3247 15.8664 15.8617C16.3305 15.3986 16.6148 14.9334 16.8282 14.3855C17.0343 13.8557 17.1758 13.2499 17.2155 12.3627C17.2559 11.4735 17.2654 11.1901 17.2654 8.92708C17.2654 6.66402 17.2559 6.37995 17.2155 5.49142C17.1751 4.60422 17.0343 3.99808 16.8282 3.46868C16.6148 2.92075 16.3298 2.45628 15.8664 1.99248C15.4031 1.52868 14.9376 1.24402 14.39 1.03128C13.8593 0.825283 13.2531 0.68395 12.3661 0.644217C11.477 0.603817 11.1928 0.59375 8.92836 0.59375C6.66393 0.59375 6.37949 0.60315 5.48996 0.644217Z"
                  fill=""
                />
                <defs>
                  <radialGradient
                    id="paint0_radial_539_510"
                    cx={0}
                    cy={0}
                    r={1}
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(2.80495 17.3391) scale(21.77 21.7569)"
                  >
                    <stop offset="0.09" stopColor="#FA8F21" />
                    <stop offset="0.78" stopColor="#D82D7E" />
                  </radialGradient>
                  <radialGradient
                    id="paint1_radial_539_510"
                    cx={0}
                    cy={0}
                    r={1}
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(10.703 18.0858) scale(17.1578 17.1475)"
                  >
                    <stop offset="0.64" stopColor="#8C3AAA" stopOpacity={0} />
                    <stop offset={1} stopColor="#8C3AAA" />
                  </radialGradient>
                </defs>
              </svg>
            </a>
            <a
              href="javascript:;"
              className="p-2 text-black rounded transition-all duration-500 hover:bg-yellow-800 focus-within:bg-yellow-800 hover:text-white focus-within:outline-0 focus-within:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15.4977 12.8803L15.9326 10.1198H13.2539V8.32546C13.2539 7.57064 13.6278 6.83307 14.8237 6.83307H16.0587V4.48234C15.3395 4.36776 14.6128 4.30577 13.8844 4.29688C11.6797 4.29687 10.2403 5.62104 10.2403 8.0149V10.1198H7.79639V12.8803H10.2403V19.5572H13.2539V12.8803H15.4977Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="javascript:;"
              className="p-2 text-black group rounded transition-all duration-500 hover:bg-yellow-800 focus-within:bg-yellow-800 hover:text-white focus-within:outline-0 focus-within:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20.3677 7.90615C20.1684 7.15701 19.5789 6.56602 18.8289 6.36347C17.4728 6 12.0319 6 12.0319 6C12.0319 6 6.59366 6 5.23479 6.36347C4.48756 6.56324 3.89807 7.15423 3.69604 7.90615C3.3335 9.2657 3.3335 12.1041 3.3335 12.1041C3.3335 12.1041 3.3335 14.9425 3.69604 16.3021C3.89531 17.0512 4.48479 17.6422 5.23479 17.8448C6.59366 18.2082 12.0319 18.2082 12.0319 18.2082C12.0319 18.2082 17.4728 18.2082 18.8289 17.8448C19.5762 17.645 20.1657 17.054 20.3677 16.3021C20.7302 14.9425 20.7302 12.1041 20.7302 12.1041C20.7302 12.1041 20.7302 9.2657 20.3677 7.90615Z"
                  fill="currentColor"
                />
                <path
                  className="fill-white transition-all divide-gray-500 group-hover:fill-yellow-800 group-focus-within:fill-yellow-800"
                  d="M10.2939 14.7206L14.8132 12.1041L10.2939 9.48767V14.7206Z"
                  fill=""
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex  flex-col min-[470px]:flex-row min-[470px]:items-center gap-3">
          <button className="flex items-center max-[470px]:justify-center gap-2 py-3 pr-5 pl-7 rounded-full text-base font-semibold text-white bg-yellow-800 shadow-transparent shadow-sm transition-all duration-500 hover:shadow-yellow-300 hover:bg-yellow-900">
            Start Project
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.1103 15.4744C3.84995 15.2141 3.84995 14.792 4.1103 14.5316L8.64205 9.99988L4.11325 5.47108C3.8529 5.21073 3.8529 4.78862 4.11325 4.52827C4.3736 4.26792 4.79571 4.26792 5.05606 4.52827L10.0563 9.52848C10.1813 9.6535 10.2515 9.82307 10.2515 9.99988C10.2515 10.1767 10.1813 10.3463 10.0563 10.4713L5.05311 15.4744C4.79276 15.7348 4.37065 15.7348 4.1103 15.4744Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.9438 15.4744C9.68345 15.2141 9.68345 14.792 9.9438 14.5316L14.4755 9.99988L9.94675 5.47108C9.6864 5.21073 9.6864 4.78862 9.94675 4.52827C10.2071 4.26792 10.6292 4.26792 10.8896 4.52827L15.8898 9.52848C16.0148 9.6535 16.085 9.82307 16.085 9.99988C16.085 10.1767 16.0148 10.3463 15.8898 10.4713L10.8866 15.4744C10.6263 15.7348 10.2041 15.7348 9.9438 15.4744Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button className="flex items-center max-[470px]:justify-center gap-2 border-2 border-yellow-800 py-2.5 pr-5 pl-7 rounded-full text-base font-semibold text-yellow-800 bg-white shadow-transparent shadow-sm transition-all duration-500 hover:shadow-yellow-300 hover:bg-yellow-800 hover:text-white ">
            Contact Us
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M11.1675 16.2888L11.7331 15.7231L11.1675 16.2888ZM3.71117 8.83253L3.14549 9.39822L3.14549 9.39822L3.71117 8.83253ZM17.0155 13.9496L17.5812 13.3839L17.5812 13.3839L17.0155 13.9496ZM14.9443 11.8784L14.3787 12.4441L14.3787 12.4441L14.9443 11.8784ZM7.78046 4.71452L7.21477 5.28021L7.21477 5.28021L7.78046 4.71452ZM6.0504 2.98447L6.61609 2.41878L6.61609 2.41878L6.0504 2.98447ZM11.533 11.8784L10.9673 12.4441L10.9673 12.4441L11.533 11.8784ZM7.78046 8.1259L8.34614 7.56021L8.34614 7.56021L7.78046 8.1259ZM7.78046 6.42021L8.34614 6.9859L8.34614 6.9859L7.78046 6.42021ZM13.2387 11.8784L13.8043 12.4441L13.8043 12.4441L13.2387 11.8784ZM3.71118 2.98447L3.14549 2.41878L3.71118 2.98447ZM17.0155 16.2888L17.5812 16.8545L17.5812 16.8545L17.0155 16.2888ZM12.4788 4.30734C12.0397 4.25754 11.6435 4.57306 11.5937 5.01208C11.5439 5.45109 11.8594 5.84735 12.2984 5.89714L12.4788 4.30734ZM14.0745 7.5725C14.1473 8.00829 14.5596 8.30255 14.9954 8.22976C15.4312 8.15697 15.7254 7.74468 15.6526 7.30889L14.0745 7.5725ZM11.5122 6.98575C11.0732 6.93595 10.6769 7.25147 10.6271 7.69048C10.5773 8.1295 10.8928 8.52576 11.3319 8.57555L11.5122 6.98575ZM11.5607 8.78902C11.6335 9.22481 12.0458 9.51908 12.4816 9.44628C12.9174 9.37349 13.2116 8.96121 13.1388 8.52541L11.5607 8.78902ZM13.5861 1.71878C13.1457 1.6833 12.7599 2.01155 12.7244 2.45195C12.689 2.89236 13.0172 3.27813 13.4576 3.31362L13.5861 1.71878ZM16.666 6.35769C16.7246 6.79562 17.1271 7.10315 17.565 7.04458C18.003 6.98601 18.3105 6.58352 18.2519 6.14559L16.666 6.35769ZM11.7331 15.7231L4.27686 8.26685L3.14549 9.39822L10.6018 16.8545L11.7331 15.7231ZM17.5812 13.3839L15.51 11.3127L14.3787 12.4441L16.4498 14.5153L17.5812 13.3839ZM8.34614 4.14884L6.61609 2.41878L5.48472 3.55016L7.21477 5.28021L8.34614 4.14884ZM8.34614 6.9859C9.12957 6.20246 9.12957 4.93227 8.34614 4.14884L7.21477 5.28021C7.37336 5.4388 7.37336 5.69593 7.21477 5.85452L8.34614 6.9859ZM7.21477 5.85452C6.43134 6.63796 6.43134 7.90815 7.21477 8.69158L8.34614 7.56021C8.18755 7.40162 8.18755 7.14449 8.34614 6.9859L7.21477 5.85452ZM12.673 11.3127C12.5144 11.4713 12.2572 11.4713 12.0987 11.3127L10.9673 12.4441C11.7507 13.2275 13.0209 13.2275 13.8043 12.4441L12.673 11.3127ZM15.51 11.3127C14.7266 10.5293 13.4564 10.5293 12.673 11.3127L13.8043 12.4441C13.9629 12.2855 14.2201 12.2855 14.3787 12.4441L15.51 11.3127ZM4.27686 8.26685C2.97438 6.96437 2.97438 4.85264 4.27686 3.55015L3.14549 2.41878C1.21817 4.3461 1.21817 7.4709 3.14549 9.39822L4.27686 8.26685ZM16.4498 15.7231C15.1474 17.0256 13.0356 17.0256 11.7331 15.7231L10.6018 16.8545C12.5291 18.7818 15.6539 18.7818 17.5812 16.8545L16.4498 15.7231ZM17.5812 16.8545C18.5396 15.8961 18.5396 14.3423 17.5812 13.3839L16.4498 14.5153C16.7834 14.8488 16.7834 15.3896 16.4498 15.7231L17.5812 16.8545ZM4.27686 3.55015C4.6104 3.21661 5.15118 3.21661 5.48472 3.55016L6.61609 2.41878C5.65771 1.46041 4.10387 1.4604 3.14549 2.41878L4.27686 3.55015ZM12.0987 11.3127L8.34614 7.56021L7.21477 8.69158L10.9673 12.4441L12.0987 11.3127ZM12.2984 5.89714C12.5824 5.92936 12.9837 6.03459 13.3286 6.28252C13.6515 6.51464 13.9614 6.89509 14.0745 7.5725L15.6526 7.30889C15.4671 6.19837 14.9147 5.45216 14.2624 4.98331C13.6322 4.53028 12.9452 4.36025 12.4788 4.30734L12.2984 5.89714ZM11.3319 8.57555C11.3813 8.58116 11.4424 8.60035 11.4825 8.62918C11.4985 8.64068 11.5106 8.65312 11.521 8.66953C11.531 8.68537 11.5492 8.72035 11.5607 8.78902L13.1388 8.52541C13.0467 7.97375 12.7638 7.57971 12.4163 7.32997C12.0909 7.09604 11.7441 7.01205 11.5122 6.98575L11.3319 8.57555ZM13.4576 3.31362C14.4328 3.39219 16.368 4.12904 16.666 6.35769L18.2519 6.14559C17.8106 2.84549 14.9275 1.82686 13.5861 1.71878L13.4576 3.31362Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-full lg:max-w-full mx-auto flex flex-col min-[470px]:flex-row justify-between gap-6 sm:gap-20 md:gap-10 xl:gap-24">
        <div className="">
          <h6 className="text-lg font-medium text-gray-900 mb-7 max-[470px]:text-center">
            Pagedone
          </h6>
          <ul className="flex flex-col max-[470px]:items-center max-[470px]:justify-center gap-6">
            <li>
              <a
                href="javascript:;"
                className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800"
              >
                Pro Version
              </a>
            </li>
          </ul>
        </div>
        <div className="">
          <h6 className="text-lg font-medium text-gray-900 mb-7 max-[470px]:text-center">
            Products
          </h6>
          <ul className="flex flex-col max-[470px]:items-center max-[470px]:justify-center gap-6">
            <li>
              <a
                href="javascript:;"
                className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800"
              >
                Figma UI System
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800"
              >
                Icons Assets
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800"
              >
                Responsive Blocks
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800"
              >
                Components Library
              </a>
            </li>
          </ul>
        </div>
        <div className="">
          <h6 className="text-lg font-medium text-gray-900 mb-7 max-[470px]:text-center">
            Resources
          </h6>
          <ul className="flex flex-col max-[470px]:items-center max-[470px]:justify-center gap-6">
            <li>
              <a
                href="javascript:;"
                className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800"
              >
                Quick Start
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                className="text-base font-normal max-lg:text-center text-gray-600 whitespace-nowrap transition-all duration-300 hover:text-yellow-800 focus-within:outline-0 focus-within:text-yellow-800"
              >
                User Guide
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
  </div>
</section>

    </div>
  )
}

export default Footer