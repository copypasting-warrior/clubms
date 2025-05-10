import React, { useContext } from 'react';
import { AuthContext } from '../App';
import UserNavBar from './UserNavBar';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Please log in to see your profile.</p>;
  }

  return (
    <>
      <UserNavBar />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Profile</h2>
          <p><strong>Member ID:</strong> {user.memberId}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Tier:</strong> {user.tier}</p>
          <p><strong>Is Admin:</strong> {user.isAdmin ? "Yes" : "No"}</p>
          {/* Add more user info if needed */}
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    padding: '0 15px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    borderRadius: 10,
    padding: 30,
    borderTop: '6px solid #2563eb', // blue top border
    backgroundColor: '#f9fafb',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
    width: '300px', // Fixed width for the card
  },
  title: {
    marginBottom: 20,
    color: '#2563eb',
    textAlign: 'center',
  },
};

export default ProfilePage;