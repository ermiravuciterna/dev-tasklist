"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './HomePage.module.css'; 

const HomePage: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (error: any) {
        setError(error.message || 'An error occurred while fetching bookings.');
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bookings</h1>
      <Link href="/add-booking" className={styles.addButton}>
        Add Booking
      </Link>
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.bookingList}>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <li key={booking.id} className={styles.bookingItem}>
              <Link href={`/booking/${booking.id}`} className={styles.bookingLink}>
                A Booking on {booking.date} starting at {booking.start_time}
              </Link>
            </li>
          ))
        ) : (
          <li className={styles.bookingItem}>No bookings found</li>
        )}
      </ul>
    </div>
  );
};

export default HomePage;
