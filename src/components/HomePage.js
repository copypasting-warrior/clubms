import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

function HomePage() {
  const { user, events, tierOrder } = useContext(AuthContext);

  // Filter events by tier: same or lower than user tier
  const userTierRank = tierOrder[user.tier] || 0;
  const filteredEvents = events.filter(
    (ev) => (tierOrder[ev.tier] || 0) <= userTierRank
  );

  return (
    <div style={styles.pageContainer} role="main" aria-label="User home with events">
      <h1 style={styles.heading}>Welcome, {user.email}</h1>
      <p style={styles.tierText}>Your tier: {user.tier}</p>
      <div style={styles.eventsGrid}>
        {filteredEvents.length === 0 && (
          <p style={styles.noEvents}>No events available for your tier.</p>
        )}
        {filteredEvents.map((event) => (
          <Link
            to={`/events/${event.id}`}
            key={event.id}
            style={styles.cardLink}
            aria-label={`View details for event: ${event.title}`}
          >
            <div style={styles.card}>
              <img src={event.imageUrl} alt={event.title} style={styles.cardImg} />
              <div style={styles.cardTitle}>{event.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    maxWidth: 900,
    margin: '40px auto',
    padding: '0 15px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    color: '#4b6cb7',
    marginBottom: 5,
  },
  tierText: {
    marginBottom: 25,
    fontSize: 18,
    color: '#555',
  },
  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))',
    gap: 20,
  },
  cardLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  card: {
    borderRadius: 10,
    boxShadow: '0 8px 18px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    backgroundColor: '#fff',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'transform 0.2s ease',
  },
  cardImg: {
    width: '100%',
    height: 130,
    objectFit: 'cover',
  },
  cardTitle: {
    padding: '15px',
    fontWeight: '600',
    fontSize: 18,
    flexGrow: 1,
  },
  noEvents: {
    fontStyle: 'italic',
    color: '#777',
  },
};

export default HomePage;
