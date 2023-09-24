import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import thirdImg from "../../../assets/Images/Plan_your_lessons.svg"
import { useSelector } from 'react-redux'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function LearnAnyLangSection() {
    const { token } = useSelector((state => state.auth));
    return (
        <div className='mx-auto max-w-[100rem]'>
            {/* heading and its description */}
            <div className='md:w-[85%] w-[95%] mx-auto flex flex-col gap-3 md:mb-12'>
                <h2 className='md:text-center  font-semibold text-3xl md:text-4xl text-richblack-900'>Your swiss knife for <HighlightText text={'learning any language'} /></h2>
                <p className='md:text-center font-medium md:w-[60%] mx-auto'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
            </div>
            {/* overlapping images */}
            <div className='-translate-x-6 lg:w-[75%] md:w-[90%] md:-translate-x-[7rem] xl:-translate-x-[3rem] scale-75 xl:scale-100 lg:pl-[6rem] md:p-0 md:flex md:mx-auto xl:mx-auto lg:ml-14 lg:mb-28 md:mb-16  w-full '>
                <div className="backgroundImage1 w-[27.313rem] h-[27.25rem]  bg-no-repeat relative " >
                    <div className="backgroundImage2 w-[29.3rem] h-[32.25rem]  bg-no-repeat absolute md:right-[-20rem] md:top-[-2.8rem] md:bottom-[unset] md:left-[unset] bottom-[-22rem] left-[-3rem]">
                        <img src={thirdImg} alt="thirdImage" className='absolute bottom-[-18rem] md:bottom-[unset] md:top-[-0.5rem] lg:left-[22rem] md:left-[16rem]' />
                    </div>
                </div>
            </div>
            <div className='h-[27rem] md:hidden'></div>
            {/* learn more button */}
            <div className='flex w-[85%] mx-auto md:pb-24 pb-5 justify-center '>
                <CTAButton yellow={true} linkTo={`${token===null?'/signup':'/catalog'}`}>Learn More</CTAButton>
            </div>

        </div>
    )
}

export default LearnAnyLangSection
