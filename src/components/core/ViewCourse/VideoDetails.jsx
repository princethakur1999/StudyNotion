import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'; // import css
import { BsFillCheckSquareFill, BsRewindFill } from 'react-icons/bs'
import { TbArrowBackUp, TbArrowForwardUp } from 'react-icons/tb'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function VideoDetails() {
    const { courseId, sectionId, subSectionId } = useParams();
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const playerRef = useRef()
    const { token } = useSelector((state) => state.auth)
    const { courseSectionData, courseEntireData, completedLectures, totalNoOfLectures } = useSelector((state) => state.viewCourse)
    const [videoData, setVideoData] = useState([])
    const [videoEnded, setVideoEnded] = useState([])

    useEffect(() => {
        async function setVideoSpecificDetails() {
            if (!courseSectionData.length) {
                return;
            }
            if (!courseId && !sectionId && !subSectionId) {
                navigate('/dashboard/enrolled-courses')
            }
            else {
                const filteredData = courseSectionData.filter(
                    (course) => course._id === sectionId
                )

                const filteredVideoData = filteredData?.[0].subSection.filter(
                    (course) => course._id === subSectionId
                )
                console.log('filteredVideoData[0] :', filteredVideoData[0])
                setVideoData(filteredVideoData[0]);
                setVideoEnded(false)
            }
        }
        setVideoSpecificDetails()
    }, [courseSectionData, courseEntireData, location.pathname])

    function isFirstVideo() {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
            (data) => data._id === subSectionId
        )
        if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            return true
        } else {
            return false
        }
    }
    function isLastVideo() {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if (currentSectionIndex === courseSectionData.length - 1 &&
            currentSubSectionIndex === noOfSubSections - 1) {
            return true
        } else {
            return false
        }

    }
    function goToNextVideo() {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection.length

        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if (currentSubSectionIndex !== noOfSubSections - 1) {
            const nextSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex + 1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        } else {
            //first video of different section
            const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
            const nextSubSectionId = courseSectionData[currentSectionIndex + 1]?.subSection[0]._id;
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
        }

    }
    function goToPrevVideo(params) {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection.length

        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if (currentSubSectionIndex !== 0) {
            const prevSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex - 1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        } else {
            //different section last video
            const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
            const prevSubSectionLength = courseSectionData[currentSectionIndex - 1]?.subSection.length
            const prevSubSectionId = courseSectionData[currentSectionIndex - 1]?.subSection[prevSubSectionLength - 1]._id;
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
        }

    }
    async function handleLectureCompletion() {
        const res =await markLectureAsComplete({
            courseId,
            subSectionId
        },token)
        if(res){
            dispatch(updateCompletedLectures(subSectionId))
        }
    }

    return (
        <div className='flex flex-col w-full lg:w-[73rem] gap-3 p-3 mx-auto'>
            {
                !videoData ?
                    (
                        <div className='text-richblack-25 text-3xl text-center font-bold'>
                            No video found!
                        </div>
                    ) :
                    (
                        <div className='rounded-md overflow-hidden relative '>
                            <Player
                                ref={playerRef}
                                aspectRatio='16:9'
                                playsInline
                                onEnded={() => setVideoEnded(true)}
                                src={videoData?.videoUrl}

                            >


                            </Player>
                            {
                                videoEnded && (
                                    <div className='font-medium text-sm md:text-lg absolute z-30 inset-0 flex gap-3 items-center justify-center flex-col bg-[#00000081]'>
                                        <div className='flex gap-3'>
                                            {
                                                !completedLectures?.includes(subSectionId) && (
                                                    <button
                                                        onClick={() => handleLectureCompletion()}
                                                        className='py-2 px-3 bg-caribbeangreen-400 rounded-md text-white flex items-center gap-2 hover:outline outline-caribbeangreen-600 hover:scale-95 transition-all group'>
                                                        <BsFillCheckSquareFill className='group-hover:text-caribbeangreen-700 transition-all duration-300' />
                                                        Mark as Complete
                                                    </button>
                                                )
                                            }
                                            <button
                                                onClick={() => {
                                                    playerRef.current?.seek(0);
                                                    setVideoEnded(false)
                                                    playerRef.current?.play();
                                                }}
                                                className='py-2 px-3 bg-caribbeangreen-400 text-[white] rounded-md flex items-center gap-2 hover:scale-95 transition-all group hover:outline outline-caribbeangreen-600'>
                                                <BsRewindFill className='group-hover:text-caribbeangreen-700 transition-all duration-300' />
                                                Rewatch
                                            </button>
                                        </div>

                                        <div className='flex gap-3'>
                                            {!isFirstVideo() && (
                                                <button
                                                    onClick={() => {
                                                        goToPrevVideo()
                                                    }}
                                                    className='py-2 px-3 bg-yellow-100 text-[black] rounded-md flex items-center gap-2 hover:scale-105 hover:outline outline-yellow-400 transition-all'>
                                                    <TbArrowBackUp />
                                                    Previous
                                                </button>
                                            )}
                                            {!isLastVideo() && (
                                                <button
                                                    onClick={() => {
                                                        goToNextVideo()
                                                    }}
                                                    className='py-2 px-3 bg-yellow-100 text-[black] rounded-md flex items-center gap-2 hover:scale-105 hover:outline outline-yellow-400 transition-all'>
                                                    Next
                                                    <TbArrowForwardUp />
                                                </button>
                                            )}
                                        </div>

                                    </div>

                                )
                            }


                        </div>
                    )
            }
            <div className='flex flex-col gap-2'>
                <h1 className='text-richblack-5 text-2xl font-semibold'>{videoData?.title}</h1>
                <p className='text-richblack-50 text-sm font-medium'>{videoData?.description}</p>
            </div>

        </div>
    )
}

export default VideoDetails
