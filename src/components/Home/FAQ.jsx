"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/data/faqs";
import { ArrowDropDownCircleSharp } from "@mui/icons-material";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["300", "500", "600", "700"],
  subsets: ["latin"],
});

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className={`w-full md:w-[80%] mx-auto py-8 px-4 md:px-8 ${montserrat.className}`}
    >
      <h2 className="text-2xl md:text-4xl font-bold text-center text-primary-400 mb-10 select-none">
        Frequently Asked Questions
      </h2>

      <div className="flex flex-col gap-6">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-neutral-100 p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
              role="button"
            >
              <h3 className="text-lg md:text-xl font-semibold text-left">
                {faq.question}
              </h3>
              <motion.div
                initial="collapsed"
                animate={activeIndex === index ? "open" : "collapsed"}
                variants={{
                  open: { rotate: 180 },
                  collapsed: { rotate: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="text-primary-600 hover:text-primary-400 text-[1.8rem]"
              >
                <ArrowDropDownCircleSharp fontSize="inherit" />
              </motion.div>
            </div>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-3 text-sm md:text-base text-neutral-700 leading-relaxed"
                >
                  {faq.answer.includes("-") ? (
                    <ul className="list-disc list-inside space-y-1">
                      {faq.answer.split("\n-").map((point, idx) => (
                        <li key={idx}>{point.trim()}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{faq.answer}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
