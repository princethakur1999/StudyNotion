import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../slices/courseSlice';
import AddCourse from './AddCourse';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function EditCourse() {
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    async function populateCourseDetails() {
        const result = await getFullDetailsOfCourse(courseId, token);
        if (result.courseDetails) {
            dispatch(setEditCourse(true));
            dispatch(setCourse(result.courseDetails))
        }
    }

    useEffect(() => {
        populateCourseDetails()
    }, [])

    return (
        <div className='flex flex-col gap-5'>
            <h1 className='text-richblack-5 mb-9 font-medium text-3xl'>Edit Course</h1>
            {
                course ?
                    (<AddCourse />) :
                    (<div className='w-full h-[20rem] flex justify-center items-center'>
                        <p className='text-richblack-50 text-2xl font-bold tracking-wider'>No courses found</p>
                    </div>)
            }
        </div>
    )
}

export default EditCourse
