import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './book.css';
import Navbar from '../navbar/Navbar';

const Book = () => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/stations")
      .then(response => setStations(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleStationChange = (event) => {
    const station = stations.find(station => station._id === event.target.value);
    setSelectedStation(station);
    setSelectedSlot(null);
  }

  const handleSlotChange = (event) => {
    const slot = selectedStation.slots.find(slot => slot._id === event.target.value);
    setSelectedSlot(slot);
  }

  const handleBooking = () => {
    if (selectedStation && selectedSlot) {
      setBookingSuccess(true);
    }
  }

  return (
    <div className='outer'>
      <div className='nav'>
        <Navbar />
      </div>
      <div className='booking_container'>
        <h2>Book a Charging Slot</h2>
        <div className="booking-form">
          <label>Select Station:</label>
          <select onChange={handleStationChange}>
            <option value="">-- Select Station --</option>
            {stations.map(station => (
              <option key={station._id} value={station._id}>{station.name}</option>
            ))}
          </select>
          {selectedStation && (
            <>
              <label>Select Slot:</label>
              <select onChange={handleSlotChange}>
                <option value="">-- Select Slot --</option>
                {selectedStation.slots.map(slot => (
                  <option key={slot._id} value={slot._id} disabled={slot.isBooked}>
                    {slot.startTime} - {slot.endTime} {slot.isBooked ? '(Booked)' : ''}
                  </option>
                ))}
              </select>
              {selectedSlot && !selectedSlot.isBooked && (
                <button onClick={handleBooking}>Book Slot</button>
              )}
            </>
          )}
          {bookingSuccess && (
            <div className="confirmation-message">
              <h3>Booking Successful</h3>
              <p>Your charging slot has been booked successfully!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Book;
