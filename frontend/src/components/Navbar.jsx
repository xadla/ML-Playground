import React from "react";
import { Link } from "react-router";
import useAuth from "../auth/AuthContext";

import LogoutButton from "./Logout";

const Navbar = () => {

  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to={"/"} 
              className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors"
            >
              ML Platform
            </Link>
          </div>
          
          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  to={"/datasets"} 
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Datasets
                </Link>
              </li>
              <li>
                <Link 
                  to={"/create-dataset"} 
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Create Dataset
                </Link>
              </li>
              <li>
                <Link 
                  to={"/create-model"} 
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Create Model
                </Link>
              </li>
              <li>
                <Link 
                  to={"/models"} 
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Models
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Auth Links */}
          { user == null ? 
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to={"/signup"} 
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign Up
              </Link>
              <Link 
                to={"/signin"} 
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Sign In
              </Link>
            </div>
            :
            <div className="hidden md:flex items-center space-x-4">
              <LogoutButton classes="w-full text-red-600 hover:text-red-800 cursor-pointer flex items-center" />
            </div>
          }
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
