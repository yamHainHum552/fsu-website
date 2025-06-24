"use client";
import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";

export default function ComplaintBox() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    description: "",
  });
  const form = useRef();

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  useEffect(() => {
    document.title = "Complaint Box | FSU";

    const metaDesc = document.querySelector(
      "meta[name='Complaint Box of FSU']"
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.description) {
      alert("Please fill in the required fields: Subject and Description.");
      return;
    }
    setIsSending(true);

    await emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
      )
      .then(() => {
        setIsSending(false);
        form.current.reset();
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          description: "",
        });
        setSubmitted(true);
      })
      .catch((err) => console.log(err.messaage));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-primary-600 mb-6">
        Complaint Box - Free Student Union
      </h2>

      {submitted && (
        <p className="text-green-600 font-medium mb-4">
          Thank you! Your complaint has been submitted.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" ref={form}>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Full Name:
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Email (for follow-up):
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Subject / Nature of Complaint:{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description: <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-2 rounded transition"
        >
          {isSending ? "Submitting" : "Submit"}
        </button>
      </form>

      {/* Bottom note */}
      <p className="text-sm text-red-600 mt-6 border-t pt-4">
        ⚠️ Please do not submit false or irrelevant complaints. Doing so may
        lead to disciplinary action.
      </p>
    </div>
  );
}
