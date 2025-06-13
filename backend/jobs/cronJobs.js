const cron = require("node-cron");
const Appointment = require("../models/appointmentModel");
const Donation = require("../models/donationModel");
const { validate } = require("../models/userModel");

//console.log("Cron job file loaded...");

// Run every hour to check and update expired appointments
cron.schedule("0 * * * *", async () => { 
  console.log("Running donation status update job...");

  const now = new Date();

  try {
    // Find appointments where time has passed but donation is still pending
    const expiredAppointments = await Appointment.find({
      appointmentDate: { $lte: now.toISOString().split("T")[0] }, // Date is today or earlier
      appointmentTime: { $lte: now.toISOString().split("T")[1].substring(0, 5) }, // Time has passed
    });

    for (const appointment of expiredAppointments) {
      // Find associated donation
      const donation = await Donation.findOne({ appointment: appointment._id, status: "Pending" });

      // if (donation) {
      //   // Update donation status to 'Completed'
      //   donation.status = "Completed";
      //   await donation.save();
      //   console.log(`Donation for appointment ${appointment._id} marked as completed.`);
      // }
    //   if (donation && donation.hospitalName) { 
    //     donation.status = "Completed"; 
    //     await donation.save(); 
    // } else {
    //     console.error(`Skipping donation update due to missing hospitalName: ${donation}`);
    // }
    if (donation) { 
      donation.status = "Completed"; 
      await donation.save({ validateBeforeSave: false }); 
      console.log(`Donation for appointment ${appointment._id} marked as completed.`);
    } else {
      console.error(`Skipping donation update due to missing donation for appointment: ${appointment._id}`);
    }
  }
    
  } catch (error) {
    console.error("Error updating donation status:", error);
  }
});
