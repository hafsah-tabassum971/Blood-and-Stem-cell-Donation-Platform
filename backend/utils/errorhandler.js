//we are extending means inheriting the class named as ErrorHandler from default class of node called Error.Super is the constructor of Error class.
class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor); //here this is the target object which is ErrorHandler.
    }
}

module.exports = ErrorHandler