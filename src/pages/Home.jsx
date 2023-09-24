import React from 'react'
import HeroSection from '../components/core/homePage/HeroSection'
import CodeAnimationSection from '../components/core/homePage/CodeAnimationSection'
import CoursesExploreSection from '../components/core/homePage/CoursesExploreSection'
import ExperienceSection from '../components/core/homePage/ExperienceSection'
import LearnAnyLangSection from '../components/core/homePage/LearnAnyLangSection'
import BecomeInstructorSection from '../components/core/homePage/BecomeInstructorSection'
import Footer from '../components/core/homePage/Footer'
import ReviewSlider from '../components/common/ReviewSlider'


//#####################################################//
//########### COMPONENTS ARE RESPONSIVE: YES ##########//
//#####################################################//


function Home() {
    return (
        <div className='font-inter'>
            {/* Section 1 */}
            <HeroSection />

            {/* code section */}
            <CodeAnimationSection />

            {/* Section 2 */}
            <div className='w-full  bg-pure-greys-5'>
                <CoursesExploreSection />
                <ExperienceSection />
                <LearnAnyLangSection />
            </div>

            {/* Section 3 */}
            <BecomeInstructorSection />

            <div className='py-2 px-2 flex flex-col gap-6 items-center mb-6 '>
                <h2 className='text-richblack-5 text-3xl md:text-4xl font-semibold px-4'>Reviews from other learners</h2>
                <div className='lg:w-[75%] md:w-[90%] w-[95%] max-w-[75rem] '>
                    <ReviewSlider />
                </div>

            </div>


            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Home
