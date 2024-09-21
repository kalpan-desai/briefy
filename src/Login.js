import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './component/style.css'; // Adjust the path as needed
import AppImage from './images/registration-form-1.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      alert('Both email and password are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        const errorMessage = await response.text();
        if (errorMessage === 'User not found') {
          alert('User not found. Please register first.');
          navigate('/register');
        } else {
          alert('Incorrect password. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <div className="image-holder">
          <img className='img' src={AppImage} alt="Login" />
        </div>
        <form onSubmit={handleLogin}>
          <h3>Login Form</h3>
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Email Address"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required // HTML5 required attribute
            />
          </div>
          <div className="form-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required // HTML5 required attribute
            />
          </div>
          <button type="submit">
            Login
            <i className="zmdi zmdi-arrow-right"></i>
          </button>
          <p className="text-center">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
