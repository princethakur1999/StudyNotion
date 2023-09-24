import React, { useState } from 'react'
import { AiOutlinePlusCircle, AiFillClockCircle } from 'react-icons/ai'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { TbEdit } from 'react-icons/tb'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { deleteCourse, fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
import { COURSE_STATUS } from '../../../utils/constants'
import ConfirmationModal from '../../common/ConfirmationModal'
import { toast } from 'react-hot-toast'
import { resetCourseState } from '../../../slices/courseSlice'
import { formattedDate } from '../../../utils/dateFormatter'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function MyCourses() {
    const { token } = useSelector((state) => state.auth);
    const [courses, setCourses] = useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [confirmationModal, setConfirmationModal] = useState(null)


    let courseWidth = 'w-[70%]';
    let othersWidth = 'w-[10%]';

    const ResponsiveCourseWidth = 'w-[37rem]';
    const ResponsiveOthersWidth = 'w-[5rem]';

    const fetchCourses = async () => {
        const result = await fetchInstructorCourses(token);
        if (result) {
            setCourses(result)
        }
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    async function handleCourseDelete(courseId) {
        console.log('courseId:',courseId)
        
        const deletedCourseRes=await deleteCourse({courseId},token)
        console.log('deletedCourseRes',deletedCourseRes)
        if(!deletedCourseRes){
            setConfirmationModal(null)
            return 
        }
        fetchCourses()
        setConfirmationModal(null)
    }

    return (
        <div className='flex flex-col gap-9'>
            <div className='flex justify-between'>

                <h1 className='text-richblack-5 font-medium text-3xl'>
                    My Course
                </h1>

                <button onClick={() => navigate('/dashboard/add-course')} className='py-2 px-5 flex gap-2 items-center text-richblack-900 font-medium bg-yellow-50 rounded-md'>
                    <AiOutlinePlusCircle />New
                </button>

            </div>

            {courses.length ?
                (
                    <div className='overflow-x-scroll md:overflow-x-auto'>
                    <div className=' flex flex-col rounded-lg border-[1px] border-richblack-600 w-fit md:w-[unset] mb-5'>
                        {/* columns heading */}
                        <div className=' flex gap-2 p-4 font-medium text-richblack-100 text-sm  border-b-[1px] border-richblack-600 ' >
                            <div className={`md:${courseWidth} ${ResponsiveCourseWidth} uppercase`}>COURSES</div>
                            <div className={`md:${othersWidth} ${ResponsiveOthersWidth} uppercase`}>DURATION</div>
                            <div className={`md:${othersWidth} ${ResponsiveOthersWidth} uppercase`}>PRICE</div>
                            <div className={`md:${othersWidth} ${ResponsiveOthersWidth} uppercase`}>ACTIONS</div>
                        </div>

                        <div className='flex flex-col '>
                            {courses.map((course) => (
                                <div
                                    key={course._id}
                                    className='p-4 flex gap-2 border-b-richblack-600 border-[1px]'>
                                    {/* course thumbnail and description */}
                                    <div className={`flex gap-6 md:flex-col lg:flex-row md:${courseWidth} ${ResponsiveCourseWidth}`}>
                                        <img src={course.thumbnail} alt="thumbnail" className='w-[13.813rem] lg:w-[13.813rem] md:w-[80%] h-[9.25rem] bg-white rounded-lg my-auto object-cover' />

                                        <div className='flex flex-col justify-between'>
                                            <h3 className='text-richblack-5 text-xl font-semibold  my-1'>
                                                {course.courseName}
                                            </h3>
                                            <p className='text-richblack-100 text-sm pr-[0.313rem] my-1'>
                                                {course.courseDescription}
                                            </p>
                                            <p className='text-richblack-25 text-xs font-medium  my-1'>
                                            {formattedDate(course?.createdAt)}
                                            </p>
                                            <div className={`${course.status === COURSE_STATUS.PUBLISHED ? 'text-yellow-100' : 'text-pink-200'}  text-xs font-medium py-1 px-2 rounded-full bg-richblack-700 w-fit flex gap-1 items-center my-1`}>
                                                {course.status === COURSE_STATUS.PUBLISHED ?
                                                    (<>
                                                        <BsFillCheckCircleFill />
                                                        Published
                                                    </>) :
                                                    (<>
                                                        <AiFillClockCircle />
                                                        Draft
                                                    </>)}

                                            </div>

                                        </div>
                                    </div>

                                    {/* duration */}
                                    <div className={`text-richblack-100 text-sm font-medium my-auto md:${othersWidth} ${ResponsiveOthersWidth}`}>
                                        {course?.totalTime}
                                    </div>

                                    {/* price */}
                                    <div className={`text-richblack-100 text-sm font-medium my-auto md:${othersWidth} ${ResponsiveOthersWidth}`}>
                                        {course.price}
                                    </div>

                                    {/* actions */}
                                    <div className={`flex my-auto  gap-3 text-richblack-400 text-2xl md:${othersWidth} ${ResponsiveOthersWidth}`}>
                                        <TbEdit 
                                        onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)}
                                        className='cursor-pointer hover:text-richblack-50 transition-colors' />
                                        <RiDeleteBin5Fill
                                            onClick={() => {
                                                setConfirmationModal({
                                                        text1: 'Do you want to delete this course?',
                                                        text2: 'All the data related to this course will be deleted',
                                                        btn1Text: 'Delete',
                                                        btn2Text: 'Cancel',
                                                        btn1Handler: ()=>handleCourseDelete(course._id),
                                                        btn2Handler: () => setConfirmationModal(null)
                                                    })
                                            }}
                                            className='cursor-pointer hover:text-[red] transition-colors ' />
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    </div>
                    
                ) :
                (
                    <div className='w-full h-[20rem] flex justify-center items-center'>
                        <p className='text-richblack-50 text-2xl font-bold tracking-wider'>No courses found</p>
                    </div>
                )}

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default MyCourses
