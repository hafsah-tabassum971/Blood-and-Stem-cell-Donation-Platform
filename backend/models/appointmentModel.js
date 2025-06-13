const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Donor is required for an appointment'],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      required: [true, 'Hospital is required for an appointment'],
    },
    eligibilityStatus: { 
      type: String, 
      enum: ['Eligible', 'Not Eligible', 'Pending'], 
      required: true 
    },
    donationType: {
      type: String,
      enum: ['Blood Donation', 'Stem Cell Donation (For HLA Test)','Stem Cell Donation'],
      required: [true, 'Donation type is required'],
    },
    appointmentDate: {
      type: Date,
      required: [true, 'Appointment date is required'],
    },
    appointmentTime: {
      type: String,
      required: [true, 'Appointment time is required'],
    },
    // status: {
    //   type: String,
    //   enum: ['Pending','Cancelled','Confirmed'],
    //   default: 'Pending',
    // },
    status: {
      type: String,
      enum: ['Cancelled','Confirmed']
    },
    // cancellationReason: {
    //   type: String,
    //   required: function () {
    //     return this.status === 'Cancelled';
    //   },
    // },
  },
  { timestamps: true } // Automatically manage `createdAt` and `updatedAt`
);

// module.exports = mongoose.model('Appointment', appointmentSchema);
// 🛠 Prevent duplicate model compilation
const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
