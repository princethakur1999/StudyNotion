import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import { TbDotsVertical } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function EnrolledCourses() {
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate()

    async function getEnrolledCourses() {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response)
            console.log('getEnrolledCourses response:', response);

        } catch (error) {
            console.log('unable to fetch courses')
        }
    }

    useEffect(() => {
        getEnrolledCourses()
    }, [])

    return (
        <div className='flex flex-col gap-5 mb-5 lg:mb-[unset]'>
            {/* Enrolled Courses heading */}
            <h1 className='text-richblack-5 mb-9 font-medium text-3xl'>Enrolled Courses</h1>

            {!enrolledCourses || enrolledCourses.length === 0 ?
                (<div className='w-full h-[20rem] flex justify-center items-center'>
                    <p className='text-richblack-50 text-2xl font-bold tracking-wider text-center'>You have not enrolled in any courses</p>
                </div>) :
                (
                    <div className='overflow-x-scroll md:overflow-x-auto'>
                        <div className='flex gap-0 border border-richblack-300 rounded-xl overflow-hidden w-fit md:w-[unset]'>

                            {/* course div */}
                            <div className='flex flex-col w-[27rem] md:w-[48%]'>
                                {/* course heading */}
                                <div className='bg-richblack-700 p-4 text-sm font-medium text-richblack-50 '>
                                    Course Name
                                </div>
                                {/* course thumbnail and description */}
                                {enrolledCourses.map((course) => (

                                    <div
                                        onClick={
                                            () => {
                                                navigate(`/view-course/${course?._id}/section/${course?.courseContent[0]?._id}/sub-section/${course?.courseContent[0]?.subSection[0]?._id}`)
                                            }
                                        }
                                        key={course._id}
                                        className='p-4 flex gap-5 cursor-pointer'>
                                        {/* thumbnail */}
                                        <img src={course.thumbnail} className='aspect-square w-[4.65rem] h-[4.65rem] object-cover my-auto rounded-xl bg-[white]'></img>

                                        {/* course name and description */}
                                        <div>
                                            {/* heading */}
                                            <h3 className='text-richblack-5 font-medium'>
                                                {course.courseName}
                                            </h3>
                                            {/* description */}
                                            <p className='text-richblack-300 group'>
                                                {(course.courseDescription).length > 80 ? (`${(course.courseDescription).slice(0, 80)}...`) : course.courseDescription}

                                            </p>
                                        </div>
                                    </div>
                                ))}



                            </div>

                            {/* duration div */}
                            <div className='flex flex-col md:w-[20%]'>
                                {/* Durations heading */}
                                <div className='bg-richblack-700 p-4 text-sm font-medium text-richblack-50 '>
                                    Durations
                                </div>

                                {/* Duration in time */}
                                {enrolledCourses.map((course) => (
                                    <div key={course._id} className='text-richblack-50 font-medium flex items-center p-4  h-full'>
                                        <p>{course.totalDuration}</p>
                                    </div>
                                ))}

                            </div>

                            {/* progress div */}
                            <div className='flex flex-col w-[10rem] md:w-[32%]'>
                                {/* Progress heading */}
                                <div className='bg-richblack-700 p-4 text-sm font-medium text-richblack-50 '>
                                    Progress
                                </div>

                                {/* Progress bar */}
                                {enrolledCourses.map((course) => (
                                    <div key={course._id} className=' flex items-center p-4 gap-7 h-full'>
                                        <div className='flex flex-col gap-1 w-[80%]'>
                                            <p className='text-richblack-50 font-semibold text-xs'>Progress {course.progressPercentage || 0}%</p>
                                            <div
                                                style={{}}
                                                className={`bg-richblack-700 h-2 rounded-full w-full relative overflow-hidden `}>
                                                <div 
                                                style={{width:course.progressPercentage+'%'}}
                                                className={`absolute inset-0 bg-blue-300  rounded-full ${course.progressPercentage === null || course.progressPercentage === 0 ? 'w-[0px]' : ``}`}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>

                        </div>
                    </div>
                )}




        </div>
    )
}

export default EnrolledCourses
