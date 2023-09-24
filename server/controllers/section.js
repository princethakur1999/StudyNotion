const section=require('../models/section');
const course=require('../models/course');


exports.createSection=async(req,res)=>{
    try{
        //data fetch
        const {sectionName,courseId}=req.body;
    
        //data validation
        if(!sectionName||!courseId){
            return res.status(400).json({
                success:false,
                message:'Section name or Course ID is missing'
            });
        }

        //create section
        const newSection=await section.create({sectionName});

        //update course
        const updatedCourseDetails=await course.findByIdAndUpdate(courseId,{$push:{courseContent:newSection._id}},{new:true}).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();
        

        //return response
        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            updatedCourseDetails
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Something went wrong while creating section',
            error
        });
    }
}

exports.updateSection=async(req,res)=>{
    try{
        //data input
        const {courseId,sectionName,sectionId}=req.body;

        //data validation
        if(!sectionName||!sectionId){
            return res.status(400).json({
                success:false,
                message:'Section name or Section ID is missing'
            });
        }
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:'courseId is missing'
            });
        }

        //data update
        const sectionUpdated=await section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        //find course details
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

        //return response
        return res.status(200).json({
            success:true,
            message:'Section updated successfully',
            sectionUpdated,
            data:newCourseDetails
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Something went wrong while updating section',
            error
        });
    }
}

exports.deleteSection=async(req,res)=>{
    try{
        //get ID
        const {sectionId,courseId}=req.body;

        //validation
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:'No Section ID found',
            });
        }

        if(!courseId){
            return res.status(400).json({
                success:false,
                message:'No courseId found',
            });
        }

        const courseDetails=await course.findById(courseId);
        courseDetails.courseContent.pull(sectionId);
        await courseDetails.save();

        //delete in database
        await section.findByIdAndDelete(sectionId);

        //find course details
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
        
        
        //retrun response
        return res.status(200).json({
            success:true,
            message:'Section deleted successfully',
            data:newCourseDetails
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Something went wrong while deleting section',
            error
        });
    }
}