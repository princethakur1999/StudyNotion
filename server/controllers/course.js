const course = require('../models/course');
const categorySchema = require('../models/category');
const courseProgress = require('../models/courseProgress');
const ratingAndReview = require('../models/ratingAndReview');
const section = require('../models/section');
const subSection = require('../models/subSection');
const user = require('../models/user');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
const { convertSecondsToDuration } = require('../utils/secToDuration');
require('dotenv').config();

//create course 
exports.createCourse = async (req, res) => {
    try {
        //fetch data
        const { courseName, courseDescription, whatYouWillLearn, price, tag, category, status = "Draft", instructions } = req.body;
        const thumbnail = req.files.thumbnailImage;

        //validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // if (!status || status === undefined) {
        // 	status = "Draft";
        // }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await user.findById(userId);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: 'Instructor details not found'
            });
        }

        //check category is valid or not
        const categoryDetails = await categorySchema.findById(category);

        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: 'category details not found'
            });
        }

        //uppload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new course
        const newCourse = await course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status,
            instructions
        });

        //add the new course to the user schema of instructor
        await user.findByIdAndUpdate({ _id: instructorDetails._id },
            { $push: { courses: newCourse._id } },
            { new: true });

        //update category  schema
        await categorySchema.findByIdAndUpdate(categoryDetails._id,
            { $push: { courses: newCourse._id } },
            { new: true });

        return res.status(200).json({
            success: true,
            message: 'Course created successfully',
            data: newCourse
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error while creating course',
            error: error.message
        });
    }
}

exports.editCourse = async (req, res) => {
    try {
        //fetch data
        const { courseId, courseName, courseDescription, whatYouWillLearn, price, tag, category, instructions, status } = req.body;

        if (!courseName &&
            !courseDescription &&
            !whatYouWillLearn &&
            !price &&
            !tag &&
            !category &&
            !instructions &&
            !status &&
            !req.files) {
            return res.status(400).json({
                success: false,
                message: 'Nothing to update'
            });
        }

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: 'No Course ID'
            });
        }

        //find course details
        const courseDetails = await course.findOne({ _id: courseId })
            .populate({
                path: 'instructor',
                populate: { path: 'additionalDetails' }
            })
            .populate('category')
            .populate('ratingAndReviews')
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'subSection'
                }
            }).exec();

        if ((courseName !== '') && (courseName !== undefined)) {
            courseDetails.courseName = courseName
        }
        if ((courseDescription !== '') && (courseDescription !== undefined)) {
            courseDetails.courseDescription = courseDescription
        }
        if ((whatYouWillLearn !== '') && (whatYouWillLearn !== undefined)) {
            courseDetails.whatYouWillLearn = whatYouWillLearn
        }
        if ((price !== '') && (price !== undefined)) {
            courseDetails.price = price
        }
        if ((tag !== '') && (tag !== undefined)) {
            courseDetails.tag = tag
        }
        if ((category !== '') && (category !== undefined)) {
            courseDetails.category = category;
            let res = await categorySchema.findOne({}).where({ courses: courseId });
            res.courses.pull(courseId);
            await res.save();
            let newCategory=await categorySchema.findById(category);
            newCategory.courses.push(courseId);
            await newCategory.save();

            
        }
        if ((instructions !== '') && (instructions !== undefined)) {
            courseDetails.instructions = instructions
        }
        if ((status !== '') && (status !== undefined)) {
            courseDetails.status = status
        }

        let thumbnail;

        if (req.files !== null) {
            thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
            courseDetails.thumbnail = thumbnailImage.secure_url;
        }

        await courseDetails.save();

        const newCourseDetails = await course.findOne({ _id: courseId })
            .populate({
                path: 'instructor',
                populate: { path: 'additionalDetails' }
            })
            .populate('category')
            .populate('ratingAndReviews')
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'subSection'
                }
            }).exec();

        return res.json({
            success: true,
            message: "Edits made successfully",
            data: newCourseDetails
        })




    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error while editing course',
            error: error.message
        });
    }
}


//get all coureses
exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await course.find({ status: "Published" }, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true
        }).populate('instructor').exec();

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched all courses',
            allCourses
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error while fetching courses',
            error
        });
    }
}

exports.getCourseDetails = async (req, res) => {
    try {
        //get id
        const { courseId } = req.body;
        //find course details
        const courseDetails = await course.findOne({ _id: courseId })
            .populate({
                path: 'instructor',
                populate: { path: 'additionalDetails' }
            })
            .populate('category')
            .populate('ratingAndReviews')
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'subSection'
                }
            }).exec();

        //validation
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find the course with course id -${courseId}`,
            });
        }

        let totalDurationInSeconds = 0
        // let subSectionDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
                subSection.timeDuration = convertSecondsToDuration(subSection.timeDuration)
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        courseDetails.courseContent.map((section) => (
            section.subSection.map((subSection) => (
                subSection.videoUrl = null
            ))
        ))

        return res.status(200).json({
            success: true,
            message: 'Fetched course details successfully',
            data: courseDetails,
            totalDuration: totalDuration

        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error while fetching course details',
            error
        });
    }
}

exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body

        const userId = req.user.id
        const courseDetails = await course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()



        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        let courseProgressCount = await courseProgress.findOne({
            courseID: courseId,
            userId: userId,
        })

        console.log("courseProgressCount : ", courseProgressCount)



        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)


        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos
                    ? courseProgressCount?.completedVideos
                    : [],
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
    try {
        // Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id

        // Find all courses belonging to the instructor
        let instructorCourses = await course.find({
            instructor: instructorId,
        }).lean().populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).sort({ createdAt: -1 }).exec();



        instructorCourses.map((course) => {
            let totalDurationInSeconds = 0
            course.courseContent.map((content) => {
                content.subSection.map((subSection) => {
                    const timeDurationInSeconds = parseInt(subSection.timeDuration)
                    totalDurationInSeconds += timeDurationInSeconds
                })
            })
            course.totalTime = convertSecondsToDuration(totalDurationInSeconds)
        })


        // Return the instructor's courses
        res.status(200).json({
            success: true,
            data: instructorCourses,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}
// Delete the Course
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body


        // Find the course
        const courseDetails = await course.findById(courseId)
        if (!courseDetails) {
            return res.status(404).json({ message: "Course not found" })
        }

        // Unenroll students from the course
        const studentsEnrolled = courseDetails.studentsEnrolled
        for (const studentId of studentsEnrolled) {
            await user.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId },
            })
        }

        // Delete sections and sub-sections
        const courseSections = courseDetails.courseContent
        for (const sectionId of courseSections) {
            // Delete sub-sections of the section
            const sectionDetails = await section.findById(sectionId)
            if (sectionDetails) {
                const subSections = sectionDetails.subSection
                for (const subSectionId of subSections) {
                    await subSection.findByIdAndDelete(subSectionId)
                }
            }

            // Delete the section
            await section.findByIdAndDelete(sectionId)
        }

        //delete the course from instructor schema
        await user.findByIdAndUpdate(courseDetails.instructor, {
            $pull: { courses: courseId }
        })

        //delete the course from category schema
        await categorySchema.findByIdAndUpdate(courseDetails.category, {
            $pull: { courses: courseId }
        })

        //delete reviews of the course
        await ratingAndReview.deleteMany({ course: courseId })

        // Delete the course
        await course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}