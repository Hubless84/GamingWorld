import React from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutGames from './components/AboutGames';
import Tournaments from "./components/Tournaments";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ErrorPage from "./components/ErrorPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ContactForm from "./components/ContactForm";
import Store from "./components/Store";
import FifaMain from "./components/FifaMain";
import BeAPro from "./components/BeAPro";
import DotaMain from "./components/DotaMain";
import { ShopContextProvider } from "./components/Shop-Context";
import Payment from './components/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {Cart} from './components/Cart';
import TestConnection from './components/TestConnection';
import "./App.css"


const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

function App() {
  return (
    <BrowserRouter>
      <ShopContextProvider>
        <NavBar/>
            <Routes>
              <Route path="/" element ={<HomePage/>} />
              <Route path="/BeAPro" element ={<BeAPro/>} />
              <Route path="/AboutGames" element ={<AboutGames/>} />
              <Route path="/Tournaments" element ={<Tournaments/>} />
              <Route path="/FifaMain" element ={<FifaMain/>} />
              <Route path="/DotaMain" element ={<DotaMain/>} />
              <Route path="/HomePage" element={<HomePage/>} />
              <Route path="/LoginForm" element={<LoginForm/>} />
              <Route path="/Store" element={<Store/>} />
              <Route path="/SignupForm" element={<SignupForm/>} />
              <Route path="/ContactForm" element={<ContactForm/>} />
              <Route path="/Cart" element={<Cart/>} />
              <Route path="/Payment" element={<Elements stripe={stripePromise}><Payment /></Elements>} />
              <Route path="*" element={<ErrorPage/>} />
            </Routes>
          <Footer/>
        </ShopContextProvider>
    </BrowserRouter>
  );
}

export default App;






