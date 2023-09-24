const bcrypt = require('bcrypt');
const user = require('../models/user');
const OTP = require('../models/otp');
const profile = require('../models/profile');
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const { mailSender } = require('../utils/mailSender');
const passwordUpdated = require('../mail/templates/passwordUpdate')
require('dotenv').config();

//send OTP
exports.sendOTP = async (req, res) => {
    try {
        //fetch email from request ki body
        const { email } = req.body;

        //check if user already exist
        const checkUserPresent = await user.findOne({ email });

        //if user already exists
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: 'User already registered'
            });
        }

        //genrate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        //check unique otp or not
        const result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };

        //create an entry for OTP
        const otpBody = await OTP.create(otpPayload);

        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otpBody
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//signUp
exports.signUp = async (req, res) => {
    try {

        //data fetch from request
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body;

        console.log('fisrt Name: ', firstName);
        console.log('last Name: ', lastName);
        console.log('email: ', email);
        console.log('password: ', password);
        console.log('confirm Password: ', confirmPassword);
        console.log('OTP: ', otp);

        //validate
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {

            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        //matching both passwords
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and Confirm Password does not match'
            });
        }

        //check if user already exists or not
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User is already registered'
            });
        }

        //find most recent OTP stored for the user
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("recent OTP: ", recentOtp)

        //validate OTP
        if (recentOtp.length == 0) {
            return res.status(400).json({
                success: false,
                message: 'unable to find OTP'
            });
        } else if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create entry in DB
        const profileDetails = await profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        });

        const NewUser = await user.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        //return respond
        return res.status(200).json({
            success: true,
            message: 'User registered successfully',
            NewUser
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered. Please try again',
            error
        });
    }
}

//login
exports.login = async (req, res) => {
    try {
        //get data from req body
        const { email, password } = req.body;

        //validations on data
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        //check user exists or not
        const userPresentInDb = await user.findOne({ email }).populate('additionalDetails').exec();

        if (!userPresentInDb) {
            return res.status(400).json({
                success: false,
                message: 'user doest not exist, please Sign up frist'
            });
        }

        //generate JWT,after password matching
        if (await bcrypt.compare(password, userPresentInDb.password)) {
            const payload = {
                email: userPresentInDb.email,
                id: userPresentInDb._id,
                accountType: userPresentInDb.accountType
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '27h' });
            userPresentInDb.token = token;
            userPresentInDb.password = undefined;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };
            return res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                user: userPresentInDb,
                message: 'logged in successfully'
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Password incorrect'
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Login failure'
        });
    }
}

// Controller for Changing Password
exports.changePassword = async (req, res) => {
    try {
        // Get user data from req.user
        const userDetails = await user.findById(req.user.id);

        // Get old password, new password, and confirm new password from req.body
        const { oldPassword, newPassword } = req.body;

        // Validate old password
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );
        if (!isPasswordMatch) {
            // If old password does not match, return a 401 (Unauthorized) error
            return res
                .status(401)
                .json({ success: false, message: "The password is incorrect" });
        }

        // Update password
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await user.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        );

        // Send notification email

        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                `Password updated successfully`,
                passwordUpdated(
                    updatedUserDetails.email,
                    `${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
            console.log("Email sent successfully:", emailResponse);
        } catch (error) {
            // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email but password is updated 😄",
                error: error.message,
            });
        }



        // Return success response
        return res
            .status(200)
            .json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while updating password:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        });
    }
};