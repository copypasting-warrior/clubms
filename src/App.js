import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import EventDetails from './components/EventDetails';
import ProfilePage from './components/ProfilePage';

// Create Auth Context
export const AuthContext = createContext(null);

// Define tier order for comparison
const tierOrder = {
  'Platinum': 3,
  'Gold': 2,
  'Silver': 1,
  'Bronze': 0,
};

// Mock users data
const mockUsers = [
  {
    memberId: 'M001',
    tier: 'Gold',
    email: 'admin@example.com',
    password: 'adminpass',
    isAdmin: true,
  },
  {
    memberId: 'M002',
    tier: 'Gold',
    email: 'user1@example.com',
    password: 'user1pass',
    isAdmin: false,
  },
  {
    memberId: 'M003',
    tier: 'Silver',
    email: 'user2@example.com',
    password: 'user2pass',
    isAdmin: false,
  },
];

// Mock events data
const mockEvents = [
  {
    id: 'e1',
    title: 'Gold Gala Night',
    date: '2024-07-15',
    maxSeats: 100,
    seatsBooked: 25,
    tier: 'Gold',
    imageUrl: 'https://images.pexels.com/photos/3184303/pexels-photo-3184303.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150',
    description: 'An exclusive gala event for our valued Gold tier members.',
  },
  {
    id: 'e2',
    title: 'Silver Summer Fest',
    date: '2024-08-01',
    maxSeats: 50,
    seatsBooked: 50,
    tier: 'Silver',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661306437817-8ab34be91e0c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'A vibrant summer festival event for Silver tier members.',
  },
  {
    id: 'e3',
    title: 'Bronze Bash',
    date: '2024-09-10',
    maxSeats: 75,
    seatsBooked: 30,
    tier: 'Bronze',
    imageUrl: 'https://images.pexels.com/photos/247676/pexels-photo-247676.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150',
    description: 'A fun bash event for Bronze tier members and below.',
  },
  {
    id: 'e4',
    title: 'Platinum VIP Summit',
    date: '2024-10-05',
    maxSeats: 30,
    seatsBooked: 5,
    tier: 'Platinum',
    imageUrl: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150',
    description: 'A prestigious event exclusive to Platinum tier members.',
  },
];

function App() {

  const [user, setUser] = useState(null);
  const [events, setEvents] = useState(mockEvents);

  const [users, setUsers] = useState(mockUsers);

  const addUser  = (user) => {
    setUsers(prevUsers => [...prevUsers, { ...user, memberId: `M${prevUsers.length + 1}` }]);
  };

  const addEvent = (event) => {
    setEvents(prevEvents => [...prevEvents, { ...event, id: `E${prevEvents.length + 1}`, seatsBooked: 0 }]);
  };

  function bookSeats(eventId, seatsToBook) {

    setEvents((prevEvents) =>

      prevEvents.map((ev) => (ev.id === eventId ? { ...ev, seatsBooked: ev.seatsBooked + seatsToBook } : ev))

    );

  }


  // Update event details for admin

  function updateEvent(updatedEvent) {

    setEvents((prevEvents) =>

      prevEvents.map((ev) => (ev.id === updatedEvent.id ? { ...updatedEvent } : ev))

    );

  }
  function updateUser(updatedUser) {

    setUsers((prevUsers) =>

      prevUsers.map((u) => (u.memberId === updatedUser.memberId ? { ...updatedUser } : u))

    );

  }
  return (

    <AuthContext.Provider value={{ user, setUser, mockUsers, tierOrder, events, bookSeats, users, updateUser, updateEvent,addUser , addEvent  }}

    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                user.isAdmin ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/home" replace />
                )
              ) : (
                <LoginPage />
              )
            }
          />
          <Route path="/admin" element={user && user.isAdmin ? <AdminPage /> : <Navigate to="/" replace />} />
          <Route path="/home" element={user && !user.isAdmin ? <HomePage /> : <Navigate to="/" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/events/:id" element={user && !user.isAdmin ? <EventDetails /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
