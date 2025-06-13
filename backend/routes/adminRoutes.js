const express = require('express');
const {getAllDonors, getDonorById, editDonor, deleteDonor, getAllHospitals, getHospitalById, editHospital, deleteHospital, getAllVolunteers, editVolunteer, removeVolunteerStatus, getAllDonationsAdmin, getAllAppointmentsAdmin, getStats} = require('../controllers/adminController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();


router.route("/get-all-donors").get(isAuthenticatedUser, authorizeRoles("admin"), getAllDonors);

// router.route("/get-donor/:id").get(isAuthenticatedUser, authorizeRoles('admin'), getDonorById);

router.route("/edit-donor/:id").put(isAuthenticatedUser, authorizeRoles('admin'), editDonor);

router.route("/delete-donor/:id").delete(isAuthenticatedUser, authorizeRoles('admin'), deleteDonor);

router.route("/get-all-hospitals").get(isAuthenticatedUser, authorizeRoles("admin"), getAllHospitals);

//router.route("/get-hospital/:id").get(isAuthenticatedUser, authorizeRoles('admin'), getHospitalById);

router.route("/edit-hospital/:id").put(isAuthenticatedUser, authorizeRoles('admin'), editHospital);

router.route("/delete-hospital/:id").delete(isAuthenticatedUser, authorizeRoles('admin'), deleteHospital);

router.route("/get-all-volunteers").get(isAuthenticatedUser, authorizeRoles("admin"), getAllVolunteers);

router.route("/edit-volunteer/:id").put(isAuthenticatedUser, authorizeRoles('admin'), editVolunteer);

router.route("/remove-volunteer-status/:id").put(isAuthenticatedUser, authorizeRoles('admin'), removeVolunteerStatus);

router.route("/get-all-donations-admin").get(isAuthenticatedUser, authorizeRoles("admin"), getAllDonationsAdmin);

router.route("/get-all-appointments-admin").get(isAuthenticatedUser, authorizeRoles("admin"), getAllAppointmentsAdmin);

router.route("/get-stats").get(isAuthenticatedUser, authorizeRoles("admin"), getStats);


module.exports = router;