import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  AlertCircle,
  Maximize,
  Clock,
  Trophy,
  BarChart3,
  Target,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addUserAttempt } from "../../APIRedux/UserAttemptReducer/UserAttemptReducer";
import { jwtDecode } from "jwt-decode";
import { getUserAttempt } from "../../APIRedux/UserAttemptReducer/GetAttemptReducer";

const Test = () => {
  const courseId = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { test } = location.state || {};

  const getToken = localStorage.getItem("token");
  const decoded = jwtDecode(getToken);
  const userDataId = decoded?.id;

  console.log("User ID:", userDataId);
  console.log("Test data:", test);

  const testDataId = test?._id || [];

  console.log("Test ID:", testDataId);

  const { getData } = useSelector((state) => state.getUserAttempt);

  useEffect(() => {
    dispatch(getUserAttempt({ testId: testDataId, userId: userDataId }));
  }, [dispatch]);

  console.log("User attempt data:", getData);

  const allData = test?.questions || [];
  const testDuration = parseInt(test?.duration) || 30;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(testDuration * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Timer countdown with auto-submit
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          handleAutoSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  // Auto-submit when time runs out
  const handleAutoSubmit = () => {
    const answers = allData.map((q, index) => ({
      questionId: q._id,
      selectedAnswer: selectedAnswers[index] || null,
      isCorrect: showResult[index] || false,
    }));

    setIsSubmitted(true);
    dispatch(addUserAttempt({ testId: testDataId, answers }));
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Get timer color based on remaining time
  const getTimerColor = () => {
    const percentRemaining = (timeRemaining / (testDuration * 60)) * 100;
    if (percentRemaining > 50) return "text-green-600";
    if (percentRemaining > 20) return "text-yellow-600";
    return "text-red-600 animate-pulse";
  };

  // Get progress bar color
  const getProgressBarColor = () => {
    const percentRemaining = (timeRemaining / (testDuration * 60)) * 100;
    if (percentRemaining > 50) return "bg-green-500";
    if (percentRemaining > 20) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Fullscreen handling
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleAnswerSelect = (optionKey) => {
    const question = allData[currentQuestion];
    const isCorrect = optionKey === question.correctAnswer;

    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: optionKey,
    });

    setShowResult({
      ...showResult,
      [currentQuestion]: isCorrect,
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < allData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const handleSubmit = () => {
    const unanswered = allData.length - Object.keys(selectedAnswers).length;

    const answers = allData.map((q, index) => ({
      questionId: q._id,
      selectedAnswer: selectedAnswers[index] || null,
      isCorrect: showResult[index] || false,
    }));

    if (unanswered > 0) {
      if (
        window.confirm(
          `You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}. Do you want to submit anyway?`
        )
      ) {
        setIsSubmitted(true);
        dispatch(addUserAttempt({ testId: testDataId, answers }));
      }
    } else {
      setIsSubmitted(true);
      dispatch(addUserAttempt({ testId: testDataId, answers }));
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  // Enhanced Results Screen
  if (isSubmitted) {
    const correctAnswers = Object.values(showResult).filter(Boolean).length;
    const totalQuestions = allData.length;
    const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(1);
    const timeTaken = testDuration * 60 - timeRemaining;
    const minutesTaken = Math.floor(timeTaken / 60);
    const secondsTaken = timeTaken % 60;

    // Performance assessment
    const getPerformanceMessage = () => {
      if (percentage >= 90) return "Outstanding! 🎉";
      if (percentage >= 75) return "Excellent! 👏";
      if (percentage >= 60) return "Good Job! 👍";
      if (percentage >= 40) return "Not Bad! 💪";
      return "Keep Practicing! 📚";
    };

    const getPerformanceColor = () => {
      if (percentage >= 90) return "from-green-500 to-emerald-600";
      if (percentage >= 75) return "from-blue-500 to-indigo-600";
      if (percentage >= 60) return "from-yellow-500 to-orange-600";
      if (percentage >= 40) return "from-orange-500 to-red-600";
      return "from-red-500 to-pink-600";
    };

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
              {isTimeUp ? (
                <Clock className="text-indigo-600" size={40} />
              ) : (
                <Trophy className="text-indigo-600" size={40} />
              )}
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              {isTimeUp ? "Time's Up!" : "Test Completed!"}
            </h2>
            <p className="text-gray-600 text-lg">{getPerformanceMessage()}</p>
          </div>

          {/* Main Score Card */}
          <div className={`bg-gradient-to-r ${getPerformanceColor()} rounded-2xl p-1 mb-8`}>
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="text-6xl font-bold text-gray-800 mb-2">
                {percentage}%
              </div>
              <div className="text-xl text-gray-600 mb-4">
                {correctAnswers} out of {totalQuestions} correct
              </div>
              <div className="flex justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  {minutesTaken}m {secondsTaken}s
                </div>
                <div className="flex items-center">
                  <Target size={16} className="mr-1" />
                  {testDuration}m test
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
              <div className="text-sm text-green-800">Correct</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {Object.keys(selectedAnswers).length - correctAnswers}
              </div>
              <div className="text-sm text-red-800">Incorrect</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">
                {allData.length - Object.keys(selectedAnswers).length}
              </div>
              <div className="text-sm text-gray-800">Unanswered</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Retake Test
            </button>
            <button
              onClick={() => window.history.back()}
              className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Back to Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!allData || allData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Questions Available</h3>
          <p className="text-gray-600 mb-6">This test doesn't contain any questions yet.</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const question = allData[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const result = showResult[currentQuestion];
  const hasQuestionImage =
    question.questionName?.image && question.questionName.image.trim() !== "";

  const getOptionStyle = (optionKey) => {
    if (selectedAnswer === optionKey) {
      return result
        ? "bg-green-50 border-green-500 border-2 shadow-md"
        : "bg-red-50 border-red-500 border-2 shadow-md";
    }
    return "bg-white border-gray-300 border hover:bg-gray-50 hover:shadow-md hover:border-gray-400";
  };

  const getQuestionBoxStyle = (index) => {
    if (selectedAnswers[index] !== undefined) {
      return showResult[index]
        ? "bg-green-500 text-white shadow-md"
        : "bg-red-500 text-white shadow-md";
    }
    if (index === currentQuestion) {
      return "bg-indigo-600 text-white shadow-lg transform scale-105";
    }
    return "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md";
  };

  const hasAnyOptionImage = Object.values(question.options).some(
    (opt) => opt.image && opt.image.trim() !== ""
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="h-full flex p-4 gap-4">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                  Question {currentQuestion + 1} of {allData.length}
                </span>
                <div className="w-48 bg-white/30 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor()}`}
                    style={{
                      width: `${((currentQuestion + 1) / allData.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-2xl font-black text-white">{test?.testName}</div>
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/20 rounded-lg transition backdrop-blur-sm"
                title={
                  isFullscreen
                    ? "Exit Fullscreen (Press ESC)"
                    : "Enter Fullscreen"
                }
              >
                {isFullscreen ? <X size={20} /> : <Maximize size={20} />}
              </button>
            </div>

            {/* Timer with progress */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-white/80" />
                <span className="text-sm font-medium">Time Remaining</span>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${getTimerColor()} bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm`}>
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-xs text-white/70 mt-1">
                  {Math.ceil(timeRemaining / 60)} minutes left
                </div>
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="flex-1 overflow-y-auto p-8">
            {/* Question Text/Image */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
                {question.questionName?.text}
              </h2>
              {hasQuestionImage && (
                <div className="mb-6">
                  <img
                    src={question.questionName.image}
                    alt="Question"
                    className="max-w-full h-auto rounded-xl shadow-lg border"
                  />
                </div>
              )}
            </div>

            {/* Options */}
            <div
              className={`${
                hasAnyOptionImage
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                  : "space-y-4"
              }`}
            >
              {Object.entries(question.options).map(([key, option]) => {
                const hasImage = option.image && option.image.trim() !== "";

                return (
                  <button
                    key={key}
                    onClick={() => handleAnswerSelect(key)}
                    disabled={selectedAnswer !== undefined}
                    className={`${getOptionStyle(
                      key
                    )} rounded-xl p-4 text-left transition-all duration-200 disabled:cursor-not-allowed w-full transform hover:scale-[1.02] active:scale-[0.98]`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold border-2 border-indigo-200">
                        {key}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 text-lg font-medium leading-relaxed">
                          {option.text}
                        </p>
                        {hasImage && (
                          <img
                            src={option.image}
                            alt={`Option ${key}`}
                            className="mt-3 max-w-full h-auto rounded-lg shadow-sm border"
                          />
                        )}
                      </div>
                      {selectedAnswer === key && (
                        <span className="flex-shrink-0">
                          {result ? (
                            <Check className="text-green-600" size={28} />
                          ) : (
                            <X className="text-red-600" size={28} />
                          )}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback */}
            {selectedAnswer && (
              <div
                className={`mt-8 p-6 rounded-xl border-2 ${
                  result
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                } transform transition-all duration-300`}
              >
                <div className="flex items-center gap-3">
                  {result ? (
                    <>
                      <Check className="text-green-600" size={24} />
                      <div>
                        <span className="font-semibold text-green-800 text-lg">
                          Correct Answer! 🎉
                        </span>
                        <p className="text-green-700 mt-1">
                          Well done! You selected the right answer.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="text-red-600" size={24} />
                      <div>
                        <span className="font-semibold text-red-800 text-lg">
                          Incorrect Answer
                        </span>
                        <p className="text-red-700 mt-1">
                          The correct answer is: <strong>{question.correctAnswer}</strong>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="bg-gray-50 border-t p-6">
            <div className="flex justify-between items-center">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center gap-3 px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold border-2 border-gray-200 shadow-sm hover:shadow-md"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              <div className="flex items-center gap-2 text-gray-700">
                <BarChart3 size={20} />
                <span className="font-semibold">
                  Score: {Object.values(showResult).filter(Boolean).length} /{" "}
                  {Object.keys(showResult).length}
                </span>
              </div>

              <button
                onClick={nextQuestion}
                disabled={currentQuestion === allData.length - 1}
                className="flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold shadow-lg hover:shadow-xl"
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Question Navigation */}
        <div className="w-80 bg-white rounded-2xl shadow-xl p-6 overflow-y-auto flex-shrink-0">
          {/* Enhanced Timer */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-1 shadow-lg">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className={`text-3xl font-bold ${getTimerColor()} mb-2`}>
                  {formatTime(timeRemaining)}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${getProgressBarColor()}`}
                    style={{
                      width: `${(timeRemaining / (testDuration * 60)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Target size={20} />
            Question Navigation
          </h3>

          {/* Enhanced Question Grid */}
          <div className="grid grid-cols-5 gap-3 mb-8">
            {allData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`${getQuestionBoxStyle(
                  index
                )} w-12 h-12 rounded-xl flex items-center justify-center font-semibold transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Enhanced Legend */}
          <div className="mb-8">
            <h4 className="font-semibold text-gray-800 mb-3">Status Legend</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-indigo-50">
                <div className="w-4 h-4 bg-indigo-600 rounded"></div>
                <span className="text-gray-700 font-medium">Current Question</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-green-50">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-700 font-medium">Correct Answer</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-red-50">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-700 font-medium">Incorrect Answer</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <span className="text-gray-700 font-medium">Not Answered</span>
              </div>
            </div>
          </div>

          {/* Enhanced Statistics */}
          <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <BarChart3 size={18} />
              Progress Summary
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Answered:</span>
                <span className="font-semibold text-indigo-600">
                  {Object.keys(selectedAnswers).length} / {allData.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Correct Answers:</span>
                <span className="font-semibold text-green-600">
                  {Object.values(showResult).filter(Boolean).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Incorrect Answers:</span>
                <span className="font-semibold text-red-600">
                  {Object.keys(showResult).length -
                    Object.values(showResult).filter(Boolean).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Accuracy:</span>
                <span className="font-semibold text-purple-600">
                  {Object.keys(selectedAnswers).length > 0
                    ? Math.round(
                        (Object.values(showResult).filter(Boolean).length /
                          Object.keys(selectedAnswers).length) *
                          100
                      )
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Check size={20} />
            Submit Test
          </button>

          {/* Time Warning */}
          {timeRemaining < 300 && ( // 5 minutes warning
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
              <AlertCircle size={16} className="inline text-red-600 mr-1" />
              <span className="text-red-700 text-sm font-medium">
                Less than 5 minutes remaining!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;


// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import {
//   ChevronLeft,
//   ChevronRight,
//   X,
//   Check,
//   AlertCircle,
//   Maximize,
//   Clock,
//   Trophy,
//   BarChart3,
//   Target,
//   BookmarkPlus,
//   Bookmark,
//   Eye,
//   Loader2,
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { addUserAttempt } from "../../APIRedux/UserAttemptReducer/UserAttemptReducer";
// import { jwtDecode } from "jwt-decode";
// import { getUserAttempt } from "../../APIRedux/UserAttemptReducer/GetAttemptReducer";

// // Custom hook for timer logic
// const useTimer = (initialTime, isActive, onTimeUp) => {
//   const [timeRemaining, setTimeRemaining] = useState(initialTime);

//   useEffect(() => {
//     if (!isActive || timeRemaining <= 0) return;

//     const timer = setInterval(() => {
//       setTimeRemaining((prevTime) => {
//         if (prevTime <= 1) {
//           clearInterval(timer);
//           onTimeUp();
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [isActive, timeRemaining, onTimeUp]);

//   return timeRemaining;
// };

// // Helper functions moved outside component
// const formatTime = (seconds) => {
//   const mins = Math.floor(seconds / 60);
//   const secs = seconds % 60;
//   return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
// };

// const getTimerColor = (timeRemaining, totalTime) => {
//   const percentRemaining = (timeRemaining / totalTime) * 100;
//   if (percentRemaining > 50) return "text-green-600";
//   if (percentRemaining > 20) return "text-yellow-600";
//   return "text-red-600 animate-pulse";
// };

// const getProgressBarColor = (timeRemaining, totalTime) => {
//   const percentRemaining = (timeRemaining / totalTime) * 100;
//   if (percentRemaining > 50) return "bg-green-500";
//   if (percentRemaining > 20) return "bg-yellow-500";
//   return "bg-red-500";
// };

// const getPerformanceData = (percentage) => {
//   if (percentage >= 90) return { message: "Outstanding! 🎉", color: "from-green-500 to-emerald-600" };
//   if (percentage >= 75) return { message: "Excellent! 👏", color: "from-blue-500 to-indigo-600" };
//   if (percentage >= 60) return { message: "Good Job! 👍", color: "from-yellow-500 to-orange-600" };
//   if (percentage >= 40) return { message: "Not Bad! 💪", color: "from-orange-500 to-red-600" };
//   return { message: "Keep Practicing! 📚", color: "from-red-500 to-pink-600" };
// };

// // Results Screen Component
// const ResultsScreen = ({ 
//   isTimeUp, 
//   correctAnswers, 
//   totalQuestions, 
//   timeTaken, 
//   testDuration,
//   selectedAnswers,
//   allData,
//   onRetake,
//   onBack,
//   onReview 
// }) => {
//   const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(1);
//   const minutesTaken = Math.floor(timeTaken / 60);
//   const secondsTaken = timeTaken % 60;
//   const performance = getPerformanceData(parseFloat(percentage));

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full animate-fadeIn">
//         <div className="text-center mb-8">
//           <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
//             {isTimeUp ? (
//               <Clock className="text-indigo-600" size={40} />
//             ) : (
//               <Trophy className="text-indigo-600" size={40} />
//             )}
//           </div>
//           <h2 className="text-4xl font-bold text-gray-800 mb-2">
//             {isTimeUp ? "Time's Up!" : "Test Completed!"}
//           </h2>
//           <p className="text-gray-600 text-lg">{performance.message}</p>
//         </div>

//         <div className={`bg-gradient-to-r ${performance.color} rounded-2xl p-1 mb-8`}>
//           <div className="bg-white rounded-xl p-6 text-center">
//             <div className="text-6xl font-bold text-gray-800 mb-2">
//               {percentage}%
//             </div>
//             <div className="text-xl text-gray-600 mb-4">
//               {correctAnswers} out of {totalQuestions} correct
//             </div>
//             <div className="flex justify-center space-x-8 text-sm text-gray-500">
//               <div className="flex items-center">
//                 <Clock size={16} className="mr-1" />
//                 {minutesTaken}m {secondsTaken}s
//               </div>
//               <div className="flex items-center">
//                 <Target size={16} className="mr-1" />
//                 {testDuration}m test
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-4 mb-8">
//           <div className="bg-green-50 rounded-lg p-4 text-center">
//             <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
//             <div className="text-sm text-green-800">Correct</div>
//           </div>
//           <div className="bg-red-50 rounded-lg p-4 text-center">
//             <div className="text-2xl font-bold text-red-600">
//               {Object.keys(selectedAnswers).length - correctAnswers}
//             </div>
//             <div className="text-sm text-red-800">Incorrect</div>
//           </div>
//           <div className="bg-gray-50 rounded-lg p-4 text-center">
//             <div className="text-2xl font-bold text-gray-600">
//               {allData.length - Object.keys(selectedAnswers).length}
//             </div>
//             <div className="text-sm text-gray-800">Unanswered</div>
//           </div>
//         </div>

//         <div className="flex gap-4">
//           <button
//             onClick={onReview}
//             className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
//             aria-label="Review answers"
//           >
//             <Eye size={20} />
//             Review Answers
//           </button>
//           <button
//             onClick={onRetake}
//             className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
//             aria-label="Retake test"
//           >
//             Retake Test
//           </button>
//           <button
//             onClick={onBack}
//             className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
//             aria-label="Go back to tests"
//           >
//             Back to Tests
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Review Mode Component
// const ReviewMode = ({ allData, selectedAnswers, showResult, onExit }) => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const question = allData[currentQuestion];

//   const nextQuestion = () => {
//     if (currentQuestion < allData.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const prevQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.key === "ArrowRight") nextQuestion();
//       if (e.key === "ArrowLeft") prevQuestion();
//       if (e.key === "Escape") onExit();
//     };

//     window.addEventListener("keydown", handleKeyPress);
//     return () => window.removeEventListener("keydown", handleKeyPress);
//   }, [currentQuestion]);

//   const selectedAnswer = selectedAnswers[currentQuestion];
//   const isCorrect = showResult[currentQuestion];

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-auto p-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
//           <div className="flex justify-between items-center">
//             <h2 className="text-2xl font-bold">Review Mode</h2>
//             <button
//               onClick={onExit}
//               className="p-2 hover:bg-white/20 rounded-lg transition"
//               aria-label="Exit review mode"
//             >
//               <X size={24} />
//             </button>
//           </div>
//           <div className="mt-4 flex items-center gap-4">
//             <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
//               Question {currentQuestion + 1} of {allData.length}
//             </span>
//             <div className="flex-1 bg-white/30 rounded-full h-2">
//               <div
//                 className="bg-white h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${((currentQuestion + 1) / allData.length) * 100}%` }}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="p-8">
//           <h3 className="text-2xl font-bold text-gray-800 mb-6">
//             {question.questionName?.text}
//           </h3>

//           {question.questionName?.image && (
//             <img
//               src={question.questionName.image}
//               alt="Question"
//               className="max-w-full h-auto rounded-xl shadow-lg border mb-6"
//             />
//           )}

//           <div className="space-y-4 mb-6">
//             {Object.entries(question.options).map(([key, option]) => {
//               const isSelected = selectedAnswer === key;
//               const isCorrectAnswer = key === question.correctAnswer;
              
//               let bgColor = "bg-white border-gray-300";
//               if (isCorrectAnswer) {
//                 bgColor = "bg-green-50 border-green-500 border-2";
//               } else if (isSelected && !isCorrect) {
//                 bgColor = "bg-red-50 border-red-500 border-2";
//               }

//               return (
//                 <div
//                   key={key}
//                   className={`${bgColor} rounded-xl p-4 border`}
//                 >
//                   <div className="flex items-start gap-4">
//                     <span className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
//                       {key}
//                     </span>
//                     <div className="flex-1">
//                       <p className="text-gray-800 text-lg">{option.text}</p>
//                       {option.image && (
//                         <img
//                           src={option.image}
//                           alt={`Option ${key}`}
//                           className="mt-3 max-w-full h-auto rounded-lg"
//                         />
//                       )}
//                     </div>
//                     {isCorrectAnswer && (
//                       <Check className="text-green-600" size={24} />
//                     )}
//                     {isSelected && !isCorrect && (
//                       <X className="text-red-600" size={24} />
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {selectedAnswer !== undefined ? (
//             <div
//               className={`p-6 rounded-xl border-2 ${
//                 isCorrect
//                   ? "bg-green-50 border-green-200"
//                   : "bg-red-50 border-red-200"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 {isCorrect ? (
//                   <>
//                     <Check className="text-green-600" size={24} />
//                     <div>
//                       <span className="font-semibold text-green-800 text-lg">
//                         You got this correct! 🎉
//                       </span>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <AlertCircle className="text-red-600" size={24} />
//                     <div>
//                       <span className="font-semibold text-red-800 text-lg">
//                         Your answer was incorrect
//                       </span>
//                       <p className="text-red-700 mt-1">
//                         You selected: <strong>{selectedAnswer}</strong> | Correct answer: <strong>{question.correctAnswer}</strong>
//                       </p>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="p-6 rounded-xl border-2 bg-gray-50 border-gray-200">
//               <div className="flex items-center gap-3">
//                 <AlertCircle className="text-gray-600" size={24} />
//                 <span className="text-gray-700">
//                   You didn't answer this question. Correct answer: <strong>{question.correctAnswer}</strong>
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="bg-gray-50 border-t p-6 flex justify-between">
//           <button
//             onClick={prevQuestion}
//             disabled={currentQuestion === 0}
//             className="flex items-center gap-3 px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold border-2 border-gray-200"
//             aria-label="Previous question"
//           >
//             <ChevronLeft size={20} />
//             Previous
//           </button>

//           <button
//             onClick={nextQuestion}
//             disabled={currentQuestion === allData.length - 1}
//             className="flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
//             aria-label="Next question"
//           >
//             Next
//             <ChevronRight size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Test Component
// const Test = () => {
//   const courseId = useParams();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const { test } = location.state || {};

//   const getToken = localStorage.getItem("token");
//   const decoded = jwtDecode(getToken);
//   const userDataId = decoded?.id;

//   const testDataId = test?._id || [];
//   const { getData, loading, error } = useSelector((state) => state.getUserAttempt);

//   useEffect(() => {
//     if (testDataId && userDataId) {
//       dispatch(getUserAttempt({ testId: testDataId, userId: userDataId }));
//     }
//   }, [dispatch, testDataId, userDataId]);

//   const allData = test?.questions || [];
//   const testDuration = parseInt(test?.duration) || 30;
//   const totalTimeSeconds = testDuration * 60;

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [showResult, setShowResult] = useState({});
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isTimeUp, setIsTimeUp] = useState(false);
//   const [bookmarkedQuestions, setBookmarkedQuestions] = useState(new Set());
//   const [isReviewMode, setIsReviewMode] = useState(false);
//   const [submitError, setSubmitError] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Auto-submit callback
//   const handleAutoSubmit = useCallback(() => {
//     const answers = allData.map((q, index) => ({
//       questionId: q._id,
//       selectedAnswer: selectedAnswers[index] || null,
//       isCorrect: showResult[index] || false,
//     }));

//     setIsTimeUp(true);
//     setIsSubmitted(true);
//     setIsSubmitting(true);
    
//     dispatch(addUserAttempt({ testId: testDataId, answers }))
//       .then(() => setIsSubmitting(false))
//       .catch((err) => {
//         setSubmitError("Failed to submit test. Please try again.");
//         setIsSubmitting(false);
//       });
//   }, [allData, selectedAnswers, showResult, testDataId, dispatch]);

//   // Timer hook
//   const timeRemaining = useTimer(totalTimeSeconds, !isSubmitted, handleAutoSubmit);

//   // Warn before leaving page
//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (!isSubmitted) {
//         e.preventDefault();
//         e.returnValue = "";
//         return "";
//       }
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
//   }, [isSubmitted]);

//   // Fullscreen handling
//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };

//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
//   }, []);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (isSubmitted || isReviewMode) return;
      
//       if (e.key === "ArrowRight" && currentQuestion < allData.length - 1) {
//         setCurrentQuestion(currentQuestion + 1);
//       }
//       if (e.key === "ArrowLeft" && currentQuestion > 0) {
//         setCurrentQuestion(currentQuestion - 1);
//       }
//       if (e.key === "b" || e.key === "B") {
//         toggleBookmark(currentQuestion);
//       }
//     };

//     window.addEventListener("keydown", handleKeyPress);
//     return () => window.removeEventListener("keydown", handleKeyPress);
//   }, [currentQuestion, allData.length, isSubmitted, isReviewMode]);

//   const handleAnswerSelect = useCallback((optionKey) => {
//     const question = allData[currentQuestion];
//     const isCorrect = optionKey === question.correctAnswer;

//     setSelectedAnswers(prev => ({
//       ...prev,
//       [currentQuestion]: optionKey,
//     }));

//     setShowResult(prev => ({
//       ...prev,
//       [currentQuestion]: isCorrect,
//     }));
//   }, [currentQuestion, allData]);

//   const nextQuestion = useCallback(() => {
//     if (currentQuestion < allData.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   }, [currentQuestion, allData.length]);

//   const prevQuestion = useCallback(() => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   }, [currentQuestion]);

//   const goToQuestion = useCallback((index) => {
//     setCurrentQuestion(index);
//   }, []);

//   const toggleBookmark = useCallback((index) => {
//     setBookmarkedQuestions(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(index)) {
//         newSet.delete(index);
//       } else {
//         newSet.add(index);
//       }
//       return newSet;
//     });
//   }, []);

//   const handleSubmit = useCallback(() => {
//     const unanswered = allData.length - Object.keys(selectedAnswers).length;

//     const answers = allData.map((q, index) => ({
//       questionId: q._id,
//       selectedAnswer: selectedAnswers[index] || null,
//       isCorrect: showResult[index] || false,
//     }));

//     const submitTest = () => {
//       setIsSubmitted(true);
//       setIsSubmitting(true);
//       dispatch(addUserAttempt({ testId: testDataId, answers }))
//         .then(() => setIsSubmitting(false))
//         .catch((err) => {
//           setSubmitError("Failed to submit test. Please try again.");
//           setIsSubmitting(false);
//           setIsSubmitted(false);
//         });
//     };

//     if (unanswered > 0) {
//       if (
//         window.confirm(
//           `You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}. Do you want to submit anyway?`
//         )
//       ) {
//         submitTest();
//       }
//     } else {
//       submitTest();
//     }
//   }, [allData, selectedAnswers, showResult, testDataId, dispatch]);

//   const toggleFullscreen = async () => {
//     try {
//       if (!document.fullscreenElement) {
//         await document.documentElement.requestFullscreen();
//       } else {
//         await document.exitFullscreen();
//       }
//     } catch (err) {
//       console.error("Fullscreen error:", err);
//     }
//   };

//   // Memoized calculations
//   const stats = useMemo(() => ({
//     answered: Object.keys(selectedAnswers).length,
//     correct: Object.values(showResult).filter(Boolean).length,
//     incorrect: Object.keys(showResult).length - Object.values(showResult).filter(Boolean).length,
//     accuracy: Object.keys(selectedAnswers).length > 0
//       ? Math.round((Object.values(showResult).filter(Boolean).length / Object.keys(selectedAnswers).length) * 100)
//       : 0,
//   }), [selectedAnswers, showResult]);

//   // Review mode
//   if (isReviewMode) {
//     return (
//       <ReviewMode
//         allData={allData}
//         selectedAnswers={selectedAnswers}
//         showResult={showResult}
//         onExit={() => setIsReviewMode(false)}
//       />
//     );
//   }

//   // Results screen
//   if (isSubmitted) {
//     const timeTaken = totalTimeSeconds - timeRemaining;

//     return (
//       <ResultsScreen
//         isTimeUp={isTimeUp}
//         correctAnswers={stats.correct}
//         totalQuestions={allData.length}
//         timeTaken={timeTaken}
//         testDuration={testDuration}
//         selectedAnswers={selectedAnswers}
//         allData={allData}
//         onRetake={() => window.location.reload()}
//         onBack={() => window.history.back()}
//         onReview={() => setIsReviewMode(true)}
//       />
//     );
//   }

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
//           <Loader2 className="mx-auto text-indigo-600 mb-4 animate-spin" size={48} />
//           <h3 className="text-xl font-bold text-gray-800 mb-2">Loading Test...</h3>
//           <p className="text-gray-600">Please wait while we prepare your test.</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error || submitError) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
//           <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
//           <h3 className="text-xl font-bold text-gray-800 mb-2">Error</h3>
//           <p className="text-gray-600 mb-6">{submitError || "Failed to load test data."}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // No questions state
//   if (!allData || allData.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
//           <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
//           <h3 className="text-xl font-bold text-gray-800 mb-2">No Questions Available</h3>
//           <p className="text-gray-600 mb-6">This test doesn't contain any questions yet.</p>
//           <button
//             onClick={() => window.history.back()}
//             className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const question = allData[currentQuestion];
//   const selectedAnswer = selectedAnswers[currentQuestion];
//   const result = showResult[currentQuestion];
//   const isBookmarked = bookmarkedQuestions.has(currentQuestion);

//   const getOptionStyle = (optionKey) => {
//     if (selectedAnswer === optionKey) {
//       return result
//         ? "bg-green-50 border-green-500 border-2 shadow-md"
//         : "bg-red-50 border-red-500 border-2 shadow-md";
//     }
//     return "bg-white border-gray-300 border hover:bg-gray-50 hover:shadow-md hover:border-gray-400";
//   };

//   const getQuestionBoxStyle = (index) => {
//     if (selectedAnswers[index] !== undefined) {
//       return showResult[index]
//         ? "bg-green-500 text-white shadow-md"
//         : "bg-red-500 text-white shadow-md";
//     }
//     if (index === currentQuestion) {
//       return "bg-indigo-600 text-white shadow-lg transform scale-105";
//     }
//     if (bookmarkedQuestions.has(index)) {
//       return "bg-yellow-400 text-gray-800 shadow-md";
//     }
//     return "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md";
//   };

//   const hasAnyOptionImage = Object.values(question.options).some(
//     (opt) => opt.image && opt.image.trim() !== ""
//   );

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
//       <div className="h-full flex p-4 gap-4">
//         {/* Main Content Area */}
//         <div className="flex-1 flex flex-col min-w-0 bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
//             <div className="flex justify-between items-center mb-4">
//               <div className="flex items-center gap-4">
//                 <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
//                   Question {currentQuestion + 1} of {allData.length}
//                 </span>
//                 <div className="w-48 bg-white/30 rounded-full h-2">
//                   <div
//                     className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(timeRemaining, totalTimeSeconds)}`}
//                     style={{
//                       width: `${((currentQuestion + 1) / allData.length) * 100}%`,
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="text-2xl font-black text-white">{test?.testName}</div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => toggleBookmark(currentQuestion)}
//                   className="p-2 hover:bg-white/20 rounded-lg transition backdrop-blur-sm"
//                   title={isBookmarked ? "Remove bookmark" : "Bookmark question (Press B)"}
//                   aria-label={isBookmarked ? "Remove bookmark" : "Bookmark question"}
//                 >
//                   {isBookmarked ? (
//                     <Bookmark size={20} className="fill-current" />
//                   ) : (
//                     <BookmarkPlus size={20} />
//                   )}
//                 </button>
//                 <button
//                   onClick={toggleFullscreen}
//                   className="p-2 hover:bg-white/20 rounded-lg transition backdrop-blur-sm"
//                   title={isFullscreen ? "Exit Fullscreen (Press ESC)" : "Enter Fullscreen"}
//                   aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
//                 >
//                   {isFullscreen ? <X size={20} /> : <Maximize size={20} />}
//                 </button>
//               </div>
//             </div>

//             {/* Timer */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Clock size={20} className="text-white/80" />
//                 <span className="text-sm font-medium">Time Remaining</span>
//               </div>
//               <div className="text-right">
//                 <div 
//                   className={`text-3xl font-bold ${getTimerColor(timeRemaining, totalTimeSeconds)} bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm`}
//                   role="timer"
//                   aria-live="polite"
//                   aria-atomic="true"
//                 >
//                   {formatTime(timeRemaining)}
//                 </div>
//                 <div className="text-xs text-white/70 mt-1">
//                   {Math.ceil(timeRemaining / 60)} minutes left
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Question Content */}
//           <div className="flex-1 overflow-y-auto p-8">
//             {/* Question Text/Image */}
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
//                 {question.questionName?.text}
//               </h2>
//               {question.questionName?.image && question.questionName.image.trim() !== "" && (
//                 <div className="mb-6">
//                   <img
//                     src={question.questionName.image}
//                     alt="Question"
//                     className="max-w-full h-auto rounded-xl shadow-lg border"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Options */}
//             <div
//               className={`${
//                 hasAnyOptionImage
//                   ? "grid grid-cols-1 md:grid-cols-2 gap-4"
//                   : "space-y-4"
//               }`}
//             >
//               {Object.entries(question.options).map(([key, option]) => {
//                 const hasImage = option.image && option.image.trim() !== "";

//                 return (
//                   <button
//                     key={key}
//                     onClick={() => handleAnswerSelect(key)}
//                     disabled={selectedAnswer !== undefined}
//                     className={`${getOptionStyle(
//                       key
//                     )} rounded-xl p-4 text-left transition-all duration-200 disabled:cursor-not-allowed w-full transform hover:scale-[1.02] active:scale-[0.98]`}
//                     aria-label={`Option ${key}: ${option.text}`}
//                     aria-pressed={selectedAnswer === key}
//                   >
//                     <div className="flex items-start gap-4">
//                       <span className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold border-2 border-indigo-200">
//                         {key}
//                       </span>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-gray-800 text-lg font-medium leading-relaxed">
//                           {option.text}
//                         </p>
//                         {hasImage && (
//                           <img
//                             src={option.image}
//                             alt={`Option ${key}`}
//                             className="mt-3 max-w-full h-auto rounded-lg shadow-sm border"
//                           />
//                         )}
//                       </div>
//                       {selectedAnswer === key && (
//                         <span className="flex-shrink-0">
//                           {result ? (
//                             <Check className="text-green-600" size={28} />
//                           ) : (
//                             <X className="text-red-600" size={28} />
//                           )}
//                         </span>
//                       )}
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Answer Feedback */}
//             {selectedAnswer && (
//               <div
//                 className={`mt-8 p-6 rounded-xl border-2 ${
//                   result
//                     ? "bg-green-50 border-green-200"
//                     : "bg-red-50 border-red-200"
//                 } transform transition-all duration-300`}
//                 role="alert"
//                 aria-live="polite"
//               >
//                 <div className="flex items-center gap-3">
//                   {result ? (
//                     <>
//                       <Check className="text-green-600" size={24} />
//                       <div>
//                         <span className="font-semibold text-green-800 text-lg">
//                           Correct Answer! 🎉
//                         </span>
//                         <p className="text-green-700 mt-1">
//                           Well done! You selected the right answer.
//                         </p>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <AlertCircle className="text-red-600" size={24} />
//                       <div>
//                         <span className="font-semibold text-red-800 text-lg">
//                           Incorrect Answer
//                         </span>
//                         <p className="text-red-700 mt-1">
//                           The correct answer is: <strong>{question.correctAnswer}</strong>
//                         </p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Navigation */}
//           <div className="bg-gray-50 border-t p-6">
//             <div className="flex justify-between items-center">
//               <button
//                 onClick={prevQuestion}
//                 disabled={currentQuestion === 0}
//                 className="flex items-center gap-3 px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold border-2 border-gray-200 shadow-sm hover:shadow-md"
//                 aria-label="Go to previous question"
//               >
//                 <ChevronLeft size={20} />
//                 Previous
//               </button>

//               <div className="flex items-center gap-2 text-gray-700">
//                 <BarChart3 size={20} />
//                 <span className="font-semibold">
//                   Score: {stats.correct} / {stats.answered}
//                 </span>
//               </div>

//               <button
//                 onClick={nextQuestion}
//                 disabled={currentQuestion === allData.length - 1}
//                 className="flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold shadow-lg hover:shadow-xl"
//                 aria-label="Go to next question"
//               >
//                 Next
//                 <ChevronRight size={20} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Sidebar - Question Navigation */}
//         <div className="w-80 bg-white rounded-2xl shadow-xl p-6 overflow-y-auto flex-shrink-0">
//           {/* Enhanced Timer */}
//           <div className="mb-6">
//             <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-1 shadow-lg">
//               <div className="bg-white rounded-lg p-4 text-center">
//                 <div className={`text-3xl font-bold ${getTimerColor(timeRemaining, totalTimeSeconds)} mb-2`}>
//                   {formatTime(timeRemaining)}
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div
//                     className={`h-2 rounded-full transition-all duration-1000 ${getProgressBarColor(timeRemaining, totalTimeSeconds)}`}
//                     style={{
//                       width: `${(timeRemaining / totalTimeSeconds) * 100}%`,
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//             <Target size={20} />
//             Question Navigation
//           </h3>
//           <p className="text-sm text-gray-600 mb-4">Use arrow keys ← → to navigate</p>

//           {/* Enhanced Question Grid */}
//           <div className="grid grid-cols-5 gap-3 mb-8">
//             {allData.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToQuestion(index)}
//                 className={`${getQuestionBoxStyle(
//                   index
//                 )} w-12 h-12 rounded-xl flex items-center justify-center font-semibold transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm relative`}
//                 aria-label={`Go to question ${index + 1}${bookmarkedQuestions.has(index) ? ' (bookmarked)' : ''}`}
//               >
//                 {index + 1}
//                 {bookmarkedQuestions.has(index) && (
//                   <Bookmark size={10} className="absolute -top-1 -right-1 fill-current text-yellow-500" />
//                 )}
//               </button>
//             ))}
//           </div>

//           {/* Enhanced Legend */}
//           <div className="mb-8">
//             <h4 className="font-semibold text-gray-800 mb-3">Status Legend</h4>
//             <div className="space-y-2 text-sm">
//               <div className="flex items-center gap-3 p-2 rounded-lg bg-indigo-50">
//                 <div className="w-4 h-4 bg-indigo-600 rounded"></div>
//                 <span className="text-gray-700 font-medium">Current Question</span>
//               </div>
//               <div className="flex items-center gap-3 p-2 rounded-lg bg-green-50">
//                 <div className="w-4 h-4 bg-green-500 rounded"></div>
//                 <span className="text-gray-700 font-medium">Correct Answer</span>
//               </div>
//               <div className="flex items-center gap-3 p-2 rounded-lg bg-red-50">
//                 <div className="w-4 h-4 bg-red-500 rounded"></div>
//                 <span className="text-gray-700 font-medium">Incorrect Answer</span>
//               </div>
//               <div className="flex items-center gap-3 p-2 rounded-lg bg-yellow-50">
//                 <div className="w-4 h-4 bg-yellow-400 rounded"></div>
//                 <span className="text-gray-700 font-medium">Bookmarked</span>
//               </div>
//               <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
//                 <div className="w-4 h-4 bg-gray-300 rounded"></div>
//                 <span className="text-gray-700 font-medium">Not Answered</span>
//               </div>
//             </div>
//           </div>

//           {/* Enhanced Statistics */}
//           <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
//             <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//               <BarChart3 size={18} />
//               Progress Summary
//             </h4>
//             <div className="space-y-3 text-sm">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Total Answered:</span>
//                 <span className="font-semibold text-indigo-600">
//                   {stats.answered} / {allData.length}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Correct Answers:</span>
//                 <span className="font-semibold text-green-600">
//                   {stats.correct}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Incorrect Answers:</span>
//                 <span className="font-semibold text-red-600">
//                   {stats.incorrect}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Accuracy:</span>
//                 <span className="font-semibold text-purple-600">
//                   {stats.accuracy}%
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Bookmarked:</span>
//                 <span className="font-semibold text-yellow-600">
//                   {bookmarkedQuestions.size}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Enhanced Submit Button */}
//           <button
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             aria-label="Submit test"
//           >
//             {isSubmitting ? (
//               <>
//                 <Loader2 size={20} className="animate-spin" />
//                 Submitting...
//               </>
//             ) : (
//               <>
//                 <Check size={20} />
//                 Submit Test
//               </>
//             )}
//           </button>

//           {/* Time Warning */}
//           {timeRemaining < 300 && timeRemaining > 0 && (
//             <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center animate-pulse" role="alert">
//               <AlertCircle size={16} className="inline text-red-600 mr-1" />
//               <span className="text-red-700 text-sm font-medium">
//                 Less than 5 minutes remaining!
//               </span>
//             </div>
//           )}

//           {/* Keyboard Shortcuts Help */}
//           <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//             <h5 className="text-xs font-semibold text-blue-900 mb-2">Keyboard Shortcuts</h5>
//             <div className="space-y-1 text-xs text-blue-800">
//               <div>← → Navigate questions</div>
//               <div>B Bookmark question</div>
//               <div>ESC Exit fullscreen</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Test;