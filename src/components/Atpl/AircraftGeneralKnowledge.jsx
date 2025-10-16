 

import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Rocket, CheckCircle, XCircle, Eye } from "lucide-react";

// ✅ Chapters Data
const chapters = [
  { id: 1, title: "International Law: Conventions, Agreements, Organizations", questions: 61 },
  { id: 2, title: "Airworthiness of Aircraft", questions: 18 },
  { id: 3, title: "Aircraft Nationality and Registration Marks", questions: 9 },
  { id: 4, title: "ICAO Annexes", questions: 12 },
  { id: 5, title: "Flight Instruments and Navigation Systems", questions: 25 },
  { id: 6, title: "Aircraft Structures and Materials", questions: 15 },
  { id: 7, title: "Powerplant & Propulsion Systems", questions: 22 },
  { id: 8, title: "Fuel, Hydraulic, and Pneumatic Systems", questions: 17 },
  { id: 9, title: "Electrical and Electronic Systems", questions: 28 },
  { id: 10, title: "Emergency Equipment and Procedures", questions: 14 },
  { id: 11, title: "Human Performance and Limitations", questions: 20 },
  { id: 12, title: "Meteorology for Aviation", questions: 30 },
  { id: 13, title: "Air Traffic Management", questions: 19 },
  { id: 14, title: "Flight Planning and Monitoring", questions: 21 },
  { id: 15, title: "Aircraft Performance", questions: 16 },
  { id: 16, title: "Mass and Balance", questions: 11 },
  { id: 17, title: "Operational Procedures", questions: 24 },
  { id: 18, title: "General Navigation", questions: 27 },
  { id: 19, title: "Radio Navigation", questions: 23 },
  { id: 20, title: "Principles of Flight", questions: 29 },
];

const durations = [15, 30, 60];

const AircraftGeneralKnowledge = () => {
  const [duration, setDuration] = useState(30);
  const [showSummary, setShowSummary] = useState(false);

  const navigate = useNavigate();

  // ✅ All chapters always selected
  const selectedChapters = chapters.map((c) => c.id);

  // ✅ Total questions count
  const filteredQuestions = useMemo(() => {
    return chapters.reduce((sum, c) => sum + c.questions, 0);
  }, []);

  const resetAll = () => {
    setDuration(30);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* --- Stats Section --- */}
        <div className="col-span-12 grid grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 shadow rounded-lg text-center hover:scale-105 transition hover:shadow-lg">
            <CheckCircle className="mx-auto text-green-600 mb-2" size={30} />
            <div className="text-3xl font-bold text-green-600">0</div>
            <p className="text-gray-600 font-medium">Correct</p>
          </div>
          <div className="p-6 bg-gradient-to-r from-red-50 to-red-100 shadow rounded-lg text-center hover:scale-105 transition hover:shadow-lg">
            <XCircle className="mx-auto text-red-600 mb-2" size={30} />
            <div className="text-3xl font-bold text-red-600">0</div>
            <p className="text-gray-600 font-medium">Incorrect</p>
          </div>
          <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow rounded-lg text-center hover:scale-105 transition hover:shadow-lg">
            <Eye className="mx-auto text-blue-600 mb-2" size={30} />
            <div className="text-3xl font-bold text-blue-600">{filteredQuestions}</div>
            <p className="text-gray-600 font-medium">Unseen</p>
          </div>
        </div>

        {/* --- Right Panel (only Timer remains) --- */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 h-[500px] flex flex-col justify-between">
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-lg font-bold mb-3 text-blue-600">⏱ Set Timer</h2>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
            >
              {durations.map((d) => (
                <option key={d} value={d}>
                  {d} Minutes
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Start + Reset Buttons */}
        <div className="col-span-12 flex justify-end gap-4 mt-6">
          <button
            onClick={resetAll}
            className="flex items-center gap-2 px-6 py-3 
             bg-blue-500 text-white font-semibold text-lg 
             rounded-lg shadow-md transition 
             hover:bg-blue-600 hover:scale-105 hover:shadow-lg"
          >
            🔄 Reset
          </button>

          <button
            onClick={() => setShowSummary(true)}
            className="flex items-center gap-2 px-10 py-3 bg-red-600 text-white font-semibold text-lg rounded-lg hover:bg-red-700 shadow-lg transition transform hover:scale-105"
          >
            <Rocket size={20} /> Start Exam
          </button>
        </div>
      </div>

      {/* ✅ Summary Modal */}
      {showSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[400px]">
            <h2 className="text-xl font-bold mb-4 text-blue-600">Exam Summary</h2>
            <p><strong>Timer:</strong> {duration} minutes</p>
            <p><strong>Chapters Selected:</strong> {chapters.length}</p>
            <p><strong>Questions:</strong> {filteredQuestions}</p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowSummary(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  navigate("/aircraft-test", {
                    state: { duration, selectedChapters },
                  })
                }
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AircraftGeneralKnowledge;
