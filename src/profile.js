import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and redirect to register/login page
    Cookies.remove('token');
    navigate('/register');
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>Profile details will go here...</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
