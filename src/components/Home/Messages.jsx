"use client";

import { messages } from "@/data/data";
import { AnimatePresence, motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import React from "react";

const montserrat = Montserrat({
  weight: ["100", "300", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const Messages = () => {
  return (
    <div className={`w-full md:w-[85%] mx-auto mt-12 ${montserrat.className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`
                relative w-full h-full p-8 rounded-2xl overflow-hidden shadow-lg
                bg-gradient-radial from-[#e08c3e] to-[#ee843e] text-white 
                flex flex-col justify-between gap-6 
                ${index === 2 ? "lg:col-span-2 lg:mx-auto lg:w-1/2" : ""}
              `}
            >
              <div className="flex flex-col gap-4">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold uppercase tracking-wide">
                  Message from {message.position}
                </h2>
                <p className="text-sm md:text-base lg:text-[17px] leading-relaxed text-justify">
                  {message.content}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-6 md:gap-8">
                <div className="w-[80px] h-[80px] rounded-lg overflow-hidden border-2 border-white">
                  <Image
                    alt={`Photo of ${message.name}`}
                    src={message.image || "/default.jpg"}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-lg md:text-xl font-bold">
                    {message.name}
                  </span>
                  <span className="text-sm md:text-base text-white/90">
                    {message.faculty}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Messages;
