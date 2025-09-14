import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import Userdata from "./Userdata";
import HackPreventions from "./HackPreventions";
import Services from "./Services";
import Contact from "./Contact";
import AboutUs from "./About";
import UserHome from "./Userhome";
import Navbar from "./Navbar";
import ScamReport from "./ScamReport";
import Footer from "./Footer";
import AdminDash from "./Admin";
import EmailBreaches from "./lginlist";
import AntivirusDemo from "./AntivirusDemo";
import AlienLoader from "./AlienLoader";
import ProfilePage from "./ProfilePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<Userdata />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/hack-preventions" element={<HackPreventions />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/scam-reports" element={<ScamReport />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/admindash" element={<AdminDash />} />
        <Route path="/loggedinlist" element={<EmailBreaches />} />
        <Route path="/antivirus" element={<AntivirusDemo />} />
        <Route path="/alien" element={<AlienLoader />} />
        <Route path="/profile" element={<ProfilePage />} />



      </Routes>
    </Router>
  );
}
export default App;
