const mongoose = require('mongoose');
const { mailSender } = require('../utils/mailSender');
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 7 * 60
    }
})


//function to send emails
sendVerificationEmail = async (email, otp) => {
    try {
        const mailResponse = await mailSender(email, 'Verification mail from StudyNotion', emailTemplate(otp));
        console.log('Email sent successfully: ', mailResponse);
    } catch (error) {
        console.log('error occured while sending mail: ', error);
        throw error;
    }
}

OTPSchema.pre('save', async function (next){
    console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}

    next();
})

module.exports = mongoose.model('OTP', OTPSchema);
