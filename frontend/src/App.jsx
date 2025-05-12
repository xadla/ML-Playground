import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// pages
import Home from "./pages/Home";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import CreateDataset from "./pages/CreateDataset";
import DatasetsPage from "./pages/Datasts";

// Context
import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/create-dataset" element={<CreateDataset />} />
          <Route path="/datasets" element={<DatasetsPage />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        pauseOnHover
        draggable
        theme="light"
      />
    </AuthProvider>
  );
}

export default App;
