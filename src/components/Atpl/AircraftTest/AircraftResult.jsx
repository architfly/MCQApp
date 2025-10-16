// AircraftResult.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";

const AircraftResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 text-lg font-semibold">
          ⚠ No result data found.
        </p>
      </div>
    );
  }

  const { correct, wrong, unseen, total, time, sectionReport, questions, answers } = state;
  const percentage = Math.round((correct / total) * 100);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Re-Test Button */}
      <div className="flex justify-end max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate("/aircraft-test")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          <FiRefreshCw />
          Re-Test
        </button>
      </div>

      {/* Score Card */}
      <div className="max-w-6xl mx-auto mb-8 shadow-xl rounded-xl overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-center py-10">
          <h2 className="text-5xl font-bold">{percentage}%</h2>
          <p className="text-md mt-2">
            {total} Questions | {formatTime(time)}
          </p>
        </div>

        {/* Correct/Wrong/Unseen Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x bg-gray-50">
          {[
            { label: "Correct", value: correct, color: "green" },
            { label: "Incorrect", value: wrong, color: "red" },
            { label: "Unseen", value: unseen, color: "gray" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center py-10 hover:bg-gray-100 transition duration-300"
            >
              <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-${item.color}-100`}>
                <span className={`text-${item.color}-600 font-bold text-3xl`}>
                  {item.value}
                </span>
              </div>
              <p className={`mt-3 text-${item.color}-600 font-semibold text-lg`}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section Report */}
      <div className="max-w-6xl mx-auto mb-8 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold mb-4 text-indigo-600">📑 Section Report</h3>
        <div className="space-y-4">
          {sectionReport?.map((sec, idx) => {
            const correctPercent = (sec.correct / sec.total) * 100;
            const wrongPercent = ((sec.total - sec.correct) / sec.total) * 100;
            const unseenPercent = 100 - correctPercent - wrongPercent;

            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>{sec.name}</span>
                  <span>{Math.round(correctPercent)}%</span>
                </div>
                <div className="w-full h-4 flex rounded bg-gray-200 overflow-hidden">
                  <div
                    className="bg-green-500 h-4 transition-all duration-700"
                    style={{ width: `${correctPercent}%` }}
                  ></div>
                  <div
                    className="bg-red-500 h-4 transition-all duration-700"
                    style={{ width: `${wrongPercent}%` }}
                  ></div>
                  <div
                    className="bg-gray-400 h-4 transition-all duration-700"
                    style={{ width: `${unseenPercent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question Review */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold mb-4 text-indigo-600">📋 Question Review</h3>
        <div className="space-y-4">
          {questions?.map((q, idx) => {
            const ans = answers[q.id];
            return (
              <div
                key={q.id}
                className="p-4 border rounded-xl hover:shadow-lg transition duration-300 bg-gray-50"
              >
                <p className="font-semibold mb-2">
                  {idx + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, i) => {
                    const isCorrect = q.answer === opt;
                    const isSelected = ans?.selected === opt;
                    return (
                      <div
                        key={i}
                        className={`p-2 rounded-lg border ${
                          isCorrect
                            ? "bg-green-100 border-green-400"
                            : isSelected && !isCorrect
                            ? "bg-red-100 border-red-400"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        {opt}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AircraftResult;
