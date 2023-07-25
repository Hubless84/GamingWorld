import React from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ErrorPage from "./components/ErrorPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import ContactForm from "./components/ContactForm";
import Store from "./components/Store";
import { ShopContextProvider } from "./components/Shop-Context";
import {Cart} from './components/Cart';
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
        <ShopContextProvider>
          <Routes>
            <Route path="/" element ={<Homepage/>} />
            <Route path="/Homepage" element={<Homepage/>} />
            <Route path="/LoginForm" element={<LoginForm/>} />
            <Route path="/Store" element={<Store/>} />
            <Route path="/SignupForm" element={<SignupForm/>} />
            <Route path="/ContactForm" element={<ContactForm/>} />
            <Route path="/Cart" element={<Cart/>} />
            <Route path="*" element={<ErrorPage/>} />
          </Routes>
        </ShopContextProvider>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;






