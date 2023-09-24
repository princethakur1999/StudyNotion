const subSection = require('../models/subSection');
const section = require('../models/section');
const course = require('../models/course');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
require('dotenv').config();

exports.createSubSection = async (req, res) => {
    try {
        //get Data
        const { courseId, sectionId, title, timeDuration, description } = req.body;


        //validation
        if (!sectionId || !title || !description || !req.files) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: 'No Course ID'
            });
        }
        //extract file/video
        const video = req.files.video;
        //console.log('video in server side:',video)

        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        //create entry in Subsection schema
        const subSectionDetails = await subSection.create({
            title,
            timeDuration: uploadDetails.duration,
            description,
            videoUrl: uploadDetails.secure_url
        });

        //update section with the sub section object id
        const updatedSection = await section.findByIdAndUpdate(
            sectionId, {
            $push: {
                subSection: subSectionDetails._id
            }
        },
            { new: true })
            .populate('subSection').exec();

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

            console.log('course Details: ',courseDetails)

        //return response
        return res.status(200).json({
            success: true,
            message: 'Sub Section created successfully',
            data: courseDetails
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while creating subsection',
            error: error.message
        });
    }
}


exports.updateSubSection = async (req, res) => {
    try {
        //get Data
        const { courseId,subSectionId, title, timeDuration, description } = req.body;
        console.log('courseId,sectionId, title, description ->',courseId,subSectionId, title, description)
        const subSectionDetails = await subSection.findById(subSectionId);


        //extract file/video
        //const video = req.files.video;


        //validation
        if (!title && !subSectionId && !description && !req.files) {
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



        if (!subSectionDetails) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }

        if ((title !== "") && (title !==undefined)) {
            subSectionDetails.title = title
        }

        if ((description !== "")&&(description !==undefined)) {
            subSectionDetails.description = description
        }
        if (req.files !== null) {
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            )
            subSectionDetails.videoUrl = uploadDetails.secure_url
            subSectionDetails.timeDuration = `${uploadDetails.duration}`
        }

        await subSectionDetails.save()

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

        return res.json({
            success: true,
            message: "Section updated successfully",
            data: courseDetails
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while updating subsection',
            error: error.message
        });
    }
}


exports.deleteSubSection = async (req, res) => {
    try {
        //get Data
        const {courseId, subSectionId, sectionId } = req.body;

        //validation
        if(!courseId){
            return res.status(400).json({
                success: false,
                message: 'Course ID not Found'
            });
        }
        if(!subSectionId){
            return res.status(400).json({
                success: false,
                message: 'subSection ID not Found'
            });
        }
        if(!sectionId){
            return res.status(400).json({
                success: false,
                message: 'sectionId ID not Found'
            });
        }

        const updatedSection = await section.findByIdAndUpdate(
            sectionId,
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        );
        await updatedSection.save();

        const deletedSubSection = await subSection.findByIdAndDelete(subSectionId);


        if (!deletedSubSection) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" })
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

        //return response
        return res.status(200).json({
            success: true,
            message: 'Sub Section deleted successfully',
            data:courseDetails
        });



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting subsection',
            error
        });
    }
}
