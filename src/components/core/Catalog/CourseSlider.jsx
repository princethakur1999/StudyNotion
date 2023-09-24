import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CourseCard from './CourseCard';
import { useRef } from 'react';
import { useEffect } from 'react';
import GetAvgRating from '../../../utils/avgRating';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function CourseSlider({ courses }) {

    return (
        <>
            <div className='hidden md:hidden lg:block'>
                {
                    courses?.length ?
                        (
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={11}
                                navigation={true}
                                slidesPerView={3}
                            >
                                {
                                    courses?.map((course, index) => (
                                        <SwiperSlide
                                            key={index}>
                                            <CourseCard course={course} avgRating={GetAvgRating(course?.ratingAndReviews)}/>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>


                        ) :
                        (<p className='text-center text-richblack-25'>No Course found</p>)
                }

            </div>
            <div className='md:hidden block '>
            {
                courses?.length ?
                    (
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            navigation={true}
                            slidesPerView={1}
                        >
                            {
                                courses?.map((course, index) => (
                                    <SwiperSlide
                                        key={index}>
                                        <CourseCard course={course} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>


                    ) :
                    (<p className='text-center text-richblack-25'>No Course found</p>)
            }

        </div>
            <div className='md:block hidden  lg:hidden'>
            {
                courses?.length ?
                    (
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            navigation={true}
                            slidesPerView={2}
                        >
                            {
                                courses?.map((course, index) => (
                                    <SwiperSlide
                                        key={index}>
                                        <CourseCard course={course} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>


                    ) :
                    (<p className='text-center text-richblack-25'>No Course found</p>)
            }

        </div>
        </>

    )
}

export default CourseSlider
