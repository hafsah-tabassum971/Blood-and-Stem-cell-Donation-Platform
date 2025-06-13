const User = require('../models/userModel');
const Hospital = require('../models/hospitalModel');
const Appointment = require('../models/appointmentModel');
const Donation = require('../models/donationModel');
const BloodDrive = require('../models/bloodDriveModel');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const crypto = require('crypto');


// Register Hospital
exports.registerHospital = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, confirmPassword, address, contactNumber, donationType, hospitalType, operationalHours } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If email exists, return a response indicating it's already registered
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Create a new User with 'hospital' role
    const user = await User.create({
      name,
      email,
      password,
      confirmPassword,
      address,
      contactNumber,
      role: 'hospital' // Set the role to hospital
    });

    // Create a hospital record and link it to the user
    const hospital = await Hospital.create({
      user: user._id, // Link the hospital with the user model
      donationType,
      operationalHours,
      hospitalType
    });

    // Send token or other response after successful registration
    sendToken(user, 201, res);
  } catch (error) {
    // Handle any other errors
    return next(error);
  }
});



  // Login Hospital
exports.loginHospital = catchAsyncErrors(async (req, res, next) => {

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
  if (user.role !== "hospital") {
    return next(new ErrorHandler("Invalid role. You are not registered as a hospital.", 403));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user,200,res);
});



// Logout Hospital
exports.logoutHospital = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});



// Forgot Password for Hospital
exports.forgotHospitalPassword = catchAsyncErrors(async (req, res, next) => {
  // Find hospital by email (via user reference)
  const hospitalUser = await User.findOne({ email: req.body.email, role: 'hospital' });

  if (!hospitalUser) {
      return next(new ErrorHandler("Hospital not found", 404));
  }

  // Generate reset password token
  const resetToken = hospitalUser.getResetPasswordToken();

  // Save the token and expiry time in the user document
  await hospitalUser.save({ validateBeforeSave: false });

  // Construct reset password URL
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/hospital/reset-password/${resetToken}`;

  // Email message
  const message = `Your password reset token is: \n\n ${resetPasswordUrl} \n\n If you did not request this, please ignore it.`;

  try {
      await sendMail({
          email: hospitalUser.email,
          subject: "Hospital Password Recovery",
          message,
      });

      res.status(200).json({
          success: true,
          message: `Email sent to ${hospitalUser.email} successfully`,
      });
  } catch (error) {
      hospitalUser.resetPasswordToken = undefined;
      hospitalUser.resetPasswordExpire = undefined;
      await hospitalUser.save({ validateBeforeSave: false });

      return next(new ErrorHandler(error.message, 500));
  }
});



// Reset Password for Hospital
exports.resetHospitalPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  console.log("Hashed Token:", resetPasswordToken);

  // Query the User model directly
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
    role: "hospital", // Ensure it’s for a hospital
  });

  if (!user) {
    console.log("No user found. Please verify the token and expiration.");
    return next(new ErrorHandler("Reset Password Token is invalid or has expired.", 400));
  }

  console.log("User Found:", user);

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match.", 400));
  }

  // Update the password and clear reset token fields
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: false });

  // Optional: If you need the hospital reference, fetch it using the user's ID
  const hospital = await Hospital.findOne({ user: user._id });
  console.log("Associated Hospital:", hospital);

  sendToken(user, 200, res);
});




// Get Hospital Profile Information
exports.getHospitalInfo = catchAsyncErrors(async (req, res, next) => {
  const hospital = await Hospital.findOne({ user: req.user._id })
  // .populate("user", "name address contactNumber"); // Populate with user details
  .populate("user"); // Populate with user details

  if (!hospital) {
    return next(new ErrorHandler("Hospital not found", 404));
  }

  res.status(200).json({
    success: true,
    hospital,
  });
});



// Update Hospital Profile Information
exports.updateHospitalInfo = catchAsyncErrors(async (req, res, next) => {
  const { address, contactNumber } = req.body;

  // Find the hospital associated with the logged-in user
  const hospital = await Hospital.findOne({ user: req.user._id }).populate("user");

  if (!hospital) {
    return next(new ErrorHandler("Hospital not found", 404));
  }

  // Update user details
  const user = hospital.user;
  if (address) user.address = address;
  if (contactNumber) user.contactNumber = contactNumber;

  await user.save({ validateBeforeSave: false }); // Save the updated user details

  res.status(200).json({
    success: true,
    message: "Hospital information updated successfully",
    hospital, // Return the hospital info with the updated user details
  });
});




// Hospital Change Password
exports.changeHospitalPassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  // Validate input
  if (!currentPassword || !newPassword || !confirmPassword) {
      return next(new ErrorHandler("Please provide all the required fields", 400));
  }

  // Fetch hospital user
  const hospital = await User.findById(req.user.id).select("+password");
  if (!hospital || hospital.role !== "hospital") {
      return next(new ErrorHandler("Hospital not found or unauthorized", 404));
  }

  // Validate current password
  const isPasswordMatched = await hospital.comparePassword(currentPassword);
  if (!isPasswordMatched) {
      return next(new ErrorHandler("Current password is incorrect", 400));
  }

  // Validate new password match
  if (newPassword !== confirmPassword) {
      return next(new ErrorHandler("New Passwords do not match", 400));
  }

  // Update password
  hospital.password = newPassword;
  //hospital.confirmPassword = confirmPassword;
  await hospital.save();

  // Success response
  res.status(200).json({
      success: true,
      message: "Password updated successfully for the hospital",
  });
});



// Get all appointments for a specific hospital
exports.getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const hospital = await Hospital.findOne({ user: req.user.id });

  if (!hospital) {
    return next(new ErrorHandler('Hospital not found', 404));
  }

  // Fetch appointments for this hospital
  const appointments = await Appointment.find({ hospital: hospital._id })
    .populate('donor', 'name email') // Populate donor details (name, email)
    .select('-hospital'); // Optionally exclude the hospital field

  if (!appointments || appointments.length === 0) {
    return next(new ErrorHandler('No appointments found for this hospital', 404));
  }

  res.status(200).json({
    success: true,
    count: appointments.length,
    appointments,
  });
});




// get all donations
exports.getAllDonations = catchAsyncErrors(async (req, res, next) => {
  const hospital = await Hospital.findOne({ user: req.user.id });

  if (!hospital) {
    return next(new ErrorHandler('Hospital not found', 404));
  }

  // Fetch appointments for this hospital
  const donations = await Donation.find({ hospital: hospital._id })
    .populate('donor', 'name email') // Populate donor details (name, email)
    .select('-hospital'); // Optionally exclude the hospital field

  if (!donations || donations.length === 0) {
    return next(new ErrorHandler('No appointments found for this hospital', 404));
  }

  res.status(200).json({
    success: true,
    count: donations.length,
    donations,
  });
});





//get hospital donors 
exports.getHospitalDonors = catchAsyncErrors(async (req, res, next) => {
  // const { hospitalId } = req.params;
  const hospital = await Hospital.findOne({ user: req.user.id });
  

  // if (!hospitalId) {
  //   return next(new ErrorHandler('Hospital ID is required', 400));
  // }

  // // Fetch appointments for the specific hospital and populate donor details
  // const appointments = await Appointment.find({ hospital: hospitalId })
  //   .populate('donor', 'name gender dateOfBirth email phone address isVolunteer') // Populate donor details
  //   .exec();

  if (!hospital) {
    return next(new ErrorHandler('Hospital not found', 404));
  }

  // Fetch appointments for this hospital
  const appointments = await Appointment.find({ hospital: hospital._id })
  .populate('donor', 'name gender dateOfBirth email contactNumber address isVolunteer') // Populate donor details
  .exec();

  if (!appointments || appointments.length === 0) {
    return next(new ErrorHandler('No appointments found for this hospital and thus no donors are linked to that hospital', 404));
  }

  // Extract donors, excluding null donors and removing duplicates
  let donors = appointments
    .filter((appointment) => appointment.donor) // Filter out appointments with no donor
    .map((appointment) => appointment.donor);

  // Remove duplicates by donor ID
  donors = [...new Map(donors.map((donor) => [donor._id.toString(), donor])).values()];

  res.status(200).json({
    success: true,
    count: donors.length,
    donors,
  });
});


//get all volunteers
exports.getAllVolunteers = catchAsyncErrors(async (req, res, next) => {
  const hospital = await Hospital.findOne({ user: req.user.id });

  if (!hospital) {
    return next(new ErrorHandler('Hospital not found', 404));
  }

  // Fetch volunteers only
  const volunteers = await Appointment.find({ hospital: hospital._id })
    .populate({
      path: 'donor',
      select: 'name email contactNumber isVolunteer volunteerApplications',
    })
    .exec();

  if (!volunteers || volunteers.length === 0) {
    return next(new ErrorHandler('No volunteers found for this hospital', 404));
  }

  // Extract required volunteer details
  const filteredVolunteers = volunteers
    .filter((appointment) => appointment.donor && appointment.donor.isVolunteer)
    .map((appointment) => {
      const donor = appointment.donor;
      const latestApplication = donor.volunteerApplications?.length
        ? donor.volunteerApplications[donor.volunteerApplications.length - 1]
        : {};

      return {
        _id: donor._id,
        name: donor.name,
        email: donor.email,
        contactNumber: donor.contactNumber,
        availability: latestApplication.availability || 'N/A',
        volunteerRole: latestApplication.volunteerRole || 'N/A',
        experience: latestApplication.experience || 'N/A',
      };
    });

  // Remove duplicate volunteers based on their ID
  const uniqueVolunteers = [...new Map(filteredVolunteers.map((v) => [v._id.toString(), v])).values()];

  res.status(200).json({
    success: true,
    count: uniqueVolunteers.length,
    volunteers: uniqueVolunteers,
  });
});




// Helper function to format time
const formatTime12Hour = (totalMinutes) => {
  const hours24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12; // Convert 0 hour to 12
  return `${hours12}:${minutes === 0 ? "00" : minutes} ${period}`;
};

// Helper function to generate slots
const generateSlots = (openingTime, closingTime, slotDuration, isClosed = false) => {
  if (isClosed) {
    return [{ time: "N/A", isAvailable: false }];
  }


  try {
    const parseTime = (time) => {
      const [hour, minute] = time.split(/[: ]/).map(Number);
      const isPM = time.includes("PM");
      return { hour: isPM && hour < 12 ? hour + 12 : hour % 12, minute };
    };

    const { hour: openHour, minute: openMinute } = parseTime(openingTime);
    const { hour: closeHour, minute: closeMinute } = parseTime(closingTime);

    let currentTime = openHour * 60 + openMinute; // Convert to total minutes
    const endTime = closeHour * 60 + closeMinute;

    const slots = [];
    while (currentTime < endTime) {
      slots.push({
        time: formatTime12Hour(currentTime), // Use 12-hour format with AM/PM
        isAvailable: true,
      });
      currentTime += slotDuration;
    }

    return slots;
  } catch (error) {
    console.error("Error generating slots:", error);
    return [];
  }
};

const generateYearlySlots = (operationalHours, slotDuration, operationalDays, year) => {
  if (!operationalHours || !slotDuration || !operationalDays || !year) {
    throw new Error("Missing required parameters for yearly slot generation.");
  }

  const { openingTime, closingTime } = operationalHours;
  const yearlySlots = [];
  //const today = new Date().toISOString().split("T")[0];


  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Month ke valid days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      if (isNaN(date)) continue;

      //Correct calculation of Day of week 
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });

      console.log(`Checking date: ${date.toISOString().split("T")[0]} - Day: ${dayOfWeek}`); // Debugging

      if (!operationalDays.includes(dayOfWeek)) {
        console.log(`Skipping: ${dayOfWeek} (Hospital Closed)`);
        continue;
      }

      const slots = generateSlots(openingTime, closingTime, slotDuration, false);
      yearlySlots.push({ date: date.toISOString().split("T")[0], slots });
    }
  }

  return yearlySlots;
};

//RECENTLY ADDED
const generateMonthSlots = (month, year, operationalHours, slotDuration, operationalDays) => {
  const { openingTime, closingTime } = operationalHours;
  const slotsArray = [];

  const daysInMonth = new Date(year, month, 0).getDate(); // month is 1-based
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" , timeZone: "UTC"});
    if (!operationalDays.includes(dayOfWeek)) continue;

    const slots = generateSlots(openingTime, closingTime, slotDuration, false);
    slotsArray.push({ date: date.toISOString().split("T")[0], slots });
  }

  return slotsArray;
};


const generateWeekSlots = (startDate, operationalHours, slotDuration, operationalDays) => {
  const { openingTime, closingTime } = operationalHours;
  const weekSlots = [];
  let start = new Date(startDate);
  let addedDays = 0;

  while (addedDays < operationalDays.length) { // bas jitne operational days hain utne din add karne hain
    const dayOfWeek = start.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });

    if (operationalDays.includes(dayOfWeek)) {
      const slots = generateSlots(openingTime, closingTime, slotDuration, false);
      weekSlots.push({ date: start.toISOString().split("T")[0], slots });
      addedDays++;
    }

    start.setDate(start.getDate() + 1); // agla din check karo
  }

  return weekSlots;
};




//Add Slots Controller(RECENTLY ADDED)
exports.addSlots = catchAsyncErrors(async (req, res, next) => {
  const { date, yearWide, year, weekWide, monthWide, month, startDate } = req.body;

  const hospital = await Hospital.findOne({ user: req.user.id });
  if (!hospital) return next(new ErrorHandler("Hospital not found", 404));

  const { operationalHours, slotDuration = 30, operationalDays } = hospital || {};
  const { openingTime, closingTime } = operationalHours || {};

  if (weekWide) {
    if (!startDate) return next(new ErrorHandler("Start date required for weekly slot generation", 400));

    const weekDates = [];
    const start = new Date(startDate);
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      weekDates.push(d.toISOString().split("T")[0]);
    }

    const existing = weekDates.some(d => hospital.availability.some(a => a.date === d));
    if (existing) return next(new ErrorHandler("Slots for one or more days of the week already exist.", 400));

    const weekSlots = generateWeekSlots(startDate, operationalHours, slotDuration, operationalDays);
    hospital.availability.push(...weekSlots);

  } else if (monthWide) {
    if (!month || !year) return next(new ErrorHandler("Month and year required for monthly generation", 400));
    const prefix = `${year}-${String(month).padStart(2, "0")}`;
    const existing = hospital.availability.some(a => a.date.startsWith(prefix));
    if (existing) return next(new ErrorHandler("Slots for this month already exist.", 400));

    const monthSlots = generateMonthSlots(month, year, operationalHours, slotDuration, operationalDays);
    hospital.availability.push(...monthSlots);

  } else if (yearWide) {
    const selectedYear = year || new Date().getFullYear();
    const existing = hospital.availability.some(a => a.date.startsWith(`${selectedYear}-`));
    if (existing) return next(new ErrorHandler("Slots for this year already exist.", 400));

    const yearlySlots = generateYearlySlots(operationalHours, slotDuration, operationalDays, selectedYear);
    hospital.availability.push(...yearlySlots);

  } else {
    // Single date
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return next(new ErrorHandler("Invalid date provided", 400));
    if (parsedDate < new Date()) return next(new ErrorHandler("Cannot add slots for past dates", 400));

    const dateStr = parsedDate.toISOString().split("T")[0];
    const alreadyExists = hospital.availability.some(a => a.date === dateStr);
    if (alreadyExists) return next(new ErrorHandler("Slots already exist for this date.", 400));

    const dayOfWeek = parsedDate.toLocaleString("en-US", { weekday: "long" });
    if (!operationalDays.includes(dayOfWeek)) {
      return next(new ErrorHandler("Hospital is closed on the selected day", 400));
    }

    const slots = generateSlots(openingTime, closingTime, slotDuration, false);
    hospital.availability.push({ date: dateStr, slots });
  }

  await hospital.save();

  res.status(200).json({
    success: true,
    message: "Slots generated successfully",
    hospital,
  });
});



//get donors having donation with pending status of HLA result
exports.getDonorsWithHLATestingDonations = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;
  //console.log("User (Hospital) ID: ", userId);

  // Find the hospital associated with the logged-in user
  const hospital = await Hospital.findOne({ user: userId });
  
  if (!hospital) {
    return next(new ErrorHandler('Hospital profile not found for this user', 404));
  }

  //console.log("Actual Hospital ID: ", hospital._id);

  // Now, use the correct hospital ID to fetch pending donations
  const pendingDonations = await Donation.find({
    hospital: hospital._id, // Use the correct hospital ID
    donationType: 'Stem Cell',
    phase: 'HLA Testing',
    hlaMatchStatus: 'Pending',
  }).populate('donor', 'name'); // Only populate donor's name and ID

  if (!pendingDonations || pendingDonations.length === 0) {
    return next(new ErrorHandler('No pending HLA testing donations found', 404));
  }

  // Extract donor IDs and names
  const donors = pendingDonations.map((donation) => ({
    id: donation.donor._id,
    name: donation.donor.name,
  }));

  res.status(200).json({
    success: true,
    message: 'Pending HLA testing donors retrieved successfully',
    data: donors,
  });
});




// upload HLA result
exports.uploadHLAresult = catchAsyncErrors(async (req, res, next) => {
  const { donorId, matchedPatientInfo, result } = req.body;

  const hlaMatchStatus = result;

  // Validate required request data
  if (!donorId || !matchedPatientInfo || !result || !matchedPatientInfo.patientId || !matchedPatientInfo.patientName) {
    return next(new ErrorHandler('Invalid request data', 400));
  }

  const userId = req.user.id; // Get user ID (hospital user ID)
  //console.log("Hospital User ID: ", userId);

  // Find the actual Hospital ID
  const hospital = await Hospital.findOne({ user: userId });

  if (!hospital) {
    return next(new ErrorHandler('Hospital profile not found for this user', 404));
  }

  //console.log("Actual Hospital ID: ", hospital._id);

  // Ensure the hospital is authorized for HLA results
  if (hospital.donationType && !hospital.donationType.includes('Stem Cell') && !hospital.donationType.includes('Both')) {
    return next(new ErrorHandler('This hospital is not authorized to upload HLA results for stem cell donations', 403));
  }

  // Validate donor
  const donor = await User.findById(donorId);
  if (!donor || donor.role !== 'donor') {
    return next(new ErrorHandler('Donor not found or invalid', 404));
  }

  // Find the pending donation for HLA testing using actual Hospital ID
  const donation = await Donation.findOne({
    donor: donorId,
    hospital: hospital._id, // Use actual Hospital ID
    phase: 'HLA Testing',
    status: 'Pending',
  });

  if (!donation) {
    return next(new ErrorHandler('No eligible donation found for HLA matching', 404));
  }

  // Check if HLA result is already uploaded
  if (donation.hlaMatchStatus !== 'Pending' && donation.hlaMatchInfo) {
    return res.status(200).json({
      success: true,
      message: `HLA result is already uploaded with status: ${donation.hlaMatchStatus}`,
      donation,
    });
  }

  // Upload HLA result
  donation.hlaMatchStatus = hlaMatchStatus; // Matched or Mismatched
  donation.hlaMatchInfo = {
    patientDetails: {
      patientId: matchedPatientInfo.patientId,
      patientName: matchedPatientInfo.patientName,
    },
    HLAResultDate: new Date(),
  };

  // Save the updated donation
  await donation.save();

  // Send success response
  res.status(200).json({
    success: true,
    message: 'HLA result uploaded successfully',
    donation,
  });
});





// Fetch Donors with Uploaded HLA Results
exports.getDonorsWithUploadedHLAResults = catchAsyncErrors(async (req, res, next) => {
  const hospitalId = req.user.id; // Authenticated hospital's ID

  // Ensure the authenticated user is a hospital
  const hospital = await User.findById(hospitalId);
  if (!hospital || hospital.role !== 'hospital') {
    return next(new ErrorHandler('Only authenticated hospitals can access this resource', 403));
  }

  // Check if the hospital is authorized to view HLA results for stem cell donation
  if (hospital.donationType && !hospital.donationType.includes('Stem Cell') && !hospital.donationType.includes('Both')) {
    return next(new ErrorHandler('This hospital is not authorized to access HLA results for stem cell donations', 403));
  }

  // Find donations where HLA results have been uploaded for this hospital
  const donationsWithResults = await Donation.find({
    hospital: hospitalId,
    'hlaMatchStatus': { $ne: 'Pending' }, // Exclude donations where HLA match status is still pending
  })
    .populate('donor', 'name email contactNumber bloodType') // Populate donor details
    .populate('hlaMatchInfo.patientDetails', 'name'); // Optional: Populate matched patient details

  if (!donationsWithResults || donationsWithResults.length === 0) {
    return next(new ErrorHandler('No HLA results found for this hospital', 404));
  }

  // Prepare response
  const formattedResults = donationsWithResults.map((donation) => {
    const hlaResultDate = donation.hlaMatchInfo && donation.hlaMatchInfo.HLAResultDate;
    return {
      donorName: donation.donor.name,
      testDate: hlaResultDate ? hlaResultDate.toISOString().split('T')[0] : 'N/A', // Check if HLAResultDate exists
      patientName: donation.hlaMatchInfo.patientDetails ? donation.hlaMatchInfo.patientDetails.patientName : 'N/A',
      hlaMatchStatus: donation.hlaMatchStatus
    };
  });

  res.status(200).json({
    success: true,
    message: 'HLA results retrieved successfully',
    data: formattedResults,
  });
});




// Create Blood Drive
exports.createBloodDrive = catchAsyncErrors(async (req, res, next) => {
  const { driveName, location, startDate, endDate, description, volunteerCapacity } = req.body;

  if (!driveName || !location || !startDate || !endDate || !volunteerCapacity) {
    return next(new ErrorHandler("All fields are required to create a blood drive", 400));
  }

  const userId = req.user && req.user._id;
  if (!userId || req.user.role !== "hospital") {
    return next(new ErrorHandler("Only hospitals can create blood drives", 403));
  }

  // Find the associated hospital document
  const hospital = await Hospital.findOne({ user: userId });
  if (!hospital) {
    return next(new ErrorHandler("Hospital not found for the logged-in user", 404));
  }

  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start < now) {
    return next(new ErrorHandler("Start date cannot be in the past", 400));
  }

  if (start > end) {
    return next(new ErrorHandler("Start date cannot be after the end date", 400));
  }

  const bloodDrive = await BloodDrive.create({
    hospital: hospital._id, // Store the Hospital's ID, not the User's ID
    driveName,
    location,
    startDate,
    endDate,
    description,
    volunteerCapacity,
  });

  res.status(201).json({
    success: true,
    message: "Blood drive created successfully",
    bloodDrive,
  });
});





// Get Volunteer Applications
exports.getVolunteerApplications = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user && req.user._id;
  if (!userId || req.user.role !== "hospital") {
    return next(new ErrorHandler("Only hospitals can view volunteer applications", 403));
  }

  const hospital = await Hospital.findOne({ user: userId });
  if (!hospital) {
    return next(new ErrorHandler("Hospital not found for the logged-in user", 404));
  }

  const drives = await BloodDrive.find({ hospital: hospital._id });
  if (!drives || drives.length === 0) {
    return next(new ErrorHandler("No drives found for this hospital", 404));
  }

  // Extract drive IDs as strings for consistent comparison
  const driveIds = drives.map((drive) => drive._id.toString());
  //console.log("Drive IDs for the hospital:", driveIds);

  const usersWithApplications = await User.find({
    "volunteerApplications.drive": { $in: drives.map((drive) => drive._id) },
  });

  const applications = [];
  usersWithApplications.forEach((user) => {
    console.log(`Checking applications for user: ${user._id}`);
    user.volunteerApplications.forEach((application) => {
      if (!application.drive) {
        console.warn(`Application with ID ${application._id} has no drive reference.`);
        return; // Skip processing this application
      }

      // Log data types for debugging
      // console.log(`Application Drive: ${application.drive}, Type: ${typeof application.drive}`);
      // console.log(`Drive IDs: ${driveIds}, Type: ${typeof driveIds[0]}`);

      // Convert application.drive to string for comparison if necessary
      if (driveIds.includes(application.drive.toString())) {
        console.log(`Valid application found for drive: ${application.drive}`);
        applications.push({
          userId: user._id,
          userName: user.name,
          userEmail: user.email,
          userContactNumber: user.contactNumber,
          application,
        });
      } else {
        console.warn(`Invalid or mismatched drive reference: ${application.drive}`);
      }
    });
  });

  res.status(200).json({
    success: true,
    applications,
  });
});





// Accept Volunteer Application
exports.acceptVolunteerApplication = catchAsyncErrors(async (req, res, next) => {
  const { applicationId } = req.params;
  const userId = req.user && req.user._id;

  // Ensure the user is a hospital
  if (!userId || req.user.role !== "hospital") {
    return next(new ErrorHandler("Only hospitals can accept applications", 403));
  }

  const hospital = await Hospital.findOne({ user: userId });
  if (!hospital) {
    return next(new ErrorHandler("Hospital not found for the logged-in user", 404));
  }

  // Find the user who submitted the application and their application
  const user = await User.findOne({ "volunteerApplications._id": applicationId });
  if (!user) {
    return next(new ErrorHandler("Application not found", 404));
  }

  const application = user.volunteerApplications.id(applicationId);

  // Find the drive related to this application
  const drive = await BloodDrive.findById(application.drive);
  if (!drive) {
    return next(new ErrorHandler("Drive not found", 404));
  }

  // Check if the hospital is the one that created the drive
  if (!hospital._id.equals(drive.hospital)) {
    return next(new ErrorHandler("You are not authorized to manage this application", 403));
  }

  // Debugging: Log IDs being compared
  //console.log("Hospital ID:", hospital._id.toString());
  //console.log("Application Drive ID:", application.drive.toString());

  // Ensure the application is still pending
  if (application.status !== "pending") {
    return next(new ErrorHandler(`Cannot accept application. Current status: ${application.status}`, 400));
  }

  //RECENTLY ADDED
   // Confirm volunteer capacity for the selected date is not full
   const selectedDate = new Date(application.availability).toDateString();

   const volunteersOnDate = drive.registeredVolunteers.filter(
     (vol) => new Date(vol.date).toDateString() === selectedDate
   );
 
   if (volunteersOnDate.length >= drive.volunteerCapacity) {
     return next(new ErrorHandler("Volunteer capacity for this date is already full", 400));
   }
 
   // Add donor to registeredVolunteers
   drive.registeredVolunteers.push({
     donor: user._id,
     hospital: drive.hospital,
     date: application.availability,
   });
   await drive.save();

  // Update application status
  application.status = "accepted";
  user.isVolunteer = true; // Set isVolunteer to true
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Application accepted successfully",
    application,
  });
});






//Reject Volunteer Application 
exports.rejectVolunteerApplication = catchAsyncErrors(async (req, res, next) => {
  const { applicationId } = req.params;
  const userId = req.user && req.user._id;

  // Ensure the user is a hospital
  if (!userId || req.user.role !== "hospital") {
    return next(new ErrorHandler("Only hospitals can accept applications", 403));
  }

  const hospital = await Hospital.findOne({ user: userId });
  if (!hospital) {
    return next(new ErrorHandler("Hospital not found for the logged-in user", 404));
  }

  // Find the user who submitted the application
  const user = await User.findOne({ "volunteerApplications._id": applicationId });
  if (!user) {
    return next(new ErrorHandler("Application not found", 404));
  }

  const application = user.volunteerApplications.id(applicationId);

  // Find the drive related to this application
  const drive = await BloodDrive.findById(application.drive);
  if (!drive) {
    return next(new ErrorHandler("Drive not found", 404));
  }

  // Check if the hospital is the one that created the drive
  if (!hospital._id.equals(drive.hospital)) {
    return next(new ErrorHandler("You are not authorized to manage this application", 403));
  }

  // Debugging: Log IDs being compared
  //console.log("Hospital ID:", hospital._id.toString());
  //console.log("Application Drive ID:", application.drive.toString());

  // Ensure the application is still pending
  if (application.status !== "pending") {
    return next(new ErrorHandler(`Cannot reject application. Current status: ${application.status}`, 400));
  }

  //Ensure application is not already accepted
  // if (application.status !== "accepted") {
  //   return next(new ErrorHandler(`Cannot reject application as it is already accepted . Current status: ${application.status}`, 400));
  // }

  // Update application status
  application.status = "rejected";
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Application rejected successfully",
    application,
  });
});



