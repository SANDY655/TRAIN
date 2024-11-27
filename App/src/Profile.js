import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './App.css';

function Profile({ user, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(user);

  // Load profile data (GET request)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${user.email}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [user.email]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  // Update profile (PUT request)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/users/${profileData.email}`, profileData);
      onUpdate(response.data); // Update the parent component with new data
      setEditMode(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  // Create new profile (POST request example)
  const handleCreateProfile = async () => {
    try {
      const response = await axios.post('/api/users', profileData);
      setProfileData(response.data);
      alert('Profile created successfully');
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {!editMode ? (
        <div className="profile-info">
          <p><span>Name:</span> {profileData.name}</p>
          <p><span>Email:</span> {profileData.email}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            required
          />

          <button type="submit">Update Profile</button>
        </form>
      )}
      <div className="logout">
        <button onClick={() => alert('Logged out')}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
