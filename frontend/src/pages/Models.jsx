import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const ModelsPage = () => {
  // Sample models - in a real app, you'd fetch these from an API
  const [models, setModels] = useState([
    {
      id: "1",
      name: "Iris Classifier",
      createdAt: "2023-05-16T11:20:00Z",
      type: "logistic-regression",
      accuracy: 92.5,
      dataset: "Iris Flower Dataset",
      status: "ready",
      trainingTime: "45 seconds"
    },
    {
      id: "2",
      name: "Circle Pattern Detector",
      createdAt: "2023-05-19T15:30:00Z",
      type: "neural-network",
      accuracy: 87.3,
      dataset: "Custom Circles",
      status: "ready",
      trainingTime: "2 minutes"
    },
    {
      id: "3",
      name: "Spiral Classifier",
      createdAt: "2023-05-21T10:15:00Z",
      type: "random-forest",
      accuracy: 95.1,
      dataset: "Spiral Pattern",
      status: "ready",
      trainingTime: "1 minute"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const canvasRef = useRef(null);

  // Model type details
  const modelTypes = {
    "logistic-regression": {
      name: "Logistic Regression",
      icon: "📈",
      color: "bg-blue-100 text-blue-800"
    },
    "random-forest": {
      name: "Random Forest",
      icon: "🌲",
      color: "bg-green-100 text-green-800"
    },
    "neural-network": {
      name: "Neural Network",
      icon: "🧠",
      color: "bg-purple-100 text-purple-800"
    },
    "svm": {
      name: "Support Vector Machine",
      icon: "⚡",
      color: "bg-yellow-100 text-yellow-800"
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter models based on search term
  const filteredModels = models.filter(model =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.dataset.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle model deletion
  const handleDeleteModel = (id) => {
    setModels(models.filter(model => model.id !== id));
    setSelectedModel(null);
  };

  // Draw accuracy visualization on canvas
  useEffect(() => {
    if (!selectedModel || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw accuracy meter
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.4;
    const accuracy = selectedModel.accuracy;

    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#f3f4f6';
    ctx.fill();

    // Accuracy arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI/2, -Math.PI/2 + (Math.PI * 2 * accuracy/100));
    ctx.lineWidth = 10;
    ctx.strokeStyle = accuracy > 90 ? '#10b981' : accuracy > 75 ? '#3b82f6' : '#ef4444';
    ctx.stroke();

    // Accuracy text
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#111827';
    ctx.fillText(`${accuracy}%`, centerX, centerY + 10);

    // Label
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.fillText('Accuracy', centerX, centerY + 40);
  }, [selectedModel]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Models</h1>
          <p className="text-gray-600">View and manage your trained machine learning models</p>
        </div>
        <Link 
          to="/create-model" 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
        >
          Train New Model
        </Link>
      </div>

      {/* Search and filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">Search models</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="search"
                type="text"
                placeholder="Search models by name or dataset..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{filteredModels.length} models</span>
          </div>
        </div>
      </div>

      {/* Models grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredModels.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No models found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "Try a different search term" : "Train your first model to get started"}
          </p>
          <div className="mt-6">
            <Link
              to="/create-model"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Train Model
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <div 
              key={model.id} 
              className={`bg-white rounded-lg shadow-sm border ${selectedModel?.id === model.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} overflow-hidden transition-all hover:shadow-md`}
              onClick={() => setSelectedModel(model)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-medium text-gray-900 truncate">{model.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${modelTypes[model.type]?.color || 'bg-gray-100 text-gray-800'}`}>
                    {modelTypes[model.type]?.name || model.type}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">Trained on: {model.dataset}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {formatDate(model.createdAt)}
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    model.accuracy > 90 ? 'bg-green-100 text-green-800' : 
                    model.accuracy > 75 ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {model.accuracy}% accuracy
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                <Link
                  to={`/models/${model.id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  View details
                </Link>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle download
                    }}
                  >
                    Download
                  </button>
                  <button
                    type="button"
                    className="text-sm text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteModel(model.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Model details sidebar */}
      {selectedModel && (
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={() => setSelectedModel(null)}
            ></div>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">{selectedModel.name}</h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setSelectedModel(null)}
                        >
                          <span className="sr-only">Close panel</span>
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">Model Type</h3>
                            <div className="mt-2 flex items-center">
                              <span className="text-2xl mr-2">{modelTypes[selectedModel.type]?.icon || '🤖'}</span>
                              <span className="text-sm text-gray-500">
                                {modelTypes[selectedModel.type]?.name || selectedModel.type}
                              </span>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-900">Details</h3>
                            <div className="mt-2 space-y-2 text-sm text-gray-500">
                              <div className="flex justify-between">
                                <span>Created</span>
                                <span>{formatDate(selectedModel.createdAt)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Dataset</span>
                                <span>{selectedModel.dataset}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Status</span>
                                <span className="capitalize">{selectedModel.status}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Training Time</span>
                                <span>{selectedModel.trainingTime}</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900">Performance</h3>
                              <div className="mt-2">
                                <div className="bg-gray-100 rounded-md flex items-center justify-center h-48 relative">
                                  <canvas 
                                    ref={canvasRef}
                                    className="w-full h-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-900">Hyperparameters</h3>
                            <div className="mt-2 bg-gray-50 p-3 rounded-md">
                              <pre className="text-xs text-gray-500 overflow-x-auto">
                                {JSON.stringify({
                                  learning_rate: 0.01,
                                  batch_size: 32,
                                  epochs: 50,
                                  layers: [64, 32]
                                }, null, 2)}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-sm font-medium text-gray-500">
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-500"
                        onClick={() => {
                          // Handle download
                          setSelectedModel(null);
                        }}
                      >
                        Download Model
                      </button>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-500"
                        onClick={() => {
                          handleDeleteModel(selectedModel.id);
                          setSelectedModel(null);
                        }}
                      >
                        Delete Model
                      </button>
                    </div>
                    <div className="mt-6">
                      <Link
                        to={`/deploy-model/${selectedModel.id}`}
                        className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Deploy This Model
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelsPage;
