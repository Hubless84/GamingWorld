import React, { useState } from 'react';
import Modal from 'react-modal';
import './BeAPro.css';

function BeAPro() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const futureEvents = [
    { name: 'FIFA Championship', availability: 'green', quality: 'A-tier' },
    { name: 'International Cup', availability: 'yellow', quality: 'B-tier' },
    { name: 'Friendly Tournament', availability: 'red', quality: 'C-tier' },
    // Add more events
  ];

  const getRandomBlueShade = () => {
    const shades = ['blue-1', 'blue-2', 'blue-3'];
    return shades[Math.floor(Math.random() * shades.length)];
  };

  return (
    <div>
      <header>
        <h1>Fifa 23 - Upcoming Tournaments</h1>
      </header>
      <div className="container">
        <div className="main-content">
          <table className="upcoming-tournaments">
            <thead>
              <tr>
                <th>Date</th>
                <th>Tournament</th>
                <th>Quality</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {futureEvents.map((event, index) => (
                <tr key={index} onClick={openModal}>
                  <td>Aug 15</td>
                  <td className={`availability-${event.availability}`}>{event.name}</td>
                  <td className={`quality-${getRandomBlueShade()}`}>{event.quality}</td>
                  <td>Online</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Event Sign-up Modal"
      >
        <div className="modal-content">
          <h2>Sign Up for the Tournament</h2>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />

            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />

            <button type="submit">Sign Up</button>
          </form>
          <button className="close-button" onClick={closeModal}>
            Close
          </button>
        </div>
      </Modal>
      <footer>
        <p>&copy; 2023 GamingWorld. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default BeAPro;
