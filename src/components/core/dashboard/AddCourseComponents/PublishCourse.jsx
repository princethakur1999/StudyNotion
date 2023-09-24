import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { BsCaretLeft, BsFillCheckSquareFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setStep } from '../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../services/operations/courseDetailsAPI';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function PublishCourse() {
    const { watch, register, reset, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const { course, editCourse } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (course.status === COURSE_STATUS.PUBLISHED) {
            setValue('public', true);
        }
    }, [])

    function onSubmit(data) {
        handleCoursePublish()
    }

    function goToCourses() {
        dispatch(resetCourseState());
        navigate('/dashboard/my-courses')
    }

    async function handleCoursePublish() {
        if (course.status === COURSE_STATUS.PUBLISHED && getValues('public') === true ||
            course.status === COURSE_STATUS.DRAFT && getValues('public') === false) {
            //no updation in form
            goToCourses();
            return;
        }
        //if form is updated
        const formData = new FormData();
        formData.append('courseId', course._id);
        const courseStatus = getValues('public')?COURSE_STATUS.PUBLISHED:COURSE_STATUS.DRAFT;
        formData.append('status',courseStatus);

        
        const result=await editCourseDetails(formData,token);
        if(result){
            goToCourses()
        }

    }

    function goBack(params) {
        dispatch(setStep(2));
        localStorage.setItem('step', 2);
    }



    return (
        <div className='flex flex-col gap-6'>
            <h1 className='text-richblack-5 text-2xl font-semibold '>Publish Settings</h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-8'>
                <div className='flex gap-3 pl-1 items-center'>
                    <input
                        id='public'
                        {...register('public')}
                        type='checkbox' className='h-fit' />
                    <label htmlFor="public" className='text-richblack-400 font-medium'>Make this Course Public</label>
                </div>
                <div className='flex gap-2 md:flex-row flex-col-reverse '>
                    <button
                        onClick={goBack}
                        className='py-2 md:py-3 px-6 text-sm md:text-base rounded-lg border text-richblack-300 font-medium flex items-center md:w-fit gap-2 hover:bg-richblack-300 hover:text-richblack-900 transition-all hover:font-semibold justify-center'>
                        <BsCaretLeft className='md:text-xl text-lg' />
                        <p>Back</p>
                    </button>
                    <button
                        //onClick={goNext}
                        type='submit'
                        className='py-2 md:py-3 px-6  text-sm md:text-base rounded-lg border text-richblack-900 bg-yellow-100 font-medium flex items-center md:w-fit gap-2 hover:bg-opacity-0 
                    hover:text-yellow-50 transition-all justify-center'>
                        <p>Save Changes</p>
                        <BsFillCheckSquareFill className='md:text-xl text-lg' />
                    </button>
                </div>
            </form>



        </div>
    )
}

export default PublishCourse
