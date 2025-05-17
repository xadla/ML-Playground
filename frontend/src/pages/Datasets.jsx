import { Link } from "react-router";
import React, { useState } from "react";

const DatasetsPage = () => {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      {/* main */}
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-4">
        {/* header */}
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
        {/* search */}
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
            {/* <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{filteredDatasets.length} datasets</span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )

}

export default DatasetsPage;
