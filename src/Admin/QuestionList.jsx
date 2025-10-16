



// import { AiOutlineNumber } from "react-icons/ai";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaTrash, FaEdit, FaPlusCircle, FaQuestionCircle, FaSearch, FaImage, FaTimes, FaUpload } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { getCourse } from "../APIRedux/CourseReducer/GetCourseReducer";
// import { addQuestion } from "../APIRedux/QuestionReducer/AddQuestionReducer";
// import { updateQuestion } from "../APIRedux/QuestionReducer/UpdateQuestionReducer";
// import { deleteQuestion } from "../APIRedux/QuestionReducer/DeleteQuestionReducer";
// import { getTests } from "../APIRedux/TestReducer/TestReducerGet";
// import { getQuestion } from "../APIRedux/QuestionReducer/GetQuestionReducer";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import BulkQuestionButton from './BulkQuestionButton';

// const QuestionList = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getCourse());
//     dispatch(getTests());
//     dispatch(getQuestion())
//   }, [dispatch]);

//   const { data: courseData } = useSelector((state) => state.getCourse);
//   const { getData: testData } = useSelector((state) => state.getTests);
//   const { data: questionData } = useSelector((state) => state.getQuestion);

//   const courses = courseData?.data || [];
//   const tests = testData || [];

//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [selectedTest, setSelectedTest] = useState(null);
//   const [isAddOpen, setIsAddOpen] = useState(false);
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [isBulkOpen, setIsBulkOpen] = useState(false); // Added state for bulk modal
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Form data structure with both text and image support
//   const [formData, setFormData] = useState({
//     questionName: { text: "", image: null },
//     options: [
//       { text: "", image: null },
//       { text: "", image: null },
//       { text: "", image: null },
//       { text: "", image: null }
//     ],
//     correctAnswer: "A",
//     courseId: "",
//     testId: ""
//   });

//   const [imagePreviews, setImagePreviews] = useState({
//     question: null,
//     options: [null, null, null, null]
//   });

//   // Filter tests by selected course
//   const filteredTests = selectedCourse 
//     ? tests.filter(test => test.courseId === selectedCourse._id)
//     : [];

// // Selected test ID
// const selectedTestId = selectedTest?._id;





//   // Get questions from selected test
//   const filteredQuestions = selectedTest 
//     ? selectedTest.questions || []
//     : [];

    

//   // Updated Bulk Import Function to open modal
//   const handleBulkImport = () => {
//     if (!selectedCourse || !selectedTest) {
//       toast.error("Please select a course and test first!", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }
//     setIsBulkOpen(true);
//   };

//   // Handle bulk upload from the BulkQuestionButton
//   const handleBulkUpload = (files) => {
//     console.log('Bulk upload files:', files);
//     console.log('Selected Test:', selectedTest);
    
//     toast.success(`Processing ${files.length} file(s) for bulk upload!`, {
//       position: "top-right",
//       autoClose: 5000,
//     });
//   };

//   const openAddModal = () => {
//     setFormData({
//       questionName: { text: "", image: null },
//       options: [
//         { text: "", image: null },
//         { text: "", image: null },
//         { text: "", image: null },
//         { text: "", image: null }
//       ],
//       correctAnswer: "A",
//       courseId: selectedCourse?._id || "",
//       testId: selectedTest?._id || ""
//     });
//     setImagePreviews({
//       question: null,
//       options: [null, null, null, null]
//     });
//     setIsAddOpen(true);
//   };

//   const openEditModal = (question) => {
//     setSelectedQuestion(question);
    
//     // Handle both old string format and new object format
//     let questionText = "";
//     let questionImage = null;
    
//     if (typeof question.questionName === 'string') {
//       questionText = question.questionName;
//     } else if (question.questionName && typeof question.questionName === 'object') {
//       questionText = question.questionName.text || "";
//       questionImage = question.questionName.image || null;
//     }
    
//     const optionsData = [
//       { text: "", image: null },
//       { text: "", image: null },
//       { text: "", image: null },
//       { text: "", image: null }
//     ];
    
//     if (question.options) {
//       ['A', 'B', 'C', 'D'].forEach((key, index) => {
//         if (typeof question.options[key] === 'string') {
//           optionsData[index] = { text: question.options[key], image: null };
//         } else if (question.options[key] && typeof question.options[key] === 'object') {
//           optionsData[index] = { 
//             text: question.options[key].text || "", 
//             image: question.options[key].image || null 
//           };
//         }
//       });
//     }

//     setFormData({
//       questionName: { 
//         text: questionText,
//         image: questionImage
//       },
//       options: optionsData,
//       correctAnswer: question.correctAnswer || "A",
//       courseId: selectedCourse?._id || "",
//       testId: selectedTest?._id || ""
//     });

//     // Set image previews
//     setImagePreviews({
//       question: questionImage,
//       options: optionsData.map(opt => opt.image)
//     });

//     setIsEditOpen(true);
//   };

//  const handleChange = (e, index = null, field = 'text') => {
//   if (index !== null && field === 'text') {
//     const newOptions = [...formData.options];
//     newOptions[index] = { ...newOptions[index], text: e.target.value };
//     setFormData({ ...formData, options: newOptions });
//   } else if (index !== null && field === 'image') {
//     const file = e.target.files[0];
//     if (file) {
//       const newOptions = [...formData.options];
//       newOptions[index] = { ...newOptions[index], image: file };
//       setFormData({ ...formData, options: newOptions });
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const newPreviews = [...imagePreviews.options];
//         newPreviews[index] = e.target.result;
//         setImagePreviews({ ...imagePreviews, options: newPreviews });
//       };
//       reader.readAsDataURL(file);
//     }
//   } else if (field === 'questionImage') {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ 
//         ...formData, 
//         questionName: { ...formData.questionName, image: file } 
//       });
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreviews({ ...imagePreviews, question: e.target.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   } else {
//     // Handle regular form fields like testId, correctAnswer
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }
// };

//   const removeImage = (type, index = null) => {
//     if (type === 'question') {
//       setFormData({ 
//         ...formData, 
//         questionName: { ...formData.questionName, image: null } 
//       });
//       setImagePreviews({ ...imagePreviews, question: null });
//     } else if (type === 'option' && index !== null) {
//       const newOptions = [...formData.options];
//       newOptions[index] = { ...newOptions[index], image: null };
//       setFormData({ ...formData, options: newOptions });
      
//       const newPreviews = [...imagePreviews.options];
//       newPreviews[index] = null;
//       setImagePreviews({ ...imagePreviews, options: newPreviews });
//     }
//   };

//   const handleCourseChange = (e) => {
//     const course = courses.find((c) => c._id === e.target.value);
//     setSelectedCourse(course);
//     setSelectedTest(null);
//   };

//   const handleTestChange = (e) => {
//     const test = filteredTests.find((t) => t._id === e.target.value);
//     setSelectedTest(test);
//   };

//   useEffect(() => {
//     if (selectedTest && tests.length > 0) {
//       const updatedTest = tests.find(test => test._id === selectedTest._id);
//       if (updatedTest) {
//         setSelectedTest(updatedTest);
//       }
//     }
//   }, [tests]);

// const handleAddQuestion = async (e) => {
//   e.preventDefault();
  
//   // Validation
//   if ((!formData.questionName.text.trim() && !formData.questionName.image) || 
//       !formData.correctAnswer || 
//       !formData.courseId || 
//       !formData.testId) {
//     toast.error("Question (text or image) and correct answer are required!", {
//       position: "top-right",
//       autoClose: 3000,
//     });
//     return;
//   }

//   // Check if at least one option has text or image
//   const hasValidOptions = formData.options.some(opt => opt.text.trim() || opt.image);
//   if (!hasValidOptions) {
//     toast.error("At least one option must be provided (text or image)!", {
//       position: "top-right",
//       autoClose: 3000,
//     });
//     return;
//   }

//   // Create FormData
//   const formDataToSend = new FormData();
  
//   // ✅ FIXED: Send as plain text instead of JSON.stringify()
//   formDataToSend.append('questionName', formData.questionName.text.trim());

//   // ✅ FIXED: Send options as individual plain text fields
//   formDataToSend.append('optionA', formData.options[0].text.trim());
//   formDataToSend.append('optionB', formData.options[1].text.trim());
//   formDataToSend.append('optionC', formData.options[2].text.trim());
//   formDataToSend.append('optionD', formData.options[3].text.trim());
  
//   formDataToSend.append('correctAnswer', formData.correctAnswer);

//   // Append image files if they exist
//   if (formData.questionName.image instanceof File) {
//     formDataToSend.append('questionImage', formData.questionName.image);
//   }

//   // Append option images if they exist
//   formData.options.forEach((option, index) => {
//     if (option.image instanceof File) {
//       formDataToSend.append(`option${String.fromCharCode(65 + index)}Image`, option.image);
//     }
//   });

//   // Debug log to see what's being sent
//   console.log("Sending question data:");
//   console.log("Question:", formData.questionName.text.trim());
//   console.log("Option A:", formData.options[0].text.trim());
//   console.log("Option B:", formData.options[1].text.trim());
//   console.log("Option C:", formData.options[2].text.trim());
//   console.log("Option D:", formData.options[3].text.trim());
//   console.log("Correct Answer:", formData.correctAnswer);

//   try {
//     const resultAction = await dispatch(addQuestion({
//       testId: formData.testId,
//       formData: formDataToSend
//     }));
    
//     if (addQuestion.fulfilled.match(resultAction)) {
//       setIsAddOpen(false);
//       setFormData({
//         questionName: { text: "", image: null },
//         options: [
//           { text: "", image: null },
//           { text: "", image: null },
//           { text: "", image: null },
//           { text: "", image: null }
//         ],
//         correctAnswer: "A",
//         courseId: selectedCourse?._id || "",
//         testId: selectedTest?._id || ""
//       });
//       setImagePreviews({
//         question: null,
//         options: [null, null, null, null]
//       });
      
//       dispatch(getTests());
//       toast.success("Question added successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     } else {
//       toast.error("Failed to add question: " + (resultAction.payload || "Unknown error"), {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   } catch (error) {
//     console.error("Add question error:", error);
//     toast.error("Failed to add question", {
//       position: "top-right",
//       autoClose: 3000,
//     });
//   }
// };

//   const handleUpdateQuestion = async (e) => {
//   e.preventDefault();
//   if (!selectedQuestion) return;

//   // Check if question has either text or image
//   if ((!formData.questionName.text.trim() && !formData.questionName.image) || !formData.correctAnswer) {
//     toast.error("Question (text or image) and correct answer are required!", {
//       position: "top-right",
//       autoClose: 3000,
//     });
//     return;
//   }

//   // Check if at least one option has text or image
//   const hasValidOptions = formData.options.some(opt => opt.text.trim() || opt.image);
//   if (!hasValidOptions) {
//     toast.error("At least one option must be provided (text or image)!", {
//       position: "top-right",
//       autoClose: 3000,
//     });
//     return;
//   }

//   const formDataToSend = new FormData();
  
//   // ✅ FIXED: Send as individual plain text fields instead of JSON
//   formDataToSend.append('questionName', formData.questionName.text.trim());
  
//   // ✅ FIXED: Send options as individual plain text fields
//   formDataToSend.append('optionA', formData.options[0].text.trim());
//   formDataToSend.append('optionB', formData.options[1].text.trim());
//   formDataToSend.append('optionC', formData.options[2].text.trim());
//   formDataToSend.append('optionD', formData.options[3].text.trim());
  
//   formDataToSend.append('correctAnswer', formData.correctAnswer);

//   // Append question image if it's a new file
//   if (formData.questionName.image instanceof File) {
//     formDataToSend.append('questionImage', formData.questionName.image);
//   }

//   // Append option images if they are new files
//   formData.options.forEach((option, index) => {
//     if (option.image instanceof File) {
//       formDataToSend.append(`option${String.fromCharCode(65 + index)}Image`, option.image);
//     }
//   });

//   // Debug log to see what's being sent
//   console.log("Updating question data:");
//   console.log("Question:", formData.questionName.text.trim());
//   console.log("Option A:", formData.options[0].text.trim());
//   console.log("Option B:", formData.options[1].text.trim());
//   console.log("Option C:", formData.options[2].text.trim());
//   console.log("Option D:", formData.options[3].text.trim());
//   console.log("Correct Answer:", formData.correctAnswer);

//   try {
//     const resultAction = await dispatch(
//       updateQuestion({ 
//         testId: selectedTest._id,
//         questionId: selectedQuestion._id, 
//         formData: formDataToSend 
//       })
//     );

//     if (updateQuestion.fulfilled.match(resultAction)) {
//       setIsEditOpen(false);
//       setSelectedQuestion(null);
//       dispatch(getTests());
//       toast.success("Question updated successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     } else {
//       toast.error(resultAction.payload || "Failed to update question", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   } catch (error) {
//     console.error("Update question error:", error);
//     toast.error("Failed to update question", {
//       position: "top-right",
//       autoClose: 3000,
//     });
//   }
// };

//   const handleDelete = async (questionId) => {
//     if (!window.confirm("Are you sure you want to delete this question?")) return;

//     try {
//       const resultAction = await dispatch(
//         deleteQuestion({ testId: selectedTest._id, questionId })
//       );

//       if (deleteQuestion.fulfilled.match(resultAction)) {
//         const updatedQuestions = selectedTest.questions.filter(
//           (q) => q._id !== questionId
//         );
//         setSelectedTest({ ...selectedTest, questions: updatedQuestions });
//         toast.success("Question deleted successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       } else {
//         toast.error(resultAction.payload || "Failed to delete question", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete question", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   // Helper function to get question display text
//   const getQuestionDisplay = (question) => {
//     if (typeof question.questionName === 'string') {
//       return question.questionName;
//     }
//     return question.questionName?.text || 'No question text';
//   };

//   // Helper function to check if question has image
//   const hasQuestionImage = (question) => {
//     if (typeof question.questionName === 'object') {
//       return question.questionName?.image;
//     }
//     return false;
//   };

//   // Helper function to get option display
//   const getOptionDisplay = (question, optionKey) => {
//     const option = question.options[optionKey];
//     if (typeof option === 'string') {
//       return { text: option, image: null };
//     }
//     return { 
//       text: option?.text || '', 
//       image: option?.image || null 
//     };
//   };

//   // Search filtered questions
//   const searchedQuestions = filteredQuestions.filter(
//     (q) =>
//       getQuestionDisplay(q).toLowerCase().includes(searchTerm.toLowerCase()) ||
//       q.correctAnswer?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="relative min-h-screen p-4 sm:p-6 bg-gradient-to-br from-indigo-50 to-pink-50 font-sans">
//       {/* Toast Container */}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
      
//       {/* ===== HEADER ===== */}
//       <motion.div
//         className="sticky top-0 z-10 py-4 sm:py-6 mb-6 sm:mb-8 rounded-3xl shadow-xl bg-gradient-to-r from-indigo-500 to-pink-500 flex flex-col sm:flex-row justify-center items-center gap-4 border-2 border-indigo-400 text-center"
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//       >
//         <motion.div
//           animate={{ rotate: [0, 10, -10, 0] }}
//           transition={{ repeat: Infinity, duration: 5 }}
//           className="text-white"
//         >
//           <FaQuestionCircle size={42} />
//         </motion.div>
//         <h2 className="text-2xl sm:text-4xl font-extrabold tracking-wide text-white drop-shadow-md">
//           Question Management
//         </h2>
//       </motion.div>

//       {/* ===== COURSE & TEST SELECT ===== */}
//       <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6 w-full">
//         {/* Course Select */}
//         <select
//           value={selectedCourse?._id || ""}
//           onChange={handleCourseChange}
//           className="p-3 w-full md:w-auto rounded-2xl border-2 border-indigo-500 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
//         >
//           <option value="">Select Course</option>
//           {courses.map((c) => (
//             <option key={c._id} value={c._id}>
//               {c.courseName}
//             </option>
//           ))}
//         </select>

//         {/* Test Select - Only show when course is selected */}
//         {selectedCourse && (
//           <select
//             value={selectedTest?._id || ""}
//             onChange={handleTestChange}
//             className="p-3 w-full md:w-auto rounded-2xl border-2 border-pink-500 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-md"
//           >
//             <option value="">Select Test</option>
//             {filteredTests.map((test) => (
//               <option key={test._id} value={test._id}>
//                 {test.testName} ({test.duration} mins)
//               </option>
//             ))}
//           </select>
//         )}

//         {/* Search - Only show when course and test are selected */}
//         {selectedCourse && selectedTest && (
//           <div className="relative w-full md:w-72">
//             <FaSearch className="absolute top-5 left-3 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search question..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 p-3 rounded-2xl border-2 border-indigo-500 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-md w-full"
//             />
//           </div>
//         )}
//       </div>

//       {/* ===== DUAL BUTTONS ===== */}
//       {selectedCourse && selectedTest && (
//         <div className="flex justify-end gap-4 mb-6">
//           {/* Bulk Import Button - UPDATED to open modal */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleBulkImport}
//             className="bg-gradient-to-r from-green-500 to-blue-500 px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-bold tracking-wide text-white"
//           >
//             <FaUpload size={20} /> Bulk Import Questions
//           </motion.button>

//           {/* Existing Add Question Button */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={openAddModal}
//             className="bg-gradient-to-r from-pink-400 to-indigo-400 px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-bold tracking-wide text-white"
//           >
//             <FaPlusCircle size={20} /> Add Question
//           </motion.button>
//         </div>
//       )}

//       {/* ===== EMPTY STATES ===== */}
//       {!selectedCourse && (
//         <div className="flex flex-col items-center justify-center text-gray-500 py-20">
//           <p className="text-2xl sm:text-3xl font-bold text-indigo-600">Select a Course</p>
//         </div>
//       )}

//       {selectedCourse && !selectedTest && (
//         <div className="flex flex-col items-center justify-center text-gray-500 py-20">
//           <p className="text-2xl sm:text-3xl font-bold text-pink-600">Select a Test</p>
//         </div>
//       )}

//       {selectedCourse && selectedTest && searchedQuestions.length === 0 && (
//         <div className="text-center text-gray-500 py-16">
//           <p className="text-lg sm:text-xl text-pink-500 font-semibold">
//             {filteredQuestions.length === 0 
//               ? "No questions found for this test. Add some!" 
//               : "No questions match your search!"}
//           </p>
//         </div>
//       )}

//       {/* ===== QUESTIONS TABLE ===== */}
//       {selectedCourse && selectedTest && searchedQuestions.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="overflow-x-auto bg-white rounded-3xl shadow-lg border-2 border-indigo-400 min-w-[700px]"
//         >
//           <table className="w-full text-left border-collapse text-gray-800 text-sm sm:text-base">
//             <thead className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white">
//               <tr>
//                 <th className="p-3 w-12 text-center">
//                   <AiOutlineNumber />
//                 </th>
//                 <th className="p-3 w-1/3">Question</th>
//                 <th className="p-3 w-1/3">Options</th>
//                 <th className="p-3 w-24">Correct</th>
//                 <th className="p-3 w-28 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {searchedQuestions.map((q, i) => (
//                 <motion.tr
//                   key={q._id || i}
//                   whileHover={{ backgroundColor: "rgba(99,102,241,0.08)" }}
//                   className="border-b even:bg-gray-50"
//                 >
//                   <td className="p-3 font-bold text-center">{i + 1}</td>
//                   <td className="p-3 max-w-[400px] break-words whitespace-pre-wrap">
//                     <div className="flex flex-col gap-2">
//                       <div>{getQuestionDisplay(q)}</div>
//                       {hasQuestionImage(q) && (
//                         <div className="mt-2">
//                           <img 
//                             src={hasQuestionImage(q)} 
//                             alt="Question" 
//                             className="w-20 h-20 object-cover rounded-lg border"
//                           />
//                           <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                             <FaImage size={10} /> Image
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </td>
//                   <td className="p-3 space-y-2 max-w-[300px]">
//                     {['A', 'B', 'C', 'D'].map((key) => {
//                       const option = getOptionDisplay(q, key);
//                       return (
//                         <div key={key} className="flex flex-col gap-1">
//                           <span
//                             className={`inline-block px-2 py-1 text-xs sm:text-sm rounded-lg break-words whitespace-pre-wrap ${
//                               q.correctAnswer === key
//                                 ? "bg-green-500 text-white font-bold"
//                                 : "bg-gray-200 text-gray-800"
//                             }`}
//                           >
//                             {key} = {option.text || '(Image)'}
//                           </span>
//                           {option.image && (
//                             <div className="ml-2">
//                               <img 
//                                 src={option.image} 
//                                 alt={`Option ${key}`} 
//                                 className="w-12 h-12 object-cover rounded border"
//                               />
//                             </div>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </td>
//                   <td className="p-3 text-green-600 font-bold break-words whitespace-pre-wrap">
//                     {q.correctAnswer}
//                   </td>
//                   <td className="p-3 flex gap-3 justify-center">
//                     <button onClick={() => openEditModal(q)} className="text-yellow-500 hover:text-yellow-400">
//                       <FaEdit size={18} />
//                     </button>
//                     <button onClick={() => handleDelete(q._id)} className="text-red-500 hover:text-red-400">
//                       <FaTrash size={18} />
//                     </button>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </motion.div>
//       )}

//       {/* ===== ADD/EDIT MODAL ===== */}
//       {(isAddOpen || isEditOpen) && (
//         <motion.div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <motion.div className="bg-white rounded-3xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto border-2 border-indigo-400">
//             <h3 className="text-2xl font-bold mb-4 text-indigo-600">
//               {isAddOpen ? "Add New Question" : "Edit Question"}
//             </h3>
//             <form
//               className="flex flex-col gap-4"
//               onSubmit={isAddOpen ? handleAddQuestion : handleUpdateQuestion}
//             >
//               {/* Question Input */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Question Text *
//                 </label>
//                 <textarea
//                   placeholder="Enter question text (or upload image below)"
//                   value={formData.questionName.text}
//                   onChange={(e) => setFormData({ 
//                     ...formData, 
//                     questionName: { ...formData.questionName, text: e.target.value } 
//                   })}
//                   className="w-full border-2 border-indigo-400 p-3 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:outline-none shadow-sm text-base resize-none"
//                   rows="3"
//                 />
                
//                 {/* Question Image Upload */}
//                 <div className="mt-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Question Image (Optional)
//                   </label>
//                   <div className="flex items-center gap-3">
//                     <label className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg cursor-pointer hover:bg-indigo-200 transition-colors">
//                       <FaImage />
//                       Choose Image
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => handleChange(e, null, 'questionImage')}
//                         className="hidden"
//                       />
//                     </label>
//                     {imagePreviews.question && (
//                       <div className="relative">
//                         <img 
//                           src={imagePreviews.question} 
//                           alt="Question preview" 
//                           className="w-16 h-16 object-cover rounded-lg border"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeImage('question')}
//                           className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
//                         >
//                           <FaTimes />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">
//                     * Either question text or image is required
//                   </p>
//                 </div>
//               </div>

//               {/* Test selection in modal */}
//               {(isAddOpen || isEditOpen) && (
//                 <select
//                   name="testId"
//                   value={formData.testId}
//                   onChange={handleChange}
//                   className="border-2 border-indigo-400 p-3 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:outline-none shadow-sm text-base"
//                 >
//                   <option value="">Select Test</option>
//                   {filteredTests.map((test) => (
//                     <option key={test._id} value={test._id}>
//                       {test.testName}
//                     </option>
//                   ))}
//                 </select>
//               )}

//               {/* Options */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {formData.options.map((opt, i) => (
//                   <div key={i} className="border-2 border-indigo-200 rounded-xl p-3">
//                     <div className="flex items-center gap-2 mb-2">
//                       <input
//                         type="radio"
//                         name="correctAnswer"
//                         value={String.fromCharCode(65 + i)}
//                         checked={formData.correctAnswer === String.fromCharCode(65 + i)}
//                         onChange={handleChange}
//                         className="accent-pink-500"
//                       />
//                       <span className="font-bold text-gray-700">
//                         Option {String.fromCharCode(65 + i)} *
//                       </span>
//                     </div>
                    
//                     <input
//                       type="text"
//                       placeholder={`Text for option ${String.fromCharCode(65 + i)}`}
//                       value={opt.text}
//                       onChange={(e) => handleChange(e, i, 'text')}
//                       className="w-full border border-gray-300 p-2 rounded-lg focus:ring-1 focus:ring-pink-400 focus:outline-none shadow-sm text-base mb-2"
//                     />
                    
//                     <div className="flex items-center gap-2">
//                       <label className="flex items-center gap-1 px-2 py-1 bg-pink-100 text-pink-700 rounded text-sm cursor-pointer hover:bg-pink-200 transition-colors">
//                         <FaImage size={12} />
//                         Image
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={(e) => handleChange(e, i, 'image')}
//                           className="hidden"
//                         />
//                       </label>
//                       {imagePreviews.options[i] && (
//                         <div className="relative">
//                           <img 
//                             src={imagePreviews.options[i]} 
//                             alt={`Option ${String.fromCharCode(65 + i)} preview`} 
//                             className="w-12 h-12 object-cover rounded border"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeImage('option', i)}
//                             className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
//                           >
//                             <FaTimes />
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">
//                       * Either text or image is required
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex justify-end gap-3 mt-4">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsAddOpen(false);
//                     setIsEditOpen(false);
//                   }}
//                   className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition text-base"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className={`px-5 py-2 rounded-xl font-semibold text-white text-base ${
//                     isAddOpen ? "bg-indigo-500 hover:bg-indigo-600" : "bg-pink-500 hover:bg-pink-600"
//                   }`}
//                 >
//                   {isAddOpen ? "Add Question" : "Update Question"}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </motion.div>
//       )}

     
//       {isBulkOpen && (
//         <BulkQuestionButton 

//           selectedTestId={selectedTestId}
//           onClose={() => setIsBulkOpen(false)}
//           onBulkUpload={handleBulkUpload}
//         />
//       )}
//     </div>
//   );
// };
                                                                                                                                                             
// export default QuestionList;












import { AiOutlineNumber } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaEdit, FaPlusCircle, FaQuestionCircle, FaSearch, FaImage, FaTimes, FaUpload, FaBook, FaClipboardList, FaFilter, FaSort, FaEye, FaClock, FaCheckCircle, FaListAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../APIRedux/CourseReducer/GetCourseReducer";
import { addQuestion } from "../APIRedux/QuestionReducer/AddQuestionReducer";
import { updateQuestion } from "../APIRedux/QuestionReducer/UpdateQuestionReducer";
import { deleteQuestion } from "../APIRedux/QuestionReducer/DeleteQuestionReducer";
import { getTests } from "../APIRedux/TestReducer/TestReducerGet";
import { getQuestion } from "../APIRedux/QuestionReducer/GetQuestionReducer";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BulkQuestionButton from './BulkQuestionButton';

const QuestionList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourse());
    dispatch(getTests());
    dispatch(getQuestion())
  }, [dispatch]);

  const { data: courseData } = useSelector((state) => state.getCourse);
  const { getData: testData } = useSelector((state) => state.getTests);
  const { data: questionData } = useSelector((state) => state.getQuestion);

  const courses = courseData?.data || [];
  const tests = testData || [];

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Form data structure with both text and image support
  const [formData, setFormData] = useState({
    questionName: { text: "", image: null },
    options: [
      { text: "", image: null },
      { text: "", image: null },
      { text: "", image: null },
      { text: "", image: null }
    ],
    correctAnswer: "A",
    courseId: "",
    testId: ""
  });

  const [imagePreviews, setImagePreviews] = useState({
    question: null,
    options: [null, null, null, null]
  });

  // Filter tests by selected course
  const filteredTests = selectedCourse 
    ? tests.filter(test => test.courseId === selectedCourse._id)
    : [];

  // Selected test ID
  const selectedTestId = selectedTest?._id;

  // Get questions from selected test
  const filteredQuestions = selectedTest 
    ? selectedTest.questions || []
    : [];

  // Updated Bulk Import Function to open modal
  const handleBulkImport = () => {
    if (!selectedCourse || !selectedTest) {
      toast.error("Please select a course and test first!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    setIsBulkOpen(true);
  };

  // Handle bulk upload from the BulkQuestionButton
  const handleBulkUpload = (files) => {
    console.log('Bulk upload files:', files);
    console.log('Selected Test:', selectedTest);
    
    toast.success(`Processing ${files.length} file(s) for bulk upload!`, {
      position: "top-right",
      autoClose: 5000,
    });
  };

  const openAddModal = () => {
    setFormData({
      questionName: { text: "", image: null },
      options: [
        { text: "", image: null },
        { text: "", image: null },
        { text: "", image: null },
        { text: "", image: null }
      ],
      correctAnswer: "A",
      courseId: selectedCourse?._id || "",
      testId: selectedTest?._id || ""
    });
    setImagePreviews({
      question: null,
      options: [null, null, null, null]
    });
    setIsAddOpen(true);
  };

  const openEditModal = (question) => {
    setSelectedQuestion(question);
    
    // Handle both old string format and new object format
    let questionText = "";
    let questionImage = null;
    
    if (typeof question.questionName === 'string') {
      questionText = question.questionName;
    } else if (question.questionName && typeof question.questionName === 'object') {
      questionText = question.questionName.text || "";
      questionImage = question.questionName.image || null;
    }
    
    const optionsData = [
      { text: "", image: null },
      { text: "", image: null },
      { text: "", image: null },
      { text: "", image: null }
    ];
    
    if (question.options) {
      ['A', 'B', 'C', 'D'].forEach((key, index) => {
        if (typeof question.options[key] === 'string') {
          optionsData[index] = { text: question.options[key], image: null };
        } else if (question.options[key] && typeof question.options[key] === 'object') {
          optionsData[index] = { 
            text: question.options[key].text || "", 
            image: question.options[key].image || null 
          };
        }
      });
    }

    setFormData({
      questionName: { 
        text: questionText,
        image: questionImage
      },
      options: optionsData,
      correctAnswer: question.correctAnswer || "A",
      courseId: selectedCourse?._id || "",
      testId: selectedTest?._id || ""
    });

    // Set image previews
    setImagePreviews({
      question: questionImage,
      options: optionsData.map(opt => opt.image)
    });

    setIsEditOpen(true);
  };

  const handleChange = (e, index = null, field = 'text') => {
    if (index !== null && field === 'text') {
      const newOptions = [...formData.options];
      newOptions[index] = { ...newOptions[index], text: e.target.value };
      setFormData({ ...formData, options: newOptions });
    } else if (index !== null && field === 'image') {
      const file = e.target.files[0];
      if (file) {
        const newOptions = [...formData.options];
        newOptions[index] = { ...newOptions[index], image: file };
        setFormData({ ...formData, options: newOptions });
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPreviews = [...imagePreviews.options];
          newPreviews[index] = e.target.result;
          setImagePreviews({ ...imagePreviews, options: newPreviews });
        };
        reader.readAsDataURL(file);
      }
    } else if (field === 'questionImage') {
      const file = e.target.files[0];
      if (file) {
        setFormData({ 
          ...formData, 
          questionName: { ...formData.questionName, image: file } 
        });
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews({ ...imagePreviews, question: e.target.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      // Handle regular form fields like testId, correctAnswer
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const removeImage = (type, index = null) => {
    if (type === 'question') {
      setFormData({ 
        ...formData, 
        questionName: { ...formData.questionName, image: null } 
      });
      setImagePreviews({ ...imagePreviews, question: null });
    } else if (type === 'option' && index !== null) {
      const newOptions = [...formData.options];
      newOptions[index] = { ...newOptions[index], image: null };
      setFormData({ ...formData, options: newOptions });
      
      const newPreviews = [...imagePreviews.options];
      newPreviews[index] = null;
      setImagePreviews({ ...imagePreviews, options: newPreviews });
    }
  };

  const handleCourseChange = (e) => {
    const course = courses.find((c) => c._id === e.target.value);
    setSelectedCourse(course);
    setSelectedTest(null);
  };

  const handleTestChange = (e) => {
    const test = filteredTests.find((t) => t._id === e.target.value);
    setSelectedTest(test);
  };

  useEffect(() => {
    if (selectedTest && tests.length > 0) {
      const updatedTest = tests.find(test => test._id === selectedTest._id);
      if (updatedTest) {
        setSelectedTest(updatedTest);
      }
    }
  }, [tests]);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    
    // Validation
    if ((!formData.questionName.text.trim() && !formData.questionName.image) || 
        !formData.correctAnswer || 
        !formData.courseId || 
        !formData.testId) {
      toast.error("Question (text or image) and correct answer are required!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Check if at least one option has text or image
    const hasValidOptions = formData.options.some(opt => opt.text.trim() || opt.image);
    if (!hasValidOptions) {
      toast.error("At least one option must be provided (text or image)!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Create FormData
    const formDataToSend = new FormData();
    
    // ✅ FIXED: Send as plain text instead of JSON.stringify()
    formDataToSend.append('questionName', formData.questionName.text.trim());

    // ✅ FIXED: Send options as individual plain text fields
    formDataToSend.append('optionA', formData.options[0].text.trim());
    formDataToSend.append('optionB', formData.options[1].text.trim());
    formDataToSend.append('optionC', formData.options[2].text.trim());
    formDataToSend.append('optionD', formData.options[3].text.trim());
    
    formDataToSend.append('correctAnswer', formData.correctAnswer);

    // Append image files if they exist
    if (formData.questionName.image instanceof File) {
      formDataToSend.append('questionImage', formData.questionName.image);
    }

    // Append option images if they exist
    formData.options.forEach((option, index) => {
      if (option.image instanceof File) {
        formDataToSend.append(`option${String.fromCharCode(65 + index)}Image`, option.image);
      }
    });

    // Debug log to see what's being sent
    console.log("Sending question data:");
    console.log("Question:", formData.questionName.text.trim());
    console.log("Option A:", formData.options[0].text.trim());
    console.log("Option B:", formData.options[1].text.trim());
    console.log("Option C:", formData.options[2].text.trim());
    console.log("Option D:", formData.options[3].text.trim());
    console.log("Correct Answer:", formData.correctAnswer);

    try {
      const resultAction = await dispatch(addQuestion({
        testId: formData.testId,
        formData: formDataToSend
      }));
      
      if (addQuestion.fulfilled.match(resultAction)) {
        setIsAddOpen(false);
        setFormData({
          questionName: { text: "", image: null },
          options: [
            { text: "", image: null },
            { text: "", image: null },
            { text: "", image: null },
            { text: "", image: null }
          ],
          correctAnswer: "A",
          courseId: selectedCourse?._id || "",
          testId: selectedTest?._id || ""
        });
        setImagePreviews({
          question: null,
          options: [null, null, null, null]
        });
        
        dispatch(getTests());
        toast.success("Question added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("Failed to add question: " + (resultAction.payload || "Unknown error"), {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Add question error:", error);
      toast.error("Failed to add question", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleUpdateQuestion = async (e) => {
    e.preventDefault();
    if (!selectedQuestion) return;

    // Check if question has either text or image
    if ((!formData.questionName.text.trim() && !formData.questionName.image) || !formData.correctAnswer) {
      toast.error("Question (text or image) and correct answer are required!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Check if at least one option has text or image
    const hasValidOptions = formData.options.some(opt => opt.text.trim() || opt.image);
    if (!hasValidOptions) {
      toast.error("At least one option must be provided (text or image)!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formDataToSend = new FormData();
    
    // ✅ FIXED: Send as individual plain text fields instead of JSON
    formDataToSend.append('questionName', formData.questionName.text.trim());
    
    // ✅ FIXED: Send options as individual plain text fields
    formDataToSend.append('optionA', formData.options[0].text.trim());
    formDataToSend.append('optionB', formData.options[1].text.trim());
    formDataToSend.append('optionC', formData.options[2].text.trim());
    formDataToSend.append('optionD', formData.options[3].text.trim());
    
    formDataToSend.append('correctAnswer', formData.correctAnswer);

    // Append question image if it's a new file
    if (formData.questionName.image instanceof File) {
      formDataToSend.append('questionImage', formData.questionName.image);
    }

    // Append option images if they are new files
    formData.options.forEach((option, index) => {
      if (option.image instanceof File) {
        formDataToSend.append(`option${String.fromCharCode(65 + index)}Image`, option.image);
      }
    });

    // Debug log to see what's being sent
    console.log("Updating question data:");
    console.log("Question:", formData.questionName.text.trim());
    console.log("Option A:", formData.options[0].text.trim());
    console.log("Option B:", formData.options[1].text.trim());
    console.log("Option C:", formData.options[2].text.trim());
    console.log("Option D:", formData.options[3].text.trim());
    console.log("Correct Answer:", formData.correctAnswer);

    try {
      const resultAction = await dispatch(
        updateQuestion({ 
          testId: selectedTest._id,
          questionId: selectedQuestion._id, 
          formData: formDataToSend 
        })
      );

      if (updateQuestion.fulfilled.match(resultAction)) {
        setIsEditOpen(false);
        setSelectedQuestion(null);
        dispatch(getTests());
        toast.success("Question updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(resultAction.payload || "Failed to update question", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Update question error:", error);
      toast.error("Failed to update question", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleDelete = async (questionId) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;

    try {
      const resultAction = await dispatch(
        deleteQuestion({ testId: selectedTest._id, questionId })
      );

      if (deleteQuestion.fulfilled.match(resultAction)) {
        const updatedQuestions = selectedTest.questions.filter(
          (q) => q._id !== questionId
        );
        setSelectedTest({ ...selectedTest, questions: updatedQuestions });
        toast.success("Question deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(resultAction.payload || "Failed to delete question", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete question", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Helper function to get question display text
  const getQuestionDisplay = (question) => {
    if (typeof question.questionName === 'string') {
      return question.questionName;
    }
    return question.questionName?.text || 'No question text';
  };

  // Helper function to check if question has image
  const hasQuestionImage = (question) => {
    if (typeof question.questionName === 'object') {
      return question.questionName?.image;
    }
    return false;
  };

  // Helper function to get option display
  const getOptionDisplay = (question, optionKey) => {
    const option = question.options[optionKey];
    if (typeof option === 'string') {
      return { text: option, image: null };
    }
    return { 
      text: option?.text || '', 
      image: option?.image || null 
    };
  };

  // Search filtered questions
  const searchedQuestions = filteredQuestions.filter(
    (q) =>
      getQuestionDisplay(q).toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.correctAnswer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats for the selected test
  const testStats = selectedTest ? {
    totalQuestions: filteredQuestions.length,
    questionsWithImages: filteredQuestions.filter(q => hasQuestionImage(q)).length,
    averageOptions: filteredQuestions.reduce((acc, q) => {
      const options = q.options ? Object.keys(q.options).length : 0;
      return acc + options;
    }, 0) / filteredQuestions.length || 0
  } : null;

  return (
    <div className="relative min-h-screen p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* ===== ENHANCED HEADER ===== */}
     <motion.div
  className="relative z-10 py-6 sm:py-8 mb-8 rounded-3xl shadow-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 flex flex-col sm:flex-row justify-between items-center gap-4 px-6 sm:px-8 text-center backdrop-blur-sm border border-white/20"
  initial={{ y: -50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ type: "spring", stiffness: 100, damping: 15 }}
>
  {/* Left Section */}
  <div className="flex items-center gap-4">
    <motion.div
      animate={{
        y: [0, -8, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut",
      }}
      className="text-white bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg"
    >
      <FaListAlt size={32} />
    </motion.div>

    <div className="text-left">
      <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-lg">
        Question Management
      </h2>
      <p className="text-blue-100 text-sm sm:text-base mt-1">
        Manage and organize your test questions
      </p>
    </div>
  </div>

  {/* Right Stats Section */}
  {selectedTest && (
    <motion.div
      className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-1">
          <FaQuestionCircle className="text-blue-200" />
          <span className="font-semibold">{testStats?.totalQuestions}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaImage className="text-purple-200" />
          <span className="font-semibold">{testStats?.questionsWithImages}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaCheckCircle className="text-green-200" />
          <span className="font-semibold">
            {Math.round(testStats?.averageOptions)}
          </span>
        </div>
      </div>
    </motion.div>
  )}
</motion.div>


      {/* ===== ENHANCED CONTROL PANEL ===== */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
          {/* Course Select */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FaBook className="text-blue-500" />
              Select Course
            </label>
            <select
              value={selectedCourse?._id || ""}
              onChange={handleCourseChange}
              className="w-full p-3 rounded-xl border-2 border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
            >
              <option value="">Choose a course...</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.courseName}
                </option>
              ))}
            </select>
          </div>

          {/* Test Select */}
          {selectedCourse && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaClipboardList className="text-purple-500" />
                Select Test
              </label>
              <select
                value={selectedTest?._id || ""}
                onChange={handleTestChange}
                className="w-full p-3 rounded-xl border-2 border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all shadow-sm"
              >
                <option value="">Choose a test...</option>
                {filteredTests.map((test) => (
                  <option key={test._id} value={test._id}>
                    {test.testName} ({test.duration} mins)
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Search */}
          {selectedCourse && selectedTest && (
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaSearch className="text-green-500" />
                Search Questions
              </label>
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by question text or correct answer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 p-3 rounded-xl border-2 border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all shadow-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {selectedCourse && selectedTest && (
          <motion.div 
            className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-6 border-t border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBulkImport}
              className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-3 font-semibold text-white text-sm sm:text-base transition-all"
            >
              <FaUpload size={18} /> 
              <span>Bulk Import</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={openAddModal}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-3 font-semibold text-white text-sm sm:text-base transition-all"
            >
              <FaPlusCircle size={18} /> 
              <span>Add New Question</span>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* ===== ENHANCED EMPTY STATES ===== */}
      <AnimatePresence>
        {!selectedCourse && (
          <motion.div 
            className="flex flex-col items-center justify-center text-gray-500 py-20 bg-white rounded-2xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <FaBook className="text-4xl text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-600 mb-2">Select a Course</p>
            <p className="text-gray-500 text-center max-w-md">
              Choose a course from the dropdown above to view available tests and manage questions.
            </p>
          </motion.div>
        )}

        {selectedCourse && !selectedTest && (
          <motion.div 
            className="flex flex-col items-center justify-center text-gray-500 py-20 bg-white rounded-2xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <FaClipboardList className="text-4xl text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-gray-600 mb-2">Select a Test</p>
            <p className="text-gray-500 text-center max-w-md">
              Choose a test from the dropdown to start managing questions for this assessment.
            </p>
          </motion.div>
        )}

        {selectedCourse && selectedTest && searchedQuestions.length === 0 && (
          <motion.div 
            className="text-center text-gray-500 py-16 bg-white rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaQuestionCircle className="text-3xl text-pink-500" />
            </div>
            <p className="text-xl font-semibold text-gray-600 mb-2">
              {filteredQuestions.length === 0 
                ? "No questions found for this test" 
                : "No questions match your search"}
            </p>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {filteredQuestions.length === 0 
                ? "Get started by adding your first question or use bulk import to add multiple questions at once." 
                : "Try adjusting your search terms or clear the search to see all questions."}
            </p>
            {filteredQuestions.length === 0 && (
              <div className="flex gap-3 justify-center">
                <button
                  onClick={openAddModal}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Add First Question
                </button>
                <button
                  onClick={handleBulkImport}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Bulk Import
                </button>
              </div>
            )}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-blue-500 hover:text-blue-600 font-medium mt-4"
              >
                Clear search
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== ENHANCED QUESTIONS TABLE ===== */}
      {selectedCourse && selectedTest && searchedQuestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-200 min-w-[700px]"
        >
          {/* Table Header with Stats */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Questions ({searchedQuestions.length})
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedTest.testName} • {selectedCourse.courseName}
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Correct Answer</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaImage className="text-blue-500 text-xs" />
                  <span>Has Image</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-gray-800">
              <thead className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
                <tr>
                  <th className="p-4 w-12 text-center font-semibold">
                    <AiOutlineNumber />
                  </th>
                  <th className="p-4 font-semibold">Question Content</th>
                  <th className="p-4 font-semibold">Options Preview</th>
                  <th className="p-4 w-20 font-semibold text-center">Correct</th>
                  <th className="p-4 w-32 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {searchedQuestions.map((q, i) => (
                    <motion.tr
                      key={q._id || i}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                      className="border-b border-gray-100 transition-colors"
                    >
                      <td className="p-4 font-bold text-center text-gray-600">
                        {i + 1}
                      </td>
                      <td className="p-4 max-w-[400px]">
                        <div className="flex flex-col gap-3">
                          <div className="text-gray-800 font-medium leading-relaxed">
                            {getQuestionDisplay(q)}
                          </div>
                          {hasQuestionImage(q) && (
                            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-100">
                              <FaImage className="text-blue-500 flex-shrink-0" />
                              <img 
                                src={hasQuestionImage(q)} 
                                alt="Question" 
                                className="w-16 h-16 object-cover rounded border"
                              />
                              <span className="text-xs text-blue-600 font-medium">Question Image</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="grid grid-cols-2 gap-2 max-w-[300px]">
                          {['A', 'B', 'C', 'D'].map((key) => {
                            const option = getOptionDisplay(q, key);
                            const isCorrect = q.correctAnswer === key;
                            
                            return (
                              <div 
                                key={key}
                                className={`p-2 rounded-lg border text-xs transition-all ${
                                  isCorrect 
                                    ? "bg-green-50 border-green-200 shadow-sm" 
                                    : "bg-gray-50 border-gray-200"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`font-semibold ${
                                    isCorrect ? "text-green-700" : "text-gray-600"
                                  }`}>
                                    {key}
                                  </span>
                                  {isCorrect && (
                                    <FaCheckCircle className="text-green-500 text-xs" />
                                  )}
                                </div>
                                <div className="text-gray-700 truncate">
                                  {option.text || '(Image)'}
                                </div>
                                {option.image && (
                                  <div className="mt-1">
                                    <img 
                                      src={option.image} 
                                      alt={`Option ${key}`} 
                                      className="w-8 h-8 object-cover rounded border"
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold text-sm border border-green-200">
                            {q.correctAnswer}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2 justify-center">
                          <motion.button 
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(234, 179, 8, 0.1)" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openEditModal(q)} 
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg border border-yellow-200 transition-colors"
                            title="Edit question"
                          >
                            <FaEdit size={16} />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(q._id)} 
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                            title="Delete question"
                          >
                            <FaTrash size={16} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ===== ENHANCED MODALS ===== */}
      <AnimatePresence>
        {(isAddOpen || isEditOpen) && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    {isAddOpen ? <FaPlusCircle size={24} /> : <FaEdit size={24} />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {isAddOpen ? "Add New Question" : "Edit Question"}
                    </h3>
                    <p className="text-blue-100 text-sm mt-1">
                      {isAddOpen ? "Create a new question for your test" : "Update the question details"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <form
                  className="flex flex-col gap-6"
                  onSubmit={isAddOpen ? handleAddQuestion : handleUpdateQuestion}
                >
                  {/* Test Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <FaClipboardList className="text-purple-500" />
                      Select Test
                    </label>
                    <select
                      name="testId"
                      value={formData.testId}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 focus:outline-none shadow-sm text-base transition-all"
                      required
                    >
                      <option value="">Choose a test...</option>
                      {filteredTests.map((test) => (
                        <option key={test._id} value={test._id}>
                          {test.testName} ({test.duration} minutes)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Question Input */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <FaQuestionCircle className="text-blue-500" />
                      Question Content *
                    </label>
                    
                    <textarea
                      placeholder="Enter your question here... (Text required if no image provided)"
                      value={formData.questionName.text}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        questionName: { ...formData.questionName, text: e.target.value } 
                      })}
                      className="w-full border-2 border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 focus:outline-none shadow-sm text-base resize-none transition-all"
                      rows="3"
                    />
                    
                    {/* Question Image Upload */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question Image (Optional)
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-700 rounded-xl cursor-pointer hover:bg-blue-200 transition-colors font-medium">
                          <FaImage />
                          Choose Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleChange(e, null, 'questionImage')}
                            className="hidden"
                          />
                        </label>
                        {imagePreviews.question && (
                          <div className="relative group">
                            <img 
                              src={imagePreviews.question} 
                              alt="Question preview" 
                              className="w-20 h-20 object-cover rounded-lg border-2 border-blue-300 shadow-sm"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage('question')}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        * Either question text or image is required. Supported formats: JPG, PNG, GIF
                      </p>
                    </div>
                  </div>

                  {/* Options Section */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <FaListAlt className="text-green-500" />
                      Answer Options *
                    </label>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {formData.options.map((opt, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all shadow-sm">
                          <div className="flex items-center gap-3 mb-3">
                            <input
                              type="radio"
                              name="correctAnswer"
                              value={String.fromCharCode(65 + i)}
                              checked={formData.correctAnswer === String.fromCharCode(65 + i)}
                              onChange={handleChange}
                              className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="font-bold text-gray-700 text-lg">
                              {String.fromCharCode(65 + i)}
                            </span>
                            {formData.correctAnswer === String.fromCharCode(65 + i) && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                <FaCheckCircle className="text-green-600" />
                                Correct
                              </span>
                            )}
                          </div>
                          
                          <input
                            type="text"
                            placeholder={`Enter option ${String.fromCharCode(65 + i)} text...`}
                            value={opt.text}
                            onChange={(e) => handleChange(e, i, 'text')}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-1 focus:ring-purple-400 focus:border-purple-400 focus:outline-none shadow-sm text-base mb-3 transition-all"
                          />
                          
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg cursor-pointer hover:bg-green-200 transition-colors text-sm font-medium">
                              <FaImage size={12} />
                              Add Image
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleChange(e, i, 'image')}
                                className="hidden"
                              />
                            </label>
                            {imagePreviews.options[i] && (
                              <div className="relative group">
                                <img 
                                  src={imagePreviews.options[i]} 
                                  alt={`Option ${String.fromCharCode(65 + i)} preview`} 
                                  className="w-12 h-12 object-cover rounded border-2 border-green-300"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage('option', i)}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            * Either text or image is required
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      type="button"
                      onClick={() => {
                        setIsAddOpen(false);
                        setIsEditOpen(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold transition-all"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(139, 92, 246, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-6 py-3 rounded-xl font-semibold text-white text-base transition-all ${
                        isAddOpen 
                          ? "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700" 
                          : "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                      }`}
                    >
                      {isAddOpen ? (
                        <span className="flex items-center gap-2">
                          <FaPlusCircle />
                          Add Question
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <FaEdit />
                          Update Question
                        </span>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Import Modal */}
      {isBulkOpen && (
        <BulkQuestionButton 
          selectedTestId={selectedTestId}
          onClose={() => setIsBulkOpen(false)}
          onBulkUpload={handleBulkUpload}
        />
      )}
    </div>
  );
};

export default QuestionList;