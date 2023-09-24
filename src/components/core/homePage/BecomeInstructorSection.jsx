import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function BecomeInstructorSection() {
    const { token } = useSelector((state => state.auth));
    const { user } = useSelector((state => state.profile));
    return (
        <div className='w-[85%] max-w-[91rem] mx-auto flex md:flex-row flex-col gap-14 md:gap-24 items-center py-10 md:py-20'>
            {/* Instructor image */}
            <div className='md:w-[50%] '>
                <img src={Instructor} alt='Instructor image' className='md:shadow-[-20px_-20px_0px_0px_rgba(255,255,255,1)] shadow-[-10px_-10px_0px_0px_rgba(255,255,255,1)] rounded-md ' />
            </div>
            {/* heading with description */}
            <div className='flex flex-col md:w-[50%]  gap-3 '>
                <h3 className='text-richblack-5 font-semibold text-4xl '>Become an <HighlightText text={`\ninstructor`} /></h3>
                <p className='font-medium text-richblack-300 mb-10 md:mb-16'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                {token===null ? 
                (<CTAButton yellow={true} linkTo={'/signup'} >Start Teaching Today <FaArrowRight className='h-[0.79rem] ml-3' /></CTAButton>):
                (user?.accountType==='Instructor'&&<CTAButton yellow={true} linkTo={'/dashboard/my-courses'} >Start Teaching Today <FaArrowRight className='h-[0.79rem] ml-3' /></CTAButton>)}
                
            </div>
        </div>
    )
}

export default BecomeInstructorSection
