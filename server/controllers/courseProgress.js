const subSection = require('../models/subSection')
const courseProgrss = require('../models/courseProgress')

exports.updateCourseProgress = async (req, res) => {
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;
    try {
        const subSectionDetails = await subSection.findById(subSectionId);

        if (!subSectionDetails) {
            return res.status(400).json({
                success: false,
                message: "Invalid SubSection ID",
            })
        }
        console.log('courseId and userId:',courseId, userId)

        //check for old entry
        let courseProgrssDetails=await courseProgrss.findOne({
            courseID:courseId,
            userId:userId
        });

        if (!courseProgrssDetails) {
            return res.status(400).json({
                success: false,
                message: "Course Progrss does not exists",
            })
        }else{
            //check for recompleting subsection
            if(courseProgrssDetails.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    success: false,
                    message: "SubSection already completed",
                })
            }
            courseProgrssDetails.completedVideos.push(subSectionId);
        }

        await courseProgrssDetails.save();

        return res.status(200).json({
            success: true,
            message: "Course progress updated",
        })

         


    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating course progress",
            error: error.message,
        })
    }

}