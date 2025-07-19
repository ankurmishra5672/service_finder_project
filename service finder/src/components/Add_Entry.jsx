import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Add_Entry.css'

function Add_Entry() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [rating, setRating] = useState('');
  const [contact, setContact] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Fetch services with loading and error handling
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/services`);
        setServices(response.data);
      } catch (err) {
        setError('Failed to fetch services. Please try again later.');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Input validation
  const validateInputs = () => {
    if (!name.trim() || !type.trim() || !rating || !contact.trim() || !pinCode.trim()) {
      setError('All fields are required!');
      return false;
    }
    if (rating < 1 || rating > 5) {
      setError('Rating must be between 1 and 5.');
      return false;
    }
    if (!/^\d{6}$/.test(pinCode)) {
      setError('Pin code must be 6 digits.');
      return false;
    }
    return true;
  };

  // Add service with proper error handling
  const addService = async () => {
    if (!validateInputs()) return;
    
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/services`,
        { name, type, rating, contact, pinCode }
      );
      setServices([...services, response.data]);
      clearForm();
      setError('');
    } catch (err) {
      setError('Failed to add service. Please try again.');
      console.error('Error adding service:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setName('');
    setType('');
    setRating('');
    setContact('');
    setPinCode('');
  };

  return (
    <div className="container">
      <div className="page-heading">
        <i className="fas fa-plus-circle"></i>
        <h1>Add New Service</h1>
      </div>
      <div className="inputarea">
        <input type='text' value={name} onChange={(e=>setName(e.target.value))} placeholder="Service Name"/>
        <input type='text' value={type} onChange={e=>setType(e.target.value)} placeholder="Service type"/>
        <input type='number' value={rating} onChange={e=>setRating(e.target.value)} placeholder="Rating out of 5 stars"/>
        <input type='text' value={contact} onChange={e=>setContact(e.target.value)} placeholder="Contact Details"/>
        <input type="text" value={pinCode} onChange={e => setPinCode(e.target.value)} placeholder="Enter Pincode"/>
      </div>
      {loading && <div className="loading">Loading...</div>}
      <button onClick={addService} disabled={loading}>
        {loading ? 'Adding...' : 'Add Entry'}
      </button>
      <div>
        {error && <div className="error-message">{error}</div>}
        <ul>
          {services.map((service, index) => (
            <li key={service._id || index}>
              <div className="service-card">
                <div className="service-name">{service.name}</div>
                <div className="service-detail">
                  <span>Type:</span> {service.type}
                </div>
                <div className="service-detail">
                  <span>Rating:</span> 
                  <span className="service-rating">{service.rating} ★</span>
                </div>
                <div className="service-detail">
                  <span>Contact:</span> {service.contact}
                </div>
                <div className="service-detail">
                  <span>Pin Code:</span> {service.pinCode}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Add_Entry;