
import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {

    const [popupStyle, showPopup] = useState("hide");

    const popup = () => {
        showPopup("login-popup");
        setTimeout(() => showPopup("hide"), 3000);
      };

    return (
        <div className="contact-cover">
            <h1>Contact</h1>
			<input type="text" name="firstname" placeholder="First name" />
            <input type="text" name="lastname" placeholder="Last name"/>
			<input type="phone" name="phone" placeholder="Enter CellPhone Number" />
			<input type="email" name="email" placeholder="Enter Email" requiered />
			<div className="buttons" onClick={popup}>Add Contact</div>
        
        <div className={popupStyle}>
        <h3>Contanct Failed</h3>
        <p>One of the fields is incorrect</p>
        </div>
    </div>  

    )    
       
};       

export default ContactForm

    