const user = require('../models/user');
const { mailSender } = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

//reset Password Token
exports.resetPasswordToken = async (req, res) => {
    try {
        //get email from req body
        const email = req.body.email;

        //check user for this email, email validation
        const ExistingUser = await user.findOne({ email: email });
        if (!ExistingUser) {
            return res.status(401).json({
                success: false,
                messaege: 'Your email is not registered with us'
            });
        }

        //generate token
        const token = crypto.randomUUID();
        //update user by adding token and expiration time
        const updatedDetails = await user.findOneAndUpdate({ email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000
            }, { new: true });

        //create url
        const url = `http://localhost:3000/update-password/${token}`

        //send mail containing the url
        await mailSender(email, 'Password reset link', `Password reset link ${url}`);

        //return response
        return res.status(200).json({
            success: true,
            message: 'Email sent successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error occured while updating password',
            error: error.message
        });
    }
}

//reset Password
exports.resetPassword = async (req, res) => {
    //data fetch
    try {
        const { password, confirmPassword, token } = req.body

        //validation
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password not same as confirm Password'
            })
        }

        //get user details from db using token
        const userDetails = await user.findOne({ token: token });

        console.log(`user details : ${userDetails}`);

        //if no entry -invalid token
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: 'Token is invalid'
            })
        }

        //token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: 'Token expired'
            });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //password update
        await user.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }
        );

        //return response
        return res.status(200).json({
            success: true,
            message: 'Password reset successful',

        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while reseting your Passoword',
            error
        })
    }

}