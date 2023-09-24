import React from 'react'

import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import GetAvgRating from '../../../utils/avgRating';
import { useState } from 'react';
import ReactStars from "react-rating-stars-component";
import RatingStars from '../../common/RatingStars';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//


function CourseCard({course,avgRating}) {

    return (
        <Link
        to={`/courses/${course._id}`} 
        className='flex flex-col gap-5 xl:max-w-[25rem] xl:w-[25rem] '>
            <img
                src={course?.thumbnail}
                className='md:w-[95%] xl:w-[24rem] max-h-[11.75rem] min-h-[11.75rem] object-cover bg-white rounded-xl'
            />
            <div className='flex flex-col gap-2'>
                <h4 className='font-medium text-richblack-5'>{course?.courseName}</h4>
                <p className='text-richblack-300'>By {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                <div className='flex gap-2 items-center'>
                    <p className='text-yellow-50 font-semibold'>{avgRating || 0}</p>
                    <RatingStars Review_Count={avgRating} Star_Size={23}/>
                    
                    <span>{course?.ratingAndReviews?.length}</span>
                </div>
                <p className='text-richblack-5 text-xl font-semibold'>₹{course?.price}</p>

            </div>
        </Link>
    )
}

export default CourseCard
