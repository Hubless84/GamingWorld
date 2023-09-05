import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import Slideshow from './Slideshow';
import SponsorLogos from './Sponsors';
import './HomePage.css'

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


    return (
      <>
      <div>
      
        
          <hr className="horizontal-line" />
          <h1 className="theader">Latest Tournaments</h1>
          <div className="hometour-container">
            <div className="main-content">
              
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
            <div className="sponsor-container">
                <SponsorLogos />
            </div>
            
        </>
  );
}

export default HomePage;
