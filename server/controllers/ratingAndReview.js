const ratingAndReview = require('../models/ratingAndReview');
const course = require('../models/course');

//create Rating and review
exports.createRatingAndReview = async (req, res) => {
    try {
        //get user id
        const userId = req.user.id;

        //fetch data from req body
        const { rating, review, courseId } = req.body;

        //check if user is enrolled or not
        const courseDetails = await course.findOne({
            _id: courseId,
            studentsEnrolled: { $elemMatch: { $eq: userId } }
        });


        if (!courseDetails) {
            return res.status(500).json({
                success: false,
                message: 'Student is not enrolled in the course'
            });
        }

        //check if user already reviewed the course
        const alreadyReviewed = await ratingAndReview.findOne({ user: userId, course: courseId });

        if (alreadyReviewed) {

            const updatedRating = await ratingAndReview.findByIdAndUpdate(alreadyReviewed._id, {
                rating: rating,
                review: review
            })

            const updatedCourseDetails = await course.findByIdAndUpdate(courseId, {
                $push: { ratingAndReviews: updatedRating._id }
            }, { new: true })
            console.log(updatedCourseDetails);

            return res.status(200).json({
                success: true,
                message: 'Rating and Review updated',
                updatedRating
            });
        }
        //create rating
        const ratingReview = await ratingAndReview.create({ user: userId, rating, review, course: courseId });

        //update course with this rating and review
        const updatedCourseDetails = await course.findByIdAndUpdate(courseId, {
            $push: { ratingAndReviews: ratingReview._id }
        }, { new: true })
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success: true,
            message: 'Rating and review submitted',
            ratingReview
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error while rating course',
            error
        });
    }
}

exports.getAverageRating = async (req, res) => {
    try {
        //get courseId
        const courseId = req.body.courseId;

        //calculate avg rating
        const result = await ratingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: 'rating' }
                }
            }
        ])

        //return rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
                message: 'Average rating fetched',

            });
        }

        //if no rating and reviews exists
        return res.status(200).json({
            success: true,
            averageRating: 0,
            message: 'Average rating is 0',

        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Unable to fetch average rating',
            error
        });
    }
}

exports.getReviewByUser = async (req, res) => {
    const { courseId } = req.query;
    const userId = req.user.id;
    
    console.log('userId: ', userId)
    console.log('courseId: ', courseId)
    try {
        const ratingAndReviewDetails = await ratingAndReview.findOne({}).where({ user: userId, course: courseId });
        console.log('ratingAndReviewDetails: ', ratingAndReviewDetails)
        if (!ratingAndReviewDetails) {
            return res.status(400).json({
                success: false,
                message:'Hope you liked it!',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Rating and Review from  user fetched successfully',
            data: ratingAndReviewDetails
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error while finding review and rating',
            error: error.message
        });
    }
}
exports.getAllRating = async (req, res) => {
    try {
        const allReviews = await ratingAndReview.find({})
            .sort({ rating: 'desc' })
            .populate({
                path: 'user',
                select: 'firstName lastName email image'
            })
            .populate({
                path: 'course',
                select: 'courseName'
            }).exec();

        return res.status(200).json({
            success: true,
            message: 'All reviews fetched successfully',
            data: allReviews
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error getting all ratings',
            error
        });
    }
}