import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
 import RouteSearch from './RouteSearch';
 import SeatSelection from './SeatSelection';
import './App.css';


function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    train: 'train1',
    date: '',
    tickets: 1
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [availableSeats, setAvailableSeats] = useState(trainData.trains[0].seats); // Use seats from the JSON file
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

  const handleTrainChange = (trainName) => {
    const selectedTrain = trainData.trains.find(train => train.name === trainName);
    if (selectedTrain) {
      setAvailableSeats(selectedTrain.seats);
    }
  };

  const handleRegister = (userData) => {
    // Perform registration logic here
    setUser(userData);
    setIsRegistered(true);
  };

  const handleLogin = (credentials) => {
    // Perform login logic here
    if (credentials.email === user.email && credentials.password === user.password) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid login credentials');
    }
  };

  const handleUpdateProfile = (updatedData) => {
    setUser(updatedData);
  };

  const handleSearch = (searchData) => {
    setSearchResults(searchData);
  };

  const handleSelectSeats = (seats) => {
    setSelectedSeats(seats);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <Router>
      <div className="container">
        <nav>
          <Link to="/">Home</Link>
          {isLoggedIn ? (
            <>
              <Link to="/book">Book Ticket</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={() => setIsLoggedIn(false)}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              !isRegistered ? (
                <Register onRegister={handleRegister} />
              ) : (
                <div>
                  <h2>Registration Successful. Please <Link to="/login">log in</Link>.</h2>
                </div>
              )
            }
          />
          <Route
            path="/login"
            element={
              isRegistered ? (
                <Login onLogin={handleLogin} />
              ) : (
                <div>
                  <h2>You must register before logging in. Please <Link to="/register">register</Link>.</h2>
                </div>
              )
            }
          />
          <Route
            path="/book"
            element={
              isLoggedIn ? (
                !bookingConfirmed ? (
                  <>
                    <RouteSearch onSearch={handleSearch} />
                    {searchResults && (
                      <>
                        <SeatSelection availableSeats={availableSeats} onSelectSeats={handleSelectSeats} />
                        <form onSubmit={handleSubmit}>
                          <label>Name:</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />

                          <label>Email:</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />

                          <label>Train:</label>
                          <select
                            name="train"
                            value={formData.train}
                            onChange={(e) => {
                              handleChange(e);
                              handleTrainChange(e.target.value);
                            }}
                          >
                            {trainData.trains.map(train => (
                              <option key={train.id} value={train.name}>
                                {train.name}
                              </option>
                            ))}
                          </select>

                          <label>Number of Tickets:</label>
                          <input
                            type="number"
                            id="tickets"
                            name="tickets"
                            min="1"
                            max="10"
                            value={formData.tickets}
                            onChange={handleChange}
                            required
                          />

                          <button type="submit">Book Ticket</button>
                        </form>
                      </>
                    )}
                  </>
                ) : (
                  <div id="confirmation">
                    <h3>Booking Confirmation</h3>
                    <p>
                      Thank you, {formData.name}! Your booking for {formData.train} on {formData.date} has been confirmed.
                      An email has been sent to {formData.email}. You have booked {formData.tickets} ticket(s) for seats {selectedSeats.join(', ')}.
                    </p>
                  </div>
                )
              ) : (
                <h2>Please log in to book a ticket</h2>
              )
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <Profile user={user} onUpdate={handleUpdateProfile} />
              ) : (
                <h2>Please log in to view your profile</h2>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
