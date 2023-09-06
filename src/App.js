import React,{useState,useEffect} from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutGames from './components/AboutGames';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ErrorPage from "./components/ErrorPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ContactForm from "./components/ContactForm";
import Store from "./components/Store";
import LolPlayer from "./components/LolPlayer";
import LolHistory from './components/LolHistory';
import BeAPro from "./components/BeAPro";
import LolMain from "./components/LolMain";
import LolVideos from './components/LolVideos';
import { ShopContextProvider } from "./components/Shop-Context";
import Payment from './components/Payment';
import {Cart} from './components/Cart';
import "./App.css"
import PaymentSuccess from './components/PaymentSuccess';
import PrivacyPolicy from './components/PrivacyPolicy';


function App() {

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      <ShopContextProvider>
        <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
            <Routes>
              <Route path="/" element ={<HomePage/>} />
              <Route path="/BeAPro" element ={<BeAPro/>} />
              <Route path="/PrivacyPolicy" element ={<PrivacyPolicy/>} />
              <Route path="/LolHistory" element ={<LolHistory/>} />
              <Route path="/LolMain" element ={<LolMain/>} />
              <Route path="/LolVideos" element ={<LolVideos/>} />
              <Route path="/LolPlayer" element ={<LolPlayer/>} />
              <Route path="/HomePage" element={<HomePage/>} />
              <Route path="/LoginForm" element={<LoginForm setLoggedInUser={setLoggedInUser} />} />
              <Route path="/Store" element={<Store/>} />
              <Route path="/SignupForm" element={<SignupForm/>} />
              <Route path="/ContactForm" element={<ContactForm/>} />
              <Route path="/Cart" element={<Cart/>} />
              <Route path="/Payment" element={<Payment/>} />
              <Route path="/PaymentSuccess" element={<PaymentSuccess/>} />
              <Route path="*" element={<ErrorPage/>} />
            </Routes>
        <Footer/>
      </ShopContextProvider>
    </BrowserRouter>
  );
}

export default App;






