const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hospitalType: {
      type: String,
      enum: ['public', 'private'],
      required: false,
    },
    donationType: {
      type: String,
      enum: ['Blood Donation', 'Stem Cell Donation', 'Both'],
      required: true,
    },
    operationalHours: {
      openingTime: { type: String, required: true }, // Example: '8:00 AM'
      closingTime: { type: String, required: true }, // Example: '5:00 PM'
    },
    slotDuration: { type: Number, default: 30 }, // Slot duration in minutes
    operationalDays: {
      type: [String], // Example: ["Monday", "Tuesday", ..., "Saturday"]
      default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
    availability: [
      {
        date: { type: String, required: true },
        slots: [
          {
            time: { type: String, required: true },
            isAvailable: { type: Boolean, default: true }
          },
        ],
      },
    ],

    appointments: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Appointment' 
      }
    ],

    donations: 
    [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Donation' }
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hospital', hospitalSchema);
