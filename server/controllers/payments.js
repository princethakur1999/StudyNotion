const { instance } = require('../config/razorpay');
const course = require('../models/course');
const courseProgress = require('../models/courseProgress');
const user = require('../models/user');
const { mailSender } = require('../utils/mailSender');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
const { default: mongoose } = require('mongoose');
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail');
const crypto = require('crypto')

//capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {

    //get coutrse id and user id
    const { courses } = req.body;
    const userId = req.user.id;

    //validation
    if (courses.length === 0) {

        return res.status(400).json({
            success: false,
            message: 'Please provide Course ID'
        })
    }

    let totalAmount = 0;

    for (const course_id of courses) {

        let currentCourse;

        try {
            currentCourse = await course.findById(course_id);

            if (!currentCourse) {

                return res.status(400).json({
                    success: false,
                    message: 'could not find course',
                });
            }

            //user already pay for the same course
            const uid = new mongoose.Types.ObjectId(userId);

            if (currentCourse.studentsEnrolled.includes(uid)) {

                return res.status(400).json({
                    success: false,
                    message: 'Student is already enrolled',
                });
            }

            totalAmount += currentCourse.price;

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: 'INR',
        receipt: Math.random(Date.now().toString()),
    }

    try {
        //initiate payment using razorpay
        const paymentResponse = await instance.orders.create(options);

        //return response
        return res.status(200).json({
            success: true,
            message: paymentResponse
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'error while capurting payment',
            error
        });
    }

}

//verify signature of Razorpay amnd server

exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id

    if (!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
    ) {
        return res.status(500).json({
            success: false,
            message: 'Payment Failed'
        });
    }

    let body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET).update(body.toString()).digest('hex')


    if (expectedSignature === razorpay_signature) {
        //enrol student
        await enrollStudents(courses, userId, res)

        //return res
        return res.status(200).json({
            success: true,
            message: 'Payment verified'
        })
    }
    return res.status(500).json({
        success: false,
        message: 'Payment failed'
    })

}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: 'Something missing among orderId,paymentId,amount,userId'
        })
    }

    try {
        const enrolledStudent = await user.findById(userId);

        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`,
                amount / 100, orderId, paymentId)
        )
    } catch (error) {
        console.log('error in sending mail', error.message);
        return res.status(500).json({
            success: false,
            message: 'error in sending mail'
        })
    }

}

async function enrollStudents(courses, userId, res) {
    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: 'Courses or UserId missing'
        })
    }
    for (const courseId of courses) {
        try {
            //find course
            const enrolledCourse = await course.findByIdAndUpdate(courseId, { $push: { studentsEnrolled: userId } }, { new: true })

            if (!enrolledCourse) {
                return res.status(400).json({
                    success: false,
                    message: 'Course not found'
                })
            }

            const courseProgressDetails = await courseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: []
            })


            //find the student and add the course to their list of enrolled courses
            const enrolledStudents = await user.findByIdAndUpdate(userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgressDetails._id
                    }
                }, { new: true });

            await mailSender(
                enrolledStudents.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudents.firstName}`)
            )
            //console.log('email response:', emailResponse)
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'something went while enrolling the student'
            })
        }
    }
}

