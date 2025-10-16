
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../APIRedux/CourseReducer/GetCourseReducer";
import { getTests } from "../../APIRedux/TestReducer/TestReducerGet";

const Courses = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  
  const {courseId}=useParams();

  console.log("courses hai id",courseId)

  const dispatch = useDispatch();
  const { data, isErrror, isLoading, errorMessage } = useSelector(
    (state) => state.getCourse
  );

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);


  const {getData}=useSelector((state)=>state.getTests);

  const filteredcousre = data?.data || [];

   

  useEffect(()=>{
    dispatch(getTests());
  },[dispatch])

  console.log("get all ldata",getData);


  const allData=getData?.filter((test)=>test.courseId===courseId)
  console.log("ye hia uska data",allData)

  // Search filter
  const searchedCourses = filteredcousre.filter(
    (course) =>
      course.courseName?.toLowerCase().includes(search.toLowerCase()) ||
      course.courseCode?.toLowerCase().includes(search.toLowerCase())
  );

  // If API returns tests array on each course use it; else fallback sample list
  const getTestsForCourse = (course) => {
    if (Array.isArray(course.tests) && course.tests.length > 0) return course.tests;
    return [
      {
        id: `${course.courseCode}-t1`,
        name: "Fundamentals MCQ",
        price: 0,
        duration: 20,
        questions: 10,
        description: "Short fundamentals practice.",
      },
    ];
  };

  


  // DIRECT: start first test without modal
  const handleStartDirect = (test) => {
  navigate(`/Courses/${courseId}/test`, {
    state: { test },
  });
};

  return (
    <div className="min-h-screen p-10">
      <div className="bg-gray-50 transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-800">
            📚 Available Courses
          </h1>
          <div className="w-16 h-1 bg-indigo-600 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {allData?.length > 0 ? (
            allData?.map((test, id) => (
              <div
                key={id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition transform hover:-translate-y-1 p-6 border border-gray-100"
              >
                <h2 className="text-lg font-bold text-gray-800 mb-1">
                  {test?.testName}
                </h2>

                <p className="text-sm text-gray-500 mb-2">
                  <strong>No of Questions</strong>{" "}
                  <span className="font-medium">{test.questions?.length}</span>
                </p>

               

                <p className="text-xs text-gray-500 mb-4">
                  <strong>Duration:</strong>{" "}
                  <span className="font-medium">
                    {test.duration ? `${test.duration} min` : "N/A"}
                  </span>
                </p>

                {/* Direct start test button */}
                <div className="mt-2">
                  <button
                    onClick={() => handleStartDirect(test)}
                    className="w-full flex items-center justify-between gap-2 bg-white border border-indigo-600 hover:bg-indigo-50 text-indigo-600 hover:text-indigo-800 py-2 px-4 rounded-lg font-medium transition"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 5a2 2 0 012-2h8a2 2 0 012 2v7a2 2 0 01-2 2H7l-5 4V5z" />
                      </svg>
                      <span>Choose Test</span>
                    </div>
                    <span className="text-sm font-medium">Select & Start</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No courses found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
