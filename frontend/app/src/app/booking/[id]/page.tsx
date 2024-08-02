'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from './BookingDetails.module.css'; 

const BookingDetails: React.FC = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings/${id}`);
        if (!response.ok) {
          throw new Error('Booking not found');
        }
        const data = await response.json();
        setBooking(data);
      } catch (error: any) {
        setError(error.message || 'An error occurred while fetching the booking.');
      }
    };

    fetchBooking();
  }, [id]);

  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Booking Details</h1>
      {booking ? (
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Service:</span>
            <span className={styles.value}>{booking.service}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Doctor Name:</span>
            <span className={styles.value}>{booking.doctor_name}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Start Time:</span>
            <span className={styles.value}>{booking.start_time}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>End Time:</span>
            <span className={styles.value}>{booking.end_time}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Date:</span>
            <span className={styles.value}>{booking.date}</span>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <button className={styles.button} onClick={() => router.push('/')}>Back to Home</button>
    </div>
  );
};

export default BookingDetails;



