import { Montserrat } from "next/font/google";
import React from "react";
import Image from "next/image";

const montserrat = Montserrat({
  weight: ["100", "300", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const Welcome = () => {
  return (
    <div
      className={`bg-neutral-200 md:w-[80%] mx-auto w-full h-full flex flex-col md:flex-row justify-center items-center ${montserrat.className} p-8 mt-10 rounded-xl`}
    >
      {/* Left: Image */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-6">
        <div className="relative w-full h-64 md:h-80">
          <Image
            src={"/campus.jpg"}
            alt="Purwanchal Campus"
            fill
            className="rounded-xl object-cover"
            priority
          />
        </div>
      </div>

      {/* Right: Text */}
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <h1 className="text-[24px] text-primary-500 sm:text-[26px] md:text-[30px] lg:text-[36px] font-bold font-sans text-center md:text-left">
          Welcome to Purwanchal Campus
        </h1>
        <p className="text-[14px] md:text-[15px] lg:text-[16px] text-justify">
          Purwanchal Campus, formerly known as Eastern Region (ERC) Campus, is
          one of the constituent campuses of Tribhuvan University (TU) and a key
          associate engineering campus of the Institute of Engineering (IOE). It
          is a comprehensive, non-profit institution of higher education in
          Nepal, funded by the Government of Nepal. Currently, the campus offers
          seven bachelor's degree programs (Agricultural, Architecture, Civil,
          Computer, Electrical, Electronics Communication & Information,
          Mechanical) and one master's degree program in Land and Water
          Engineering. Located at Gangalal Marg, Tinkune, Dharan-8, Sunsari, the
          campus spans 443 ropani (34-13-11.75 Bighas). With a focus on academic
          excellence, research, and innovation, Purwanchal Campus is dedicated
          to delivering quality engineering education.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
