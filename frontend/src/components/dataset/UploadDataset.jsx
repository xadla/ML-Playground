import React, { useState } from "react";

const UploadDataset = () => {
  const [uploadedData, setUploadedData] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setUploadedData(data);
      } catch (error) {
        alert("Invalid JSON file.");
        setFileName("");
        setUploadedData(null);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload JSON Dataset
        </label>
        <div className="flex items-center">
          <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-500 rounded-lg border border-blue-500 cursor-pointer hover:bg-blue-50">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="mt-1 text-sm">Choose a file</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          {fileName && (
            <span className="ml-3 text-sm text-gray-600 truncate max-w-xs">
              {fileName}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Only JSON files are accepted
        </p>
      </div>

      {uploadedData && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Uploaded Data Preview:
          </h3>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 overflow-auto max-h-64">
            <pre className="text-xs text-gray-800">
              {JSON.stringify(uploadedData, null, 2)}
            </pre>
          </div>
          <div className="mt-2 text-sm text-green-600 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Dataset uploaded successfully!
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDataset;
