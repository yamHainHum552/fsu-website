import {
  FacebookOutlined,
  Instagram,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
import Link from "next/link";
import React from "react";

const FollowUs = () => {
  return (
    <div className="px-4 w-full flex flex-col items-center gap-4 rounded-lg shadow-lg shadow-[#07040334] bg-white py-4">
      <h1 className="lg:text-2xl text-lg">
        Follow us to get the latest updates:
      </h1>
      <div className="flex gap-4">
        <Link
          href="https://www.facebook.com/profile.php?id=61576373201271"
          target="__blank"
          className="text-[#1877F2] hover:scale-125 duration-200"
        >
          <FacebookOutlined color="inherit" fontSize="large" />
        </Link>
        <Link
          href="https://www.instagram.com/fsuerc/"
          target="__blank"
          className="text-[#ffffff] hover:scale-125 duration-200"
        >
          <Instagram color="error" fontSize="large" />
        </Link>
        <Link
          href="https://www.linkedin.com/company/107169823"
          target="__blank"
          className="text-[#1DA1F2] hover:scale-125 duration-200"
        >
          <LinkedIn color="inherit" fontSize="large" />
        </Link>
      </div>
    </div>
  );
};

export default FollowUs;
