"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 16;

const Table = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    document.title = "Blood Bank | FSU";

    const metaDesc = document.querySelector("meta[name='Blood Bank of FSU']");
  }, []);
  useEffect(() => {
    const getDonors = async () => {
      try {
        let response = await fetch("/api/bloodgroup");
        response = await response.json();

        setDonors(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    getDonors();
  }, []);

  const handleFilterAndPaginate = () => {
    const filtered =
      bloodGroup === "all"
        ? donors
        : donors.filter((donor) => donor.bloodgroup === bloodGroup);

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    setFilteredData(filtered.slice(start, end));
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  };

  useEffect(() => {
    handleFilterAndPaginate();
  }, [bloodGroup, currentPage, donors]);

  const handleBloodGroupChange = (e) => {
    setBloodGroup(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="shadow-lg rounded-lg flex flex-col w-full max-w-6xl mx-auto min-h-[50rem] bg-[#fcfcfc]">
      {/* Header */}
      <div className="bg-background-color text-white flex justify-center items-center h-12 rounded-t-lg">
        <h2
          className="font-bold text-xl font-[Montserrat] text-primary-500 
text-decoration-line: underline"
        >
          Student's Blood Group
        </h2>
      </div>

      {/* Filter Bar */}
      <div className="flex justify-between items-center p-4 flex-wrap gap-2">
        <div className="flex items-center space-x-4">
          <label htmlFor="group" className="font-semibold font-[Poppins]">
            Blood Group:
          </label>
          <select
            id="group"
            onChange={handleBloodGroupChange}
            className="rounded-lg w-24 cursor-pointer text-background-color bg-white border-2 border-background-color p-1 outline-none"
          >
            {["all", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
              (group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto px-2">
        <table className="w-full text-center font-[Poppins]">
          <thead>
            <tr className="bg-background-color text-secondary-500 ">
              <th className="p-2 text-base">Name</th>
              <th className="p-2 text-base">Blood Group</th>
              <th className="p-2 text-base">Address</th>
              <th className="p-2 text-base">Contact No.</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <AnimatePresence>
              {filteredData.map((item, index) => (
                <motion.tr
                  key={`${item.name}-${index}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                  className={
                    index % 2 === 0 ? "bg-[#0f29804b]" : "bg-[#f5f3f3]"
                  }
                >
                  <td className="p-2 uppercase">{item.name}</td>
                  <td className="p-2">{item.bloodgroup}</td>
                  <td className="p-2">{item.address}</td>
                  <td className="p-2">{item.contactNo}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-4 mb-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 bg-white border rounded-lg ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-100"
          }`}
        >
          <svg viewBox="0 0 15 15" fill="none" width="20" height="20">
            <path
              d="M10 14L3 7.5 10 1"
              stroke="currentColor"
              strokeLinecap="square"
            />
          </svg>
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 rounded-md font-[Poppins] ${
                pageNum === currentPage
                  ? "bg-background-color text-primary-400"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 bg-white border rounded-lg ${
            currentPage === totalPages
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-100"
          }`}
        >
          <svg viewBox="0 0 15 15" fill="none" width="20" height="20">
            <path
              d="M5 14l7-6.5L5 1"
              stroke="currentColor"
              strokeLinecap="square"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Table;
