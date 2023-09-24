import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import CTAButton from './CTAButton'
import HighlightText from './HighlightText'
import Banner from '../../../assets/Images/banner.mp4'
import Ellipse from "../../../assets/Images/Ellipse.png"
import { useSelector } from 'react-redux'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE: YES ##########//
//#####################################################//

function HeroSection() {
    const { token } = useSelector((state => state.auth));
    return (
        <div className="relative mx-auto flex flex-col w-[95%] md:w-11/12 items-center text-white  justify-between max-w-[98rem] ">

            {/* heading */}
            <div className='text-3xl md:text-4xl font-inter font-semibold md:text-center mt-12 mb-4 md:px-16'>
                Empower Your Future with <HighlightText text={'Coding Skills'} />
            </div>

            {/* para */}
            <div className='text-richblack-300 font-medium text-base leading-6 md:text-center xl:w-[57.063rem] '>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            {/* Sign up Now and Learn More buttons */}
            {token === null ?
                (<div className='mt-[2.375rem] flex gap-6 font-medium '>
                    <CTAButton yellow={true} linkTo={'/signup'}>
                        Sign up Now
                    </CTAButton>
                    <CTAButton yellow={false} linkTo={'/login'}>
                        Learn More
                    </CTAButton>
                </div>) :
                (<div className='mt-[2.375rem] font-medium '>
                    <CTAButton yellow={true} linkTo={'/catalog'} >Start Exploring</CTAButton>
                </div>
                )}


            {/* video and the blur ellipse behinde it */}
            <div className='relative mx-auto w-[90%] z-20 mt-[3.625rem] mb-[8.688rem] '>
                <img src={Ellipse} className='absolute  top-[-40px] right-4 -z-30' />
                <video src={Banner} muted loop autoPlay className='mx-auto  md:h-[32.188rem] shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] md:shadow-[20px_20px_0px_0px_rgba(255,255,255,1)] rounded-md object-cover' />
            </div>

        </div>
    )
}

export default HeroSection
