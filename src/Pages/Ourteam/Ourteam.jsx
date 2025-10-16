// src/Pages/OurTeam/OurTeam.jsx
import React from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, Linkedin } from "lucide-react";
import ketan from "../../../public/images/pic3.jpg";

const teamMembers = [
  {
    id: 1,
    name: "Gençer Güleryüz",
    role: "Founder",
    about:
      "Gençer has been teaching ATPL courses in various flight schools and universities since 2012. After founding ATPL TV in 2017, he started producing content about PPL, ATPL, DLR, Mollymawk, PACE and so forth.",
    img: {ketan},
    socials: {
      mail: "mailto:someone@example.com",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Co-Founder",
    about:
      "Jane specializes in curriculum design and student mentorship, bringing 10+ years of aviation experience.",
    img: {ketan},
    socials: {
      mail: "mailto:jane@example.com",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
  },
];

const OurTeam = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10 text-center"
      >
        Meet Our Team ✈️
      </motion.h1>

      {/* Team Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Image Section */}
            <div className="relative">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-60 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-3">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <span className="text-sm text-blue-300">{member.role}</span>
              </div>
            </div>

            {/* About Section */}
            <div className="p-4 flex flex-col flex-grow justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {member.about}
              </p>

              {/* Socials */}
              <div className="flex gap-4 mt-auto">
                <a
                  href={member.socials.mail}
                  className="p-2 rounded-full bg-blue-50 dark:bg-gray-700 hover:bg-blue-600 hover:text-white transition"
                >
                  <Mail size={18} />
                </a>
                <a
                  href={member.socials.instagram}
                  className="p-2 rounded-full bg-pink-50 dark:bg-gray-700 hover:bg-pink-500 hover:text-white transition"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={member.socials.linkedin}
                  className="p-2 rounded-full bg-sky-50 dark:bg-gray-700 hover:bg-sky-600 hover:text-white transition"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
