




import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUpload, FaTimes, FaFileExcel, FaFileWord, FaFilePdf, FaCloudUploadAlt, 
  FaCheckCircle, FaExclamationTriangle, FaDownload 
} from "react-icons/fa";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { bulkQuestion, resetbulkQuestionState } from "../APIRedux/BulkQuestionReducer/BulkQuestionReducer";

const BulkQuestionButton = ({ onClose,selectedTestId }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.bulkQuestion
  );

  // Supported file types
  const supportedFormats = [
    { type: 'excel', extensions: ['.xlsx', '.xls'], icon: <FaFileExcel className="text-green-600" />, name: 'Excel' },
    { type: 'word', extensions: ['.docx', '.doc'], icon: <FaFileWord className="text-blue-600" />, name: 'Word' },
    { type: 'pdf', extensions: ['.pdf'], icon: <FaFilePdf className="text-red-600" />, name: 'PDF' }
  ];

  // Drag & Drop handlers
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); handleFiles(Array.from(e.dataTransfer.files)); };

  // File selection
  const handleFileSelect = (e) => handleFiles(Array.from(e.target.files));

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      const isValid = supportedFormats.some(format => format.extensions.includes(fileExtension));

      if (!isValid) {
        toast.error(`Unsupported format: ${file.name}. Upload Excel, Word, or PDF.`);
        return false;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error(`File too large: ${file.name}. Max 10MB.`);
        return false;
      }

      return true;
    });

    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => setSelectedFiles(prev => prev.filter((_, i) => i !== index));

  const getFileInfo = (fileName) => {
    const extension = '.' + fileName.split('.').pop().toLowerCase();
    return supportedFormats.find(f => f.extensions.includes(extension)) || { icon: <FaFileExcel className="text-gray-600" />, name: 'Unknown' };
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Redux-based upload
  const handleUpload = async () => {
  if (selectedFiles.length === 0) {
    toast.error('Please select at least one file.');
    return;
  }

  const formData = new FormData();
  selectedFiles.forEach(file => formData.append("files", file));

  try {
    setIsUploading(true);
    await dispatch(bulkQuestion({ testId: selectedTestId, formData })).unwrap();
    toast.success("✅ Bulk questions uploaded successfully!");
    setSelectedFiles([]);
    handleClose();
  } catch (error) {
    toast.error(error || "Failed to upload bulk questions.");
  } finally {
    setIsUploading(false);
  }
};


  const downloadTemplate = () => {
    toast.info('Downloading template...');
    setTimeout(() => toast.success('Template downloaded successfully!'), 1000);
  };

  const handleClose = () => {
    dispatch(resetbulkQuestionState());
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaCloudUploadAlt className="text-blue-600 text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Bulk Upload Questions</h2>
                <p className="text-sm text-gray-600">Upload multiple questions using Excel, Word, or PDF files</p>
              </div>
            </div>
            <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FaTimes className="text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
            {/* Supported Formats */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <FaCheckCircle /> Supported Formats
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {supportedFormats.map((format, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    {format.icon} <span className="text-gray-700">{format.name}</span> 
                    <span className="text-gray-500 text-xs">({format.extensions.join(', ')})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <FaCloudUploadAlt className={`mx-auto text-4xl mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-700">{isDragging ? 'Drop files here' : 'Drag & drop files here'}</p>
                <p className="text-gray-500 text-sm">Supported formats: Excel, Word, PDF</p>
                <p className="text-gray-400 text-xs">Max file size: 10MB per file</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Browse Files
                </button>
                <button
                  onClick={downloadTemplate}
                  className="ml-3 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <FaDownload size={14} /> Download Template
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                accept=".xlsx,.xls,.docx,.doc,.pdf"
                className="hidden"
                disabled={isUploading}
              />
            </div>

            {/* Selected Files */}
            {selectedFiles.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700">Selected Files ({selectedFiles.length})</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedFiles.map((file, index) => {
                    const fileInfo = getFileInfo(file.name);
                    const progress = uploadProgress[index] || 0;
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="flex-shrink-0">{fileInfo.icon}</div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate">{file.name}</p>
                            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {!isUploading && (
                            <button onClick={() => removeFile(index)} className="p-1 hover:bg-red-100 rounded transition-colors text-red-500">
                              <FaTimes size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                <FaExclamationTriangle /> Important Instructions
              </h3>
              <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                <li>Ensure your file follows the template format.</li>
                <li>Each question should have 4 options and a correct answer.</li>
                <li>Maximum 1000 questions per file.</li>
                <li>File encoding should be UTF-8.</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-500">{selectedFiles.length} file(s) selected</div>
            <div className="flex gap-3">
              <button onClick={handleClose} disabled={isUploading} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || isUploading || isLoading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isUploading || isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <FaUpload /> Upload Files
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BulkQuestionButton;
