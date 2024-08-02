import Link from 'next/link';

interface Booking {
  id: string;
  date: string;
  start_time: string;
}

interface BookingListProps {
  bookings: Booking[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  return (
    <div>
      <h1>Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <Link href={`/booking/${booking.id}`} passHref>
              {}
              <span>
                A Booking on {booking.date} starting at {booking.start_time}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;

