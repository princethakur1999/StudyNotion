import React from 'react'
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { MdClose } from 'react-icons/md'
import { FaExclamation } from 'react-icons/fa'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import ReactStars from "react-rating-stars-component";
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createRating, getReviewByUser } from '../../../services/operations/courseDetailsAPI';
import { useParams } from 'react-router-dom';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function CourseReviewModal({ setReviewModal }) {
    let [opacity, setOpacity] = useState('0');
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const modal = useRef();
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const { courseEntireData } = useSelector((state) => state.viewCourse)
    const [review,setReview]=useState('');
    const [stars,setStars]=useState(null);

    async function onSubmit(data) {
        await createRating({
            courseId: courseEntireData?._id,
            rating: data.courseRating,
            review: data.courseExperience
        }, token)
        setReviewModal(false)
        resumeScroll()
    }

    async function getReviewRating() {
        const courseId = courseEntireData?._id
        const result = await getReviewByUser(courseId, token)
        if (!result) {
            setStars(0)
            return console.log('result: ', result)
        }
        setReview(result?.data?.review)
        setStars(result?.data?.rating)
        console.log('result', result)

    }


    

    useEffect(() => {
        getReviewRating();
        setOpacity('100')
        setValue('courseExperience', '')
        setValue('courseRating', 0)

    }, [])

    useEffect(()=>{
        setValue('courseExperience',review)
        setValue('courseRating', stars)
    },[review,stars])



    useOnClickOutside(modal, () => setReviewModal(), () => resumeScroll())

    function stopScroll() {
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
    }
    function resumeScroll() {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    useEffect(() => {
        if (setReviewModal !== false) {
            stopScroll()
        }
    }, [])

    function ratingChange(newRating) {
        setValue('courseRating', newRating)
    }

    return (
        <div className={`absolute inset-0  flex items-center justify-center opacity-${opacity} transition-all duration-300 backdrop-blur-md z-50 h-[calc(100vh-4rem)]`}>
            <div
                ref={modal}
                className='flex flex-col  gap-8 bg-richblack-800 rounded-lg w-[90vw]  lg:w-[45rem] h-[33rem]'>

                <div className='bg-richblack-700 py-4 px-6 text-lg font-semibold flex justify-between items-center border-b-[1px] border-richblack-200 rounded-t-lg'>
                    <p className='text-richblack-5'>Add Review</p>
                    <MdClose
                        onClick={() => {
                            setReviewModal(false)
                            resumeScroll()
                        }}
                        className='text-pink-300 cursor-pointer text-xl' />
                </div>
                <div className='md:px-8 px-4 flex flex-col gap-6'>
                    <div className='flex flex-col justify-center items-center gap-3'>
                        <div className='flex gap-3 items-center justify-center'>
                            <img src={user?.image} alt="profile pic" className='aspect-square rounded-full bg-white w-[52px] object-cover' />
                            <p className='text-richblack-5 font-semibold'>{user?.firstName} {user?.lastName}</p>
                        </div>
                        <div>
                        {[0,1,2,3,4,5].includes(stars) ? (<ReactStars
                                value={stars}
                                count={5}
                                size={23}
                                color={'#424854'}
                                activeColor={'#FFD60A'}
                                onChange={ratingChange}
                                isHalf={true}
                                emptyIcon={<BsStar className='mx-[0.125rem]' />}
                                filledIcon={<BsStarFill className='mx-[0.125rem]' />}
                                halfIcon={<BsStarHalf className='mx-[0.125rem]' />}
                            />):null}
                            
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label
                            htmlFor="courseExperience"
                            className='text-richblack-5 text-sm flex items-center gap-2'>
                            <p>Add your experience <span className='text-[red]'>*</span></p>
                            <span className={`flex items-center gap-[0.13rem] text-pink-600  rounded-xl px-2 my-1 bg-pink-50 outline ${errors.courseExperience ? '' : 'hidden'}`}>
                                Required <FaExclamation />
                            </span>
                        </label>
                        <textarea
                            id='courseExperience'
                            type='text'
                            placeholder='Tell us about your experience with this course...'
                            {...register('courseExperience', { required: true })}
                            rows={5}
                            className='text-richblack-25 font-medium rounded-md p-3 bg-richblack-700 customGradient-outline  placeholder:italic flex-1'
                        />
                    </div>

                </div>
                <div className='md:px-8 px-4 mt-5 flex items-end justify-between gap-3'>
                    <button
                        onClick={handleSubmit(onSubmit)}
                        className='w-fit font-medium flex items-center justify-evenly py-3 px-6 rounded-lg bg-yellow-50 text-black shadow-[1px_1px_0px_2px_rgba(255,255,255,0.51)] hover:scale-95 transition-all duration-200 hover:shadow-[0px_0px_0px_2px_rgba(18,216,250,1)]'>Save</button>
                    <p className='text-richblack-25 text-xs font-light'>Posting Publicly</p>
                </div>

            </div>
        </div>
    )
}

export default CourseReviewModal
