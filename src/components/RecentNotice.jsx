"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

const RecentNotice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNotices = async () => {
      try {
        const res = await fetch("/api/notice");
        const data = await res.json();
        setNotices(data.docs || []);
      } catch (err) {
        console.error("An error occurred. Please check your code", err);
      } finally {
        setLoading(false);
      }
    };

    getNotices();
  }, []);

  return (
    <div className="w-full sm:w-[80%] 2xl:w-full mx-auto h-fit shadow-lg shadow-[#07040334] rounded-lg p-4">
      <div>
        <span className="font-bold text-2xl text-[#2e4f96] font-[Montserrat]">
          Recent Notices
        </span>
      </div>

      {loading ? (
        <div className="py-2 mt-5 flex flex-col gap-5">
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton key={i} className="h-[2rem]" width="100%" />
          ))}
        </div>
      ) : (
        notices.map((item, i) => (
          <div key={i} className="mt-5">
            <div className="flex items-center gap-5 py-2">
              <Image
                alt="notice"
                width={25}
                height={30}
                src="/icons/notice.png"
                className="object-contain"
                unoptimized
              />
              <Link href={`/notice/${item._id}`} className="flex">
                <span className="font-semibold hover:text-primary-400 md:text-[1.2rem] text-[1rem] hover:text-background-color font-[Montserrat]">
                  {item.title}
                </span>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentNotice;
