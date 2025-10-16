import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

const Contact = () => {
  // State for form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
    file: null,
  });

  const [status, setStatus] = useState(""); // success/error msg

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    if (!formData.firstName || !formData.email || !formData.message) {
      setStatus("Please fill in required fields.");
      return;
    }

    // You can send data to backend API here
    console.log("Form Submitted ✅", formData);

    // show success
    setStatus("Message sent successfully!");

    // reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
      file: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Contact Form
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name *"
                className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Email & Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email *"
                className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Support">Support</option>
                <option value="Feedback">Feedback</option>
              </select>
            </div>

            {/* Message */}
            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message *"
              className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>

            {/* File Upload */}
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="w-full text-gray-600 dark:text-gray-300 cursor-pointer"
            />

            {/* Status Message */}
            {status && (
              <p className="text-sm text-center font-medium text-green-600 dark:text-green-400">
                {status}
              </p>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Contact Information
          </h2>
          <div className="space-y-5 text-gray-700 dark:text-gray-300">
            <p className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-blue-500" />
              ATPL TV Eğitim Hizmetleri Tic. Ltd. Şti. <br />
              Ataköy Mah. E-5 Çobançeşme Yanyol No:18/2 Selenium Retro B Blok
              D:360 Bakırköy / İstanbul
            </p>
            <p className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-blue-500" /> +90 537 724 46 33
            </p>
            <p className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-500" /> info@atpl.tv
            </p>
          </div>

          {/* Socials */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800">
                <Youtube />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800">
                <Facebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800">
                <Twitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800">
                <Instagram />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
