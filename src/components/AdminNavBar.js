import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavBar = () => {
  const activeStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
  };

  return (
    <nav style={styles.nav}>
      <NavLink
        to="/a  dmin"
        style={({ isActive }) => (isActive ? { ...styles.link, ...activeStyle } : styles.link)}
      >
        Admin Dashboard
      </NavLink>
      <NavLink
        to="/register"
        style={({ isActive }) => (isActive ? { ...styles.link, ...activeStyle } : styles.link)}
      >
        Register
      </NavLink>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    gap: '1.5rem',
    padding: '1rem 2rem',
    backgroundColor: '#2d6cdf',
    color: '#fff',
  },
  link: {
    color: 'white',
    fontSize: '1rem',
    textDecoration: 'none',
  },
};

export default AdminNavBar;