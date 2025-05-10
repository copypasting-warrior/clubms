import React, { useContext, useState } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';

function RegisterPage() {
    const { addUser, addEvent, users } = useContext(AuthContext);
    const navigate = useNavigate();

    const [newUser, setNewUser] = useState({
        tier: '',
        email: '',
        password: '',
        isAdmin: false,
    });

    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        maxSeats: '',
        tier: '',
        description: '',
        imageUrl:
            'https://images.pexels.com/photos/3184303/pexels-photo-3184303.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150',
        seatsBooked: 0,
    });

    const handleUserChange = e => {
        const { name, value, type, checked } = e.target;
        setNewUser(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleEventChange = e => {
        const { name, value } = e.target;
        setNewEvent(prev => ({ ...prev, [name]: value }));
    };

    const handleUserSubmit = e => { 
        e.preventDefault();

        const memberId = `M${(users.length + 1).toString().padStart(3, '0')}`;
        const userToAdd = { memberId, ...newUser };

        addUser(userToAdd);

        setNewUser({ tier: '', email: '', password: '', isAdmin: false });
    };

    const handleEventSubmit = e => {
        e.preventDefault();

        const eventId = `e${Math.floor(Math.random() * 10000)}`;
        const eventToAdd = { id: eventId, ...newEvent };

        addEvent(eventToAdd);

        setNewEvent({
            title: '',
            date: '',
            maxSeats: '',
            tier: '',
            description: '',
            imageUrl:
                'https://images.pexels.com/photos/3184303/pexels-photo-3184303.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150',
            seatsBooked: 0,
        });
    };

    return (
        <div style={{  textAlign: 'center',backgroundImage: 'url(https://images.unsplash.com/photo-1744522184450-77b96718b074?q=80&w=2715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
            <AdminNavBar />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', width:'30%',backgroundColor:'rgba(238, 241, 244, 0.2)',marginLeft:'34vw',marginTop:'2rem',marginBottom:'0rem',borderRadius:'10px',padding:'20px',paddingBottom:'40px'}}> 
                <div>
                    <h1>Register New User</h1>
                    <form onSubmit={handleUserSubmit} style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', gap: '15px', maxWidth: '400px'}}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Tier:</label>
                            <input
                                type="text"
                                name="tier"
                                value={newUser.tier}
                                onChange={handleUserChange}
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={newUser.email}
                                onChange={handleUserChange}
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={newUser.password}
                                onChange={handleUserChange}
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Is Admin:</label>
                            <input
                                type="checkbox"
                                name="isAdmin"
                                checked={newUser.isAdmin}
                                onChange={handleUserChange}
                            />
                        </div>
                        <button type="submit">Register User</button>
                    </form>
                </div>

                <div>
                    <h1>Register New Event</h1>
                    <form onSubmit={handleEventSubmit} style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', gap: '15px', maxWidth: '400px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Event Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={newEvent.title}
                                onChange={handleEventChange}
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Event Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={newEvent.date}
                                onChange={handleEventChange}
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Max Seats:</label>
                            <input
                                type="number"
                                name="maxSeats"
                                value={newEvent.maxSeats}
                                onChange={handleEventChange}
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Tier:</label>
                            <input
                                type="text"
                                name="tier"
                                value={newEvent.tier}
                                onChange={handleEventChange}
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Description:</label>
                            <textarea
                                name="description"
                                value={newEvent.description}
                                onChange={handleEventChange}
                                required
                            />
                        </div>
                        <button type="submit">Register Event</button>
                    </form>
                </div>
            </div>
            
        </div>
    );
}

export default RegisterPage;
