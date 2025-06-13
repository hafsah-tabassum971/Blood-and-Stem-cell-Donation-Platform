const User = require('../models/userModel');
const Hospital = require('../models/hospitalModel');
const Appointment = require('../models/appointmentModel');
const Donation = require('../models/donationModel');
const BloodDrive= require('../models/bloodDriveModel');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const crypto = require('crypto');


// Register Donor
exports.registerDonor = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, confirmPassword, gender, address, contactNumber
  } = req.body;

  try {
    // Attempt to create a new user
    const user = await User.create({
      name,
      email,
      password,
      confirmPassword,
      gender,
      address,
      contactNumber,

    });

    // Send token response upon successful registration
    sendToken(user, 201, res);
  } catch (error) {
    // Check if the error is a duplicate email error
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Handle other errors
    return next(error);
  }
});


  // Login Donor
exports.loginDonor = catchAsyncErrors(async (req, res, next) => {

  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Account not existed", 401));
  }

  // **Role check**
  if (user.role !== "donor" && user.role !== "admin") {
   return next(new ErrorHandler("Invalid role. You are not registered as a donor.", 403));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user,200,res);
  //console.log(user);
});


// Logout Donor
exports.logoutDonor = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

 



// Forgot Password for Donor
exports.forgotDonorPassword = catchAsyncErrors(async (req, res, next) => {
  // Find donor by email
  const donor = await User.findOne({ email: req.body.email, role: 'donor' });

  if (!donor) {
      return next(new ErrorHandler("Donor not found", 404));
  }

  // Generate reset password token
  const resetToken = donor.getResetPasswordToken();

  // Save the token and expiry time in the donor document
  await donor.save({ validateBeforeSave: false });

  // Construct reset password URL
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  // Email message
  const message = `Your password reset token is: \n\n ${resetPasswordUrl} \n\n If you did not request this, please ignore it.`;

  try {
      await sendMail({
          email: donor.email,
          subject: "Donor Password Recovery",
          message,
      });

      res.status(200).json({
          success: true,
          message: `Email sent to ${donor.email} successfully`,
      });
  } catch (error) {
      donor.resetPasswordToken = undefined;
      donor.resetPasswordExpire = undefined;
      await donor.save({ validateBeforeSave: false });

      return next(new ErrorHandler(error.message, 500));
  }
});




// Reset Password for Donor
exports.resetDonorPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
    role: "donor", // Ensure the user is a donor
  });

  if (!user) {
    return next(new ErrorHandler("Reset Password Token is invalid or has expired.", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match.", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: false });

  sendToken(user, 200, res);
});





// Donor Change Password
exports.changeDonorPassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
      return next(new ErrorHandler("Please provide all the required fields", 400));
  }

  const donor = await User.findById(req.user._id).select("+password");

  if (!donor || donor.role !== 'donor') {
      return next(new ErrorHandler("Donor not found", 404));
  }

  // Check if the current password matches
  const isPasswordMatched = await donor.comparePassword(currentPassword);

  if (!isPasswordMatched) {
      return next(new ErrorHandler("Incorrect current password", 400));
  }

  // Ensure the new passwords match
  if (newPassword !== confirmPassword) {
      return next(new ErrorHandler("New Passwords do not match", 400));
  }

  // Update the password
  donor.password = newPassword;
  await donor.save({validateBeforeSave: false});

  res.status(200).json({
      success: true,
      message: "Password updated successfully",
  });
});


// Get Donor Profile Information
exports.getDonorInfo = catchAsyncErrors(async (req, res, next) => {
  const donor = await User.findOne({ _id: req.user._id })
    .select("name address contactNumber email bloodType dateOfBirth role volunteerApplications")
    .populate({
      path: "volunteerApplications.drive", // populate 'drive' field inside volunteerApplications
      select: "driveName" // only get the 'name' of the drive
    });

  if (!donor) {
    console.log("Donor not found in database"); // Debug point
    return next(new ErrorHandler("Donor not found", 404));
  }

  if (donor.role.trim() !== 'donor') {
    console.log("User is not a donor"); // Debug point
    return next(new ErrorHandler("Donor not found", 404));
  }

  // Latest confirmed blood donation appointment
  const latestBloodAppointment = await Appointment.findOne({
    donor: donor._id,
    donationType: "Blood Donation",
    status: "Confirmed",
  }).sort({ appointmentDate: -1 });

  // Latest confirmed stem cell donation appointment
  const latestStemCellAppointment = await Appointment.findOne({
    donor: donor._id,
    donationType: "Stem Cell Donation",
    status: "Confirmed",
  }).sort({ appointmentDate: -1 });

  const latestBloodDonationDate = latestBloodAppointment?.appointmentDate || null;
  const latestStemCellDonationDate = latestStemCellAppointment?.appointmentDate || null;

  res.status(200).json({
    success: true,
    donor,
    latestBloodDonationDate,
    latestStemCellDonationDate,
  });
});



// Update Donor Profile Information
exports.updateDonorInfo = catchAsyncErrors(async (req, res, next) => {
  const { address, contactNumber} = req.body;

  // Find the donor associated with the logged-in user
  const donor = await User.findOne({ _id: req.user._id });

  if (!donor || donor.role !== 'donor') {
    return next(new ErrorHandler("Donor not found", 404));
  }

  // Update donor details
  if (address) donor.address = address;
  if (contactNumber) donor.contactNumber = contactNumber;

  await donor.save({validateBeforeSave: false}); // Save the updated donor details

  res.status(200).json({
    success: true,
    message: "Donor information updated successfully",
    donor, // Return the donor info with the updated details
  });
});


//CANCEL APPOINTMENT EXCLUDING APPOINTMENTS HAVING HLA RESULTS UPLOADED
exports.getDonorAppointments = catchAsyncErrors(async (req, res, next) => {
  const donorId = req.user.id; // Assuming donor is authenticated

  if (!donorId) {
    return next(new ErrorHandler('Donor ID is required', 400));
  }

  // Fetch all appointments of the donor
  let appointments = await Appointment.find({ donor: donorId })
    .populate({
      path: 'hospital',
      populate: {
        path: 'user', // Populate the `user` field inside `hospital`
        select: 'name address', // Get only `name` and `address`
      },
    });

  // Filter out the appointments where:
  // 1. donationType is 'Stem Cell Donation (For HLA Test)' 
  // 2. The linked donation has an HLA result uploaded (hlaMatchStatus is 'Matched' or 'Mismatched')
  const filteredAppointments = await Promise.all(
    appointments.map(async (appointment) => {
      if (appointment.donationType === 'Stem Cell Donation (For HLA Test)') {
        const relatedDonation = await Donation.findOne({ appointment: appointment._id });

        if (relatedDonation && ['Matched', 'Mismatched'].includes(relatedDonation.hlaMatchStatus)) {
          return null; // Exclude this appointment
        }
      }
      return appointment;
    })
  );

  // Remove null values from filteredAppointments
  appointments = filteredAppointments.filter(Boolean);

  if (!appointments.length) {
    return next(new ErrorHandler('No appointments found for this donor', 404));
  }

  res.status(200).json({
    success: true,
    count: appointments.length,
    appointments,
  });
});













//Check Eligibility
exports.checkEligibility = catchAsyncErrors(async (req, res, next) => {
  //console.log("Received data:", req.body);

  const donorId = req.user.id;

  // Ensure the user is a donor
  const donor = await User.findById(donorId);
  if (!donor || donor.role !== "donor") {
    return next(new ErrorHandler("Only donors can check eligibility", 403));
  }

  const selectedAnswers = req.body.answers || [];
  //console.log("Type of selectedAnswers:", Array.isArray(selectedAnswers));

  if (!selectedAnswers.length) {
    console.log("Validation Error: No answers provided.");
    return res.status(400).json({
      success: false,
      message: "No answers provided.",
    });
  }

  // Validation: Ensure "none" is not selected with other options
  const isNoneSelected = selectedAnswers.includes("none");
  const otherOptionsSelected = selectedAnswers.filter((key) => key !== "none");

  if (isNoneSelected && otherOptionsSelected.length > 0) {
    return res.status(400).json({
      success: false,
      message: "You cannot select 'None of the above' along with other options.",
    });
  }

  // Eligibility check if "none" is selected
  if (isNoneSelected) {
    return res.status(200).json({
      success: true,
      isEligible: true,
      message: "You are eligible to donate.",
    });
  }

  // Define ineligible conditions and their messages
  const ineligibleConditions = {
    unwell:
      "Sorry, you are currently ineligible to donate. If you are feeling unwell, we request that you refrain from donating until at least one week after you have fully recovered and are feeling fit and well. Even if you’re only experiencing mild symptoms, such as a runny nose, please take the time to rest and recover at home.",
    weight:
      "Sorry, you are currently ineligible to donate if you weigh less than 50kg. Please ensure you meet the minimum weight requirement before donating.",
    heartCondition:
      "Sorry, you are currently ineligible to donate if you have a serious heart condition. Please consult your doctor to determine if you are fit to donate.",
    operation:
      "Sorry, you are currently ineligible to donate if you have had an operation in the last 6 months. Please wait until you are fully recovered before donating.",
    antibiotics:
      "Sorry, you are currently ineligible to donate if you are taking antibiotics. You must wait until one week after you finish your antibiotics treatment.",
    patientOfMigrane:
      "Sorry, you are currently ineligible to donate if you have migrane",
      pregnant:
      "Sorry, you are currently ineligible to donate if you are pregnant, or have been pregnant in the last 9 months. Please wait until you are fully recovered before donating.",
    preExistingDisease:
      "Sorry, you are currently ineligible to donate if you have any serious pre-existing or current diseases like asthma, diabetes, cancer, or others. Please consult your doctor for further guidance.",
  };

  // Check for ineligible reasons based on selected answers
  const reasons = selectedAnswers
    .filter((key) => key !== "none" && ineligibleConditions[key])
    .map((key) => ineligibleConditions[key]);

  //console.log("Reasons for ineligibility:", reasons);

   if (reasons.length > 0) {
  //   console.log("Response being sent:", {
  //     success: false,
  //     message: "Ineligibility detected",
  //     reasons,
  //   });
    return res.status(400).json({
      success: false,
      message: "Ineligibility detected",
      reasons,
    });
  }

  // res.status(200).json({
  //   success: true,
  //   isEligible: true,
  //   message: "You are eligible to donate.",
  // });
});









// Get Nearby Hospitals 
exports.getNearbyHospitals = catchAsyncErrors(async (req, res, next) => {
  const { area } = req.query;

  if (!area || typeof area !== 'string') {
      return next(new ErrorHandler('Invalid area provided', 400));
  }

  // Fetch all hospitals and populate the user field to access the address
  const allHospitals = await Hospital.find().populate('user', 'address name');
  //console.log("All Hospitals with Full Details:", JSON.stringify(allHospitals, null, 2));

  // Filter hospitals by matching the address field in the populated user
  const hospitals = allHospitals.filter(hospital =>
      hospital.user?.address?.toLowerCase().includes(area.toLowerCase())
  );

  //console.log("Hospitals Matched:", hospitals);

  if (!hospitals || hospitals.length === 0) {
      return next(new ErrorHandler('No nearby hospitals found for the specified area', 404));
  }

  res.status(200).json({
      success: true,
      message: 'Nearby hospitals retrieved successfully',
      hospitals,
  });
});




// Fetch Full-Year Availability Controller
exports.getAvailability = catchAsyncErrors(async (req, res, next) => {
  const { hospitalId } = req.query;

  // Fetch hospital by ID
  const hospital = await Hospital.findById(hospitalId);
  if (!hospital) {
    return next(new ErrorHandler("Hospital not found", 404));
  }

  //console.log("Request Query:", req.query); // Log for request query

  // Get all availability data (no filtering by month/year)
  let availability = hospital.availability;

  //console.log("Raw Availability Data:", hospital.availability); // Log for raw availability data

  // Remove past dates
  const today = new Date();
  availability = availability.filter(item => new Date(item.date) >= today);

  if (availability.length === 0) {
    console.log("No available slots found for this hospital.");
  }

  // Sort availability by date in ascending order
  availability.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Format availability into an object
  const formattedAvailability = availability.reduce((acc, item) => {
    acc[item.date] = {
      available: item.slots.length > 0,
      slots: item.slots,
    };
    return acc;
  }, {});

  res.status(200).json({
    success: true,
    availability: formattedAvailability,
  });
});




// Book blood donation appointment

//RECENTLY ADDED
// Helper function to calculate next eligible date
const getNextEligibleDate = (lastDateStr, monthsToAdd) => {
  if (!lastDateStr) return null;
  const lastDate = new Date(lastDateStr);
  lastDate.setMonth(lastDate.getMonth() + monthsToAdd);
  lastDate.setDate(lastDate.getDate() + 1); // ➔ added one extra day
  return lastDate;
};

// Book blood donation appointment
exports.bookBloodDonationAppointment = catchAsyncErrors(async (req, res, next) => {
  const { date, time, hospitalId, eligibilityStatus, donationType } = req.body; // donationType ko bhi access kar liya
  const userId = req.user.id;
  //RECENTLY ADDED
  const today = new Date();
  console.log("hospital id",hospitalId);

  // Check if the hospital exists
  const hospital = await Hospital.findById(hospitalId).populate('user', 'name');
  if (!hospital) {
    return next(new ErrorHandler('The selected hospital does not exist', 404));
  }

  // Ensure the hospital supports the selected donation type
  if ((donationType === 'Blood Donation' && hospital.donationType !== 'Blood Donation' && hospital.donationType !== 'Both') ||
      (donationType === 'Stem Cell Donation' && hospital.donationType !== 'Stem Cell Donation' && hospital.donationType !== 'Both')) {
    return next(new ErrorHandler(`The selected hospital does not support ${donationType}`, 400));
  }

  // Find availability for the given date
  const availability = hospital.availability.find(
    (avail) => new Date(avail.date).toISOString().split('T')[0] === date
  );

  if (!availability) {
    return next(new ErrorHandler('No availability on the selected date', 400));
  }

  // Check if the selected time slot is available
  const slot = availability.slots.find((slot) => slot.time === time && slot.isAvailable);
  if (!slot) {
    return next(new ErrorHandler('The selected time slot is not available', 400));
  }

  // Find the user and check role
  const user = await User.findById(userId);
  if (!user || user.role !== 'donor') {
    return next(new ErrorHandler('Only donors can book appointments', 403));
  }

  //RECENTLY ADDED
  // ❗ Check eligibility based on donor's past confirmed appointments
  const pastAppointments = await Appointment.find({
    donor: userId,
    status: 'Confirmed',
    donationType: donationType,
    appointmentDate: { $lt: today } // Only past confirmed appointments
  }).sort({ appointmentDate: -1 }); // latest first

  if (pastAppointments.length > 0) {
    const latestAppointment = pastAppointments[0];
    const monthsToAdd = donationType === "Blood Donation" ? 3 : 6; // 3 months for blood, 6 months for stem cell
    const nextEligibleDate = getNextEligibleDate(latestAppointment.appointmentDate, monthsToAdd);

    if (new Date(date) < nextEligibleDate) {
      return next(
        new ErrorHandler(`You cannot book ${donationType} Appointment before ${nextEligibleDate.toLocaleDateString('en-US')}`, 400)
      );
    }
  }

  // Prevent duplicate appointments
  const existingAppointment = await Appointment.findOne({
    donor: userId,
    //donationType,
    // status: { $in: ['Pending', 'Accepted'] },
    status: { $in: ['Confirmed'] },

    appointmentDate: { $gte: today }, //RECENTLY ADDED

  });

  if (existingAppointment) {
    return next(
      // new ErrorHandler(`You already have a pending ${donationType} appointment`, 400)
      new ErrorHandler(`You already have a confirmed ${donationType} appointment`, 400)
    );
  }

  // Create the appointment with eligibilityStatus and donationType
  const appointment = await Appointment.create({
    donor: userId,
    hospital: hospitalId,
    hospitalName: hospital.user.name, // Hospital ka naam store kar diya
    donationType,
    appointmentDate: date,
    appointmentTime: time,
    eligibilityStatus, // eligibilityStatus ko bhi store kar diya
    // status: 'Pending',
    status: 'Confirmed',
  });

  // 🌟 **Donation Creation after Appointment Booking**
  const donationPhase = donationType === 'Stem Cell Donation (For HLA Test)' ? 'HLA Testing' : null;

  console.log("Hospital Name:", hospital.name);


  const donation = await Donation.create({
    donor: userId,
    hospital: hospitalId,
    // hospitalName: hospital.user.name,
    hospitalName: hospital.user?.name || hospital.name || "Unknown Hospital",
    // donationType: donationType === 'Stem Cell Donation (For HLA Test)' ? 'Stem Cell' : donationType,
    donationType: donationType === "Blood" ? "Blood Donation" : 
                 donationType === "Stem Cell Donation (For HLA Test)" ? "Stem Cell" : 
                 donationType, 
    phase: donationPhase,
    status: 'Pending',
    appointment: appointment._id, // Link to the appointment
  });


  // Mark slot as unavailable
  slot.isAvailable = false;
  await hospital.save();

   //Add the appointment reference to the user's appointments array
  await User.findByIdAndUpdate(
    userId,
    { $push: { appointments: appointment._id } },
    { new: true, useFindAndModify: false }
  );

  // Add the appointment reference to the hospital's appointments array
  await Hospital.findByIdAndUpdate(
    hospitalId,
    { $push: { appointments: appointment._id } },
    { new: true, useFindAndModify: false }
  );

  // Add the donation reference to the hospital's donations array
  await Hospital.findByIdAndUpdate(
    hospital._id,
    { $push: { donations: donation._id } },
    { new: true, useFindAndModify: false }
  );

  // Add the donation reference to the user's donations array
  await User.findByIdAndUpdate(
    userId,
    { $push: { donations: donation._id } },
    { new: true, useFindAndModify: false }
  );

  res.status(201).json({
    success: true,
    message: `${donationType} appointment booked successfully and donation record created`,
    appointment,
    donation,
  });
});







// Book Stem cell donation appointment for HLA Test(not required now)
exports.bookStemCellAppointmentForHLA = catchAsyncErrors(async (req, res, next) => {
  console.log('Inside bookStemCellAppointmentForHLA Controller');
  const { date, time, hospitalId } = req.body;
  const donorId = req.user.id;

  // Ensure the hospital exists
  const hospital = await Hospital.findById(hospitalId);
  console.log('Hospital Object:', hospital);
  if (!hospital) {
    return next(new ErrorHandler('The selected hospital does not exist', 404));
  }

  // Ensure the hospital supports stem cell donations
  if (hospital.donationType !== 'Stem Cell Donation' && hospital.donationType !== 'Both') {
    return next(new ErrorHandler('The selected hospital does not support stem cell donations', 400));
  }

  // Ensure the donor exists and their role is donor
  const donor = await User.findById(donorId);
  if (!donor || donor.role !== 'donor') {
    return next(new ErrorHandler('Only donors can book appointment for HLA test', 403));
  }

  // Check if the donor already has a pending or accepted HLA testing appointment
  const existingAppointment = await Appointment.findOne({
    donor: donorId,
    donationType: 'Stem Cell Donation',
    // status: { $in: ['Pending', 'Accepted'] },
    status: { $in: ['Confirmed'] },
  });

  if (existingAppointment) {
    return next(
      // new ErrorHandler('You already have a pending or accepted HLA test appointment', 400)
      new ErrorHandler('You already have a Confirmed HLA test appointment', 400)
    );
  }
  

  // Find availability for the given date
  const availability = hospital.availability.find(
    (avail) => new Date(avail.date).toISOString().split('T')[0] === date
  );

  console.log('Matched Availability:', availability);


  if (!availability) {
    return next(new ErrorHandler('No availability on the selected date', 400));
  }

  // Check if the selected time slot is available
  const slot = availability.slots.find((slot) => slot.time === time && slot.isAvailable);
  if (!slot) {
    return next(new ErrorHandler('The selected time slot is not available', 400));
  }

  // Create the HLA testing appointment
  const appointment = await Appointment.create({
    donor: donorId,
    hospital: hospitalId,
    donationType: 'Stem Cell Donation',
    appointmentDate: date,
    appointmentTime: time,
    // status: 'Pending'
    status: 'Confirmed'
  });

  // Mark the slot as unavailable
  slot.isAvailable = false;
  await hospital.save();

  res.status(201).json({
    success: true,
    message: 'Stem cell appointment for HLA test booked successfully',
    appointment,
  });
});




// View HLA Status for a Donor
exports.viewHLAStatus = catchAsyncErrors(async (req, res, next) => {
  const donorId = req.user.id; // Authenticated donor's ID

  // Ensure the authenticated user is a donor
  const donor = await User.findById(donorId);
  if (!donor || donor.role !== 'donor') {
    return next(new ErrorHandler('Only authenticated donors can access this resource', 403));
  }

  // Find all donations related to the donor with HLA results and populate hospital details
  const donations = await Donation.find({
    donor: donorId,
    hlaMatchStatus: { $ne: 'Pending' }, // Exclude pending HLA results
  })
    .populate({
      path: 'hospital',
      select: 'user', // Fetch only user reference from Hospital model
      populate: { path: 'user', select: 'name address' }, // Get name & address from User model
    })
    .sort({ 'hlaMatchInfo.HLAResultDate': -1 }); // Sort by latest HLA result

  if (!donations.length) {
    return res.status(404).json({
      success: false,
      message: 'No HLA test records found for this donor.',
    });
  }

  // Prepare response
  const hlaTests = donations.map((donation) => ({
    _id: donation._id,
    testDate: donation.hlaMatchInfo?.HLAResultDate || 'No Date Available',
    hospitalId: donation.hospital?.id || 'Unknown Hospital ID', // Directly from Donation model
    hospitalName: donation.hospital?.user?.name || 'Unknown Hospital', // From User model
    hospitalAddress: donation.hospital?.user?.address || 'Unknown Address', // From User model
    result: donation.hlaMatchStatus || 'Unknown Status', // "Matched" or "Mismatched"
    patientName: donation.hlaMatchStatus === 'Matched' ? donation.hlaMatchInfo?.patientDetails?.patientName : null,
  }));

  res.status(200).json({
    success: true,
    message: 'HLA test records retrieved successfully.',
    hlaTests,
  });
});




// Book Stem Cell Donation Appointment
exports.bookStemCellDonationAppointment = catchAsyncErrors(async (req, res, next) => {
  const { date, time, hospitalId, donationType , eligibilityStatus} = req.body;
  const userId = req.user.id;

  // Check if the hospital exists
  const hospital = await Hospital.findById(hospitalId).populate('user', 'name');
  if (!hospital) {
    return next(new ErrorHandler('The selected hospital does not exist', 404));
  }

  // Ensure the hospital supports the selected donation type
  if (
    (donationType === 'Stem Cell Donation' && hospital.donationType !== 'Stem Cell Donation' && hospital.donationType !== 'Both') ||
    (donationType === 'Blood Donation' && hospital.donationType !== 'Blood Donation' && hospital.donationType !== 'Both')
  ) {
    return next(new ErrorHandler(`The selected hospital does not support ${donationType}`, 400));
  }

  // Find availability for the given date
  const availability = hospital.availability.find(
    (avail) => new Date(avail.date).toISOString().split('T')[0] === date
  );

  if (!availability) {
    return next(new ErrorHandler('No availability on the selected date', 400));
  }

  // Check if the selected time slot is available
  const slot = availability.slots.find((slot) => slot.time === time && slot.isAvailable);
  if (!slot) {
    return next(new ErrorHandler('The selected time slot is not available', 400));
  }

  // Find the user and check role
  const user = await User.findById(userId);
  if (!user || user.role !== 'donor') {
    return next(new ErrorHandler('Only donors can book appointments', 403));
  }

  // Check if donor has a matched HLA test result for stem cell donation
  if (donationType === 'Stem Cell Donation') {
    const hlaTestCompleted = await Donation.findOne({
      donor: userId,
      donationType: 'Stem Cell',
      hlaMatchStatus: 'Matched',
    });

    if (!hlaTestCompleted) {
      return next(new ErrorHandler(
        'You can only book an appointment after HLA testing has resulted in a match with a patient',
        400
      ));
    }
  }

  // Prevent duplicate appointments
  const existingAppointment = await Appointment.findOne({
    donor: userId,
    donationType,
    status: { $in: ['Confirmed'] },
  });

  if (existingAppointment) {
    return next(new ErrorHandler(`You already have a confirmed ${donationType} appointment`, 400));
  }

  // Create the appointment
  const appointment = await Appointment.create({
    donor: userId,
    hospital: hospitalId,
    hospitalName: hospital.user.name,
    donationType,
    eligibilityStatus,
    appointmentDate: date,
    appointmentTime: time,
    status: 'Confirmed',
  });

  // Create a related donation record
  const donation = await Donation.create({
    donor: userId,
    hospital: hospitalId,
    hospitalName: hospital.user.name,
    donationType: donationType === 'Stem Cell Donation' ? 'Stem Cell' : 'Blood',
    phase: donationType,
    status: 'Pending',
    appointment: appointment._id,
  });

  // Mark slot as unavailable
  slot.isAvailable = false;
  await hospital.save();

  // Add references to user and hospital
  await User.findByIdAndUpdate(
    userId,
    { $push: { appointments: appointment._id, donations: donation._id } },
    { new: true, useFindAndModify: false }
  );

  await Hospital.findByIdAndUpdate(
    hospitalId,
    { $push: { appointments: appointment._id, donations: donation._id } },
    { new: true, useFindAndModify: false }
  );

  res.status(201).json({
    success: true,
    message: `${donationType} appointment booked successfully and donation record created`,
    appointment,
    donation,
  });
});




//Cancel Appointment
const convertTo24HourTime = (time) => {
  const [hourMinute, modifier] = time.split(" ");
  let [hours, minutes] = hourMinute.split(":");
  if (modifier === "PM" && hours !== "12") {
    hours = parseInt(hours, 10) + 12;
  } else if (modifier === "AM" && hours === "12") {
    hours = "00";
  }
  return `${hours}:${minutes}`;
};

exports.cancelAppointment = catchAsyncErrors(async (req, res, next) => {
  const { appointmentId } = req.params;
  const userId = req.user.id;
  //const { cancellationReason } = req.body; // Reason for cancellation

  // Find the confirmed appointment
  const appointment = await Appointment.findOne({
    _id: appointmentId,
    donor: userId,
    status: "Confirmed",
  });

  if (!appointment) {
    return next(new ErrorHandler("No confirmed appointment found", 404));
  }

  //console.log("Appointment Object:", appointment);
  console.log("Cancelling appointment:", appointment);

  // Convert appointmentTime to 24-hour format
  const formattedTime = convertTo24HourTime(appointment.appointmentTime);
  console.log("Converted Time:", formattedTime);

  // Combine date and time into a Date object
  const appointmentDateTime = new Date(
    appointment.appointmentDate.getFullYear(),
    appointment.appointmentDate.getMonth(),
    appointment.appointmentDate.getDate(),
    parseInt(formattedTime.split(":" )[0], 10),
    parseInt(formattedTime.split(":" )[1], 10)
  );

  if (isNaN(appointmentDateTime.getTime())) {
    return next(new ErrorHandler("Invalid appointment date or time", 400));
  }

  console.log("Parsed Appointment DateTime:", appointmentDateTime);

  const currentTime = new Date();
  const timeDifference =
    (appointmentDateTime - currentTime) / (1000 * 60 * 60);

  console.log("Time Difference (hours):", timeDifference);

  if (timeDifference < 12) {
    return next(
      new ErrorHandler(
        "Appointments can only be cancelled at least 12 hours before the scheduled time",
        400
      )
    );
  }

  // Find the hospital
  const hospital = await Hospital.findById(appointment.hospital);
  if (!hospital) {
    return next(new ErrorHandler("Hospital not found", 404));
  }

  // Find matching availability date
  const slotDate = appointment.appointmentDate.toISOString().split("T")[0];
  console.log("Slot Date to Match:", slotDate);
  console.log("Hospital Availability Dates:", hospital.availability.map(a => a.date));

  const availabilityIndex = hospital.availability.findIndex(
    (availability) => availability.date === slotDate
  );

  if (availabilityIndex !== -1) {
    let availableDay = hospital.availability[availabilityIndex];
    console.log("Matched Availability Object:", availableDay);

    if (availableDay.slots && availableDay.slots.length > 0) {
      const slotToUpdate = availableDay.slots.find(slot => slot.isAvailable === false);

      if (slotToUpdate) {
        slotToUpdate.isAvailable = true;
        await hospital.save();
        console.log("Updated hospital slots:", hospital.availability);
      } else {
        return res.status(200).json({
          success: false,
          message: "No unavailable slot found to free up.",
        });
      }
    }
  } else {
    return res.status(200).json({
      success: false,
      message: "No matching availability date was found.",
    });
  }

  // Update appointment status instead of deleting it
  appointment.status = "Cancelled";
  //appointment.cancellationReason = cancellationReason || "Not specified";
  await appointment.save();

  // Also update the status of the related donation (RECENTLY ADDED)
await Donation.findOneAndUpdate(
  { appointment: appointment._id },
  { status: "Cancelled" }
);


  res.status(200).json({
    success: true,
    message: "Appointment cancelled successfully and slot freed.",
  });
});




// Fetch All Blood Drives with Full Details
exports.getAllBloodDrives = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (user.role !== "donor") {
    return next(new ErrorHandler("Only donors can view blood drives", 403));
  }

  // const bloodDrives = await BloodDrive.find()
  //   .populate("hospital", "name address"); // Populate name and address from the Hospital document
  const bloodDrives = await BloodDrive.find()
  .populate({
    path: 'hospital',
    populate: {
      path: 'user', // Hospital ke andar user ka reference populate kar raha hai
      select: 'name address' // Sirf name aur address chahiye
    }
  });

  if (!bloodDrives || bloodDrives.length === 0) {
    return next(new ErrorHandler("No blood drives found", 404));
  }

  // // ✅ Filter only upcoming drives with available capacity
  // const today = new Date();

  // const availableDrives = bloodDrives.filter((drive) => {
  //   const endDate = new Date(drive.endDate);
  //   const currentVolunteers = drive.volunteers?.length || 0;

  //   return endDate >= today && currentVolunteers < drive.volunteerCapacity;
  // });


  //RECENTLY ADDED
  const today = new Date();

  const availableDrives = bloodDrives.map((drive) => {
    const endDate = new Date(drive.endDate);
    const startDate = new Date(drive.startDate);

    if (endDate < today) return null;

    // 🗓 Generate all dates in the range
    const dates = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const currentDate = new Date(d);
      const volunteersOnThisDate = drive.registeredVolunteers.filter(v => 
        new Date(v.date).toDateString() === currentDate.toDateString()
      ).length;

      if (volunteersOnThisDate < drive.volunteerCapacity) {
        dates.push(new Date(currentDate)); // Add available date
      }
    }

    if (dates.length === 0) return null; // No available dates left

    return {
      _id: drive._id,
      driveName: drive.driveName,
      location: drive.location,
      description: drive.description,
      startDate: drive.startDate,
      endDate: drive.endDate,
      volunteerCapacity: drive.volunteerCapacity,
      hospital: drive.hospital,
      availableDates: dates // 🎯 Send only the available dates
    };
  }).filter(drive => drive !== null); // Remove null drives

  res.status(200).json({
    success: true,
    //bloodDrives,
    bloodDrives: availableDrives,
  });
});




// Apply as Volunteer
exports.applyAsVolunteer = catchAsyncErrors(async (req, res, next) => {
  const { reasonForApplying, experience, volunteerRole, availability, driveId } = req.body;

  // Get the authenticated user's ID from the token (assumes user ID is in req.user.id)
  const userId = req.user.id;

  // Find the user in the database
  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  // Check if the user is a donor
  if (user.role !== 'donor') {
    return next(new ErrorHandler('Only donors can apply as volunteers', 403));
  }

  // Check if the user has already applied for this drive
  const existingApplication = user.volunteerApplications.find((application) => {
    return application.drive && driveId && application.drive.toString() === driveId.toString();
  });

  if (existingApplication) {
    return next(new ErrorHandler('You have already applied for this drive', 400));
  }

  // Ensure availability is provided
  if (!availability) {
    return next(new ErrorHandler('Please specify your availability for the drive', 400));
  }

  // Ensure the availability is a valid date
  if (isNaN(new Date(availability))) {
    return next(new ErrorHandler('Invalid availability date provided', 400));
  }

  // Find the drive to check its details
  const bloodDrive = await BloodDrive.findById(driveId);

  if (!bloodDrive) {
    return next(new ErrorHandler('Blood drive not found', 404));
  }

   // Check if the donor has already registered in any other hospital's drive
   const existingVolunteer = await BloodDrive.findOne({
    'registeredVolunteers.donor': userId,
    hospital: { $ne: bloodDrive.hospital }, // Exclude the same hospital
  });

  if (existingVolunteer) {
    return next(new ErrorHandler('You cannot apply as a volunteer for multiple hospitals at the same time.', 400));
  }


  // Validate that the availability date is within the drive's duration
  if (new Date(availability) < new Date(bloodDrive.startDate) || new Date(availability) > new Date(bloodDrive.endDate)) {
    return next(new ErrorHandler('Availability date must be within the drive duration', 400));
  }

  // Count volunteers already registered for the specified date
  const volunteersOnDate = bloodDrive.registeredVolunteers.filter(
    (volunteer) => new Date(volunteer.date).toDateString() === new Date(availability).toDateString()
  );
  

  if (volunteersOnDate.length >= bloodDrive.volunteerCapacity) {
    return next(new ErrorHandler('Volunteer capacity for the selected date is full', 400));
  }


  // Add the new application to the user's volunteerApplications array
  user.volunteerApplications.push({
    status: 'pending',
    applicationDate: Date.now(),
    availability,
    experience,
    volunteerRole,
    reasonForApplying,
    drive: driveId,
  });

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: 'Volunteer application submitted successfully',
    volunteerApplications: user.volunteerApplications,
  });
});




