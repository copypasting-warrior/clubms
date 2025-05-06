import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { events, user, bookSeats } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [seatsToBook, setSeatsToBook] = useState(1);
  const [bookingMessage, setBookingMessage] = useState('');

  useEffect(() => {
    const ev = events.find((e) => e.id === id);
    if (!ev) {
      navigate('/home');
      return;
    }
    setEvent(ev);
  }, [events, id, navigate]);

  if (!event) {
    return null; // or loading indicator
  }

  const availableSeats = event.maxSeats - event.seatsBooked;
  const maxSelectableSeats = availableSeats > 0 ? availableSeats : 0;

  const handleSeatsChange = (e) => {
    let val = Number(e.target.value);
    if (val < 1) val = 1;
    if (val > maxSelectableSeats) val = maxSelectableSeats;
    setSeatsToBook(val);
  };

  const handleBook = () => {
    if (seatsToBook <= 0) return;

    if (seatsToBook > availableSeats) {
      setBookingMessage('Not enough seats available.');
      return;
    }

    bookSeats(event.id, seatsToBook);
    setBookingMessage(`Successfully booked ${seatsToBook} ${seatsToBook === 1 ? 'seat' : 'seats'}!`);
  };

  return (
    <div style={styles.container} role="main" aria-label={`Event details for ${event.title}`}>
      <button onClick={() => navigate('/home')} style={styles.backButton} aria-label="Back to home page">← Back to Events</button>
      <h1 style={styles.title}>{event.title}</h1>
      <img src={event.imageUrl} alt={event.title} style={styles.image} />
      <p style={styles.description}>{event.description}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Tier:</strong> {event.tier}</p>
      <p><strong>Seats booked:</strong> {event.seatsBooked} / {event.maxSeats}</p>
      {availableSeats > 0 ? (
        <div style={styles.bookingSection}>
          <label htmlFor="seats" style={styles.label}>
            Number of seats to book:
          </label>
          <input
            type="number"
            id="seats"
            min="1"
            max={maxSelectableSeats}
            value={seatsToBook}
            onChange={handleSeatsChange}
            style={styles.input}
            aria-describedby="seatsHelp"
          />
          <button onClick={handleBook} style={styles.bookButton} aria-disabled={availableSeats === 0}>
            Book Seats
          </button>
          <small id="seatsHelp" style={styles.helpText}>
            {availableSeats} seat{availableSeats !== 1 ? 's' : ''} available
          </small>
          {bookingMessage && <p style={styles.bookingMessage}>{bookingMessage}</p>}
        </div>
      ) : (
        <p style={styles.soldOut}>Sorry, this event is fully booked.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: '40px auto',
    padding: '0 15px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#4b6cb7',
    cursor: 'pointer',
    marginBottom: 20,
    fontSize: 16,
  },
  title: {
    color: '#4b6cb7',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    maxHeight: 300,
    objectFit: 'cover',
    borderRadius: 10,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    color: '#444',
  },
  bookingSection: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 240,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    padding: 8,
    fontSize: 16,
    borderRadius: 6,
    border: '1.5px solid #ccc',
    marginBottom: 10,
    outline: 'none',
  },
  bookButton: {
    padding: '10px 15px',
    backgroundColor: '#4b6cb7',
    color: 'white',
    fontWeight: '700',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    marginBottom: 10,
  },
  bookingMessage: {
    color: 'green',
    fontWeight: '600',
  },
  soldOut: {
    fontWeight: '700',
    color: 'red',
    marginTop: 20,
  },
  helpText: {
    fontSize: 12,
    color: '#555',
  },
};

export default EventDetails;
