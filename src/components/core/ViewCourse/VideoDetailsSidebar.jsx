import React from 'react'
import { MdOutlineRateReview } from 'react-icons/md'
import { BiDownArrow } from 'react-icons/bi'
import { BsChevronDoubleDown } from 'react-icons/bs'
import { FaPlay } from 'react-icons/fa'
import { useRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../../../services/operations/courseDetailsAPI';
import { useSelector } from 'react-redux';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function VideoDetailsSidebar({ setReviewModal }) {
    const { sectionId, subSectionId } = useParams()
    const location = useLocation()
    const [activeStatus, setActiveStatus] = useState('')
    const [videobarActive, setVideobarActive] = useState('')
    const [expandCollaspe, setExpandCollaspe] = useState(false)
    const { courseSectionData, courseEntireData, completedLectures, totalNoOfLectures } = useSelector((state) => state.viewCourse)
    const navigate = useNavigate()



    useEffect(() => {
        // setCourseData(courseSectionData);
        function setActiveFlags() {
            if (!courseSectionData?.length) {
                return;
            }
            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            setVideobarActive(activeSubSectionId);
        }
        setActiveFlags()

    }, [courseSectionData, courseEntireData, location.pathname])



    return (
        <div className='flex flex-col lg:gap-6 border-b-richblack-500 lg:border-b-0 border-[1px] lg:border-r-richblack-500 bg-richblack-800 lg:py-5 py-2 xl:max-w-[20rem] xl:w-[20rem] lg:w-[27rem] px-1'>
            <div className='flex flex-col gap-3 mx-5'>
                <h1 className='text-richblack-25 font-bold text-lg'>{courseEntireData?.courseName}</h1>
                <h1 className='text-caribbeangreen-100 font-semibold text-sm'>{completedLectures?.length}/{totalNoOfLectures} lectures watched</h1>
                <button
                    onClick={() => setReviewModal(true)}
                    className='hidden lg:flex items-center justify-center  text-black font-semibold gap-2 border border-yellow-200 rounded-lg py-2 
                 reviewBtn'>
                    <MdOutlineRateReview />
                    <p >Add Review</p>
                </button>
                
            </div>
            <div className={`transition-all  ${expandCollaspe?'h-full':'h-0 lg:h-full'} overflow-hidden`}>
                <div className='flex flex-col gap-1 '>
                    <button
                        onClick={() => setReviewModal(true)}
                        className='lg:hidden flex max-w-[20rem] w-[80%] mx-auto my-3 items-center justify-center  text-black font-semibold gap-2 border border-yellow-200 rounded-lg py-2 
                 reviewBtn'>
                        <MdOutlineRateReview />
                        <p >Add Review</p>
                    </button>
                    {courseSectionData?.map((section) => (
                        <>
                            <div key={section._id}
                                onClick={() => setActiveStatus(section._id)}
                                className='flex justify-between px-6 py-4 text-sm font-medium text-richblack-5 bg-richblack-700 rounded-md cursor-pointer '>
                                <p>{section.sectionName}</p>
                                <BiDownArrow />
                            </div>
                            <div
                                className={`${activeStatus === section._id ? 'h-[100%] ' : 'h-0'} overflow-hidden transition-all duration-[400ms] `}>
                                <div
                                    className={`  flex flex-col   text-sm font-medium text-richblack-5  overflow-hiddenn  transition-all `}>
                                    {section?.subSection?.map((subSec) => (

                                        <div
                                            key={subSec._id}
                                            onClick={() => {
                                                navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subSec?._id}`)
                                                setVideobarActive(subSec?._id)
                                            }}
                                            className={`px-6 py-3 flex gap-1 items-center ${videobarActive === subSec._id ? 'border-[1px] border-yellow-100' : ''} rounded-lg cursor-pointer `}>
                                            <input
                                                type="checkbox"
                                                checked={completedLectures.includes(subSec?._id)}

                                            />
                                            <label htmlFor="" className='cursor-pointer'>{subSec?.title}</label>

                                            <FaPlay className={`text-xs ml-2 text-yellow-100 ${videobarActive === subSec._id ? '' : 'hidden'} `} />
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </>



                    ))}

                </div>
            </div>
            <BsChevronDoubleDown 
            onClick={()=>setExpandCollaspe(!expandCollaspe)}
            className={`w-full  text-xl text-yellow-100 mt-2 ${expandCollaspe?'rotate-180':''} transition-all lg:hidden `}/>

        </div>
    )
}

export default VideoDetailsSidebar
