 




import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ✅ Dummy Questions (replace with API later if needed)
const questions = [
  {
    id: 1,
    question: "Which system provides electrical power in aircraft?",
    options: ["Hydraulic Pump", "Generator", "Pneumatic System", "Battery Only"],
    answer: "Generator",
    explanation:
      "Aircraft typically use generators (or alternators) to provide continuous electrical power during flight.",
  },
  {
    id: 2,
    question: "What is the primary purpose of flaps?",
    options: [
      "Increase drag only",
      "Reduce stall speed",
      "Decrease lift",
      "Increase speed",
    ],
    answer: "Reduce stall speed",
    explanation:
      "Flaps increase lift at lower speeds, reducing stall speed and allowing safer takeoff/landing.",
  },
  {
    id: 3,
    question: "What does the altimeter in an aircraft measure?",
    options: ["Airspeed", "Altitude", "Engine RPM", "Fuel Pressure"],
    answer: "Altitude",
    explanation:
      "The altimeter measures altitude using atmospheric pressure changes.",
  },
  {
    id: 4,
    question: "Which component controls the aircraft’s roll movement?",
    options: ["Rudder", "Ailerons", "Elevator", "Flaps"],
    answer: "Ailerons",
    explanation: "Ailerons control roll by changing the lift on each wing.",
  },
  {
    id: 5,
    question: "What does a Vertical Speed Indicator (VSI) show?",
    options: [
      "Climb or descent rate",
      "Engine thrust",
      "Ground speed",
      "Wind direction",
    ],
    answer: "Climb or descent rate",
    explanation:
      "The VSI indicates the rate at which the aircraft is climbing or descending (ft/min).",
  },
];

const AircraftTest = () => {
  const { state } = useLocation();
  const { duration } = state || {};

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(duration ? duration * 60 : 0);
  const [activeTab, setActiveTab] = useState("progress");
  const [editorContent, setEditorContent] = useState("");

  const editorRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => (duration ? Math.max(t - 1, 0) : t + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [duration]);

  // ✅ Handle Answer Selection
  const handleSelect = (option) => {
    if (selected) return;
    setSelected(option);

    const isCorrect = option === questions[currentQ].answer;
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQ].id]: { selected: option, correct: isCorrect },
    }));

    if (isCorrect) setScore((prev) => prev + 1);
  };

  // ✅ Navigation
  const handleNext = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ((prev) => prev + 1);
      setSelected(answers[questions[currentQ + 1]?.id]?.selected || null);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ((prev) => prev - 1);
      setSelected(answers[questions[currentQ - 1]?.id]?.selected || null);
    }
  };

  const jumpToQuestion = (idx) => {
    setCurrentQ(idx);
    setSelected(answers[questions[idx]?.id]?.selected || null);
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    setEditorContent(editorRef.current.innerHTML);
  };

  // ✅ Stats
  const attempted = Object.keys(answers).length;
  const correct = Object.values(answers).filter((a) => a.correct).length;
  const wrong = attempted - correct;
  const unseen = questions.length - attempted;

  // ✅ Finish Test
  const handleFinish = () => {
    navigate("/aircraft-result", {
      state: {
        score,
        correct,
        wrong,
        unseen,
        attempted,
        total: questions.length,
        time,
        questions,
        answers,
      },
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow relative">

        {/* --- Timer --- */}
        <div className="absolute top-4 right-6 bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm font-semibold">
          ⏱ {formatTime(time)}
        </div>

        {/* --- Question --- */}
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Q{currentQ + 1}. {questions[currentQ].question}
        </h2>

        {/* --- Options --- */}
        <div className="space-y-4">
          {questions[currentQ].options.map((option, i) => {
            const isSelected = selected === option;
            const isCorrectAnswer = option === questions[currentQ].answer;

            let optionStyle =
              "w-full p-4 text-left border rounded-lg transition font-medium ";

            if (selected) {
              if (isCorrectAnswer) {
                optionStyle += "bg-green-200 text-green-900 border-green-500";
              } else if (isSelected && !isCorrectAnswer) {
                optionStyle += "bg-red-200 text-red-900 border-red-500";
              } else {
                optionStyle += "bg-white border-gray-300 text-gray-800 opacity-80";
              }
            } else {
              optionStyle += "bg-white hover:bg-blue-50 border-gray-300 text-gray-800";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(option)}
                disabled={!!selected}
                className={optionStyle}
              >
                {String.fromCharCode(65 + i)}. {option}
              </button>
            );
          })}
        </div>

        {/* --- Tabs --- */}
        <div className="mt-10 border-t">
          <div className="grid grid-cols-4 text-sm font-medium text-gray-600">
            {["progress", "explanation", "notes", "stats"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 border-b-2 transition ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent hover:text-blue-600"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="p-4 text-gray-700 text-sm">
            {/* Progress Tab */}
            {activeTab === "progress" && (
              <div className="flex space-x-2 flex-wrap">
                {questions.map((q, idx) => {
                  const ans = answers[q.id];
                  const isCurrent = idx === currentQ;
                  let style =
                    "w-8 h-8 flex items-center justify-center rounded-md border font-medium cursor-pointer ";

                  if (isCurrent) {
                    style += "bg-blue-600 text-white border-blue-600";
                  } else if (ans) {
                    style += ans.correct
                      ? "bg-green-500 text-white border-green-600"
                      : "bg-red-500 text-white border-red-600";
                  } else {
                    style += "bg-gray-100 text-gray-700 border-gray-300";
                  }

                  return (
                    <div
                      key={q.id}
                      className={style}
                      onClick={() => jumpToQuestion(idx)}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Explanation Tab */}
            {activeTab === "explanation" && (
              <div>
                <p className="text-blue-600 font-medium mb-2">
                  ↓ Share your explanation with other pilots worldwide ↓
                </p>
                <div className="flex flex-wrap gap-2 border-b pb-2 mb-2">
                  <button onClick={() => applyFormat("bold")} className="px-2 font-bold">B</button>
                  <button onClick={() => applyFormat("italic")} className="px-2 italic">I</button>
                  <button onClick={() => applyFormat("underline")} className="px-2 underline">U</button>
                  <button onClick={() => applyFormat("strikeThrough")} className="px-2">S</button>
                  <select onChange={(e) => applyFormat("fontSize", e.target.value)}>
                    {[12, 14, 16, 18, 20].map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                  <input type="color" onChange={(e) => applyFormat("foreColor", e.target.value)} />
                  <button onClick={() => applyFormat("insertUnorderedList")}>• List</button>
                  <button onClick={() => applyFormat("insertOrderedList")}>1. List</button>
                  <button onClick={() => applyFormat("createLink", prompt("Enter URL:"))}>🔗</button>
                  <button onClick={() => applyFormat("undo")}>↩ Undo</button>
                  <button onClick={() => applyFormat("redo")}>↪ Redo</button>
                </div>
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  className="w-full min-h-[120px] border rounded-lg p-3 focus:outline-none"
                  onInput={(e) => setEditorContent(e.currentTarget.innerHTML)}
                ></div>
              </div>
            )}

            {/* Notes Tab */}
            {activeTab === "notes" && (
              <textarea
                className="w-full border rounded-lg p-2"
                placeholder="Write your notes here..."
                rows={4}
              />
            )}

            {/* Stats Tab */}
            {activeTab === "stats" && (
              <div className="space-y-2">
                <p>Attempted: {attempted} / {questions.length}</p>
                <p className="text-green-600 font-medium">✔ Correct: {correct}</p>
                <p className="text-red-600 font-medium">✘ Wrong: {wrong}</p>
              </div>
            )}
          </div>
        </div>

        {/* --- Bottom Nav --- */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQ === 0}
            className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition
              ${currentQ === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}
          >
            ← Prev
          </button>

          {currentQ + 1 === questions.length ? (
            <button
              onClick={handleFinish}
              className="px-6 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 shadow"
            >
              Finish
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition bg-blue-600 text-white hover:bg-blue-700 shadow"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AircraftTest;
