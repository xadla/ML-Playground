import React, { useState } from 'react';

import useAuth from '../auth/AuthContext';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, user } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    setError('');

    try {
      const result = await login(email, password);
      toast.success(`Welcome Back`);
      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError("Email or password is wrong. Please try again.");
        } else {
          setError("Server not connected. Please try again later.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        {error && <div className="mt-4 text-red-500">{error}</div>}

      </form>
    </div>
  );
}

export default SigninPage;
