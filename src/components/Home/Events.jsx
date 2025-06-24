"use client";
import React, { useEffect, useState } from "react";
import NewEventCard from "../NewEventCard";
import RecentNotice from "../RecentNotice";

import { useSWRConfig } from "swr";
import { Poppins, Montserrat } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "200", "100", "300", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const montserrat = Montserrat({
  weight: ["400", "200", "100", "300", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

// const fetcher = (url) => fetch(url).then((res) => res.json())

// const Events = () => {
const Events = ({}) => {
  // console.log(initialData)
  // const { data: events } = useSWRConfig(
  //   `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/admin/event`,
  //   fetcher
  // )
  const [events, setEvents] = useState();
  useEffect(() => {
    const getEvents = async () => {
      const res = await fetch("/api/events")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setEvents(data);
          // console.log("Data here of events: ", data);
        })
        .catch((err) => {
          console.log("An error occured. Please check your code", err);
        });
    };

    getEvents();
  }, []);

  let finalEvents;
  if (events) {
    finalEvents = events;
    // console.log(finalEvents)
  }

  const currentDate = new Date();

  // Step 1: Sort events by proximity to the current date
  const sortedEvents = finalEvents?.sort((a, b) => {
    const diffA = Math.abs(new Date(a.date) - currentDate);
    const diffB = Math.abs(new Date(b.date) - currentDate);
    return diffA - diffB;
  });

  // Step 2: Select the closest 4 events
  const closestEvents = sortedEvents?.slice(0, 4);

  // console.log(closestEvents)

  return (
    <div
      className={`${montserrat.className} flex flex-col 2xl:flex-row gap-3  justify-between 2xl:w-[80%] mx-auto`}
    >
      <div className=" flex flex-col items-center justify-center w-[80%] mx-auto gap-10">
        <h1
          className={`text-2xl md:text-5xl text-center text-primary-400 font-semibold mt-16 ${montserrat.className}`}
        >
          Recent Events
        </h1>
        <div className=" grid grid-cols-1 lg:grid-cols-2 h-fit mt-5 2xl:gap-5  xl:w-[80%] w-full mx-auto gap-5">
          {closestEvents?.map((item, index) => (
            <NewEventCard event={item} key={index} />
          ))}
        </div>
      </div>
      <div
        className={`text-3xl md:text-5xl font-semibold mt-16 mx-auto 2xl:w-[30%] w-full align-top ${montserrat.className}`}
      >
        <RecentNotice />
      </div>
    </div>
  );
};

export default Events;
