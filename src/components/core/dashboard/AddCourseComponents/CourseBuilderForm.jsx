import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { BsCaretLeft, BsCaretRightFill } from 'react-icons/bs'
import { FaExclamation } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import { toast } from 'react-hot-toast';
import { createSection, updateSection } from '../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function CourseBuilderForm() {
    const inputClasses = 'text-richblack-50 font-medium rounded-md p-3 bg-richblack-700 customGradient-outline placeholder:text-sm placeholder:font-normal placeholder:text-richblack-400 placeholder:italic';
    const { watch, register, reset, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const [editSectionName, setEditSectionName] = useState(null);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading,setLoading]=useState();

    function cancelEdit() {
        setEditSectionName(null)
        setValue('sectionName', '');
    }

    function goBack() {
        dispatch(setEditCourse(true));
        dispatch(setStep(1));
        localStorage.setItem("step", 1)
        localStorage.setItem("editCourse", true)
        
    }
    function goNext() {
        if (course.courseContent.length === 0) {
            return toast.error('Please add atleast one section')
        }
        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            return toast.error('Please add atleast one lecture in each section')
        }

        dispatch(setStep(3));
        localStorage.setItem("step", 3)
    }

    async function onSubmit(data) {
        setLoading(true)
        let result ;

        if(editSectionName){
            result =await  updateSection({
                sectionName:data.sectionName,
                sectionId:editSectionName,
                courseId:course._id
            },token)
        }
        else{
            result=await createSection({
                sectionName:data.sectionName,
                courseId:course._id
            },token)
        }

        //update values
        if(result){
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue('sectionName','');
        }

        loading(false)
    }

    function handleChangeEditSectionName(sectionId,sectionName) {

        if(editSectionName===sectionId){
            cancelEdit()
        }

        setEditSectionName(sectionId);
        setValue('sectionName',sectionName)
    }

    return (
        <>
            <h1 className='text-richblack-5 text-2xl font-semibold '>Course Builder</h1>
            <div className=' flex flex-col gap-[0.375rem]'>
                <label
                    htmlFor="sectionName"
                    className='text-richblack-5 text-sm flex items-center gap-2'>
                    Section Name
                    <span className={`w-fit flex items-center gap-[0.13rem] text-pink-600  rounded-xl px-2 my-1 bg-pink-50 outline 
                        ${errors.sectionName ? 'visible' : 'invisible hidden'} `}>
                    Required <FaExclamation />
                </span>
                </label>
                
                <input
                    id='sectionName'
                    type="text"
                    placeholder='Add a section to build your course'
                    {...register('sectionName', { required: true })}
                    className={`${inputClasses}`} />
            </div>


            <div className='flex gap-2 md:flex-row flex-col items-center'>
                <button
                    onClick={handleSubmit(onSubmit)}
                    className='py-3 px-6 rounded-lg border text-yellow-50 font-medium flex items-center w-fit gap-2 hover:bg-yellow-50 hover:text-richblack-900 transition-all hover:font-semibold'>
                    <AiOutlinePlusCircle className='text-xl' />
                    <p>{!editSectionName ? 'Create Section' : 'Edit Section Name'}</p>
                </button>
                {
                    editSectionName &&
                    (<button
                        onClick={cancelEdit}
                        className='text-richblack-200 '>Cancle edit</button>)
                }

            </div>

            {
                //course.courseContent.length > 0 && 
                (
                    <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
                )
            }

            <div className='flex gap-2 '>
                <button
                    onClick={goBack}
                    className='py-3 px-6 rounded-lg border text-richblack-300 font-medium flex items-center w-fit gap-2 hover:bg-richblack-300 hover:text-richblack-900 transition-all hover:font-semibold'>
                    <BsCaretLeft className='text-xl' />
                    <p>Back</p>
                </button>
                <button
                    onClick={goNext}
                    className='py-3 px-6 rounded-lg border text-richblack-900 bg-yellow-100 font-medium flex items-center w-fit gap-2 hover:bg-opacity-0 
                    hover:text-yellow-50 transition-all'>
                    <p>Next</p>
                    <BsCaretRightFill className='text-xl' />
                </button>
            </div>

        </>
    )
}

export default CourseBuilderForm
