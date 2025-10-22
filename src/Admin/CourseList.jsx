import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaTrash, 
  FaEdit, 
  FaPlusCircle, 
  FaBook, 
  FaSearch,
  FaTimes
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../APIRedux/CourseReducer/AddCourseReducer";
import { getCourse } from "../APIRedux/CourseReducer/GetCourseReducer";
import { updateCourse } from "../APIRedux/CourseReducer/UpdateCourseReducer";
import { deleteCourse } from "../APIRedux/CourseReducer/DeleteCourseReducer";
import { useNavigate } from "react-router-dom";

// Custom Hook for Course Management
const useCourseManagement = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.getCourse);
  const courses = useMemo(() => data?.data || [], [data?.data]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  const closeModals = useCallback(() => {
    setIsAddOpen(false);
    setIsEditOpen(false);
    setSelectedCourse(null);
  }, []);

  return {
    courses,
    isLoading,
    error,
    isAddOpen,
    isEditOpen,
    selectedCourse,
    searchQuery,
    setSearchQuery,
    setIsAddOpen,
    setSelectedCourse,
    setIsEditOpen,
    closeModals
  };
};

// Course Card Component
const CourseCard = React.memo(({ 
  course, 
  onEdit, 
  onDelete, 
  onAddTest 
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: { 
      y: -4, 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Course Header with Gradient Accent */}
      <div className="relative p-4 border-b border-gray-100">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
        <div className="ml-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {course.courseName}
          </h3>
          <p className="text-gray-600 font-mono text-sm bg-gray-50 px-2 py-1 rounded-md inline-block">
            {course.courseCode}
          </p>
        </div>
      </div>

      {/* Course Description */}
      <div className="p-4">
        <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-3">
          {course.description || "No description available for this course."}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddTest(course._id)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <FaPlusCircle className="text-xs" />
            Add Test
          </motion.button>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(course)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              title="Edit Course"
            >
              <FaEdit size={14} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(course._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              title="Delete Course"
            >
              <FaTrash size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Search Bar Component
const SearchBar = React.memo(({ searchQuery, onSearchChange, onClearSearch }) => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses by name, code, or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-12 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={onClearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
});

// Course Modal Component
const CourseModal = React.memo(({ 
  isOpen, 
  isEdit, 
  formData, 
  onClose, 
  onSubmit, 
  onFormChange 
}) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden"
        >
          {/* Modal Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-2xl font-bold text-gray-900">
              {isEdit ? "Edit Course" : "Create New Course"}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {isEdit ? "Update your course details" : "Add a new course to your system"}
            </p>
          </div>

          {/* Modal Form */}
          <form onSubmit={onSubmit} className="p-6 space-y-4 overflow-y-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g., Web Development Fundamentals"
                value={formData.name}
                onChange={onFormChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="code"
                placeholder="e.g., WEB-101"
                value={formData.code}
                onChange={onFormChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Describe what students will learn in this course..."
                value={formData.description}
                onChange={onFormChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-1 px-6 py-3 text-white rounded-lg font-semibold transition-colors ${
                  isEdit 
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600" 
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                }`}
              >
                {isEdit ? "Update Course" : "Create Course"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

// Loading Skeleton Component
const CourseSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
    <div className="p-4 border-b border-gray-100">
      <div className="ml-3">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div className="p-4">
      <div className="h-12 bg-gray-200 rounded mb-4"></div>
      <div className="flex justify-between">
        <div className="h-8 bg-gray-200 rounded w-20"></div>
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

// Empty State Component
const EmptyState = ({ searchQuery, onCreateCourse }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16"
  >
    <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <FaBook className="text-3xl text-blue-500" />
    </div>
    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
      {searchQuery ? "No courses found" : "No courses yet"}
    </h3>
    <p className="text-gray-600 mb-6 max-w-md mx-auto">
      {searchQuery 
        ? "Try adjusting your search terms or filters to find what you're looking for." 
        : "Get started by creating your first course to organize your tests and content."
      }
    </p>
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onCreateCourse}
      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      <FaPlusCircle />
      {searchQuery ? "Clear Search & Create Course" : "Create Your First Course"}
    </motion.button>
  </motion.div>
);

const CourseList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {
    courses,
    isLoading,
    error,
    isAddOpen,
    isEditOpen,
    selectedCourse,
    searchQuery,
    setSearchQuery,
    setIsAddOpen,
    setSelectedCourse,
    setIsEditOpen,
    closeModals
  } = useCourseManagement();

  const [formData, setFormData] = useState({ 
    name: "", 
    code: "", 
    description: "" 
  });

  // Memoized filtered courses
  const filteredCourses = useMemo(() => {
    if (!searchQuery) return courses;
    
    const query = searchQuery.toLowerCase();
    return courses.filter(course =>
      course.courseName.toLowerCase().includes(query) ||
      course.courseCode.toLowerCase().includes(query) ||
      (course.description && course.description.toLowerCase().includes(query))
    );
  }, [courses, searchQuery]);

  // Handlers
  const handleFormChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleAddCourse = useCallback(async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code) {
      alert("Course Name and Code are required!");
      return;
    }

    try {
      const resultAction = await dispatch(addCourse({
        courseName: formData.name,
        courseCode: formData.code,
        description: formData.description,
      }));

      if (addCourse.fulfilled.match(resultAction)) {
        closeModals();
        setFormData({ name: "", code: "", description: "" });
        dispatch(getCourse());
      }
    } catch (error) {
      console.error("Failed to add course:", error);
    }
  }, [dispatch, formData, closeModals]);

  const handleUpdateCourse = useCallback(async (e) => {
    e.preventDefault();
    if (!selectedCourse) return;

    try {
      const resultAction = await dispatch(updateCourse({
        courseId: selectedCourse._id,
        courseData: formData,
      }));

      if (updateCourse.fulfilled.match(resultAction)) {
        closeModals();
        setFormData({ name: "", code: "", description: "" });
        dispatch(getCourse());
      }
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  }, [dispatch, selectedCourse, formData, closeModals]);

  const handleDelete = useCallback(async (id) => {
    if (window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      try {
        const resultAction = await dispatch(deleteCourse(id));
        if (deleteCourse.fulfilled.match(resultAction)) {
          dispatch(getCourse());
        }
      } catch (error) {
        console.error("Failed to delete course:", error);
      }
    }
  }, [dispatch]);

  const handleEdit = useCallback((course) => {
    setSelectedCourse(course);
    setFormData({
      name: course.courseName,
      code: course.courseCode,
      description: course.description
    });
    setIsEditOpen(true);
  }, [setSelectedCourse, setIsEditOpen]);

  const handleAddTest = useCallback((courseId) => {
    navigate(`/admin/course-list/admin-test/${courseId}`);
  }, [navigate]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, [setSearchQuery]);

  const openAddModal = useCallback(() => {
    setFormData({ name: "", code: "", description: "" });
    setIsAddOpen(true);
  }, [setIsAddOpen]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        <div className="w-full px-6 sm:px-8 lg:px-12 py-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          <div className="max-w-2xl mx-auto mb-12">
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 rounded w-48 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {[...Array(8)].map((_, index) => (
              <CourseSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Courses</h2>
          <p className="text-gray-600 mb-6">Failed to load courses. Please try again later.</p>
          <button
            onClick={() => dispatch(getCourse())}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 font-sans text-gray-800">
      <div className="w-full px-6 sm:px-8 lg:px-12 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4">
            Course Management System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Efficiently manage your courses, tests, and educational content in one place
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearSearch={handleClearSearch}
          />
        </motion.div>

        {/* Add Course Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            onClick={openAddModal}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <FaPlusCircle className="text-xl" />
            Add New Course
          </motion.button>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddTest={handleAddTest}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && !isLoading && (
          <EmptyState
            searchQuery={searchQuery}
            onCreateCourse={openAddModal}
          />
        )}

        {/* Course Count */}
        {filteredCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12 pt-8 border-t border-gray-200"
          >
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredCourses.length}</span> 
              {filteredCourses.length === 1 ? ' course' : ' courses'}
              {searchQuery && ' matching your search'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <CourseModal
        isOpen={isAddOpen}
        isEdit={false}
        formData={formData}
        onClose={closeModals}
        onSubmit={handleAddCourse}
        onFormChange={handleFormChange}
      />

      <CourseModal
        isOpen={isEditOpen}
        isEdit={true}
        formData={formData}
        onClose={closeModals}
        onSubmit={handleUpdateCourse}
        onFormChange={handleFormChange}
      />
    </div>
  );
};

export default CourseList;