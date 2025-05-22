import React from "react";


const Footer = () => {
  return (
    <footer className="bg-white text-gray-900 py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 ML Playground. All rights reserved.</p>
        <p>Follow us on social media:</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-gray-700 hover:text-indigo-600">Facebook</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600">Twitter</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
