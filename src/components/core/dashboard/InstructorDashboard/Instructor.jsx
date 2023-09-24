import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import { getInstructorData } from '../../../../services/operations/profileAPI'
import { Link } from 'react-router-dom'
import InstructorChart from './InstructorChart'
import { AiOutlinePlusCircle } from 'react-icons/ai'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

const chartValues = {
    Student: 'Student',
    Income: 'Income',
}

function Instructor() {
    const containerDivClasses = 'bg-richblack-800 rounded-lg border-[1px]  border-richblack-200 p-3'
    const [instructorData, setInstructorData] = useState(null)
    const [courses, setCourses] = useState(null)
    const [currChart, setCurrChart] = useState(chartValues.Student)
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)

    useEffect(() => {
        async function getCourseDataWithStats() {
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            if (instructorApiData.length) {
                setInstructorData(instructorApiData);
            }
            if (result) {
                setCourses(result)
            }
        }
        getCourseDataWithStats()
    }, [])

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

    return (
        <div className='flex flex-col gap-3 pb-3 md:pb-9'>
            <h1 className='text-4xl text-richblack-5 font-semibold mb-5'>Hi {user?.firstName} 👋🏼</h1>
            <div className='flex gap-3 md:flex-row flex-col'>
                {courses?.length > 0 && (
                    <div className={`${containerDivClasses} md:w-[70%] min-h-[20rem]`}>
                        <div className='flex flex-col gap-4'>
                            <h3 className='text-2xl font-bold tracking-wider customGradient-violet w-fit'>Visualize</h3>
                            <div className='flex gap-1'>
                                <button
                                    onClick={() => setCurrChart(chartValues.Student)}
                                    className={`px-3 py-1 font-medium bg-richblack-25 ${currChart !== chartValues.Student ? 'before:bg-[#0000008f] before:absolute before:inset-0 before:rounded-xl scale-90' : 'scale-100'} transition-all relative  rounded-xl`}>
                                    <p className='customGradient-violet'>Students</p>
                                </button>
                                <button
                                    onClick={() => setCurrChart(chartValues.Income)}
                                    className={`px-3 py-1 font-medium bg-richblack-25 ${currChart !== chartValues.Income ? 'before:bg-[#0000008f] before:absolute before:inset-0 before:rounded-xl scale-90' : 'scale-100'} transition-all relative  rounded-xl`}>
                                    <p className='customGradient-violet'>Income</p>
                                </button>
                            </div>
                            <InstructorChart courses={instructorData} currChart={currChart} />



                        </div>
                    </div>
                )}


                <div className={`${containerDivClasses} md:w-[30%] flex flex-col gap-3`}>
                    <h3 className='text-2xl font-bold tracking-wider customGradient-orange w-fit mb-4'>Statistics</h3>
                    <div className='flex flex-col gap-1'>
                        <h4 className='text-richblack-50 font-medium'>Total Courses</h4>
                        <p className='text-2xl text-white font-bold'>{courses?.length}</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h4 className='text-richblack-50 font-medium'>Total Students</h4>
                        <p className='text-2xl text-white font-bold'>{totalStudents || 0}</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h4 className='text-richblack-50 font-medium'>Total Income</h4>
                        <p className='text-2xl text-white font-bold'>₹ {totalAmount || 0}</p>
                    </div>

                </div>
            </div>

            <div className={`${containerDivClasses} flex flex-col gap-3`}>
                <div className='flex justify-between'>
                    <h4 className='text-2xl font-bold tracking-wider customGradient-orange w-fit '>Your Courses</h4>
                    {courses?.length > 0 && (
                        <Link
                            to='/dashboard/my-courses'
                            className='text-yellow-100 font-medium px-2 py-1 rounded-lg hover:bg-richblack-500 transition-all'>
                            View all
                        </Link>
                    )}

                </div>
                {courses?.length > 0 ?(
                    <div className='flex gap-2 w-full flex-wrap'>
                    {courses?.slice(0, 3)?.map((course) => (
                        <Link
                            to='/dashboard/my-courses'
                            className='md:max-w-[19.95rem] md:min-w-[19.95rem] min-h-[19rem] bg-gradient-to-r from-[#1a2a3aa9] to-[#17093294] rounded-xl border-[1px] border-richblack-400 p-2 flex flex-col gap-2 justify-between hover:bg-[#223b6e] hover:scale-[1.02] cursor-pointer transition-all duration-[400ms]'>
                            <div className='flex flex-col gap-2'>
                                <img
                                    src={course?.thumbnail}
                                    alt="thumbnail"
                                    className='bg-white rounded-xl min-h-[12rem] object-cover' />
                                <p className='text-lg font-semibold text-richblack-25'>{course?.courseName}</p>
                            </div>
                            <p className='text-richblack-300 font-medium'>{course?.studentsEnrolled.length} Students | ₹ {course?.price}</p>
                        </Link>
                    ))}


                </div>

                ):
                (
                    <Link
                    to={"/dashboard/add-course"}
                    className='text-richblack-25 md:text-lg py-2 rounded-lg gradientBg-violet text-center w-fit px-3 border-[2px] border-blue-400 font-medium active:border-blue-700 active:scale-95 self-center my-4 transition-all flex gap-2 items-center'>
                        Create a course <AiOutlinePlusCircle/>
                    </Link>
                )}
                
            </div>

        </div>
    )
}

export default Instructor
