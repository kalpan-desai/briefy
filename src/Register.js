import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './component/style.css'; // Adjust the path as needed
import AppImage from './images/registration-form-1.jpg';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie library

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    gender: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const { firstName, lastName, username, email, gender, password, confirmPassword } = formData;
    if (!firstName || !lastName || !username || !email || !gender || !password || !confirmPassword) {
      alert('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      Cookies.set('token', response.data.token, { expires: 1 }); // Set cookie to expire in 1 day
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('There was an error registering the user!', error);
    }
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <div className="image-holder">
          <img className='img' src={AppImage} alt="Registration" />
        </div>
        <form onSubmit={handleSubmit}>
          <h3>Registration Form</h3>
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required // HTML5 required attribute
            />
            <input
              type="text"
              placeholder="Last Name"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required // HTML5 required attribute
            />
          </div>
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Username"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required // HTML5 required attribute
            />
          </div>
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Email Address"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required // HTML5 required attribute
            />
          </div>
          <div className="form-wrapper">
            <select
              name="gender"
              className="form-control"
              value={formData.gender}
              onChange={handleChange}
              required // HTML5 required attribute
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required // HTML5 required attribute
            />
          </div>
          <div className="form-wrapper">
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required // HTML5 required attribute
            />
          </div>
          <button type="submit">
            Register
            <i className="zmdi zmdi-arrow-right"></i>
          </button>
          <p className="text-center">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
