import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WelcomePopup from './WelcomePopup';
import Navbar from './Navbar';
import axios from 'axios';

function Home() {
  const [showPopup, setShowPopup] = useState(true);
  const [pinCode, setPinCode] = useState('');
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem('hasVisited', 'true');
  };

  const searchService = () => {
    axios.get(`http://localhost:5000/services/pin?pinCode=${pinCode}`)
      .then(response => {
        if (response.data.length === 0) {
          setError("No Services Found");
        } else {
          setServices(response.data);
          setError('');
        }
      })
      .catch(error => {
        setError("Error Fetching data: " + error.message);
        console.error("Error fetching pin code:", error);
      });
  };

  return (
    <div className="home-container">
      <div className="page-heading">
        <i className="fas fa-search-location"></i>
        <h1>Find Local Services</h1>
      </div>
      {showPopup && <WelcomePopup onClose={closePopup} />}
      <div className='search-item'>
        <input 
          type='text' 
          value={pinCode} 
          onChange={e => setPinCode(e.target.value)}
          placeholder='Search by Pincode'
          maxLength={6}
        />
        <button onClick={searchService}>
          <i className="fas fa-search"></i>
          {services.length ? ' Search Again' : ' Find Services'}
        </button>
      </div>
      <div className='display'>
        {error && <div className="error-message">
          <i className="fas fa-exclamation-circle"></i> {error}
        </div>}
        <ul>
          {services.map(service => (
            <li key={service._id}>
              <h3><i className="fas fa-store"></i> {service.name}</h3>
              <p><i className="fas fa-star"></i> Rating: {service.rating}</p>
              <p><i className="fas fa-tags"></i> Type: {service.type}</p>
              <p><i className="fas fa-phone"></i> Contact: {service.contact}</p>
              <p><i className="fas fa-map-marker-alt"></i> Pincode: {service.pinCode}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
