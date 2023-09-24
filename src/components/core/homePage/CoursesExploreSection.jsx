import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import HighlightText from './HighlightText'
import { BsPeopleFill } from 'react-icons/bs'
import { ImTree } from 'react-icons/im'
import { HomePageExplore } from '../../../data/homepage-explore'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function CoursesExploreSection() {

    const tabsName = ['Free', 'New to coding', 'Most popular', 'Skills paths', 'Career paths'];

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const { token } = useSelector((state => state.auth));
    const divRef = useRef();
    const tabsContainer = useRef();


    function setMyCards(value) {

        setCurrentTab(value);

        const result = HomePageExplore.filter((courses) => courses.tag === value);
        console.log(HomePageExplore);

        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    useEffect(() => {

        let firstTab = tabsContainer.current?.firstChild?.nextSibling;
        let calcLeft = firstTab?.offsetLeft;

        divRef.current.style.setProperty('--_left', (calcLeft - 7) + 'px');

        divRef.current.style.width = firstTab?.offsetWidth + 'px';

    }, []);

    return (
        <>
            <div className='w-[100%] mx-auto  flex flex-col gap-16 min-h-[30rem] bg-richblack-900'>

                {/* unlock power of code heading and descrition */}
                <div className='flex flex-col items-center gap-2'>
                    <h3 className='font-semibold text-3xl md:text-4xl text-richblack-5 text-center '>Unlock the <HighlightText text={'Power of Code'} /></h3>
                    <p className='font-medium text-richblack-300 text-center '>Learn To Build That Can Imagine</p>
                </div>

                {/* tab names */}
                <div ref={tabsContainer} className='flex md:gap-2v gap-1 text-richblack-100 bg-richblack-800 max-w-[95%] md:w-fit md:px-3 md:py-2 p-1 rounded-full mx-auto overflow-x-scroll no-scrollbar relative'>

                    <div ref={divRef} className='absolute customGradient-Bg rounded-full  inset-[8px]  selectedTab ' ></div>

                    {tabsName.map((tab, index) => (

                        <div
                            key={index}
                            className={`z-20 text-sm md:text-base whitespace-nowrap text-center  py-2 px-2 md:px-4 md:py-2 ${tab === currentTab ? 'text-richblack-900 font-semiboldn active' : 'hover:text-richblack-400'} transition-all duration-200 cursor-pointer rounded-full `}
                            onClick={(e) => {
                                let calcLeft = e.target.offsetLeft;

                                console.log('calcLeft: ', calcLeft);

                                divRef.current.style.setProperty('--_left', (calcLeft - 7) + 'px');
                                divRef.current.style.width = e.target.offsetWidth + 'px';

                                setMyCards(tab)
                            }} >

                            {tab}
                        </div>

                    ))}
                </div>
                <div className='lg:hidden min-h-[55rem] '></div>
            </div>

            {/* explore catalog and learn more button and course cards */}
            <div className='flex items-center justify-center w-full h-80 bg-[url("./assets/Images/bghome.svg")] relative' >

                {/* course cards */}
                <div className='w-[90%] mx-auto lg:flex grid grid-rows-3 md:gap-9 justify-center absolute lg:top-[-14rem]  top-[-55rem] '>

                    {courses.map((card, index) => (

                        <div
                            key={index}
                            className={`lg:w-[21.33rem] md:w-[28rem] w-[19rem] scale-90 md:scale-100 cursor-pointer ${currentCard === card.heading ? 'bg-white md:shadow-[20px_20px_0px_0px_rgba(255,214,10,1)] shadow-[12px_12px_0px_0px_rgba(255,214,10,1)]' : 'bg-richblack-800'}  rounded-md transition-all duration-200 flex flex-col justify-between min-h-[20rem]`}
                            onClick={() => setCurrentCard(card.heading)}>
                            <div className='flex flex-col px-6 gap-3 py-8'>
                                <h4 className={`font-semibold text-xl ${currentCard === card.heading ? 'text-richblack-800' : 'text-richblack-25'}`}>
                                    {card.heading}
                                </h4>
                                <p className=' text-richblack-500 font-normal '>
                                    {card.description}
                                </p>
                            </div>

                            <div className='py-5 px-6 flex justify-between border-t-2 border-dashed border-richblack-50'>
                                <p className={`${currentCard === card.heading ? 'text-blue-500' : 'text-richblack-300'} font-medium flex gap-1 items-center`}>
                                    <BsPeopleFill />{card.level}
                                </p>
                                <p className={`${currentCard === card.heading ? 'text-blue-500' : 'text-richblack-300'} font-medium flex gap-1 items-center`}>
                                    <ImTree />{card.lessionNumber} Lessons
                                </p>
                            </div>
                        </div>

                    ))}
                </div>

                <div className='flex md:gap-3 gap-4 mt-20 flex-col md:flex-row items-center'>

                    <CTAButton yellow={true} linkTo={'/catalog'}>Explore Full Catalog <FaArrowRight className='h-[0.79rem] ml-3' /></CTAButton>
                    {
                        token === null && (<CTAButton yellow={false} linkTo={'/signup'}>Learn More</CTAButton>)
                    }
                </div>
            </div>
        </>

    )
}

export default CoursesExploreSection
