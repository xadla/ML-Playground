import React, { useState } from "react";

const UploadDataset = () => {

  const [uploadedData, setUploadedData] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setUploadedData(data);
        alert("Dataset uploaded successfully!");
      } catch (error) {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="mb-4">
      <input type="file" accept=".json" onChange={handleFileUpload} />
      {uploadedData && <pre className="mt-2 bg-gray-100 p-2 rounded">{JSON.stringify(uploadedData, null, 2)}</pre>}
    </div>
  )
}

export default UploadDataset;
