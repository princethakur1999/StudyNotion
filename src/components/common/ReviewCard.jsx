import React from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import ReactStars from "react-rating-stars-component";

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE: YES ###########//
//#####################################################//

function ReviewCard({ image, firstName, lastName, email, courseName, review, rating }) {
    return (
        <div className='border-[1px] border-richblack-400 flex flex-col gap-3 justify-between bg-richblack-700 rounded-lg px-3 py-4 w-[17rem] md:min-w-[22rem] md:max-w-[22rem] md:w-[22rem] h-[17rem]'>
            <div className='flex flex-col gap-5'>
                <div className='flex gap-3 items-center'>
                    <img src={image} alt="profile img" className='bg-white aspect-square rounded-full w-[52px] ' />
                    <div className='flex flex-col'>
                        <p className='text-richblack-5 font-medium text-lg'>{firstName} {lastName}</p>
                        <p className='text-richblack-400 text-sm font-light'>{email}</p>
                    </div>
                </div>
                <p className='text-richblack-5 font-medium text-sm text-center customGradient'>
                    {courseName}
                </p>
            </div>

            <p className='text-richblack-25 overflow-y-scroll no-scrollbar'>
                {review}
            </p>
            <div className='flex gap-2 items-center '>
                <p className='text-yellow-50 font-semibold'>{rating.toFixed(1)}</p>
                <ReactStars
                    value={rating}
                    count={5}
                    size={19}
                    color={'#424854'}
                    activeColor={'#FFD60A'}
                    edit={false}
                    isHalf={true}
                    emptyIcon={<BsStar className='mx-[0.125rem]' />}
                    filledIcon={<BsStarFill className='mx-[0.125rem]' />}
                    halfIcon={<BsStarHalf className='mx-[0.125rem]' />}
                />
            </div>
        </div>
    )
}

export default ReviewCard
