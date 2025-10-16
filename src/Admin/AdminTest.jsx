// src/pages/AdminTest.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlusCircle, FaTrash, FaEdit, FaList, FaUsers, FaClock, FaEye } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTest, resetCreateTestState } from "../APIRedux/TestReducer/TestReducerCreate";
import { getTests } from "../APIRedux/TestReducer/TestReducerGet";
import { updateTest, resetUpdateState } from "../APIRedux/TestReducer/TestReducerUpdate";
import { deleteTest } from "../APIRedux/TestReducer/TestReducerDelete";

const AdminTest = () => {
    const { courseId } = useParams();
 
    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, errorMessage } = useSelector(state => state.createTest);
    const { 
        isLoading: isUpdateLoading, 
        isError: isUpdateError, 
        isSuccessful: isUpdateSuccess, 
        errorMessage: updateErrorMessage 
    } = useSelector(state => state.updateTest);
    
    const { getData } = useSelector(state => state.getTests);

    const [newTest, setNewTest] = useState({ 
        testName: "", 
        duration: "", 
        questionNumber: 0,
        questions: [] 
    });
    
    const [newQuestion, setNewQuestion] = useState({
        questionName: "",
        options: { A: "", B: "", C: "", D: "" },
        correctAnswer: "A"
    });
    
    const [editId, setEditId] = useState(null);
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    // Fix the filterItem with proper null checks
    const filterItem = React.useMemo(() => {
        if (!getData || !Array.isArray(getData)) return [];
        return getData.filter(test => {
            if (!test || !test.courseId) return false;
            return test.courseId.toString() === courseId?.toString();
        });
    }, [getData, courseId]);

    useEffect(() => {
        dispatch(getTests());
    }, [dispatch]);

    // Reset states
    useEffect(() => {
        return () => {
            dispatch(resetCreateTestState());
            dispatch(resetUpdateState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess) {
            setNewTest({ testName: "", duration: "", questionNumber: 0, questions: [] });
            setShowQuestionForm(false);
            setEditId(null);
            setFormErrors({});
            dispatch(resetCreateTestState());
            dispatch(getTests()); // Refresh the list
        }
    }, [isSuccess, dispatch]);

    useEffect(() => {
        if (isUpdateSuccess) {
            setNewTest({ testName: "", duration: "", questionNumber: 0, questions: [] });
            setEditId(null);
            setFormErrors({});
            setShowQuestionForm(false);
            dispatch(resetUpdateState());
            dispatch(getTests()); // Refresh the list
        }
    }, [isUpdateSuccess, dispatch]);

    const validateForm = () => {
        const errors = {};
        if (!newTest.testName.trim()) errors.testName = "Test name is required";
        if (!newTest.duration.trim()) errors.duration = "Duration is required";
        if (newTest.questions.length === 0) errors.questions = "At least one question is required";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddOrUpdateTest = async () => {
        if (!validateForm()) {
            return;
        }

        const testData = {
            courseId: courseId,
            testName: newTest.testName.trim(),
            duration: newTest.duration.trim(),
            questionNumber: newTest.questions.length,
            questions: newTest.questions.map((q, index) => ({
                questionName: {
                    text: q.questionName.trim(),
                    image: "" // Empty string for image since we're doing text-only
                },
                options: {
                    A: { 
                        text: q.options.A.trim(),
                        image: "" 
                    },
                    B: { 
                        text: q.options.B.trim(),
                        image: "" 
                    },
                    C: { 
                        text: q.options.C.trim(),
                        image: "" 
                    },
                    D: { 
                        text: q.options.D.trim(),
                        image: "" 
                    }
                },
                correctAnswer: q.correctAnswer
            }))
        };

        if (editId) {
            try {
                await dispatch(updateTest({ 
                    testId: editId, 
                    formData: testData 
                })).unwrap();
                // Success handling is done in useEffect above
            } catch (err) {
                console.error("Failed to update test:", err);
            }
        } else {
            dispatch(createTest(testData));
        }
    };

    // Fixed: handleEdit should NOT call API - just populate form
    const handleEdit = (test) => {
        // Convert existing questions to the format expected by the form
        const formattedQuestions = test.questions?.map(question => ({
            _id: question._id,
            questionName: typeof question.questionName === 'string' 
                ? question.questionName 
                : question.questionName?.text || "",
            options: {
                A: typeof question.options?.A === 'string' 
                    ? question.options.A 
                    : question.options?.A?.text || "",
                B: typeof question.options?.B === 'string' 
                    ? question.options.B 
                    : question.options?.B?.text || "",
                C: typeof question.options?.C === 'string' 
                    ? question.options.C 
                    : question.options?.C?.text || "",
                D: typeof question.options?.D === 'string' 
                    ? question.options.D 
                    : question.options?.D?.text || ""
            },
            correctAnswer: question.correctAnswer
        })) || [];

        setNewTest({ 
            testName: test.testName, 
            duration: test.duration,
            questionNumber: test.questions?.length || 0,
            questions: formattedQuestions
        });
        setEditId(test._id);
        setFormErrors({});
        setShowQuestionForm(false);
    };

    const handleDelete = async(id) => {
        try {
            await dispatch(deleteTest({testId:id})).unwrap();
            dispatch(getTests()); // Refresh the list after deletion
        } catch(error) {
            console.error("Failed to delete test:", error);
        }
    };

    const validateQuestion = () => {
        if (!newQuestion.questionName.trim()) {
            return "Question is required";
        }
        if (!newQuestion.options.A.trim() || 
            !newQuestion.options.B.trim() || 
            !newQuestion.options.C.trim() || 
            !newQuestion.options.D.trim()) {
            return "All options are required";
        }
        return null;
    };

    const handleAddQuestion = () => {
        const validationError = validateQuestion();
        if (validationError) {
            alert(validationError);
            return;
        }

        const updatedTest = {
            ...newTest,
            questions: [...newTest.questions, { 
                ...newQuestion, 
                _id: `q${Date.now()}`,
                questionName: newQuestion.questionName.trim(),
                options: {
                    A: newQuestion.options.A.trim(),
                    B: newQuestion.options.B.trim(),
                    C: newQuestion.options.C.trim(),
                    D: newQuestion.options.D.trim()
                }
            }],
            questionNumber: newTest.questions.length + 1
        };

        setNewTest(updatedTest);
        setNewQuestion({
            questionName: "",
            options: { A: "", B: "", C: "", D: "" },
            correctAnswer: "A"
        });
        setShowQuestionForm(false);
        
        // Clear questions error if it exists
        if (formErrors.questions) {
            setFormErrors(prev => ({ ...prev, questions: "" }));
        }
    };

    const handleDeleteQuestion = (questionId) => {
        const updatedQuestions = newTest.questions.filter(q => q._id !== questionId);
        setNewTest({
            ...newTest,
            questions: updatedQuestions,
            questionNumber: updatedQuestions.length
        });
    };

    const viewTestDetails = (test) => {
        setSelectedTest(test);
    };

    const closeTestDetails = () => {
        setSelectedTest(null);
    };

    const cancelEdit = () => {
        setEditId(null);
        setNewTest({ testName: "", duration: "", questionNumber: 0, questions: [] });
        setFormErrors({});
        setShowQuestionForm(false);
    };

    const cancelAddQuestion = () => {
        setNewQuestion({
            questionName: "",
            options: { A: "", B: "", C: "", D: "" },
            correctAnswer: "A"
        });
        setShowQuestionForm(false);
    };

    // Helper function to get question text for display
    const getQuestionText = (question) => {
        return typeof question.questionName === 'string' 
            ? question.questionName 
            : question.questionName?.text || 'No question text';
    };

    // Helper function to get option text for display
    const getOptionText = (question, option) => {
        return typeof question.options[option] === 'string' 
            ? question.options[option]
            : question.options[option]?.text || '';
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                Test Management     
            </h2>

            {/* Error Alerts */}
            {(isError || isUpdateError) && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {errorMessage || updateErrorMessage}
                </div>
            )}

            {/* Success Alerts */}
            {(isSuccess || isUpdateSuccess) && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    {isSuccess ? "Test created successfully!" : "Test updated successfully!"}
                </div>
            )}

            {/* Add / Edit Test Form */}
            <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                    {editId ? "Edit Test" : "Add New Test"}
                </h3>
                
                {/* Basic Test Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Test Name *
                        </label>
                        <input
                            type="text"
                            placeholder="Test Name"
                            value={newTest.testName}
                            onChange={(e) => {
                                setNewTest({ ...newTest, testName: e.target.value });
                                if (formErrors.testName) {
                                    setFormErrors(prev => ({ ...prev, testName: "" }));
                                }
                            }}
                            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none ${
                                formErrors.testName ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {formErrors.testName && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.testName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duration *
                        </label>
                        <input
                            type="text"
                            placeholder="Duration (e.g. 1h 30m)"
                            value={newTest.duration}
                            onChange={(e) => {
                                setNewTest({ ...newTest, duration: e.target.value });
                                if (formErrors.duration) {
                                    setFormErrors(prev => ({ ...prev, duration: "" }));
                                }
                            }}
                            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none ${
                                formErrors.duration ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {formErrors.duration && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.duration}</p>
                        )}
                    </div>
                </div>

                {/* Questions Management */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-700">Questions *</h4>
                            {formErrors.questions && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.questions}</p>
                            )}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowQuestionForm(!showQuestionForm)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                        >
                            <FaPlusCircle />
                            Add Question
                        </motion.button>
                    </div>

                    {/* Question Form */}
                    {showQuestionForm && (
                        <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                            <h5 className="font-semibold mb-3 text-gray-700">Add New Question</h5>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Question *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your question here"
                                        value={newQuestion.questionName}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, questionName: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {['A', 'B', 'C', 'D'].map(option => (
                                        <div key={option}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Option {option} *
                                            </label>
                                            <input
                                                type="text"
                                                placeholder={`Enter option ${option}`}
                                                value={newQuestion.options[option]}
                                                onChange={(e) => setNewQuestion({
                                                    ...newQuestion,
                                                    options: { ...newQuestion.options, [option]: e.target.value }
                                                })}
                                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Correct Answer
                                    </label>
                                    <select
                                        value={newQuestion.correctAnswer}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                                    >
                                        {['A', 'B', 'C', 'D'].map(option => (
                                            <option key={option} value={option}>Option {option}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddQuestion}
                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                                    >
                                        Add Question
                                    </button>
                                    <button
                                        onClick={cancelAddQuestion}
                                        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Questions List */}
                    <div className="space-y-2">
                        {newTest.questions.map((question, index) => (
                            <div key={question._id} className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                                <div className="flex-1">
                                    <div className="flex items-start gap-3">
                                        <span className="font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm min-w-[40px] text-center">
                                            Q{index + 1}
                                        </span>
                                        <div>
                                            <p className="font-medium text-gray-800">{question.questionName}</p>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {Object.entries(question.options).map(([key, value]) => (
                                                    <span 
                                                        key={key} 
                                                        className={`text-xs px-2 py-1 rounded ${
                                                            key === question.correctAnswer 
                                                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                                                : 'bg-gray-100 text-gray-600'
                                                        }`}
                                                    >
                                                        {key}: {value}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeleteQuestion(question._id)}
                                    className="flex items-center justify-center w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors ml-2"
                                    title="Delete question"
                                >
                                    <FaTrash size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddOrUpdateTest}
                        disabled={isLoading || isUpdateLoading}
                        className={`flex items-center gap-2 px-5 py-3 ${
                            editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
                        } text-white rounded-lg shadow disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                    >
                        {(isLoading || isUpdateLoading) ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                {editId ? "Updating..." : "Processing..."}
                            </div>
                        ) : (
                            <>
                                <FaPlusCircle />
                                {editId ? "Update Test" : "Add Test"}
                            </>
                        )}
                    </motion.button>
                    
                    {editId && (
                        <button
                            onClick={cancelEdit}
                            className="px-5 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow transition-colors"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </div>

            {/* Tests Table */}
            <div className="bg-white shadow-lg rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-semibold text-gray-700">All Tests</h3>
                    <div className="text-sm text-gray-500">
                        Total: {filterItem.length} test(s)
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-gray-700">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3 border font-semibold">#</th>
                                <th className="p-3 border font-semibold">Test Name</th>
                                <th className="p-3 border font-semibold">Duration</th>
                                <th className="p-3 border font-semibold">Questions</th>
                                <th className="p-3 border font-semibold">Participants</th>
                                <th className="p-3 border font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterItem.length > 0 ? (
                                filterItem.map((test, index) => (
                                    <tr key={test._id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="p-3 border">{index + 1}</td>
                                        <td className="p-3 border font-semibold text-gray-800">{test.testName}</td>
                                        <td className="p-3 border">
                                            <div className="flex items-center gap-2">
                                                <FaClock className="text-blue-500" />
                                                <span className="font-medium">{test.duration}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 border">
                                            <div className="flex items-center gap-2">
                                                <FaList className="text-green-500" />
                                                <span className="font-medium">{test.questionNumber} questions</span>
                                            </div>
                                        </td>
                                        <td className="p-3 border">
                                            <div className="flex items-center gap-2">
                                                <FaUsers className="text-purple-500" />
                                                <span className="font-medium">{test.users?.length || 0} users</span>
                                            </div>
                                        </td>
                                        <td className="p-3 border">
                                            <div className="flex gap-2">
                                                {/* View Details Button */}
                                                <button
                                                    title="View Details"
                                                    onClick={() => viewTestDetails(test)}
                                                    className="flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors duration-200"
                                                >
                                                    <FaEye size={16} />
                                                </button>

                                                {/* Edit Button */}
                                                <button
                                                    title="Edit Test"
                                                    onClick={() => handleEdit(test)}
                                                    className="flex items-center justify-center w-10 h-10 bg-yellow-100 hover:bg-yellow-200 text-yellow-600 rounded-lg transition-colors duration-200"
                                                >
                                                    <FaEdit size={16} />
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    title="Delete Test"
                                                    onClick={() => handleDelete(test._id)}
                                                    className="flex items-center justify-center w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors duration-200"
                                                >
                                                    <FaTrash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-6 text-center text-gray-500">
                                        <FaList className="mx-auto text-4xl text-gray-300 mb-3" />
                                        <p className="text-lg">No tests found for this course</p>
                                        <p className="text-sm text-gray-400 mt-1">
                                            {getData && getData.length > 0 
                                                ? "No tests match the current course" 
                                                : "Create your first test using the form above"
                                            }
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Test Details Modal */}
            {selectedTest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">{selectedTest.testName} - Details</h3>
                            <button
                                onClick={closeTestDetails}
                                className="text-gray-500 hover:text-gray-700 text-2xl transition-colors"
                            >
                                ×
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaClock className="text-blue-500" />
                                    <span className="font-semibold text-gray-700">Duration:</span>
                                </div>
                                <p className="text-lg font-bold text-blue-700">{selectedTest.duration}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaList className="text-green-500" />
                                    <span className="font-semibold text-gray-700">Questions:</span>
                                </div>
                                <p className="text-lg font-bold text-green-700">{selectedTest.questionNumber}</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaUsers className="text-purple-500" />
                                    <span className="font-semibold text-gray-700">Participants:</span>
                                </div>
                                <p className="text-lg font-bold text-purple-700">{selectedTest.users?.length || 0}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-xl font-semibold mb-3 text-gray-800">Questions</h4>
                            <div className="space-y-4">
                                {selectedTest.questions?.map((question, index) => (
                                    <div key={question._id || index} className="border border-gray-200 rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors">
                                        <h5 className="font-semibold mb-3 text-lg text-gray-800">
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">Q{index + 1}</span>
                                            {getQuestionText(question)}
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {['A', 'B', 'C', 'D'].map(option => (
                                                <div key={option} className={`p-3 rounded-lg border ${
                                                    option === question.correctAnswer 
                                                        ? 'bg-green-50 border-green-200' 
                                                        : 'bg-gray-50 border-gray-200'
                                                }`}>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`font-semibold ${
                                                            option === question.correctAnswer ? 'text-green-700' : 'text-gray-700'
                                                        }`}>
                                                            {option}:
                                                        </span>
                                                        <span className={
                                                            option === question.correctAnswer ? 'text-green-600 font-medium' : 'text-gray-600'
                                                        }>
                                                            {getOptionText(question, option)}
                                                        </span>
                                                        {option === question.correctAnswer && (
                                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded ml-auto">
                                                                Correct
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold mb-3 text-gray-800">Participants</h4>
                            <div className="space-y-2">
                                {selectedTest.users?.map((user, index) => (
                                    <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded border border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-semibold text-sm">
                                                    {user.userId?.charAt(0).toUpperCase() || 'U'}
                                                </span>
                                            </div>
                                            <span className="font-medium text-gray-700">User {user.userId}</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            user.status === 'completed' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {user.status === 'completed' ? '✅ Completed' : '⏳ Pending'}
                                            {user.score && ` - Score: ${user.score}`}
                                        </span>
                                    </div>
                                ))}
                                {(!selectedTest.users || selectedTest.users.length === 0) && (
                                    <div className="text-center py-4 text-gray-500">
                                        No participants yet
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTest;