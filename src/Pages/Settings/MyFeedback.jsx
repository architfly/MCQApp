import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const MyFeedback = () => {
  const [showModal, setShowModal] = useState(false);

  // form state
  const [course, setCourse] = useState("");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState("");
  const [file, setFile] = useState(null);

  const handleConfirm = () => {
    if (!course || !question || !answers) {
      alert("Please fill all required fields!");
      return;
    }

    // form data object
    const formData = {
      course,
      question,
      answers,
      file,
    };

    console.log("Submitted Feedback:", formData);

    // clear form
    setCourse("");
    setQuestion("");
    setAnswers("");
    setFile(null);

    // close modal
    setShowModal(false);
    alert("Feedback submitted successfully ✅");
  };

  return (
    <div className="p-6">
      {/* Title + Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600 ">
          My Feedback
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          New Question Feedback
        </motion.button>
      </div>

      {/* Feedback Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <table className="w-full border-collapse">
          <thead className="bg-blue-50">
            <tr>
              {[
                "Sending Date",
                "W/S",
                "Category",
                "Course",
                "Chapter",
                "Item ID",
                "Feedback",
                "Upload File",
                "Status",
                "Details",
              ].map((header, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan="10"
                className="text-center py-6 text-gray-500 text-sm"
              >
                No feedback submitted yet.
              </td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      {/* Feedback Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-blue-600 text-white flex justify-between items-center px-4 py-3">
                <h2 className="text-lg font-semibold">New Question Feedback</h2>
                <button onClick={() => setShowModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-4">
                <p className="text-gray-600 text-sm">
                  If you have encountered different questions not in ATPL TV
                  exams, you can share them here. Please write the words/numbers
                  in the question and answer as far as you remember.
                </p>

                <div className="space-y-3">
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  >
                    <option value="">Select Course</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Aviation</option>
                  </select>

                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Question"
                    rows="2"
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  ></textarea>

                  <textarea
                    value={answers}
                    onChange={(e) => setAnswers(e.target.value)}
                    placeholder="Answer Choices"
                    rows="2"
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  ></textarea>

                  <div className="flex items-center space-x-3">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="border rounded-lg p-2 w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 px-6 py-4 border-t bg-gray-50">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirm}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Confirm
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyFeedback;
