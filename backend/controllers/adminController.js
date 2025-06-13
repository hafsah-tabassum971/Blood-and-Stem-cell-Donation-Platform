const User = require('../models/userModel');
const Hospital = require('../models/hospitalModel');
const Donation = require('../models/donationModel');
const Appointment = require('../models/appointmentModel');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");




//Get All Donors
exports.getAllDonors = catchAsyncErrors(async (req, res, next) => {
  const donors = await User.find({ role: "donor" }) 
    .populate({
      path: "donations",
      populate: {
        path: "hospital",
        populate: { path: "user", select: "name" } // Sirf hospital ka name fetch hoga
      } 
    })
    //.select("name donations"); // Sirf necessary fields

  res.status(200).json({
    success: true,
    donors,
  });
});

  
  
  // // Get Donor by ID
  // exports.getDonorById = catchAsyncErrors(async (req, res, next) => {
  //   const { id } = req.params;
  
  //   // Fetch the donor by ID
  //   const donor = await User.findOne({ _id: id, role: 'donor' });
  
  //   if (!donor) {
  //     return next(new ErrorHandler('Donor not found', 404));
  //   }
  
  //   res.status(200).json({
  //     success: true,
  //     donor,
  //   });
  // });
  
  
  
  // Edit Donor by ID
  exports.editDonor = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;
  
    // Find the donor by ID and update
    const donor = await User.findOneAndUpdate(
      { _id: id, role: 'donor' },
      updates,
      { new: true, runValidators: true }
    );
  
    if (!donor) {
      return next(new ErrorHandler('Donor not found', 404));
    }
  
    res.status(200).json({
      success: true,
      message: 'Donor updated successfully',
      donor,
    });
  });
  
  
  
  // Delete Donor by ID
  exports.deleteDonor = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
  
    // Find the donor by ID and delete
    const donor = await User.findOneAndDelete({ _id: id, role: 'donor' });
  
    if (!donor) {
      return next(new ErrorHandler('Donor not found', 404));
    }
  
    res.status(200).json({
      success: true,
      message: 'Donor deleted successfully',
    });
  });
  
  
  // Get All Hospitals
exports.getAllHospitals = catchAsyncErrors(async (req, res, next) => {
    const hospitals = await Hospital.find().populate('user', 'name email address contactNumber');

    res.status(200).json({
        success: true,
        hospitals,
    });
});

// // Get Hospital by ID
// exports.getHospitalById = catchAsyncErrors(async (req, res, next) => {
//     const { id } = req.params;

//     const hospital = await Hospital.findById(id).populate('user', 'name email contactNumber');

//     if (!hospital) {
//         return next(new ErrorHandler('Hospital not found', 404));
//     }

//     res.status(200).json({
//         success: true,
//         hospital,
//     });
// });

// Edit Hospital by ID
exports.editHospital = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  // Find the hospital by ID and populate the user
  const hospital = await Hospital.findById(id).populate('user', 'name email address contactNumber');
  if (!hospital) {
    return next(new ErrorHandler('Hospital not found', 404));
  }

  const { user, ...hospitalUpdates } = updates; // Extract user updates separately

  // Update the User model if user details are provided
  if (user && typeof user === 'object' && hospital.user) {
    await User.findByIdAndUpdate(hospital.user._id, user, { new: true, runValidators: true });
  }

  // Update the Hospital model
  const updatedHospital = await Hospital.findByIdAndUpdate(id, hospitalUpdates, { new: true, runValidators: true })
    .populate('user', 'name email address contactNumber');

  res.status(200).json({
    success: true,
    message: 'Hospital updated successfully',
    hospital: updatedHospital,
  });
});




// Delete Hospital by ID
exports.deleteHospital = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const hospital = await Hospital.findById(id);

  if (!hospital) {
      return next(new ErrorHandler('Hospital not found', 404));
  }

  // Ensure the related User is deleted as well (if required)
  await User.findByIdAndDelete(hospital.user);

  // Delete the hospital record
  await Hospital.findByIdAndDelete(id);

  res.status(200).json({
      success: true,
      message: 'Hospital deleted successfully',
  });
});


// Get all volunteers
exports.getAllVolunteers = catchAsyncErrors(async (req, res, next) => {
  const volunteers = await User.find({ role: "donor", isVolunteer: true }) 
    // .populate({
    //   path: "donations",
    //   populate: {
    //     path: "hospital",
    //     populate: { path: "user", select: "name" } //This will fetch only hospital'name 
    //   } 
    // });
    // //.select("name donations"); // If specific fields are needed

    .populate({
      path: "volunteerApplications.drive",
      populate: {
        path: "hospital",
        populate: {
          path: "user",
          select: "name", // hospital name
        },
      },
    });

  res.status(200).json({
    success: true,
    volunteers,
  });
});



// Edit Volunteer by ID
exports.editVolunteer = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  // const updates = req.body;
  const { name, email, contactNumber, role, experience, availability } = req.body;

  // Find the volunteer (donor with isVolunteer true) by ID and update
  const volunteer = await User.findOneAndUpdate(
    { _id: id, role: 'donor', isVolunteer: true },
    //updates,
    { new: true, runValidators: true }
  );

  if (!volunteer) {
    return next(new ErrorHandler('Volunteer not found', 404));
  }

   // Update base user fields
   if (name) volunteer.name = name;
   if (email) volunteer.email = email;
   if (contactNumber) volunteer.contactNumber = contactNumber;
 
   // Update the latest volunteerApplication entry if it exists
   const latestApplication = volunteer.volunteerApplications?.[volunteer.volunteerApplications.length - 1];
   if (latestApplication) {
     if (role) latestApplication.volunteerRole = role;
     if (experience) latestApplication.experience = experience;
     if (availability) latestApplication.availability = availability;
   }
 
   await volunteer.save({validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: 'Volunteer updated successfully',
    volunteer,
  });
});



// Remove Volunteer Role (but keep donor)
exports.removeVolunteerStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOneAndUpdate(
    { _id: id, role: 'donor', isVolunteer: true },
    { isVolunteer: false },
    { new: true }
  );

  if (!user) {
    return next(new ErrorHandler('Volunteer not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Volunteer status removed successfully',
    user,
  });
});




// Get All Donations
exports.getAllDonationsAdmin = catchAsyncErrors(async (req, res, next) => {
  const donations = await Donation.find()
  .populate('donor', 'name')
    // .populate({
    //   path: "hospital",
    //   populate: {
    //     path: "user", // Hospital ke andar user ka data
    //     select: "name", // Jo fields chahiye
    //   },
    // })

  res.status(200).json({
    success: true,
    donations,
  });
});




// Get All Appointments
exports.getAllAppointmentsAdmin = catchAsyncErrors(async (req, res, next) => {
  // Fetch all appointments
  // const appointments = await Appointment.find().populate('donor hospital'); // Populate fields like donor, hospital, patient

  const appointments = await Appointment.find()
  .populate({
    path: "hospital",
    populate: {
      path: "user",
      select: "name", 
    },
  })
  .populate({
    path: "donor",
  });

  res.status(200).json({
      success: true,
      appointments,
  });
});


// Admin Summary Counts
exports.getStats = catchAsyncErrors(async (req, res, next) => {
  try {
    const donorsCount = await User.countDocuments({ role: "donor" });
    const volunteersCount = await User.countDocuments({ role: "donor", isVolunteer: true });
    const appointmentsCount = await Appointment.countDocuments();
    const donationsCount = await Donation.countDocuments();

    res.status(200).json({
      success: true,
      summary: {
        donors: donorsCount,
        volunteers: volunteersCount,
        appointments: appointmentsCount,
        donations: donationsCount,
      },
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to fetch stats", 500));
  }
});

