const jwt = require('jsonwebtoken');
require('dotenv').config();
const user = require('../models/user');

//auth
exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.header('Authorization').replace('Bearer', ' ').trim();


        // console.log('req.cookies.token: ', req.cookies.token);
        // console.log('req.body.token: ', req.body.token);
        // console.log('req.header(Authorisation):', req.header('Authorisation').replace('Bearer', '').trim())

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token or no token found'
            });
        }

        //verify token
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                success: false,
                message: error.message == 'jwt expired' ? 'Token expired, Please Login again' : 'Token is invalid'
            });
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong during token verification',
            error: error.message
        });
    }
}

//isStudent
exports.isStudent = async = (req, res, next) => {
    try {
        if (req.user.accountType !== 'Student') {
            return res.status(401).json({
                success: false,
                message: 'This is protected route for students only'
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified'
        });
    }
}

//isInstructor
exports.isInstructor = async = (req, res, next) => {
    try {
        if (req.user.accountType !== 'Instructor') {
            return res.status(401).json({
                success: false,
                message: 'This is protected route for Instructor only'
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified'
        });
    }
}

//isAdmin
exports.isAdmin = async = (req, res, next) => {
    console.log(`user account tyoe is : ${req.user.accountType}`)
    try {
        if (req.user.accountType !== 'Admin') {
            return res.status(401).json({
                success: false,
                message: 'This is protected route for Admin only'
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified'
        });
    }
}