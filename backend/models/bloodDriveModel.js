const mongoose = require('mongoose');

const bloodDriveSchema = new mongoose.Schema({
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true, // Ensures a hospital is linked to the drive
  },
  driveName: {
    type: String,
    required: [true, 'Please provide a name for the drive'],
  },
  location: { 
    type: String, 
    required: true 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
  description: { 
    type: String, 
    required: false 
  },
  volunteerCapacity: {
    type: Number, // Maximum number of volunteers for each day
    required: true,
    default: 10,
  },
  registeredVolunteers: [{
    donor: {
      type: mongoose.Schema.Types.ObjectId, // Donor ID who registered
      ref: 'User',
      required: true,
      validate: {
        validator: async function(userId) {
          const user = await mongoose.model('User').findById(userId);
          return user && user.role === 'donor'; // Only allow donors to volunteer
        },
        message: 'Only donors can volunteer for drives',
      },
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the hospital
      ref: 'Hospital',
      required: true,
    },
    date: { //added date to track volunteers per day
      type: Date,
      required: true,
    }
  }]
}, { 
  timestamps: true 
});

// Static method to check volunteer capacity
bloodDriveSchema.methods.isVolunteerSlotAvailable = function () {
  return this.registeredVolunteers.length < this.volunteerCapacity;
};

// Export the model
module.exports = mongoose.model('BloodDrive', bloodDriveSchema);
