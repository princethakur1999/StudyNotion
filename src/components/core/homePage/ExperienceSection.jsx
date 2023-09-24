import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import ListItem from './ListItem'
import Ellipse3 from "../../../assets/Images/Ellipse3.svg"
import timelineImage from '../../../assets/Images/TimelineImage.png'
import timelineLogo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import timelineLogo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import timelineLogo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import timelineLogo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import line from '../../../assets/TimeLineLogo/Line.svg'
import { useSelector } from 'react-redux'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function ExperienceSection() {
    const { token } = useSelector((state => state.auth));
    return (
        <div className='mx-auto max-w-[100rem]'>
            {/* heading and its description */}
            <div className='w-[85%] flex flex-col md:flex-row md:gap-8 gap-3 mx-auto mt-[5.625rem] mb-16'>
                <div className='md:w-1/2 font-semibold text-4xl '>
                    Get the skills you need for a <HighlightText text={`job\n that is in demand.`} />
                </div>
                <div className='md:w-1/2 font-medium'>
                    The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    <div className='w-fit mt-12 '><CTAButton yellow={true} linkTo={`${token===null?'/signup':'/catalog'}`} >Learn More</CTAButton></div>
                </div>
            </div>

            <div className='flex md:flex-row flex-col gap-[4.75rem] lg:w-[85%] md:w-[92%] mx-auto items-center  mb-[9.625rem]'>
                {/* list itmes starring with Leadership */}
                <div className='md:w-[40%]  flex flex-col '>
                    <ListItem logo={timelineLogo1} heading={'Leadership'} para={'Fully committed to the success company'} />
                    <img src={line} alt="lineImage" className='h-[2.625rem] lg:my-2 w-fit lg:mx-[1.625rem] md:mx-[1.7rem] mx-[1.2rem]' />
                    <ListItem logo={timelineLogo2} heading={'Responsibility'} para={'Students will always be our top priority'} />
                    <img src={line} alt="lineImage" className='h-[2.625rem] lg:my-2 w-fit lg:mx-[1.625rem] md:mx-[1.7rem] mx-[1.2rem]' />
                    <ListItem logo={timelineLogo3} heading={'Flexibility'} para={'The ability to switch is an important skills'} />
                    <img src={line} alt="lineImage" className='h-[2.625rem] lg:my-2 w-fit lg:mx-[1.625rem] md:mx-[1.7rem] mx-[1.2rem]' />
                    <ListItem logo={timelineLogo4} heading={'Solve the problem'} para={'Code your way to a solution'} />
                </div>
                {/* image and green block overlapping it */}
                <div className='md:w-[60%] w-[90%] relative '>
                    {/* backgrounf gradient */}
                    <img src={Ellipse3} className='absolute md:top-[-4rem] md:left-[-5rem] top-[-2.3rem] left-[-2rem]' />
                    <div className='lg:w-[44.625rem] relative '>
                        <img src={timelineImage} alt="Image" className='relative md:shadow-[20px_20px_0px_0px_rgba(255,255,255,1)] shadow-[10px_10px_0px_0px_rgba(44,169,226,1)] rounded-md drop-shadow-lg object-cover 
                        md:h-[25rem] xl:h-full ' />
                        {/* green block -10 years experince */}
                        <div className='md:scale-[0.6] scale-90 xl:scale-100 flex w-[16rem] md:w-[31.938rem] bg-[#3B79AA] md:bg-caribbeangreen-700 md:p-[2.625rem] p-[0.6rem] absolute z-10 
                        lg:bottom-[-4.12rem] lg:right-[13%]  md:right-[-15%] md:bottom-[-4.12rem] right-[-1%] bottom-[-3.12rem] rounded-md md:shadow-[0px_0px_0px_3px_rgba(67,160,71,1)] shadow-[0px_0px_0px_3px_rgba(21,101,192,1)] items-center'>
                            <div className='flex md:gap-6 md:flex-row flex-col gap-1 text-center md:text-left'>
                                <div className='font-bold md:text-4xl text-lg text-white '>10</div>
                                <div className='md:text-caribbeangreen-300 text-[#1a3b7e] uppercase font-medium md:text-base text-xs'>years experience</div>
                            </div>
                            <div className='h-11 w-[0.14rem] md:bg-caribbeangreen-500 bg-[#1565C0] rounded-full mx-2 md:mx-10'></div>
                            <div className='flex md:gap-6 md:flex-row flex-col gap-1 text-center md:text-left'>
                                <div className='font-bold md:text-4xl text-lg text-white '>250</div>
                                <div className='md:text-caribbeangreen-300 text-[#1a3b7e] uppercase font-medium md:text-base text-xs'>types of courses</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExperienceSection
