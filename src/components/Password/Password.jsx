import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../API/Api';

const Password = () => {
  const api = Api();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Function to handle password validation
  useEffect(() => {
    if (password === confirmPassword && password.length > 0) {
      setPasswordError('');
      setIsButtonEnabled(true);
    } else {
      setPasswordError('Passwords do not match');
      setIsButtonEnabled(false);
    }
  }, [password, confirmPassword]);

  // Change Password Handler
  const changePassword = async () => {
    try {
        const { data } = await axios.put(`${api}/changepassword`, {
            email,
            password,
            cpassword:confirmPassword
          });
          alert(data.msg);
          navigate('/signin');
    } catch (error) {
        console.log(error);
        
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-6">Password</h2>
        <form id="forms" onSubmit={(e) => e.preventDefault()}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Confirm Password Field */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span id="passwordError" className="text-red-500 text-sm">
              {passwordError}
            </span>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 text-white rounded ${
              isButtonEnabled
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-blue-300 cursor-not-allowed'
            }`}
            disabled={!isButtonEnabled}
            onClick={changePassword}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Password;
