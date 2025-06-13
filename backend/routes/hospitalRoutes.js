const express = require('express');
const {registerHospital, loginHospital, logoutHospital, forgotHospitalPassword, resetHospitalPassword, getHospitalInfo, updateHospitalInfo, changeHospitalPassword, getAllAppointments, getAllDonations, getHospitalDonors, getAllVolunteers, addSlots, getDonorsWithHLATestingDonations, uploadHLAresult, getDonorsWithUploadedHLAResults, createBloodDrive, getVolunteerApplications, acceptVolunteerApplication, rejectVolunteerApplication} = require('../controllers/hospitalController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();


// Hospital Routes
router.route('/register-hospital').post(registerHospital);

router.route('/login-hospital').post(loginHospital);

router.route("/logout-hospital").get(logoutHospital);

router.route('/hospital/forgot-password').post(forgotHospitalPassword);

router.route('/hospital/reset-password/:token').put(resetHospitalPassword);

router.route('/hospital-profile').get(isAuthenticatedUser, authorizeRoles('hospital'), getHospitalInfo);

router.route('/hospital-profile/update').put(isAuthenticatedUser, authorizeRoles('hospital'), updateHospitalInfo);

router.route('/hospital/change-password').put(isAuthenticatedUser, authorizeRoles('hospital'), changeHospitalPassword);

router.route('/appointments').get(isAuthenticatedUser, authorizeRoles('hospital'), getAllAppointments);

router.route('/donations').get(isAuthenticatedUser, authorizeRoles('hospital'), getAllDonations);

router.route('/hospital-donors').get(isAuthenticatedUser, authorizeRoles('hospital'), getHospitalDonors);

router.route('/hospital-volunteers').get(isAuthenticatedUser, authorizeRoles('hospital'), getAllVolunteers);

router.route('/add-slots').post(isAuthenticatedUser, authorizeRoles('hospital'), addSlots);

router.route('/hla-testing-donations').get(isAuthenticatedUser, authorizeRoles('hospital'), getDonorsWithHLATestingDonations);

router.route('/upload-HLA-result').post(isAuthenticatedUser, authorizeRoles('hospital'), uploadHLAresult);

router.route('/HLA-records').get(isAuthenticatedUser, authorizeRoles('hospital'), getDonorsWithUploadedHLAResults);

router.route('/create-blood-drive').post(isAuthenticatedUser, authorizeRoles("hospital"), createBloodDrive);

router.route('/get-volunteer-applications').get(isAuthenticatedUser, authorizeRoles("hospital"), getVolunteerApplications);

router.route('/volunteers/:applicationId/accept').put(isAuthenticatedUser, authorizeRoles("hospital"), acceptVolunteerApplication);

router.route('/volunteers/:applicationId/reject').put(isAuthenticatedUser, authorizeRoles("hospital"), rejectVolunteerApplication);

module.exports = router;


