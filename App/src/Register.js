import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './App.css';

function Register({ onRegister }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password === userData.confirmPassword) {
      try {
        const response = await axios.post('/api/register', userData); // Adjust the endpoint to your backend
        onRegister(response.data); // Pass response data to onRegister
      } catch (error) {
        console.error('Error registering:', error);
        alert('Registration failed. Please try again.');
      }
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          required
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Log in here</a>.
      </p>
    </div>
  );
}

export default Register;
