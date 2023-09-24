import React from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, EffectCards } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllReviewDetails } from '../../services/operations/courseDetailsAPI';
import ReviewCard from './ReviewCard';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE: YES ##########//
//#####################################################//


function ReviewSlider() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchAllReviews() {
            const { data } = await getAllReviewDetails();
            if (data?.success) {
                setReviews(data?.data)

            }
            console.log('reviews:', reviews)
        }
        fetchAllReviews()

    }, [])



    return (
        <>
            <div className={`md:pl-[10rem] md:block lg:hidden xl:hidden hidden `}>
                <Swiper
                    modules={[A11y, EffectCards]}
                    effect={'cards'}
                   
                >
                    {
                        reviews.map((review, index) => (
                            <SwiperSlide
                                className=' md:w-[22rem] md:max-w-[22rem] md:flex md:justify-center md:items-center'
                                key={index}>
                                <ReviewCard courseName={review?.course?.courseName} email={review?.user?.email} firstName={review?.user?.firstName} image={review?.user?.image} lastName={review?.user?.lastName} rating={review?.rating} review={review?.review} />

                            </SwiperSlide>
                        ))
                    }
                </Swiper>

            </div>
            <div className='lg:block md:hidden xl:hidden hidden '>
            <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, EffectCards]}
                    spaceBetween={10}
                    navigation={true}
                    slidesPerView={2}
                    loop={true}
                >
                    {
                        reviews.map((review, index) => (
                            <SwiperSlide
                                key={index}>
                                <ReviewCard courseName={review?.course?.courseName} email={review?.user?.email} firstName={review?.user?.firstName} image={review?.user?.image} lastName={review?.user?.lastName} rating={review?.rating} review={review?.review} />

                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <div className='lg:hidden md:hidden xl:block hidden '>
            <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, EffectCards]}
                    spaceBetween={10}
                    navigation={true}
                    slidesPerView={3}
                    loop={true}
                >
                    {
                        reviews.map((review, index) => (
                            <SwiperSlide
                                key={index}>
                                <ReviewCard courseName={review?.course?.courseName} email={review?.user?.email} firstName={review?.user?.firstName} image={review?.user?.image} lastName={review?.user?.lastName} rating={review?.rating} review={review?.review} />

                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <div className='md:hidden redborder '>
            <Swiper
                     modules={[A11y, EffectCards]}
                    effect={'cards'}
                >
                    {
                        reviews.map((review, index) => (
                            <SwiperSlide
                                key={index}>
                                <ReviewCard courseName={review?.course?.courseName} email={review?.user?.email} firstName={review?.user?.firstName} image={review?.user?.image} lastName={review?.user?.lastName} rating={review?.rating} review={review?.review} />

                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </>

    )
}

export default ReviewSlider
