const acceptBookingController = require("./BookingControllers/acceptBookingController");
const createBookingController = require("./BookingControllers/createBookingController");
const deleteBooking = require("./BookingControllers/deleteBookingController");
const getAllBookingController = require("./BookingControllers/getAllBookingsController");
const getBookingByPhoneController = require("./BookingControllers/getBookingByPhController");
const sendSMSController = require("./BookingControllers/sendBookingSMSController");
const updateBookingController = require("./BookingControllers/updateBookingController");
const userLoginController = require("./UserControllers/userLoginController");
const userRegisterController = require("./UserControllers/userRegisterController");
const forgotPasswordController = require('./UserControllers/userForgotPasswordController'); // Forgot Password
const resetPasswordController = require('./UserControllers/userResetPasswordController'); // Reset Password
const userProfileController = require("./UserControllers/userProfileController");
const sendOTPController = require("./OTPControllers/sendOTPController");
const verifyOTPController = require("./OTPControllers/verifyOTPController");

const Controllers = {
    DeleteBookingController: deleteBooking,
    UserRegisterController: userRegisterController,
    UserLoginController: userLoginController,
    GetUserProfileController: userProfileController.getProfileController,
    UpdateUserProfileController: userProfileController.updateProfileController,
    UpdateUserPasswordController: userProfileController.changePasswordController,
    GetBookingByPhoneController: getBookingByPhoneController,
    BookingController: createBookingController,
    GetAllBookingController: getAllBookingController,
    UpdateBookingController: updateBookingController,
    AcceptBookingController: acceptBookingController,
    SendBookingSMSController: sendSMSController,
    ForgotPasswordController: forgotPasswordController,
    ResetPasswordController: resetPasswordController,
    SendOTPController: sendOTPController,
    VerifyOTPController: verifyOTPController
}

module.exports = Controllers;