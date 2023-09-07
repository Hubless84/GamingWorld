import React, { useState, useEffect } from 'react';
import BestGamingMouse from '../images/HomePage/BestGamingMouse.jpg'
import BestGamingKeyboard from '../images/HomePage/BestGamingKeyboard.jpg'
import BestGamingPad from '../images/HomePage/BestGamingPad.jpg'
import BestGamingHeadphones from '../images/HomePage/BestGamingHeadphones.jpg'
import "./Slideshow.css";

//component for images slideshow in the homepage
const Slideshow = () => {
  const images = [BestGamingMouse, BestGamingKeyboard, BestGamingPad, BestGamingHeadphones];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Change image every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return <img className="slideshow-image" src={images[currentIndex]} alt="Game" />;
};

export default Slideshow;