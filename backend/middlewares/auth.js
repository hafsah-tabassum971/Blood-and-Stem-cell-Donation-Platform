const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
//const {JWT_SECRET} = require('../config/config.env');
const User = require("../models/userModel");

//defining and exporting at a time
exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies; //becuase we stored token in cookie
    //console.log(token);

    //console.log("Received Cookies:", req.cookies); // Ensure token is received


    if(!token){
        return next(new ErrorHandler("Please Login to access this resource",401));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    
    //we are accessing id which we assigned to jwt when we created it.And saving it in req.user and till the user logged in and we can access data of user by req.user.
    req.user = await User.findById(decodedData.id);
    
     // Debug: Log decoded token
     //console.log("Decoded Token Data:", decodedData);
     
    next();
}); 

exports.authorizeRoles = (...roles) =>{
    return (req,res,next) =>{
      if(!roles.includes(req.user.role)){
        //checking whether the admin in req.user.role matches with admin in the roles array.
        return next(
            new ErrorHandler(
            //here 403 means that server has understood what we are trying to do but doesn't allow us to do that.
            `Role: ${req.user.role} is not allowed to access this resource`,403
        ));
      }

      next(); //returns empty function
    };
};