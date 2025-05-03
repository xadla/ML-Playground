import React from "react";

const Home = () => {
  return (
    <>
      {/* Welcome Section */}
      <div className="w-full bg-white py-8 px-4 sm:px-6 lg:px-8 flex justify-center flex-col items-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#27548A] my-2 md:my-4 text-center">
          Welcome To ML Playground
        </h2>
        <p className="text-[#393E46] text-base sm:text-xl lg:text-2xl text-center max-w-3xl px-4">
          Explore Machine Learning Experiments and Interactive Models
        </p>
      </div>

      {/* Featured Projects or Demos */}
      <div className="w-full py-8 px-4">
        <h3 className="text-4xl text-[#27548A] text-center mb-8">Featured Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
            <h4 className="text-2xl font-semibold text-[#27548A] mb-2">Image Classifier</h4>
            <p className="text-gray-600 mb-4">Upload an image and get real-time predictions using a trained CNN model.</p>
            <button className="bg-[#27548A] text-white px-4 py-2 rounded hover:bg-[#1c3a5e]">Try It</button>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
            <h4 className="text-2xl font-semibold text-[#27548A] mb-2">Text Sentiment Analyzer</h4>
            <p className="text-gray-600 mb-4">Enter any sentence and see whether it's positive, negative, or neutral.</p>
            <button className="bg-[#27548A] text-white px-4 py-2 rounded hover:bg-[#1c3a5e]">Try It</button>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
            <h4 className="text-2xl font-semibold text-[#27548A] mb-2">Digit Recognizer</h4>
            <p className="text-gray-600 mb-4">Draw a digit and watch the model predict it using MNIST dataset training.</p>
            <button className="bg-[#27548A] text-white px-4 py-2 rounded hover:bg-[#1c3a5e]">Try It</button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full bg-gray-100 py-10 px-4 text-center">
        <h3 className="text-3xl text-[#27548A] font-semibold mb-4">About Me</h3>
        <p className="text-gray-700 max-w-4xl mx-auto text-lg">
          I'm a machine learning enthusiast passionate about building interactive applications that make ML more accessible.
          This playground showcases various experiments I've built using tools like TensorFlow, PyTorch, and Scikit-learn.
        </p>
      </div>

      {/* Documentation or Tutorials Section */}
      <div className="w-full py-10 px-4">
        <h3 className="text-3xl text-[#27548A] text-center font-semibold mb-6">Documentation & Tutorials</h3>
        <ul className="list-disc max-w-4xl mx-auto text-left text-gray-700 pl-6 space-y-2">
          <li><a href="#" className="text-blue-600 hover:underline">How to Train Your Own Image Classifier</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">Deploying Models with Streamlit</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">Text Classification with Transformers</a></li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="w-full bg-white py-10 px-4 text-center">
        <h3 className="text-3xl text-[#27548A] font-semibold mb-4">Contact & Feedback</h3>
        <p className="text-gray-700 mb-6">Have questions or suggestions? Feel free to reach out via email or connect with me on social media.</p>
        <p className="text-[#27548A] font-medium">Email: example@example.com</p>
        <div className="mt-4">
          <a href="#" className="text-blue-500 hover:underline mx-2">GitHub</a>
          <a href="#" className="text-blue-500 hover:underline mx-2">LinkedIn</a>
        </div>
      </div>
    </>
  );
};

export default Home;
