import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import PrivacyPolicy from './components/PrivacyPolicy';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import ResetPasswordHospital from './components/ResetPasswordHospital';
import LoginHospital from './components/LoginHospital';
import Register from './components/Register'; 
import RegisterHospital from './components/RegisterHospital'; 
import DonationBasics from "./components/DonationBasics";
import BloodDonation from "./components/BloodDonation";
import StemCellDonation from "./components/StemCellDonation";
import TypesandCompatibility from './components/TypesandCompatibility';
import CheckEligibility from './components/CheckEligibility';
import WhyDonateBlood from './components/WhyDonateBlood';
import WhyDonateStemcells from './components/WhyDonateStemcells';
import Faqs from './components/Faqs';
import JoinOurTeam from './components/JoinOurTeam';


import DonorHome from './components/DonorPanel/DonorHome'; // Donor Home Page
import DonorNavbar from './components/DonorPanel/DonorNavbar'; // Donor Navbar
import DonorProfile from './components/DonorPanel/DonorProfile';
import AppointmentPage from './components/DonorPanel/AppointmentPage';
import ManageAppointments from './components/DonorPanel/ManageAppointments';
import Volunteer from './components/DonorPanel/Volunteer';
import StemcellAppointment from './components/DonorPanel/StemcellAppointment';
import BloodDrive from './components/DonorPanel/BloodDrive'; // BloodDrive Component
import ViewHLAStatus from './components/DonorPanel/ViewHLAStatus';

import HospitalHome from './components/HospitalPanel/HospitalHome';
import HospitalNavbar from './components/HospitalPanel/HospitalNavbar';
import HospitalProfile from './components/HospitalPanel/HospitalProfile';
import CreateDrive from './components/HospitalPanel/CreateDrive';
import ManageDonors from './components/HospitalPanel/ManageDonors';
import ManageVolunteers from './components/HospitalPanel/ManageVolunteers';
import AddVolunteers from './components/HospitalPanel/AddVolunteers';
import HLAResult from './components/HospitalPanel/HLAResult';
import Records from './components/HospitalPanel/Records';
import SlotManager from './components/HospitalPanel/SlotManager';

import ProtectedRoute from './components/Route/ProtectedRoute';
import AdminDashboard from './components/Admin Panel/AdminDashboard';



function App() {
  return (
    
    <Router>

        <Routes>
          
          {/* Public Routes */}
          <Route path="/" element={<><Topbar /><Navbar /><Home /></>} />
          <Route path="/about" element={<><Topbar /><Navbar /><About /></>} />
          <Route path="/privacypolicy" element={<><Topbar /><Navbar /><PrivacyPolicy /></>} />
          <Route path="/contact-us" element={<><Topbar /><Navbar /><Contact /></>} />
          <Route path="/login" element={<><Topbar /><Navbar /><Login /></>} />
          <Route path="/loginHospital" element={<><Topbar /><Navbar /><LoginHospital /></>} />
          <Route path="/reset-password/:token" element={<><Topbar /><Navbar /><ResetPassword /></>} /> 
          <Route path="/hospital/reset-password/:token" element={<><Topbar /><Navbar /><ResetPasswordHospital /></>} /> 
          <Route path="/register" element={<><Topbar /><Navbar /><Register /></>} /> 
          <Route path="/registerHospital" element={<><Topbar /><Navbar /><RegisterHospital /></>} /> 
          <Route path="/donation-basics" element={<><Topbar /><Navbar /><DonationBasics /></>} />
          <Route path="/blood-donation" element={<><Topbar /><Navbar /><BloodDonation /></>} />
          <Route path="/stemcell-donation" element={<><Topbar /><Navbar /><StemCellDonation /></>} />
          <Route path="/check-eligibility" element={<><Topbar /><Navbar /><CheckEligibility /></>} />
          <Route path="/types-and-compatibility" element={<><Topbar /><Navbar /><TypesandCompatibility /></>} />
          <Route path="/why-donate-blood" element={<><Topbar /><Navbar /><WhyDonateBlood /></>} />
          <Route path="/why-donate-stemcells" element={<><Topbar /><Navbar /><WhyDonateStemcells /></>} />
          <Route path="/faqs" element={<><Topbar /><Navbar /><Faqs /></>} />
          <Route path="/joinourteam" element={<><Topbar /><Navbar /><JoinOurTeam /></>} />

          {/* Donor Panel Routes */}
          <Route path="/donorhome" element={<><DonorNavbar /><DonorHome /></>} />
          <Route path="/donorprofile" element={<><DonorNavbar /><DonorProfile /></>} />
          <Route path="/appointmentpage" element={<><DonorNavbar /><AppointmentPage /></>} />
          <Route path="/manageappointments" element={<><DonorNavbar /><ManageAppointments /></>} />
          <Route path="/volunteer" element={<><DonorNavbar /><Volunteer /></>} />
          <Route path="/blooddrive" element={<><DonorNavbar /><BloodDrive /></>} /> {/* BloodDrive Component */}
          <Route path="/stemcellappointment" element={<><DonorNavbar /><StemcellAppointment /></>} />
          <Route path="/viewhlastatus" element={<><DonorNavbar /><ViewHLAStatus /></>} />

          {/* Hospital Panel Routes... */}
          <Route path="/hospitalhome" element={<><HospitalNavbar /><HospitalHome /></>} />
          <Route path="/hospitalprofile" element={<><HospitalNavbar /><HospitalProfile /></>} />
          <Route path="/createdrive" element={<><HospitalNavbar /><CreateDrive /></>} />
          <Route path="/managedonors" element={<><HospitalNavbar /><ManageDonors /></>} />
          <Route path="/managevolunteers" element={<><HospitalNavbar /><ManageVolunteers /></>} />
          <Route path="/hlaResult" element={<><HospitalNavbar /><HLAResult/></>} />
          <Route path="/addvolunteers" element={<><HospitalNavbar /><AddVolunteers /></>} />
          <Route path="/slotmanager" element={<><HospitalNavbar /><SlotManager /></>} />
          <Route path="/records" element={<><HospitalNavbar /><Records /></>} />

          {/* most recent */}
          <Route path="/admindashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      
      
      {/* Footer will always be visible */}
      <Footer />
    </Router>
  );
}

export default App;
