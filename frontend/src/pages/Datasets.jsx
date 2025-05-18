import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DatasetsPage = () => {
  // Sample datasets - in a real app, you'd fetch these from an API
  const [datasets, setDatasets] = useState([
    {
      id: "1",
      name: "Iris Flower Dataset",
      createdAt: "2023-05-15T10:30:00Z",
      points: 150,
      classes: 3,
      imageDimensions: { width: 800, height: 500 },
      description: "Classic iris flower classification dataset"
    },
    {
      id: "2",
      name: "Custom Circles",
      createdAt: "2023-05-18T14:45:00Z",
      points: 342,
      classes: 2,
      imageDimensions: { width: 800, height: 500 },
      description: "Two concentric circles pattern"
    },
    {
      id: "3",
      name: "Spiral Pattern",
      createdAt: "2023-05-20T09:15:00Z",
      points: 500,
      classes: 3,
      imageDimensions: { width: 800, height: 500 },
      description: "Three-arm spiral classification challenge"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState(null);

  // Filter datasets based on search term
  const filteredDatasets = datasets.filter(dataset =>
    dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle dataset deletion
  const handleDeleteDataset = (id) => {
    setDatasets(datasets.filter(dataset => dataset.id !== id));
    setSelectedDataset(null);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Datasets</h1>
          <p className="text-gray-600">Manage and explore your created datasets</p>
        </div>
        <Link 
          to="/create-dataset" 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
        >
          Create New Dataset
        </Link>
      </div>

      {/* Search and filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">Search datasets</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="search"
                type="text"
                placeholder="Search datasets by name or description..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{filteredDatasets.length} datasets</span>
          </div>
        </div>
      </div>

      {/* Datasets grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredDatasets.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No datasets found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "Try a different search term" : "Create your first dataset to get started"}
          </p>
          <div className="mt-6">
            <Link
              to="/create-dataset"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Dataset
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map((dataset) => (
            <div 
              key={dataset.id} 
              className={`bg-white rounded-lg shadow-sm border ${selectedDataset?.id === dataset.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} overflow-hidden transition-all hover:shadow-md`}
              onClick={() => setSelectedDataset(dataset)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-medium text-gray-900 truncate">{dataset.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {dataset.classes} classes
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{dataset.description}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {formatDate(dataset.createdAt)}
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {dataset.points} points
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                <Link
                  to={`/datasets/${dataset.id}`}
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
                      handleDeleteDataset(dataset.id);
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

      {/* Dataset details sidebar */}
      {selectedDataset && (
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={() => setSelectedDataset(null)}
            ></div>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">{selectedDataset.name}</h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setSelectedDataset(null)}
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
                            <h3 className="text-sm font-medium text-gray-900">Description</h3>
                            <div className="mt-2 text-sm text-gray-500">
                              {selectedDataset.description || "No description available"}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-900">Details</h3>
                            <div className="mt-2 space-y-2 text-sm text-gray-500">
                              <div className="flex justify-between">
                                <span>Created</span>
                                <span>{formatDate(selectedDataset.createdAt)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Points</span>
                                <span>{selectedDataset.points}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Classes</span>
                                <span>{selectedDataset.classes}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Dimensions</span>
                                <span>{selectedDataset.imageDimensions.width} × {selectedDataset.imageDimensions.height} px</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-900">Preview</h3>
                            <div className="mt-2">
                              <div className="bg-gray-100 rounded-md flex items-center justify-center h-48">
                                <span className="text-gray-400">Dataset preview visualization</span>
                              </div>
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
                          setSelectedDataset(null);
                        }}
                      >
                        Download JSON
                      </button>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-500"
                        onClick={() => {
                          handleDeleteDataset(selectedDataset.id);
                          setSelectedDataset(null);
                        }}
                      >
                        Delete Dataset
                      </button>
                    </div>
                    <div className="mt-6">
                      <Link
                        to={`/train-model?dataset=${selectedDataset.id}`}
                        className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Train Model with this Dataset
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

export default DatasetsPage;
