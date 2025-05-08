import React, { useState, useRef } from "react";

const CreateDataset = () => {
  const [points, setPoints] = useState([]);
  const [uploadedData, setUploadedData] = useState(null);
  const canvasRef = useRef(null);

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

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPoints((prev) => [...prev, { x, y }]);
  };

  const handleSave = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(points));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "custom_dataset.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Create or Upload Dataset</h2>

      <div className="mb-4">
        <input type="file" accept=".json" onChange={handleFileUpload} />
        {uploadedData && <pre className="mt-2 bg-gray-100 p-2 rounded">{JSON.stringify(uploadedData, null, 2)}</pre>}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Click to create points</h3>
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border border-gray-400"
          onClick={handleCanvasClick}
        />
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSave}
        >
          Save Custom Dataset
        </button>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Points:</h4>
        <ul className="bg-gray-100 p-2 rounded max-h-40 overflow-y-auto">
          {points.map((point, index) => (
            <li key={index}>
              ({Math.round(point.x)}, {Math.round(point.y)})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateDataset;
