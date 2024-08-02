'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddBooking = () => {
  const [service, setService] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const booking = {
      service,
      doctor_name: doctorName,
      start_time: startTime,
      end_time: endTime,
      date,
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      router.push('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Add Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="service">Service:</label>
          <input
            id="service"
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="doctor_name">Doctor Name:</label>
          <input
            id="doctor_name"
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="start_time">Start Time:</label>
          <input
            id="start_time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="end_time">End Time:</label>
          <input
            id="end_time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBooking;
