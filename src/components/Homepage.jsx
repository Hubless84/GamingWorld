import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import Slideshow from './Slideshow';
import SponsorLogos from './Sponsors';
import Dota2 from '../images/HomePage/Dota2.jpeg';
import Fifa23 from '../images/HomePage/Fifa23.jpeg';
import CSGO from '../images/HomePage/CSGO.png';
import Lol from '../images/HomePage/Lol.jpeg';
import './HomePage.css'

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const futureEvents = [
    { name: 'FIFA Championship', availability: 'white', quality: 'A-tier' },
    { name: 'International Cup', availability: 'white', quality: 'B-tier' },
    { name: 'Friendly Tournament', availability: 'white', quality: 'C-tier' },
    // Add more events
  ];

  const getRandomBlueShade = () => {
    const shades = ['blue-1', 'blue-2', 'blue-3'];
    return shades[Math.floor(Math.random() * shades.length)];
  };
    return (
      <>
      <div>
        <div className="home-page-tour">
          <h2 className="latest-news">
            <span className="neon-line"></span>
            Latest News
            <span className="neon-line"></span>
          </h2>

          <div className="homepage-container">
            <table>
              <tbody>
                <tr className='DotaRow'>
                  <td>
                    <img className="ln-image" src={Dota2} alt="Dota 2" />
                  </td>
                  <td>
                    <div className="subhead-container">
                      <h4 className="subhead">Dota 2</h4>
                      <hr />
                      <p>Release date of article</p>
                    </div>
                    <p>Description</p>
                  </td>
                </tr>
                <tr className='FifaRow'>
                  <td>
                    <img className="ln-image" src={Fifa23} alt='Fifa 23' />
                  </td>
                  <td>
                    <div className="subhead-container">
                      <h4 className="subhead">Fifa 23</h4>
                      <p>Release date of article</p>
                    </div>
                    <p>Description</p>
                  </td>
                </tr>
                <tr className='CSRow'>
                  <td>
                    <img className="ln-image" src={CSGO} alt='CS:GO' />
                  </td>
                  <td>
                    <div className="subhead-container">
                      <h4 className="subhead">CS:GO</h4>
                      <p>Release date of article</p>
                    </div>
                    <p>Description</p>
                  </td>
                </tr>
                <tr className='LolRow'>
                  <td>
                    <img className="ln-image" src={Lol} alt='LOL' />
                  </td>
                  <td>
                    <div className="subhead-container">
                      <h4 className="subhead">League of Legends</h4>
                      <p>Release date of article</p>
                    </div>
                    <p>Description</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
          <hr className="horizontal-line" />
          <h1 className="theader">Latest Tournaments</h1>
          <div className="hometour-container">
            <div className="main-content">
              <table className="upcoming-tournaments">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Tournament</th>
                    <th>Quality</th>
                    <th>Location</th>
                    <th>Game</th>
                  </tr>
                </thead>
                <tbody>
                  {futureEvents.map((event, index) => (
                    <tr key={index} onClick={openModal}>
                      <td>Aug 15</td>
                      <td className={`availability-${event.availability}`}>{event.name}</td>
                      <td className={`quality-${getRandomBlueShade()}`}>{event.quality}</td>
                      <td>Online</td>
                      <td>Counter strike</td>
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
          </div>
          <div>
            <p>
                For more Tournaments click <Link to="/Tournaments">here</Link>
           </p>
          </div>     
          
          <hr className="horizontal-line" />
          <div className="slideshow-title">
            <h1>Our best selling products</h1>
          </div> 
            <div className="slideshow-container">
            <Link to="/Store">
                <Slideshow />
            </Link>
            </div>  
            
            <hr className="horizontal-line" />
            <div className="sponsor-title">
            <h1>Our Sponsors</h1>
            </div>
            <div>
            <SponsorLogos /> 
            </div>

          
      
        </>
  );
}

export default HomePage;
