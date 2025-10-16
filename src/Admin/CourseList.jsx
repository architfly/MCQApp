


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaEdit, FaPlusCircle, FaBook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../APIRedux/CourseReducer/AddCourseReducer";
import { getCourse } from "../APIRedux/CourseReducer/GetCourseReducer";
import { updateCourse } from "../APIRedux/CourseReducer/UpdateCourseReducer";
import { deleteCourse } from "../APIRedux/CourseReducer/DeleteCourseReducer";
import { useNavigate } from "react-router-dom"; // ✅ Added navigation

const CourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ initialize navigation

  useEffect(() => {
    dispatch(getCourse()); // fetch courses on mount
  }, [dispatch]);

  const { data, isLoading, isError } = useSelector((state) => state.getCourse);
  const fetchdata = data?.data || [];

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    duration: "",
  });

  // ✅ Open Add Modal
  const openAddModal = () => {
    setFormData({ name: "", code: "", description: "", duration: "" });
    setIsAddOpen(true);
  };

  // ✅ Open Edit Modal
  const openEditModal = (course) => {
    setSelectedCourse(course);
    setFormData({
      name: course.courseName,
      code: course.courseCode,
      description: course.description,
      duration: course.duration,
    });
    setIsEditOpen(true);
  };

  // ✅ Handle Form Change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Add Course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code)
      return alert("Course Name and Code are required!");

    try {
      const resultAction = await dispatch(
        addCourse({
          courseName: formData.name,
          courseCode: formData.code,
          description: formData.description,
          duration: formData.duration,
        })
      );

      if (addCourse.fulfilled.match(resultAction)) {
        setIsAddOpen(false);
        setFormData({ name: "", code: "", description: "", duration: "" });
        dispatch(getCourse()); // refresh the list
      } else {
        alert(resultAction.payload || "Failed to add course");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  // ✅ Update Course
  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code)
      return alert("Course Name and Code are required!");

    try {
      const resultAction = await dispatch(
        updateCourse({
          courseId: selectedCourse._id, // backend id
          courseData: {
            courseName: formData.name,
            courseCode: formData.code,
            description: formData.description,
            duration: formData.duration,
          },
        })
      );

      if (updateCourse.fulfilled.match(resultAction)) {
        setIsEditOpen(false);
        setFormData({ name: "", code: "", description: "", duration: "" });
        dispatch(getCourse());
      } else {
        alert(resultAction.payload || "Failed to update course");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  // ✅ Delete Course
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const resultAction = await dispatch(deleteCourse(id));

        if (deleteCourse.fulfilled.match(resultAction)) {
          alert("Course deleted successfully!");
          dispatch(getCourse());
        } else {
          alert(resultAction.payload || "Failed to delete course");
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong while deleting!");
      }
    }
  };

  // ✅ Search Filter
  const filteredCourses = (fetchdata || []).filter(
    (course) =>
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Format Duration
  const formatDuration = (minutes) =>
    minutes >= 60
      ? `${Math.floor(minutes / 60)}h ${
          minutes % 60 > 0 ? minutes % 60 + "m" : ""
        }`
      : `${minutes} min`;

  return (
    <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen text-gray-800 overflow-hidden font-sans">
      {/* Background Circles */}
      <div className="absolute top-[-6rem] left-[-6rem] w-72 h-72 bg-blue-200 rounded-full opacity-20 pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-8rem] right-[-6rem] w-72 h-72 bg-indigo-200 rounded-full opacity-20 pointer-events-none animate-pulse" />

      <div className="p-6 max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="sticky top-0 bg-white/70 backdrop-blur-md z-20 py-4 mb-8 rounded-3xl shadow-md flex justify-center items-center gap-4 border border-gray-300"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-blue-500"
          >
            <FaBook size={36} />
          </motion.div>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Course Management
          </h2>
        </motion.div>

        {/* Search + Add */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <input
            type="text"
            placeholder="🔍 Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-gray-300 bg-white p-3 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none min-w-[250px]"
          />

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px #60a5fa" }}
            whileTap={{ scale: 0.95 }}
            onClick={openAddModal}
            className="bg-blue-500 text-white px-6 py-3 rounded-2xl shadow-md flex items-center gap-3 font-semibold hover:bg-blue-600 transition"
          >
            <FaPlusCircle /> Add Course
          </motion.button>
        </div>

        {/* Courses Grid */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {filteredCourses.map((course) => (
            <motion.div
              key={course._id}
              whileHover={{
                scale: 1.03,
                y: -3,
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 flex flex-col justify-between transition transform shadow-sm"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 uppercase">
                  {course.courseName}
                </h3>
                <p className="text-gray-600 mb-1 uppercase">
                  <strong>Code:</strong> {course.courseCode}
                </p>
                <p className="text-gray-700 mb-3">{course.description}</p>
                <span className="text-gray-700">
                  <strong>Duration:</strong> {formatDuration(course.duration)}
                </span>
              </div>

              {/* ✅ Buttons Row */}
              <div className="flex justify-between items-center gap-3 mt-5">
                {/* Add Test left side */}
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 15px rgba(59,130,246,0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-xl shadow-md flex items-center gap-2 font-semibold transition duration-300"
                  onClick={() => navigate(`/admin/course-list/admin-test/${course._id}`)}
                >
                  <FaPlusCircle className="text-white" /> Add Test
                </motion.button>

                {/* Edit & Delete right side */}
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1, color: "#facc15" }}
                    className="text-yellow-500"
                    onClick={() => openEditModal(course)}
                  >
                    <FaEdit size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, color: "#ef4444" }}
                    className="text-red-500"
                    onClick={() => handleDelete(course._id)}
                  >
                    <FaTrash size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      {(isAddOpen || isEditOpen) && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              {isAddOpen ? "Add New Course" : "Edit Course"}
            </h3>
            <form
              className="flex flex-col gap-3"
              onSubmit={isAddOpen ? handleAddCourse : handleUpdateCourse}
            >
              <input
                type="text"
                name="name"
                placeholder="Course Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                type="text"
                name="code"
                placeholder="Course Code"
                value={formData.code}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                type="number"
                name="duration"
                placeholder="Duration (minutes)"
                value={formData.duration}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddOpen(false);
                    setIsEditOpen(false);
                  }}
                  className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-xl font-semibold text-white ${
                    isAddOpen
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  } transition`}
                >
                  {isAddOpen ? "Add" : "Update"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CourseList;
