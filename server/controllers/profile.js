const profile = require('../models/profile');
const user = require('../models/user');
const course = require('../models/course');
const CourseProgress = require('../models/courseProgress');
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require('../utils/secToDuration');


exports.updateProfile = async (req, res) => {
    try {
        //get data
        const { firstName, lastName, gender, dateOfBirth, about, contactNumber } = req.body;
        let userNameChange = false;
        //get userId
        const id = req.user.id;

        //find profile
        const userDetails = await user.findById(id);
        const profileId = userDetails.additionalDetails;
        let updatedUserDetails;

        if (userDetails.firstName != firstName || userDetails.lastName != lastName) {
            userNameChange = true;
        }

        //update profile

        await profile.findByIdAndUpdate(profileId,
            { gender, dateOfBirth, about, contactNumber },
            { new: true });

        if (userNameChange) {
            updatedUserDetails = await user
                .findByIdAndUpdate(id,
                    { firstName, lastName },
                    { new: true }).populate('additionalDetails').exec();
        } else {
            updatedUserDetails = await user
                .findById(id)
                .populate('additionalDetails').exec();
        }



        //return resaponse
        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            updatedProfile: updatedUserDetails
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while updating profile',
            error: error.message
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        //get userId
        const id = req.user.id;

        //validation
        const userDetails = await user.findById(id);

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        //TODO: un enroll user from all enrolled courses

        //delete profile
        await profile.findByIdAndDelete(userDetails.additionalDetails);

        //delete user
        await user.findByIdAndDelete(id);



        //return resaponse
        return res.status(200).json({
            success: true,
            message: 'Profile deleted successfully'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting profile',
            error: error.message
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        //get userIdD
        const id = req.user.id;

        //validation
        const userDetails = await user.findById(id).populate('additionalDetails').exec();

        //return response
        return res.status(200).json({
            success: true,
            message: 'Profile fetched successfully',
            userDetails
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching profile',
            error
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {


    try {
        const displayPicture = req.files.displayPicture

        const userId = req.user.id
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )

        const updatedProfile = await user.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        ).populate('additionalDetails').exec();
        res.send({
            success: true,
            message: `Image Updated successfully`,
            updatedProfile: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id
        let userDetails = await user.findOne({
            _id: userId,
        })
            .populate({
                path: 'courses',
                populate: {
                    path: 'courseContent',
                    populate: {
                        path: 'subSection'
                    }
                }
            })
            .exec()
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }
        

        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
          let totalDurationInSeconds = 0
          SubsectionLength = 0
          for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
            totalDurationInSeconds += userDetails.courses[i].courseContent[
              j
            ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
            userDetails.courses[i].totalDuration = convertSecondsToDuration(
              totalDurationInSeconds
            )
            SubsectionLength +=
              userDetails.courses[i].courseContent[j].subSection.length
          }
          let courseProgressCount = await CourseProgress.findOne({
            courseID: userDetails.courses[i]._id,
            userId: userId,
          })
          courseProgressCount = courseProgressCount?.completedVideos.length
          if (SubsectionLength === 0) {
            userDetails.courses[i].progressPercentage = 100
          } else {
            // To make it up to 2 decimal point
            const multiplier = Math.pow(10, 2)
            userDetails.courses[i].progressPercentage =
              Math.round(
                (courseProgressCount / SubsectionLength) * 100 * multiplier
              ) / multiplier
          }
        }


        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.instructorDashboard=async(req,res)=>{
    try{
        const courseDetails=await course.find({instructor:req.user.id});
        
        const courseData=courseDetails.map((cours)=>{
            const totalStudentsEnrolled=cours.studentsEnrolled.length;
            const totalAmountGenerated=totalStudentsEnrolled * cours.price

            //create a new object with additional fields
            const courseDataWithStats={
                _id:cours._id,
                courseName: cours.courseName,
                courseDescription:cours.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            }
            return courseDataWithStats
        })

        return res.status(200).json({
            success: true,
            data: courseData,
        })
        

    }catch(error){
        console.log('error:',error)
        return res.status(500).json({
            success: false,
            message: 'unable to fetch dashboard data',
            error:error.message
        })
    }
}