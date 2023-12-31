import React, { useState } from "react";
import axios from 'axios';
import "./ContactForm.css";

//Contact Component
const ContactForm = () => {
    const [popupStyle, setPopupStyle] = useState("hide");
    const [popupMessage, setPopupMessage] = useState("");

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: ""
    });

    //function that displays a popup message
    const showPopup = (message) => {
        setPopupMessage(message);
        setPopupStyle("contact-popup");
        setTimeout(() => hidePopup(), 3000);
    };

    const hidePopup = () => {
        setPopupStyle("hide");
        setPopupMessage("");
    };

    //regex for email check
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        
        try {
            const phoneNumber = formData.phone_number;

            //first name check
            if (formData.first_name===""){
                showPopup("First name input is empty");
                return;
            }
            //last name check
            if (formData.last_name==="" ){
                showPopup("Last name input is empty");
                return;
            }
            //phone check that he is no longer then 10 digits
            if((phoneNumber).length !== 10){
                showPopup("Phone number is incorrect");
                return;
            }  
            //phone check to make sure the phone is only include numbers
            if(!/^\d+$/.test(phoneNumber)){
                showPopup("Phone number is incorrect");
                return;
            }
            //email check
            if(!isValidEmail(formData.email)){
                showPopup("emaill is incorrect");
                return;
            }
            //procced if all the details are ok
            await axios.post('/api/add-contact', formData);
            // Show the success popup
            showPopup("Contact Added Successfully"); 
            setTimeout(() => showPopup("hide"), 3000);
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //Contact form
    return (
        <div className="contact-cover">
            <h1>Contact</h1>
			<input type="text" name="first_name" placeholder="First name" value={formData.first_name} onChange={handleInputChange} />
                <input type="text" name="last_name" placeholder="Last name" value={formData.last_name} onChange={handleInputChange} />
                <input type="phone" name="phone_number" placeholder="Enter CellPhone Number" value={formData.phone_number} onChange={handleInputChange} required/>
                <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleInputChange} required />
			<div className="contact-buttons" onClick={handleSubmit}>Add Contact</div>
        
            <div className={popupStyle}>
                 <h3>Contact Status</h3>
                 <p>{popupMessage}</p>
            </div>
    
        </div>  

    )    
       
};       

export default ContactForm

    