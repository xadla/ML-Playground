import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CreateModels = () => {
  // Available model types
  const modelTypes = [
    {
      id: "logistic-regression",
      name: "Logistic Regression",
      description: "Linear model for classification tasks",
      complexity: "Low",
      icon: "📈"
    },
    {
      id: "random-forest",
      name: "Random Forest",
      description: "Ensemble of decision trees",
      complexity: "Medium",
      icon: "🌲"
    },
    {
      id: "svm",
      name: "Support Vector Machine",
      description: "Powerful for high-dimensional spaces",
      complexity: "Medium",
      icon: "⚡"
    },
    {
      id: "neural-network",
      name: "Neural Network",
      description: "Multi-layer perceptron for complex patterns",
      complexity: "High",
      icon: "🧠"
    },
    {
      id: "knn",
      name: "K-Nearest Neighbors",
      description: "Simple instance-based learning",
      complexity: "Low",
      icon: "📍"
    }
  ];

  // State for the form
  const [modelName, setModelName] = useState("");
  const [selectedModelType, setSelectedModelType] = useState("");
  const [selectedDataset, setSelectedDataset] = useState("");
  const [hyperparameters, setHyperparameters] = useState({});
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainedModel, setTrainedModel] = useState(null);

  // Sample datasets - in a real app, you'd fetch these
  const datasets = [
    { id: "1", name: "Iris Flower Dataset", points: 150, classes: 3 },
    { id: "2", name: "Custom Circles", points: 342, classes: 2 },
    { id: "3", name: "Spiral Pattern", points: 500, classes: 3 }
  ];

  // Hyperparameters for each model type
  const modelHyperparameters = {
    "logistic-regression": [
      { name: "learningRate", label: "Learning Rate", type: "number", min: 0.001, max: 1, step: 0.001, default: 0.01 },
      { name: "maxIterations", label: "Max Iterations", type: "number", min: 10, max: 1000, step: 10, default: 100 },
      { name: "regularization", label: "Regularization", type: "select", options: ["None", "L1", "L2"], default: "L2" }
    ],
    "random-forest": [
      { name: "numTrees", label: "Number of Trees", type: "number", min: 1, max: 100, step: 1, default: 10 },
      { name: "maxDepth", label: "Max Depth", type: "number", min: 1, max: 20, step: 1, default: 5 },
      { name: "minSamplesSplit", label: "Min Samples Split", type: "number", min: 2, max: 20, step: 1, default: 2 }
    ],
    "neural-network": [
      { name: "hiddenLayers", label: "Hidden Layers", type: "text", default: "64, 32" },
      { name: "activation", label: "Activation", type: "select", options: ["ReLU", "Sigmoid", "Tanh"], default: "ReLU" },
      { name: "learningRate", label: "Learning Rate", type: "number", min: 0.0001, max: 0.1, step: 0.0001, default: 0.001 },
      { name: "epochs", label: "Epochs", type: "number", min: 1, max: 1000, step: 1, default: 50 }
    ]
  };

  // Set default hyperparameters when model type changes
  useEffect(() => {
    if (selectedModelType && modelHyperparameters[selectedModelType]) {
      const defaults = {};
      modelHyperparameters[selectedModelType].forEach(param => {
        defaults[param.name] = param.default;
      });
      setHyperparameters(defaults);
    } else {
      setHyperparameters({});
    }
  }, [selectedModelType]);

  // Handle hyperparameter changes
  const handleHyperparameterChange = (name, value) => {
    setHyperparameters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Simulate model training
  const handleTrainModel = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    setTrainedModel(null);
    
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          setTrainedModel({
            id: `model-${Date.now()}`,
            name: modelName || `Untitled ${modelTypes.find(m => m.id === selectedModelType)?.name || 'Model'}`,
            type: selectedModelType,
            accuracy: (Math.random() * 30 + 70).toFixed(1), // Random accuracy between 70-100%
            dataset: selectedDataset,
            trainedAt: new Date().toISOString()
          });
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };

  // Get current model type details
  const currentModelType = modelTypes.find(m => m.id === selectedModelType);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Model</h1>
          <p className="text-gray-600">Train machine learning models on your datasets</p>
        </div>
        <Link 
          to="/models" 
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition"
        >
          View My Models
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column - Model configuration */}
        <div className="flex-1 space-y-6">
          {/* Model Basics */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-3">Model Basics</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model Name</label>
                <input
                  type="text"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  placeholder="My Awesome Model"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Dataset</label>
                <select
                  value={selectedDataset}
                  onChange={(e) => setSelectedDataset(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a dataset</option>
                  {datasets.map(dataset => (
                    <option key={dataset.id} value={dataset.id}>
                      {dataset.name} ({dataset.points} points, {dataset.classes} classes)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Model Type Selection */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-3">Model Type</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {modelTypes.map(model => (
                <div
                  key={model.id}
                  onClick={() => setSelectedModelType(model.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition ${selectedModelType === model.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">{model.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{model.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{model.description}</p>
                      <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                        Complexity: {model.complexity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hyperparameters */}
          {selectedModelType && modelHyperparameters[selectedModelType] && (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Hyperparameters</h3>
              <div className="space-y-4">
                {modelHyperparameters[selectedModelType].map(param => (
                  <div key={param.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{param.label}</label>
                    {param.type === "number" ? (
                      <div>
                        <input
                          type="range"
                          min={param.min}
                          max={param.max}
                          step={param.step}
                          value={hyperparameters[param.name] || param.default}
                          onChange={(e) => handleHyperparameterChange(param.name, parseFloat(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>{param.min}</span>
                          <span className="font-medium">{hyperparameters[param.name] || param.default}</span>
                          <span>{param.max}</span>
                        </div>
                      </div>
                    ) : param.type === "select" ? (
                      <select
                        value={hyperparameters[param.name] || param.default}
                        onChange={(e) => handleHyperparameterChange(param.name, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        {param.options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={hyperparameters[param.name] || param.default}
                        onChange={(e) => handleHyperparameterChange(param.name, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right column - Preview and training */}
        <div className="w-full lg:w-96 space-y-6">
          {/* Model Summary */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-3">Model Summary</h3>
            {selectedModelType ? (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Model Type:</span>
                  <span className="font-medium">{currentModelType?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Dataset:</span>
                  <span className="font-medium">
                    {datasets.find(d => d.id === selectedDataset)?.name || "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Complexity:</span>
                  <span className="font-medium">{currentModelType?.complexity}</span>
                </div>
                
                {selectedModelType && modelHyperparameters[selectedModelType] && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <h4 className="text-xs font-medium text-gray-600 mb-2">HYPERPARAMETERS</h4>
                    <div className="space-y-2">
                      {modelHyperparameters[selectedModelType].map(param => (
                        <div key={param.name} className="flex justify-between text-xs">
                          <span className="text-gray-600">{param.label}:</span>
                          <span className="font-medium">
                            {hyperparameters[param.name] || param.default}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <button
                  onClick={handleTrainModel}
                  disabled={!selectedModelType || !selectedDataset || isTraining}
                  className={`w-full mt-4 py-2 px-4 rounded-md ${(!selectedModelType || !selectedDataset || isTraining) ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white transition`}
                >
                  {isTraining ? `Training (${trainingProgress}%)` : 'Train Model'}
                </button>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="mt-2">Select a model type to configure</p>
              </div>
            )}
          </div>
          
          {/* Training Output */}
          {isTraining && (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Training Progress</h3>
              <div className="space-y-3">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${trainingProgress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600">
                  Training {currentModelType?.name} model on {datasets.find(d => d.id === selectedDataset)?.name}...
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  <div className="flex justify-between">
                    <span>Epochs:</span>
                    <span>{Math.floor(trainingProgress / 10)}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loss:</span>
                    <span>{(1 - trainingProgress / 100).toFixed(4)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Results */}
          {trainedModel && (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-200">
              <h3 className="font-medium text-gray-700 mb-3">Training Complete!</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-center text-5xl mb-3">
                  🎉
                </div>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Model Name:</span>
                    <span className="font-medium">{trainedModel.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="font-medium">{trainedModel.accuracy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trained On:</span>
                    <span className="font-medium">
                      {new Date(trainedModel.trainedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Link
                    to={`/models/${trainedModel.id}`}
                    className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md text-center transition"
                  >
                    View Details
                  </Link>
                  <button
                    className="py-2 px-3 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition"
                  >
                    Deploy Model
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Help Card */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-800 mb-2">Model Training Tips</h3>
            <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
              <li>Start with simpler models first</li>
              <li>Adjust hyperparameters gradually</li>
              <li>Monitor training progress</li>
              <li>Try different datasets</li>
              <li>Compare model performance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModels;
