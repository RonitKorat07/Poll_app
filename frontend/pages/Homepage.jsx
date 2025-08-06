import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.role);

  const handleVoteClick = () => {
    if (!token) {
      // Redirect to sign-in if no token exists
      navigate("/signin");
    } else if (userRole === "voter") {
      // Allow navigation to /poll if user is a voter
      navigate("/poll");
    } else {
      // Redirect to admin page
      navigate("/adminpoll");
    }
  };


  return (
    <div className="min-h-screen" style={{ backgroundColor: '#eff6ff' }}>
 
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center mt-20 text-center px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Welcome to Pollify!
        </h2>
        <p className="text-gray-600 max-w-md mb-6">
          Create polls easily and let users vote instantly. Whether you're gathering opinions or making decisions, Pollify helps you do it all in seconds.
        </p>

        <div className="flex space-x-4">
          
          <button onClick={handleVoteClick} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded transition">
            Vote Now
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;
