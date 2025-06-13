const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); //it is node built-in module

const volunteerApplicationSchema = new mongoose.Schema({
    drive: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BloodDrive', // Reference to the BloodDrive model
        required: true,
      },    
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending' 
    },
    applicationDate: { 
        type: Date, 
        default: Date.now 
    },
    approvalDate: { 
        type: Date 
    },
    availability: {
        type: Date,
        required: [true, "Please specify your availability for the drive"],
        // validate: {
        //     validator: function (v) {
        //         // Example placeholder for custom validation logic.
        //         // Actual validation for the date being within the drive's range can be implemented in the controller.
        //         return v instanceof Date;
        //     },
        //     message: "Please enter a valid date for availability",
        // }
    },
    experience: { 
        type: String, 
        required: false 
    },
    volunteerRole: { 
        type: String, 
        enum: [
            'Coordinator', 
            'Blood Collection Staff', 
            'Donor Assistance', 
            'Logistics Support'
        ],
        required: [true, "Please select a role for the application"]
    },
    reasonForApplying: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Please Enter your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    gender: { 
        type: String, 
        required: false,
        enum: ['Male', 'Female', 'Other']
    },
    email: { 
        type: String, 
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    // confirmPassword: {
    //     type: String,
    //     required: [true, "Please Confirm Your Password"],
    //     select: true,
    // },
    address: { 
        type: String, 
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
        // validate: {
        //     validator: function (v) {
        //         return /^\d{10,15}$/.test(v); // Ensures a valid contact number format
        //     },
        //     message: "Please Enter a valid Contact Number",
        // },
    },
    bloodType: { 
        type: String, 
        required: false
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    agreeToTerms: { 
        type: Boolean, 
        required: false
    },
    role: { 
        type: String, 
        enum: ['admin', 'donor', 'volunteer', 'hospital'], 
        default: 'donor'
    },
    appointments: [
        { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Appointment' 
        }
      ],
    donations: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Donation' 
    }],
    isAdmin: { 
        type: Boolean, 
        default: false 
    },
    isVolunteer: { 
        type: Boolean, 
        default: false 
    },
    // volunteerApplication: { 
    //     type: volunteerApplicationSchema, 
    //     required: false 
    // },
    volunteerApplications: [
        { type: volunteerApplicationSchema }
    ],
    

    resetPasswordToken: String,
    resetPasswordExpire: Date,

}, { timestamps: true });

// // Pre-save middleware
// userSchema.pre("save", async function (next) {
//     // Only proceed if the password is modified
//     if (this.isModified("password")) {
//         // Check if confirmPassword matches password
//         if (this.password !== this.confirmPassword) {
//             return next(new Error("Passwords do not match!"));
//         }

//         // Hash the password
//         this.password = await bcrypt.hash(this.password, 10);

//         // Clear confirmPassword to avoid saving it in the database
//         this.confirmPassword = undefined;
//     }

//     next();
// });
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });



  // JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };  

  // Compare Password

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };  


  //Generating Password Reset Token

userSchema.methods.getResetPasswordToken = function(){
    //Generating Token
    const resetToken =crypto.randomBytes(20).toString("hex");
    //Hashing and adding to userShema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    //Setting expiry date to 15 minutes 
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    
    return resetToken;
    };


module.exports = mongoose.model('User', userSchema);








