"use client";
import { Menu } from "@mui/icons-material";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const montserrat = Montserrat({
  weight: ["100", "300", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const UserNav = () => {
  const [menu, setMenu] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const menuRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const getNotices = async () => {
      try {
        const res = await fetch("/api/notice");
        const data = await res.json();

        const sortedNotices = data.docs
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt DESC
          .slice(0, 5); // Take only the latest 5

        setNotices(sortedNotices);
      } catch (err) {
        console.log("An error occurred. Please check your code", err);
      }
    };

    getNotices();
  }, []);

  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     setMenu(false)
  //   }

  //   router.events.on("routeChangeComplete", handleRouteChange)
  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChange)
  //   }
  // }, [])

  // useEffect(() => {
  //   if (menuRef.current) {
  //     setMenuHeight(menuRef.current.scrollHeight)
  //   }
  // }, [menu])
  useEffect(() => {
    const handleRouteChange = () => {
      setMenu(false); // Close the menu when the route changes
    };

    handleRouteChange(); // Trigger on initial mount and route change
  }, [pathname]); // Runs whenever the route changes

  // Update menu height when the menu state changes
  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight); // Update height
    }
  }, [menu]);

  return (
    <div
      className={`h-fit w-full flex flex-col items-center justify-center ${montserrat.className}`}
    >
      <div className="w-[90%] py-2 flex items-center">
        <div className="flex items-center h-full">
          <Image
            alt="Logo"
            width={100} // Increased from 60 to 80
            height={100} // Increased from 60 to 80
            src="/logo.png"
            className="w-fit h-[4rem] md:h-[]" // Increased height from 3rem/4rem to 4rem/5rem
            unoptimized
            loading="lazy"
          />
        </div>
      </div>

      <div className="w-full h-[4rem] flex justify-center bg-primary-400 py-4 ">
        <div className="w-[90%] flex justify-end  ">
          <nav className="hidden md:flex w-full justify-center ">
            {/* NavLinks */}
            <ul className="flex gap-8 items-center  ">
              <Link href="/">
                <li
                  className="w-full flex flex-col overflow-hidden group text-background-50 "
                  // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
                >
                  Home
                  <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
                </li>
              </Link>
              <Link href="/about">
                <li
                  className="w-full flex flex-col overflow-hidden group text-background-50 "
                  // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
                >
                  About
                  <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
                </li>
              </Link>
              <Link href="/notice">
                <li
                  className="w-full flex flex-col overflow-hidden group text-background-50 "
                  // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
                >
                  Notice
                  <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
                </li>
              </Link>
              <Link href="/events">
                <li
                  className="w-full flex flex-col overflow-hidden group text-background-50 "
                  // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
                >
                  Events
                  <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
                </li>
              </Link>
              <Link href="/projects">
                <li
                  className="w-full flex flex-col overflow-hidden group text-background-50 "
                  // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
                >
                  Projects
                  <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
                </li>
              </Link>
              <Link href="/committee">
                <li
                  className="w-full flex flex-col overflow-hidden group text-background-50 "
                  // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
                >
                  Committee
                  <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
                </li>
              </Link>
              <Link href="/gallery">
                <li
                  className="w-full flex flex-col overflow-hidden group text-background-50"
                  // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
                >
                  Gallery
                  <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
                </li>
              </Link>
              <Link href="/complaintbox">
                <li
                  className="w-full flex flex-col overflow-hidden group text-background-50"
                  // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
                >
                  Complaint Box
                  <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
                </li>
              </Link>
              <Link href="/bloodbank">
                <li
                  className="w-full flex flex-col overflow-hidden group text-background-50"
                  // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
                >
                  Blood Bank
                  <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
                </li>
              </Link>
            </ul>
          </nav>

          <div
            className="flex md:hidden justify-center items-center cursor-pointer "
            onClick={() => {
              setMenu(!menu);
            }}
          >
            <Menu fontSize="large" />
          </div>
        </div>
      </div>
      {/* Notice Marquee */}
      {notices.length > 0 ? (
        <div className="w-full  overflow-hidden border-t  ">
          <div className="flex items-center justify-center font-bold whitespace-nowrap animate-marquee hover:[animation-play-state:paused] py-2 px-4">
            <h1 className="text-primary-500 font-bold">
              {notices ? "Notices 🔔" : ""}
            </h1>
            {notices?.map((notice, index) => (
              <Link
                key={index}
                href={`/notice/${notice._id}`}
                className="mx-4 text-sm text-blue-800 hover:underline shrink-0"
              >
                {notice.title}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div
        ref={menuRef}
        className={`w-full flex md:hidden transition-height duration-500 ease-in-out overflow-hidden`}
        style={{ height: menu ? `${menuHeight}px` : "0" }}
      >
        <nav className="w-full justify-center ">
          <ul className="flex flex-col gap-8 items-center ">
            <Link href="/">
              <li
                className="w-full flex flex-col overflow-hidden group text-black mt-4 "
                // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
              >
                Home
                <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
              </li>
            </Link>
            <Link href="/about">
              <li
                className="w-full flex flex-col overflow-hidden group text-black "
                // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
              >
                About
                <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
              </li>
            </Link>
            <Link href="/notice">
              <li
                className="w-full flex flex-col overflow-hidden group text-black "
                // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
              >
                Notice
                <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
              </li>
            </Link>
            <Link href="/events">
              <li
                className="w-full flex flex-col overflow-hidden group text-black "
                // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
              >
                Events
                <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
              </li>
            </Link>
            <Link href="/projects">
              <li
                className="w-full flex flex-col overflow-hidden group text-black "
                // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
              >
                Projects
                <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
              </li>
            </Link>
            <Link href="/committee">
              <li
                className="w-full flex flex-col overflow-hidden group text-black "
                // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
              >
                Committee
                <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
              </li>
            </Link>
            <Link href="/gallery">
              <li
                className="w-full flex flex-col overflow-hidden group text-black mb-4"
                // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
              >
                Gallery
                <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
              </li>
            </Link>
            <Link href="/complaintbox">
              <li
                className="w-full flex flex-col overflow-hidden group text-black mb-4"
                // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
              >
                Complaint Box
                <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
              </li>
            </Link>
            <Link href="/bloodbank">
              <li
                className="w-full flex flex-col overflow-hidden group text-black mb-4"
                // className="h-[1.6rem] hover:border-b-2 border-gray-200 text-background-50 before:content-[''] before:absolute before:h-[1rem] before:border-b-2 before:border-b-secondary-600 "
              >
                Blood Bank
                <span className="border-[1.5px] border-gray-200 -translate-x-full group-hover:translate-x-0 duration-300 "></span>
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UserNav;
