import React, { useState } from 'react';
import './App.css';

function SeatSelection({ availableSeats, onSelectSeats }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatChange = (e) => {
    const seat = e.target.value;
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat)
        : [...prevSeats, seat]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSelectSeats(selectedSeats);
  };

  return (
    <div className="seat-selection-container">
      <h2>Select Seats</h2>
      <form onSubmit={handleSubmit}>
        <div className="seat-grid">
          {availableSeats.map((seat) => (
            <label key={seat}>
              <input
                type="checkbox"
                value={seat}
                onChange={handleSeatChange}
                checked={selectedSeats.includes(seat)}
              />
              {seat}
            </label>
          ))}
        </div>
        <button type="submit">Confirm Seats</button>
      </form>
    </div>
  );
}

export default SeatSelection;
