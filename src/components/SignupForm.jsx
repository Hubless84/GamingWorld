import React, {useEffect, useState} from "react";
import { gapi } from "gapi-script";
import { Link } from 'react-router-dom';
import "./SignupForm.css";

const SignupForm = () => {

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId:"403058750856-fuubg9dhve2jcpnnhj3a1jvk388pfivb.apps.googleusercontent.com",
                scope: ""
            })
        }
        gapi.load('client: auth2', start)
    })

    const [popupStyle, showPopup] = useState("hide")

    const popup = () => {
        showPopup("login-popup")
        setTimeout(() => showPopup("hide"), 3000)
    }

    const onSuccess = e => {
        alert("User created Successfully")
        console.log(e)
    }

    const onFailure = e => {
        alert("User sign up Failed")
        console.log(e)
    }


    return (
        <div className="cover">
            <h1>Signup</h1>
            <input type="text" placeholder="Enter Your Fullname" />
            <input type="text" placeholder="Create username" />
            <input type="email" placeholder="Enter Email" />
            <input type="password" placeholder="Enter password" />
            <div className="buttons" onClick={popup}>Sign up</div>
            <p>
                Already have an account? <Link to="/LoginForm">Login</Link>
            </p>
            <p className="text">Or Signup using</p>

            <div className="alt-login">
                <div className="facebook"></div>
                {/*<div className="google">
                    <GoogleLogin className="blue"
                        clientId="79474543031-tmjo35916ufn421ej3u1i2ljao2apr4s.apps.googleusercontent.com"
                        buttonText=""
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={false} // alternative is true, which keeps the user signed in
                        icon={false}    // alt is true, and this puts the google logo on your button, but I don't like it
                        theme="dark"  // alternative is light, which is white
                    />
                </div>*/}
            </div>

            <div className={popupStyle}>
                <h3>Creating User Failed</h3>
                <p>One of the fields is incorrect</p>
            </div> 
        </div>
    )
}

export default SignupForm