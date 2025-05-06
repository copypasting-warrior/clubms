import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../App';
import { useNavigate, Navigate } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';

function EditableInput({ label, value, onChange, type = 'text', disabled = false, ...props }) {
  return (
    
    <label style={{ display: 'block', marginBottom: 8 }}>
      <strong>{label}:</strong>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={e => onChange(e.target.value)}
        style={{
          marginLeft: 8,
          padding: 4,
          borderRadius: 4,
          border: disabled ? 'none' : '1px solid #bbb',
          backgroundColor: disabled ? '#f9f9f9' : 'white',
          minWidth: 120,
          maxWidth: '100%',
          cursor: disabled ? 'default' : 'text',
        }}
        {...props}
      />
    </label>
  );
}

function AdminPage() {
  const { user, users, updateUser, events, updateEvent } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editableEvents, setEditableEvents] = useState(events);
  const [editableUsers, setEditableUsers] = useState(users);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    setEditableEvents(events);
  }, [events]);

  useEffect(() => {
    setEditableUsers(users);
  }, [users]);

  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  function handleEventChange(eventId, field, value) {
    setEditableEvents(evts =>
      evts.map(ev => (ev.id === eventId ? { ...ev, [field]: value } : ev))
    );
  }

  function handleUserChange(memberId, field, value) {
    setEditableUsers(usr =>
      usr.map(u => (u.memberId === memberId ? { ...u, [field]: value } : u))
    );
  }

  function handleSaveAll() {
    for (const ev of editableEvents) {
      if (isNaN(ev.maxSeats) || ev.maxSeats < 0) {
        alert(`Event "${ev.title}": Max seats must be a non-negative number`);
        return;
      }
      if (
        isNaN(ev.seatsBooked) ||
        ev.seatsBooked < 0 ||
        ev.seatsBooked > ev.maxSeats
      ) {
        alert(`Event "${ev.title}": Seats booked must be between 0 and max seats`);
        return;
      }
    }

    for (const usr of editableUsers) {
      if (!usr.email.includes('@')) {
        alert(`User  "${usr.email}": Please enter a valid email`);
        return;
      }
      if (typeof usr.password !== 'string' || usr.password.length < 4) {
        alert(`User  "${usr.email}": Password should be at least 4 characters long`);
        return;
      }
    }

    editableEvents.forEach(ev => {
      updateEvent({
        ...ev,
        maxSeats: Number(ev.maxSeats),
        seatsBooked: Number(ev.seatsBooked),
      });
    });

    editableUsers.forEach(usr => {
      const fixedIsAdmin =
        typeof usr.isAdmin === 'string'
          ? usr.isAdmin.toLowerCase() === 'true'
          : usr.isAdmin;
      updateUser({ ...usr, isAdmin: fixedIsAdmin });
    });

    setSaveStatus('Saved!');
    setTimeout(() => setSaveStatus(''), 3000); // Clear the message after 3 seconds
  }

  return (
    
    <div >
      <AdminNavBar />
      <h1>Admin Dashboard</h1>
      
      <div style={{ display: 'flex', gap: '20px',marginBottom: '2rem' }}>
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px', boxSizing: 'border-box', backgroundColor: '#3356ff', color: 'white', borderRadius: '10px' }}>
          <h2 style={{ color: 'white' }}>Events</h2>
          {editableEvents.map(event => (
            <div key={event.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', backgroundColor: 'white', color: 'black', borderRadius: '10px' }}>
              <EditableInput
                label="Event Title"
                value={event.title}
                onChange={value => handleEventChange(event.id, 'title', value)}
                disabled={!isEditing}
              />
              <EditableInput
                label="Max Seats"
                value={event.maxSeats}
                onChange={value => handleEventChange(event.id, 'maxSeats', value)}
                disabled={!isEditing}
                type="number"
              />
              <EditableInput
                label="Seats Booked"
                value={event.seatsBooked}
                onChange={value => handleEventChange(event.id, 'seatsBooked', value)}
                disabled={!isEditing}
                type="number"
              />
            </div>
          ))}
        </div>
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px', boxSizing: 'border-box', backgroundColor: '#3356ff', color: 'white', borderRadius: '10px' }}>
          <h2 style={{ color: 'white' }}>Users</h2>
          {editableUsers.map(user => (
            <div key={user.memberId} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', backgroundColor: 'white', color: 'black', borderRadius: '10px' }}>
              <EditableInput
                label="User Email"
                value={user.email}
                onChange={value => handleUserChange(user.memberId, 'email', value)}
                disabled={!isEditing}
              />
              <EditableInput
                label="User Password"
                value={user.password}
                onChange={value => handleUserChange(user.memberId, 'password', value)}
                disabled={!isEditing}
                type="password"
              />
            </div>
          ))}
        </div>
      </div>
      <button style={{marginBottom: '1rem'}}  onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Stop Editing' : 'Edit'}
      </button>
      {isEditing && (
        <div>
          <button onClick={handleSaveAll}>Save All Changes</button>
          {saveStatus && <p style={{ color: 'green', marginTop: '10px' }}>{saveStatus}</p>}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
