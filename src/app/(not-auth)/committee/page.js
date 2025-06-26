"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Poppins, Montserrat } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "200", "100", "300", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const montserrat = Montserrat({
  weight: ["400", "200", "100", "300", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

// import { members } from "../../data/data"
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const Team = () => {
  const [committee, setCommittee] = useState();
  useEffect(() => {
    document.title = "Committee | FSU";

    const metaDesc = document.querySelector("meta[name='Committee of FSU']");
  }, []);
  useEffect(() => {
    const getCommittee = async () => {
      const res = await fetch("/api/committee")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setCommittee(data);
        })
        .catch((err) => {
          console.log("An error occured. Please check your code", err);
        });
    };

    getCommittee();
  }, []);

  const president = committee?.find(
    (member) => member.position.toLowerCase() === "president"
  );
  const executives = committee?.filter((member) =>
    ["treasurer", "secretary", "vice-president", "vice-secretary"].includes(
      member.position.toLowerCase()
    )
  );
  const others = committee?.filter(
    (member) =>
      ![
        "president",
        "treasurer",
        "secretary",
        "vice-president",
        "vice-secretary",
      ].includes(member.position.toLowerCase())
  );

  const variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div
      className={`h-[100%]  py-9 mx-auto flex flex-col items-center relative ${montserrat.className} `}
    >
      <div className=" text-center">
        <motion.h3
          variants={variants}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.1, duration: 0.8 }}
          viewport={{ once: true }}
          className={`font-bold text-[40px] ${montserrat.className} text-center text-[black] border-[#1f1b4e] mb-8 mx-auto`}
        >
          FSU Committee
        </motion.h3>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-center">
          {president && (
            <div className="rounded text-center md:mx-10 w-fit flex flex-col items-center relative ">
              <motion.div
                className="w-[100%] flex justify-center "
                variants={variants}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Image
                  src={`${president.photo}`}
                  alt={president.name}
                  width={30}
                  height={30}
                  className="bg-black rounded-lg object-cover object-top w-[20rem] sm:w-[30rem] border-2 sm:h-[30rem] md:w-[20rem] md:h-[20rem]"
                  unoptimized
                />
              </motion.div>

              <motion.div
                variants={variants}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className={`w-full flex flex-col items-center bg-white rounded-xl shadow-xl px-4 py-1 mt-2 font-[Montserrat] ${montserrat.className}`}
              >
                <Link
                  href={president.facebook}
                  target="_blank"
                  className="text-xl font-bold text-center hover:underline"
                >
                  {president.name}
                </Link>
                <p>{president.position}</p>
                <p>{president.phone}</p>
              </motion.div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center flex-wrap gap-5">
          {executives &&
            executives?.map((item, i) => (
              <div
                key={i}
                className="rounded text-center md:mx-10 w-fit flex flex-col items-center relative "
              >
                <motion.div
                  className="w-[100%] flex justify-center "
                  variants={variants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={`${item.photo}`}
                    alt={item.name}
                    width={30}
                    height={30}
                    className="bg-black rounded-lg object-cover object-top  w-[20rem] sm:w-[30rem] border-2 sm:h-[30rem] md:w-[20rem] md:h-[20rem]"
                    unoptimized
                  />
                </motion.div>

                <motion.div
                  variants={variants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`w-full flex flex-col items-center bg-white rounded-xl shadow-xl px-4 py-1 mt-2 font-[Montserrat] ${montserrat.className}`}
                >
                  <Link
                    href={item.facebook}
                    target="_blank"
                    className="text-xl font-bold text-center hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p>{item.position}</p>
                  <p>{item.phone}</p>
                </motion.div>
              </div>
            ))}
        </div>
        <div className="flex flex-wrap gap-5 items-center justify-center">
          {others &&
            others?.map((item, i) => (
              <div
                className="rounded text-center md:mx-10 w-fit flex flex-col items-center relative "
                key={i}
              >
                <motion.div
                  className="w-[100%] flex justify-center "
                  variants={variants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={`${item.photo}`}
                    alt={item.name}
                    width={30}
                    height={30}
                    className="bg-black rounded-lg object-cover object-top w-[20rem] sm:w-[30rem] border-2 sm:h-[30rem] md:w-[20rem] md:h-[20rem]"
                    unoptimized
                  />
                </motion.div>

                <motion.div
                  variants={variants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`w-full flex flex-col items-center bg-white rounded-xl shadow-xl px-4 py-1 mt-2 font-[Montserrat] ${montserrat.className}`}
                >
                  <Link
                    href={item.facebook}
                    target="_blank"
                    className="text-xl font-bold text-center hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p>{item.position}</p>
                  <p>{item.phone}</p>
                </motion.div>
              </div>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {/* {members?.map((item, index) => (
          <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            key={item.id}
            className="rounded p-4 text-center flex flex-col justify-center relative">
            <div className=" flex justify-center">
              <Image
                src={item.src}
                alt={item.name}
                width={150}
                height={150}
                className="bg-black w-[20rem] h-[20rem] object-cover rounded-lg"
              />
            </div>
            <div
              className={`min-w-[40%] max-w-full flex flex-col items-center bg-white rounded-xl shadow-xl px-4 py-1 mt-2 font-[Montserrat] ${montserrat.className}`}>
              <h3 className="text-[0.8rem] font-bold text-center lg:text-[1.1rem]">
                {item.name}
              </h3>
              <p
                className={`lg:text-[1rem] text-[0.7rem] ${montserrat.className} `}>
                {item.title}
              </p>
            </div>
          </motion.div>
        ))} */}
      </div>
    </div>
  );
};

export default Team;
