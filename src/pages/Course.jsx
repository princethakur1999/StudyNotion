import React from 'react'
import ReactStars from "react-rating-stars-component";
import { BsStarFill, BsStar, BsStarHalf, BsFillClockFill } from 'react-icons/bs'
import { BiDownArrow } from 'react-icons/bi'
import { HiCursorClick } from 'react-icons/hi'
import { FaDesktop } from 'react-icons/fa'
import { ImMobile } from 'react-icons/im'
import { TbFileCertificate } from 'react-icons/tb'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { buyCourse } from '../services/operations/studentsFeaturesAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import ConfirmationModal from '../components/common/ConfirmationModal';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { addToCart } from '../slices/cartSlice';
import RatingStars from '../components/common/RatingStars';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function Course() {
    const buttonClasses = 'py-3 px-6 font-medium rounded-lg shadow-[1px_1px_0px_0.5px_rgba(255,255,255,0.51)] hover:scale-95 transition-all duration-200 hover:shadow-[0px_0px_0px_2px_rgba(18,216,250,1)]';
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState();
    
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const cardHeight=useRef();
    const [courseCardHeight, setCourseCardHeight] = useState('');
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const divHeight=useRef();

    useEffect(() => {
        const updateDimension = () => {
          setScreenSize(window.innerWidth)
        }
        window.addEventListener('resize', updateDimension);
        
        return(() => {
            window.removeEventListener('resize', updateDimension);
        })
      }, [screenSize])
    


    function handleBuyCourse() {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1: 'You are not logged in',
            text2: 'Please Login to Buy the course',
            btn1Text: 'Login',
            btn2Text: 'Cancle',
            btn1Handler: () => navigate('/login'),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    function handleAddToCart() {
        if (token) {
            dispatch(addToCart(courseData.data));
            return;
        }
        setConfirmationModal({
            text1: 'You are not logged in',
            text2: 'Please Login to Buy the course',
            btn1Text: 'Login',
            btn2Text: 'Cancle',
            btn1Handler: () => navigate('/login'),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    function handleShare() {
        copy(window.location.href);
        toast.success('Link Copied')
    }

    async function getCourseDetails() {
        const result = await fetchCourseDetails(courseId)
        setCourseData(result)
    }

    useEffect(() => {
        getCourseDetails()
    }, [])
    useEffect(() => {
        
        setCourseCardHeight((((cardHeight.current.clientHeight)-(divHeight.current.clientHeight))-40)+'px')
        console.log('course card hieght:',courseCardHeight)
    }, [cardHeight?.current?.clientHeight,screenSize])

    useEffect(() => {
        let lectures = 0;
        courseData?.data?.courseContent?.forEach(section => {
            lectures += section.subSection.length;
            setTotalNoOfLectures(lectures)
        })
    }, [courseData])

    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.ratingAndReviews);
        setAvgReviewCount(count)
    }, [courseData])


    function getDuration(duration) {
        //videos having duration of only few seconds e.g -> 5s ,10s 
        if (duration.length <= 3) {
            let noOfSeconds = duration.slice(0, (duration.indexOf('s')))
            return noOfSeconds.length == 2 ? `00:00:${noOfSeconds}` : `00:00:0${noOfSeconds}`
        }
        //videos having duration of some minutes and some seconds e.g->13m 3s , 1m 45s
        if (duration.includes('s')) {
            let noOfMins = duration.slice(0, (duration.indexOf('m')))
            let noOfSeconds = duration.slice((duration.indexOf('m') + 2), -1)

            return noOfMins.length == 1 ?
                `00:0${noOfMins}:${noOfSeconds.length == 1 ? `0${noOfSeconds}` : `${noOfSeconds}`}` :
                `00:${noOfMins}:${noOfSeconds.length == 1 ? `0${noOfSeconds}` : `${noOfSeconds}`}`

        }
        //videos with some hours and minutes e.g->2h 4m , 22h 56m
        let noOfHours = duration.slice(0, (duration.indexOf('h')))
        let noOfMins = duration.slice((duration.indexOf('h') + 2), -1)

        return noOfHours.length == 1 ?
            `0${noOfHours}:${noOfMins.length == 1 ? `0${noOfMins}` : `${noOfMins}`}:00` :
            `${noOfHours}:${noOfMins.length == 1 ? `0${noOfMins}` : `${noOfMins}`}:00`
    }

    return (
        <div className='flex flex-col gap-10 pb-6 '>
            <div className='flex lg:flex-row flex-col justify-between gap-5 px-3 md:px-8 xl:px-[7.5rem] py-8 bg-richblack-800'>
                <div className='flex flex-col justify-between gap-3 relative flex-1 '>
                    <p className='text-sm text-richblack-300 '>Home / Catalog / <span className='text-yellow-50'>{courseData?.data?.category?.name}</span></p>
                    <h1 className='text-richblack-5 text-3xl font-medium'>{courseData?.data?.courseName}</h1>
                    <p className='text-sm text-richblack-200 leading-6'>
                        {courseData?.data?.courseDescription}
                    </p>
                    <div className='flex gap-2 items-center flex-wrap'>
                        <p className='text-yellow-50 font-semibold md:text-base text-sm'>{avgReviewCount}</p>
                        <div className='hidden md:block'>
                        <RatingStars Review_Count={avgReviewCount} Star_Size={23}/>
                            {/* <ReactStars
                                value={avgReviewCount}
                                count={5}
                                size={23}
                                color={'#424854'}
                                activeColor={'#FFD60A'}
                                isHalf={true}
                                edit={false}
                                emptyIcon={<BsStar className='mx-[0.125rem]' />}
                                filledIcon={<BsStarFill className='mx-[0.125rem]' />}
                                halfIcon={<BsStarHalf className='mx-[0.125rem]' />}
                            /> */}
                        </div>
                        <div className='md:hidden block'>
                        <RatingStars Review_Count={avgReviewCount} Star_Size={23}/>
                        </div>
                        <span className='text-richblack-25 md:text-base text-sm'>({courseData?.data?.ratingAndReviews?.length} ratings)</span>
                        <span className='text-richblack-25 md:text-base text-sm'>{(courseData?.data?.studentsEnrolled)?.length} Students enrolled</span>
                    </div>
                    <p className='text-richblack-25'>Created By {courseData?.data?.instructor?.firstName} {courseData?.data?.instructor?.lastName}</p>
                </div>

                <div className='bg-richblack-600 w-[0.129rem] rounded-3xl '></div>
                <div 
                ref={divHeight}
                className=' min-h-[15.875rem]  lg:min-w-[24rem] relative '>
                    <div 
                    ref={cardHeight}
                    className='flex flex-col bg-richblack-800 border-[1px] border-richblack-100 rounded-2xl absolute left-0 top-0 right-0'>
                        <img src={courseData?.data?.thumbnail} alt="course Image" className='object-cover bg-white rounded-t-2xl' />
                        <div className='flex flex-col p-6 gap-4'>
                            <p className='text-richblack-5 font-bold text-3xl'>₹{courseData?.data?.price}</p>
                            {user?.accountType !== 'Instructor' &&
                                (courseData?.data?.studentsEnrolled?.includes(user?._id) ?
                                    (<button
                                        onClick={() => navigate('/dashboard/enrolled-courses')}
                                        className={`bg-yellow-50 text-black ${buttonClasses}`}>
                                        Go to Course
                                    </button>) :
                                    (<div className='flex flex-col gap-3 '>
                                        <button
                                            onClick={handleAddToCart}
                                            className={`bg-yellow-50 text-black ${buttonClasses}`}>
                                            Add to cart
                                        </button>
                                        <button
                                            onClick={handleBuyCourse}
                                            className={`bg-richblack-900 text-richblack-25 ${buttonClasses}`}>
                                            Buy now
                                        </button>
                                        <p className='text-sm text-richblack-25 text-center'>30-Day Money-Back Guarantee</p>
                                    </div>))
                            }

                            <div className='flex flex-col gap-2 text-sm text-caribbeangreen-100 font-medium max-h-[8rem] min-h-[5rem] overflow-y-scroll lg:max-h-[unset] lg:min-h-[unset] lg:overflow-y-visible no-scrollbar'>
                                <h5 className='text-base text-richblack-5'>This course Requirements:</h5>
                                {courseData?.data?.instructions[0]?.split(",").map((req, index) => (
                                    <div key={index} className='flex gap-2 items-center'>
                                        <HiCursorClick />
                                        <p>{req}</p>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleShare}
                                className='text-yellow-100 font-medium py-3 px-6'>Share</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col-reverse lg:flex-row  px-3  xl:px-[7.5rem]  lg:mt-[unset]'>
                <div className='flex flex-col gap-10 '>
                    <div className={`text-richblack-50 font-medium text-sm flex flex-col gap-3 p-5 md:p-8 border-[1px] border-richblack-600 rounded-2xl `}>
                        <h2 className='text-richblack-5  text-xl md:text-3xl'>What you'll learn</h2>
                        <p >{courseData?.data?.whatYouWillLearn}</p>
                    </div>

                    <div className='flex flex-col gap-3 '>
                        <h2 className='text-richblack-5  text-2xl font-semibold'>Course content</h2>
                        <p className='text-sm  text-richblack-50'>
                            {courseData?.data?.courseContent?.length} sections • {totalNoOfLectures} lectures • {courseData?.totalDuration} total length
                        </p>
                        <div className='border-[1px] border-richblack-200 rounded-lg overflow-hidden'>

                            {courseData?.data?.courseContent?.map((section) => (
                                <details className='group'>
                                    <summary key={section._id} className='py-4 px-8 flex justify-between bg-richblack-700 text-sm  hover:cursor-pointer border-b-[1px] border-richblack-300 '>
                                        <p className='text-richblack-5  font-medium flex  items-center gap-2'>
                                            <BiDownArrow className='group-open:rotate-180 transition-all' />
                                            <p>{section?.sectionName}</p>
                                        </p>
                                        <span className='text-yellow-50'>{section?.subSection?.length} lectures </span>
                                    </summary>
                                    <div className='py-4 px-8 flex flex-col gap-3'>
                                        {section?.subSection?.map((subSection) => (
                                            <details key={subSection._id} className='group/child'>
                                                <summary className='text-sm flex justify-between hover:cursor-pointer '>
                                                    <div className='text-richblack-5 font-medium flex  items-center gap-2'>
                                                        <FaDesktop />
                                                        <p>{subSection?.title}</p>
                                                        <BiDownArrow className='text-xs group-open/child:rotate-180 transition-all' />
                                                    </div>
                                                    <p className='text-richblack-25'>
                                                        {
                                                            getDuration(subSection?.timeDuration)
                                                        }
                                                    </p>
                                                </summary>
                                                <p className='text-richblack-50 text-sm ml-4 mt-2'>
                                                    {subSection?.description}
                                                </p>
                                            </details>

                                        ))}
                                    </div>
                                </details>
                            ))}





                        </div>


                    </div>
                    <div className='flex flex-col gap-3'>
                        <h2 className='text-richblack-5  text-2xl font-semibold'>Author</h2>
                        <div className='flex gap-3 items-center'>
                            <img src={courseData?.data?.instructor?.image} alt="ProfilePic" className='aspect-square w-[52px] object-cover bg-white rounded-full ' />
                            <p className='font-medium text-richblack-5'>{courseData?.data?.instructor?.firstName} {courseData?.data?.instructor?.lastName}</p>
                        </div>
                        <p className='text-richblack-50 text-sm'>
                            {courseData?.data?.instructor?.additionalDetails?.about}
                        </p>
                    </div>
                </div>
                <div 
                style={{height:courseCardHeight}}
                className={`lg:w-[45%] lg:min-w-[26rem] xl:min-w-[25rem]  lg:block `}></div>

            </div>
            {confirmationModal &&
                <div className='absolute inset-0 top-[4.2rem]'>
                    <ConfirmationModal modalData={confirmationModal} />
                </div>
            }

        </div>




    )
}

export default Course
