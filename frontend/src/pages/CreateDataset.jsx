import React from "react";

import UploadDataset from "../components/dataset/UploadDataset";

const CreateDataset = () => {

  // Dataset state
  const [points, setPoints] = useState([]);
  const [currentClass, setCurrentClass] = useState("class-1");
  const [classes, setClasses] = useState([
    { id: "class-1", name: "Class 1", color: "#FF0000" },
    { id: "class-2", name: "Class 2", color: "#0000FF" },
  ]);
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [datasetName, setDatasetName] = useState("my_dataset");
  const canvasRef = useRef(null);
  const [uploadedData, setUploadedData] = useState(null);
  const [fileName, setFileName] = useState("");

  // Initialize canvas and redraw when points or classes change
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid if enabled
    if (showGrid) {
      drawGrid(ctx, canvas.width, canvas.height);
    }
    
    // Redraw all points
    points.forEach(point => {
      const classInfo = classes.find(c => c.id === point.classId) || classes[0];
      ctx.fillStyle = classInfo.color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.size || brushSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw class indicator for larger points
      if (point.size >= 8) {
        ctx.fillStyle = "#FFFFFF";
        ctx.font = `${Math.max(8, point.size - 4)}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const classNum = classes.findIndex(c => c.id === point.classId) + 1;
        ctx.fillText(classNum.toString(), point.x, point.y);
      }
    });
  }, [points, showGrid, classes]);

  // handle uploaded file
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

  // Draw grid lines
  const drawGrid = (ctx, width, height) => {
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x <= width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  // Drawing handlers
  const handleCanvasMouseDown = (e) => {
    setIsDrawing(true);
    addPoint(e);
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDrawing) return;
    addPoint(e);
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
  };

  const addPoint = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    setPoints((prev) => [
      ...prev,
      { 
        x, 
        y, 
        classId: currentClass,
        size: brushSize,
        timestamp: new Date().toISOString()
      }
    ]);
  };

  // Dataset management
  const handleSaveDataset = () => {
    const dataset = {
      name: datasetName,
      createdAt: new Date().toISOString(),
      imageDimensions: {
        width: canvasRef.current.width,
        height: canvasRef.current.height
      },
      classes: classes.map(cls => ({
        id: cls.id,
        name: cls.name,
        color: cls.color
      })),
      annotations: points
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataset, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${datasetName}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleClearPoints = () => {
    setPoints([]);
  };

  const handleUndo = () => {
    setPoints((prev) => prev.slice(0, -1));
  };

  // Class management
  const addNewClass = () => {
    const newId = `class-${classes.length + 1}`;
    const colors = [
      "#FF0000", "#0000FF", "#00FF00", "#FFFF00", 
      "#FF00FF", "#00FFFF", "#FFA500", "#800080"
    ];
    const newColor = colors[classes.length % colors.length];
    
    setClasses([
      ...classes,
      {
        id: newId,
        name: `Class ${classes.length + 1}`,
        color: newColor
      }
    ]);
    setCurrentClass(newId);
  };

  const updateClassName = (id, newName) => {
    setClasses(classes.map(cls => 
      cls.id === id ? { ...cls, name: newName } : cls
    ));
  };

  return (
    <div className="p-4">
      <h2 className="font-bold mb-4 text-center text-4xl">Create or Upload Dataset</h2>
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dataset Creator</h1>
        <p className="text-gray-600 mb-6">Create labeled point datasets for machine learning</p>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Canvas */}
          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow-inner border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-700">Annotation Canvas</h3>
                <div className="flex items-center space-x-2">
                  <label className="flex items-center space-x-1 text-sm">
                    <input
                      type="checkbox"
                      checked={showGrid}
                      onChange={() => setShowGrid(!showGrid)}
                      className="rounded text-blue-600"
                    />
                    <span>Grid</span>
                  </label>
                </div>
              </div>
              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
                className="w-full h-full bg-white cursor-crosshair rounded"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>Points: {points.length}</span>
                <span>{canvasRef.current?.width} × {canvasRef.current?.height} px</span>
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="w-full lg:w-80 space-y-6">
            {/* Dataset Info */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Dataset Info</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dataset Name</label>
                  <input
                    type="text"
                    value={datasetName}
                    onChange={(e) => setDatasetName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Classes</label>
                  <div className="space-y-2">
                    {classes.map((cls) => (
                      <div key={cls.id} className="flex items-center space-x-2">
                        <div 
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: cls.color }}
                        />
                        <input
                          type="text"
                          value={cls.name}
                          onChange={(e) => updateClassName(cls.id, e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          onClick={() => setCurrentClass(cls.id)}
                          className={`px-2 py-1 text-xs rounded ${currentClass === cls.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                          {currentClass === cls.id ? 'Active' : 'Select'}
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addNewClass}
                      className="w-full mt-2 py-1 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded transition"
                    >
                      + Add New Class
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Annotation Tools */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Annotation Tools</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Point Size</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={brushSize}
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600 mt-1">
                    Size: {brushSize}px
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleUndo}
                    disabled={points.length === 0}
                    className={`py-2 px-4 rounded ${points.length === 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'} text-white transition`}
                  >
                    Undo
                  </button>
                  <button
                    onClick={handleClearPoints}
                    disabled={points.length === 0}
                    className={`py-2 px-4 rounded ${points.length === 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} text-white transition`}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
            
            {/* Export */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Export Dataset</h3>
              <div className="space-y-2">
                <button
                  onClick={handleSaveDataset}
                  disabled={points.length === 0}
                  className={`w-full py-2 px-4 rounded ${points.length === 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white transition`}
                >
                  Save Dataset
                </button>
                <div className="text-xs text-gray-500 mt-1">
                  Exports as JSON with all annotations and metadata
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Dataset Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Points:</span>
                  <span className="font-medium">{points.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Class:</span>
                  <span className="font-medium">
                    {classes.find(c => c.id === currentClass)?.name || 'None'}
                  </span>
                </div>
                <div className="mt-2">
                  <h4 className="text-xs font-medium text-gray-600 mb-1">Points by Class:</h4>
                  <div className="space-y-1">
                    {classes.map(cls => {
                      const count = points.filter(p => p.classId === cls.id).length;
                      return (
                        <div key={cls.id} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: cls.color }}
                          />
                          <span className="text-xs flex-1">{cls.name}</span>
                          <span className="text-xs font-medium">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      {/* Instructions */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-800 mb-2">How to create your dataset:</h3>
          <ol className="list-decimal list-inside text-blue-700 space-y-1 text-sm">
            <li>Name your dataset and define classes</li>
            <li>Select a class from the list to annotate</li>
            <li>Click or drag on the canvas to place points</li>
            <li>Adjust point size as needed</li>
            <li>Use Undo or Clear All to correct mistakes</li>
            <li>Save your dataset when finished</li>
          </ol>
        </div>
      </div>
      
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
    </div>
  );
};

export default CreateDataset;
