import React, { useState } from 'react';
import { Play, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseTest = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'test'
  const [selectedTest, setSelectedTest] = useState(null);
  const navigate = useNavigate();

  const tests = [
    { id: 1, name: 'Atpl', duration: '30 mins', questions: 20 },
   
  ];

  const handleStartTest = (test) => {
    navigate("/aircraft-test", { state: { test } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <h1 className="text-3xl font-bold text-white">Exam</h1>
            <p className="text-blue-100 mt-2">Select a test to begin</p>
          </div>
    {/* <div></div> */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Test Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Questions</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tests.map((test) => (
                  <tr key={test.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="text-lg font-medium text-gray-800">{test.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600 flex items-center">
                        <Clock className="mr-2" size={16} />
                        {test.duration}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{test.questions} questions</span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStartTest(test)}
                        className="inline-flex items-center px-4 py-2 rounded-lg font-medium transition bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <Play className="mr-2" size={16} />
                        Start Test
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Instructions</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Click "Start Test" to begin any test</li>
            <li>Make sure you have stable internet connection before starting</li>
            <li>You cannot pause the test once started</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseTest;
