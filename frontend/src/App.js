import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const Login = lazy(() => import('./components/Login'));
const ResetPassword = lazy(() => import('./components/ResetPassword'));
const ResetPasswordHospital = lazy(() => import('./components/ResetPasswordHospital'));
const LoginHospital = lazy(() => import('./components/LoginHospital'));
const Register = lazy(() => import('./components/Register'));
const RegisterHospital = lazy(() => import('./components/RegisterHospital'));
const DonationBasics = lazy(() => import('./components/DonationBasics'));
const BloodDonation = lazy(() => import('./components/BloodDonation'));
const StemCellDonation = lazy(() => import('./components/StemCellDonation'));
const TypesandCompatibility = lazy(() => import('./components/TypesandCompatibility'));
const CheckEligibility = lazy(() => import('./components/CheckEligibility'));
const WhyDonateBlood = lazy(() => import('./components/WhyDonateBlood'));
const WhyDonateStemcells = lazy(() => import('./components/WhyDonateStemcells'));
const Faqs = lazy(() => import('./components/Faqs'));
const JoinOurTeam = lazy(() => import('./components/JoinOurTeam'));

const DonorHome = lazy(() => import('./components/DonorPanel/DonorHome'));
const DonorNavbar = lazy(() => import('./components/DonorPanel/DonorNavbar'));
const DonorProfile = lazy(() => import('./components/DonorPanel/DonorProfile'));
const AppointmentPage = lazy(() => import('./components/DonorPanel/AppointmentPage'));
const ManageAppointments = lazy(() => import('./components/DonorPanel/ManageAppointments'));
const Volunteer = lazy(() => import('./components/DonorPanel/Volunteer'));
const StemcellAppointment = lazy(() => import('./components/DonorPanel/StemcellAppointment'));
const BloodDrive = lazy(() => import('./components/DonorPanel/BloodDrive'));
const ViewHLAStatus = lazy(() => import('./components/DonorPanel/ViewHLAStatus'));

const HospitalHome = lazy(() => import('./components/HospitalPanel/HospitalHome'));
const HospitalNavbar = lazy(() => import('./components/HospitalPanel/HospitalNavbar'));
const HospitalProfile = lazy(() => import('./components/HospitalPanel/HospitalProfile'));
const CreateDrive = lazy(() => import('./components/HospitalPanel/CreateDrive'));
const ManageDonors = lazy(() => import('./components/HospitalPanel/ManageDonors'));
const ManageVolunteers = lazy(() => import('./components/HospitalPanel/ManageVolunteers'));
const AddVolunteers = lazy(() => import('./components/HospitalPanel/AddVolunteers'));
const HLAResult = lazy(() => import('./components/HospitalPanel/HLAResult'));
const Records = lazy(() => import('./components/HospitalPanel/Records'));
const SlotManager = lazy(() => import('./components/HospitalPanel/SlotManager'));

const ProtectedRoute = lazy(() => import('./components/Route/ProtectedRoute'));
const AdminDashboard = lazy(() => import('./components/Admin Panel/AdminDashboard'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="text-center p-5 text-lg">Loading...</div>}>
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
          <Route path="/blooddrive" element={<><DonorNavbar /><BloodDrive /></>} />
          <Route path="/stemcellappointment" element={<><DonorNavbar /><StemcellAppointment /></>} />
          <Route path="/viewhlastatus" element={<><DonorNavbar /><ViewHLAStatus /></>} />

          {/* Hospital Panel Routes */}
          <Route path="/hospitalhome" element={<><HospitalNavbar /><HospitalHome /></>} />
          <Route path="/hospitalprofile" element={<><HospitalNavbar /><HospitalProfile /></>} />
          <Route path="/createdrive" element={<><HospitalNavbar /><CreateDrive /></>} />
          <Route path="/managedonors" element={<><HospitalNavbar /><ManageDonors /></>} />
          <Route path="/managevolunteers" element={<><HospitalNavbar /><ManageVolunteers /></>} />
          <Route path="/addvolunteers" element={<><HospitalNavbar /><AddVolunteers /></>} />
          <Route path="/hlaResult" element={<><HospitalNavbar /><HLAResult /></>} />
          <Route path="/records" element={<><HospitalNavbar /><Records /></>} />
          <Route path="/slotmanager" element={<><HospitalNavbar /><SlotManager /></>} />

          {/* Admin Route */}
          <Route path="/admindashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </Suspense>

      {/* Footer will always be visible */}
      <Footer />
    </Router>
  );
}

export default App;
