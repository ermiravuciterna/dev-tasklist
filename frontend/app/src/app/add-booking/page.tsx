

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AddBooking.module.css'; 

const AddBooking: React.FC = () => {
  const [formData, setFormData] = useState({
    service: '',
    doctor_name: '',
    start_time: '',
    end_time: '',
    date: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add booking');
      }

      setSuccess('Booking added successfully!');
      setTimeout(() => router.push('/'), 2000); 
    } catch (error: any) {
      setError(error.message || 'An error occurred while adding the booking.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Booking</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="service">Service</label>
          <input
            type="text"
            id="service"
            name="service"
            className={styles.input}
            value={formData.service}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="doctor_name">Doctor Name</label>
          <input
            type="text"
            id="doctor_name"
            name="doctor_name"
            className={styles.input}
            value={formData.doctor_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="start_time">Start Time</label>
          <input
            type="time"
            id="start_time"
            name="start_time"
            className={styles.input}
            value={formData.start_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="end_time">End Time</label>
          <input
            type="time"
            id="end_time"
            name="end_time"
            className={styles.input}
            value={formData.end_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className={styles.input}
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Add Booking</button>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
      </form>
    </div>
  );
};

export default AddBooking;
