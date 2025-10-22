 
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch, FaClock, FaQuestionCircle, FaPlay, FaStar, FaListAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../APIRedux/CourseReducer/GetCourseReducer";
import { getTests } from "../../APIRedux/TestReducer/TestReducerGet";

const Courses = () => {
  const [search, setSearch] = useState("");
  const [hoveredTest, setHoveredTest] = useState(null);
  const navigate = useNavigate();
  
  const { courseId } = useParams();

  const dispatch = useDispatch();
  const { data, isErrror, isLoading, errorMessage } = useSelector(
    (state) => state.getCourse
  );

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  const { getData } = useSelector((state) => state.getTests);

  const filteredcousre = data?.data || [];

  useEffect(() => {
    dispatch(getTests());
  }, [dispatch]);

  const allData = getData?.filter((test) => test.courseId === courseId);

  // Search filter
  const searchedTests = allData?.filter(
    (test) =>
      test.testName?.toLowerCase().includes(search.toLowerCase()) ||
      test.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleStartDirect = (test) => {
    navigate(`/Courses/${courseId}/test`, {
      state: { test },
    });
  };

  // Format duration to display properly
  const formatDuration = (minutes) => {
    if (!minutes) return "Not specified";
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  // Get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
              <FaListAlt className="text-white text-xl" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Available Tests</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully curated tests to assess your knowledge and track your progress
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Stats and Search Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{allData?.length || 0}</div>
                <div className="text-sm text-gray-500">Total Tests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {allData?.reduce((total, test) => total + (test.questions?.length || 0), 0)}
                </div>
                <div className="text-sm text-gray-500">Total Questions</div>
              </div>
            </div>

            <div className="flex-1 max-w-md">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tests by name or description..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tests Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
              <div className="col-span-5 flex items-center">
                <span>TEST INFORMATION</span>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <FaQuestionCircle className="mr-2 text-indigo-500" />
                <span>QUESTIONS</span>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <FaClock className="mr-2 text-indigo-500" />
                <span>DURATION</span>
              </div>
              <div className="col-span-3 flex items-center justify-center">
                <span>ACTION</span>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {searchedTests?.length > 0 ? (
              searchedTests.map((test, index) => (
                <div
                  key={test._id || index}
                  className="px-6 py-6 hover:bg-blue-50 transition-all duration-200 group"
                  onMouseEnter={() => setHoveredTest(test._id)}
                  onMouseLeave={() => setHoveredTest(null)}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Test Information */}
                    <div className="col-span-5">
                      <div className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                          hoveredTest === test._id 
                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
                            : 'bg-indigo-100'
                        } transition-all duration-200`}>
                          <FaListAlt className={
                            hoveredTest === test._id ? 'text-white' : 'text-indigo-600'
                          } />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                            {test.testName}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {test.description || "Comprehensive assessment test covering all key topics"}
                          </p>
                          <div className="flex items-center mt-2 space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                              {test.difficulty || 'All Levels'}
                            </span>
                            {test.isPremium && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                <FaStar className="w-3 h-3 mr-1" />
                                Premium
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Questions Count */}
                    <div className="col-span-2">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {test.questions?.length || 0}
                        </div>
                        <div className="text-sm text-gray-500">questions</div>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="col-span-2">
                      <div className="text-center">
                        <div className="flex items-center justify-center text-lg font-semibold text-gray-900">
                          <FaClock className="mr-2 text-indigo-500" />
                          {formatDuration(test.duration)}
                        </div>
                        <div className="text-sm text-gray-500">total time</div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="col-span-3">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleStartDirect(test)}
                          className={`
                            relative overflow-hidden group btn-start-test
                            px-8 py-3 rounded-xl font-semibold text-white
                            transition-all duration-300 transform hover:scale-105
                            shadow-lg hover:shadow-xl
                            bg-gradient-to-r from-indigo-500 to-purple-600
                            hover:from-indigo-600 hover:to-purple-700
                            focus:outline-none focus:ring-4 focus:ring-indigo-200
                            min-w-[140px]
                          `}
                        >
                          {/* Shine effect */}
                          <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                          </div>
                          
                          {/* Button content */}
                          <div className="relative flex items-center justify-center space-x-2">
                            <FaPlay className="w-4 h-4" />
                            <span>Start Test</span>
                          </div>

                          {/* Pulse animation on hover */}
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-1000"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* Empty State */
              <div className="px-6 py-16 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No tests found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {search ? `No tests matching "${search}" were found.` : 'There are no tests available for this course yet.'}
                </p>
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Additional Info Section */}
        {searchedTests?.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <FaClock className="text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Time Management</h3>
              </div>
              <p className="text-sm text-gray-600">
                Practice managing your time effectively during tests. The timer helps simulate real exam conditions.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <FaQuestionCircle className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Instant Results</h3>
              </div>
              <p className="text-sm text-gray-600">
                Get immediate feedback with detailed explanations and performance analytics after completing each test.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <FaStar className="text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Progress Tracking</h3>
              </div>
              <p className="text-sm text-gray-600">
                Monitor your improvement over time with comprehensive progress reports and performance trends.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles for Enhanced Button */}
      <style jsx>{`
        .btn-start-test {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 4px 15px 0 rgba(102, 126, 234, 0.4);
        }
        
        .btn-start-test:hover {
          background: linear-gradient(135deg, #5a6fd8 0%, #6a42a0 100%);
          box-shadow: 0 8px 25px 0 rgba(102, 126, 234, 0.6);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Courses;
