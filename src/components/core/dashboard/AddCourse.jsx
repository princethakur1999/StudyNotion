import React from 'react'
import { courseFormData, courseCreateSteps } from '../../../data/courseFormData'
import { BsCheck } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import CourseInfoForm from './AddCourseComponents/CourseInfoForm';
import CourseBuilderFrom from './AddCourseComponents/CourseBuilderForm'
import PublishCourse from './AddCourseComponents/PublishCourse'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function AddCourse() {
    const { step } = useSelector((state) => state.course);

    return (
        <div className='flex lg:flex-row flex-col gap-6 pb-3 md:pb-8'>

            <div className='flex flex-col gap-8 lg:w-[60%] '>
                <div className='flex text-richblack-300 '>
                    {courseCreateSteps.map((item) => (
                        <div key={item.step} className={`flex flex-col gap-3  justify-center items-center flex-1 relative`}>
                            <p className={`${step == item.step ? 'border-yellow-50 text-yellow-50' : 'border-richblack-700'} text-lg bg-richblack-800 
                            border-[1px]  aspect-square flex items-center justify-center w-fit rounded-full `}>
                                {item.step >= step ?
                                    item.step :
                                    <BsCheck className='text-yellow-50 text-[1.88rem]' />}
                            </p>
                            <p className={`text-sm md:hidden`}>{item.heading==='Course Information'?'Course Info':item.heading}</p>
                            <p className={`text-sm hidden md:block`}>{item.heading}</p>
                            {item.step == '1' &&
                                (<div className={`h-[1px] w-[83%] border-dashed border-[1px]  absolute 
                                top-[25%] right-[-42%] ${(step >= item.step) && (step != 1) ? 'border-yellow-50' : 'border-richblack-400'}`}></div>)}
                            {item.step == '2' &&
                                (<div className={`h-[1px] w-[83%] border-dashed border-[1px]  absolute 
                                top-[25%] right-[-42%] ${(step == 3) ? 'border-yellow-50' : 'border-richblack-400'}`}></div>)}
                        </div>
                    ))}
                </div>

                <div className='bg-richblack-800 border rounded-lg border-richblack-500 p-2 md:p-6 flex flex-col gap-6 '>
                    {step == 1 && <CourseInfoForm />}
                    {step == 2 && <CourseBuilderFrom/>}
                    {step == 3 && <PublishCourse />}

                </div>
            </div>

            <div className='lg:w-[40%] bg-richblack-800 border rounded-lg border-richblack-700 p-2 md:p-6 h-fit flex flex-col gap-4'>
                <h3 className='text-lg font-semibold text-richblack-5 '>⚡Course Upload Tips</h3>
                <ul className='flex flex-col gap-2 text-richblack-5 font-medium text-xs list-disc pl-5 '>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>

        </div>
    )
}

export default AddCourse
