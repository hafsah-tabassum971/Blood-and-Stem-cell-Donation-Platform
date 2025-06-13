const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Donor reference
        required: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital', // Associated hospital (since hospital is stored in User model)
        required: true
    }, 
    hospitalName: {
        type: String, // To store the hospital's name directly
        required: true,
      },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment', // Reference to the appointment linked to the donation
      },
    donationType: {
        type: String,
        // enum: ['Blood', 'Stem Cell'],
        enum: ['Blood Donation', 'Stem Cell'],
        required: true
    },
    phase: {
        type: String,
        enum: ['HLA Testing', 'Stem Cell Donation'],
        required: function () {
            return this.donationType === 'Stem Cell';
        }
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    hlaMatchStatus: {
        type: String,
        enum: ['Pending', 'Matched', 'Mismatched'],
        default: 'Pending'
    },
    hlaMatchInfo: {
        patientDetails: {
            patientId: {
                type: String, // Store patient ID as a string (sent by hospital)
                required: function () {
                    // return this.hlaMatchStatus === 'Matched';
                    return this.hlaMatchStatus !== 'Pending';
                }
            },
            patientName: {
                type: String, // Patient name sent by hospital
                required: function () {
                    // return this.hlaMatchStatus === 'Matched';
                    return this.hlaMatchStatus !== 'Pending';
                }
            },
        },
        // matchDate: {
        //     type: Date,
        //     required: function () {
        //         return this.hlaMatchStatus === 'Matched';
        //     }
        // },
        HLAResultDate: {
            type: Date,
            required: function () {
              return this.hlaMatchStatus !== 'Pending';
            },
          },
        // matchingHospital: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User', // Hospital where matching occurred
        //     required: false
        // }
    },
    details: {
        type: String // Additional notes or remarks
    }
}, { timestamps: true });

// module.exports = mongoose.model('Donation', donationSchema);
// 🛠 Prevent duplicate model compilation
const Donation = mongoose.models.Donation || mongoose.model('Donation', donationSchema);

module.exports = Donation;
