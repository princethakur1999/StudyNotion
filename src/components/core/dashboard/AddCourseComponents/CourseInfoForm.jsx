import React, { useEffect, useRef } from 'react'
import { courseFormData, courseCreateSteps } from '../../../../data/courseFormData'
import { FiUploadCloud } from 'react-icons/fi'
import { FaExclamation } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { CgClose } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addCourseDetails, editCourseDetails, fetchCourseCategories, fetchCourseDetails } from '../../../../services/operations/courseDetailsAPI'
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../utils/constants'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//


function CourseInfoForm() {
    const inputClasses = 'text-richblack-50 font-medium rounded-md p-3 bg-richblack-700 customGradient-outline placeholder:text-sm placeholder:font-normal placeholder:text-richblack-400 placeholder:italic';
    const { course, editCourse } = useSelector((state) => state.course);
    const { watch, register, reset, handleSubmit, setValue, getValues, formState: { errors } } = useForm({ defaultValues: { category: editCourse ? course.category._id : '' } });
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [courseCategories, setCourseCategories] = useState([]);
    //const [category, setCategory] = useState(null);
    const [image, setImage] = useState(null);
    const [courseTags, setCourseTags] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const dropZoneRef = useRef('')
    const reqInputRef = useRef('')
    const tagInputRef = useRef('')
    const clickedOnBrowse = useRef(false)
    const file = watch("thumbnailImage", [])
    // const courseCategory = watch("category", '')


    //console.log('form Values: ', getValues())

    useEffect(()=>{
        if(editCourse){
            setValue("category", course.category._id);
        }
    },[courseCategories])

    useEffect(() => {
        const getCategories = async () => {
            const categories = await fetchCourseCategories();
            if (categories.length > 0) {
                setCourseCategories(categories);
            }

        }
        getCategories();


        if (editCourse) {
            setValue("courseName", course.courseName);

            setValue("courseDescription", course.courseDescription);

            setValue("price", course.price);

            setValue("tag", course.tag);
            // if(course.tag[0].includes(",")){
            //     setCourseTags(course.tag[0].split(","));
            // }else{
            //     setCourseTags(course.tag[0]);
            // }

            if(course.tag[0]!==undefined){
                setCourseTags(course.tag[0].split(","));
            }
            
            
            tagInputRef.current.previousElementSibling.value = ''

            setValue("whatYouWillLearn", course.whatYouWillLearn);

            setValue("category", course.category._id);

            setValue("requirements", course.instructions);
            // if(course.instructions[0].includes(",")){
            //     setCourseTags(course.instructions[0].split(","));
            // }else{
            //     setCourseTags(course.instructions[0]);
            // }

            if(course.instructions[0]!==undefined){
                setRequirements(course.instructions[0].split(","));
            }

            reqInputRef.current.previousElementSibling.value = ''
            

            setValue("thumbnailImage", course.thumbnail);
            setImage(course.thumbnail)
        }



    }, [])



    //*************************************************************************//
    //********************* FUNCTIONS FOR TAGS ********************************//
    //*************************************************************************//

    // useEffect(() => {
    //     setValue('tag', courseTags)
    //     tagInputRef.current.previousElementSibling.value = ''
    // }, [courseTags])

    function handleAddItem() {
        let tagValue = getValues().tag;
        if (!tagValue) {
            return toast.error('Please Add a Tag first')
        }
        setCourseTags((prev) => ([...prev, tagValue]));
        setValue('tag', courseTags)
        tagInputRef.current.previousElementSibling.value = ''
    }

    function handleKeyDown({ key }) {
        if (key === 'Enter') {
            handleAddItem();
        }
    }

    function deleteFromTags(item) {
        let newTagArr = courseTags.filter(tag => tag != item)

        setValue('tag', newTagArr)
        tagInputRef.current.previousElementSibling.value = ''
        setCourseTags(newTagArr)
    }

    //*************************************************************************//
    //********************* END OF FUNCTIONS FOR TAGS *************************//
    //*************************************************************************//



    //*************************************************************************//
    //********************* FUNCTIONS FOR THUMBNAIL ***************************//
    //*************************************************************************//

    useEffect(() => {
        console.log('useEffect ran for thumnail file')
        if (clickedOnBrowse.current) {
            if (file[0]) {
                setImage(URL.createObjectURL(file[0]))
            }
            clickedOnBrowse.current = false
        }

    }, [file])

    function handleOnDragEnter(e) {
        e.preventDefault();
        dropZoneRef.current.classList.remove('border-dashed', 'border-richblack-500', 'bg-richblack-700')
        dropZoneRef.current.classList.add('border-yellow-50', 'bg-richblack-600')
    }

    function handleOnDragLeave(e) {
        e.preventDefault();
        dropZoneRef.current.classList.remove('border-yellow-50', 'bg-richblack-600')
        dropZoneRef.current.classList.add('border-dashed', 'border-richblack-500', 'bg-richblack-700')
    }

    function handleOnDrop(e) {
        e.preventDefault();
        if (e.dataTransfer.files[0]) {
            setImage(URL.createObjectURL(e.dataTransfer.files[0]))
            setValue('thumbnailImage', e.dataTransfer.files[0])
        }
    }

    function changeBg() {
        // console.log('getvalues.thumbnail inside changebg func :', getValues().thumbnailImage)
        // console.log('image inside changebg func :', image)
        dropZoneRef.current.style.backgroundImage = `url(${image})`;
    }

    function removeImage() {

        setImage()
        setValue('thumbnailImage', '')
        dropZoneRef.current.style.backgroundImage = 'none';
    }

    //*************************************************************************//
    //********************* END OF FUNCTIONS FOR THUMBNAIL ********************//
    //*************************************************************************//



    //*************************************************************************//
    //********************* FUNCTIONS FOR REQUIREMENTS ************************//
    //*************************************************************************//

    // useEffect(() => {
    //     setValue('requirements', requirements)
    //     reqInputRef.current.previousElementSibling.value = ''
    // }, [requirements])


    function handleAddReq() {

        let req = getValues().requirements;
        if (!req) {
            return toast.error('Please Add Requirement/Instruction first')
        }
        setRequirements((prev) => ([...prev, req]));
        setValue('requirements', requirements)
        reqInputRef.current.previousElementSibling.value = ''


    }

    function handleKeyDownForReq({ key }) {
        if (key === 'Enter') {
            handleAddReq();
        }
    }

    function deleteFromReq(item) {
        let newReqArr = requirements.filter(req => req != item)

        setValue('requirements', newReqArr)
        reqInputRef.current.previousElementSibling.value = ''
        setRequirements(newReqArr)
    }


    //*************************************************************************//
    //********************* END OF FUNCTIONS FOR REQUIREMENTS *****************//
    //*************************************************************************//


    const isFormUpdated = () => {
        const currentValues = getValues();
        console.log('course in isformupadted: ',course)

        if (currentValues.courseName !== course.courseName ||
            currentValues.courseDescription !== course.courseDescription ||
            currentValues.price !== course.price ||
            currentValues.category !== course.category._id ||
            currentValues.tag.toString() !== course.tag[0].toString() ||
            currentValues.thumbnailImage !== course.thumbnail ||
            currentValues.whatYouWillLearn !== course.whatYouWillLearn ||
            currentValues.requirements.toString() !== course.instructions[0].toString()
        ) {
            return true
        } else {
            return false
        }
    }

    const onSubmit = async (data) => {
        setValue('requirements', requirements)
        reqInputRef.current.previousElementSibling.value = ''
        setValue('tag', courseTags)
        tagInputRef.current.previousElementSibling.value = ''
        console.log('getValues: ', getValues())
        data.tag = courseTags
        data.requirements = requirements
        console.log('data', data)

        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();
                formData.append('courseId', course._id);

                if (currentValues.courseName !== course.courseName) {
                    formData.append("courseName", data.courseName);
                }

                if (currentValues.courseDescription !== course.courseDescription) {
                    formData.append("courseDescription", data.courseDescription);
                }

                if (currentValues.price !== course.price) {
                    formData.append("price", data.price);
                }

                if (currentValues.tag.toString() !== course.tag.toString()) {
                    formData.append("tag", data.tag);
                }

                if (currentValues.thumbnailImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.thumbnailImage[0]);
                }

                if (currentValues.whatYouWillLearn !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.whatYouWillLearn);
                }

                if (currentValues.category._id !== course.category._id) {
                    formData.append("category", data.category);
                }

                if (currentValues.requirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", data.requirements);
                }

                console.log('formdata: ', [...formData])

                const result = await editCourseDetails(formData, token)
                console.log('result', result)
                if (result) {
                    dispatch(setStep(2))
                    dispatch(setCourse(result))
                    dispatch(setEditCourse(false))
                    localStorage.setItem('editCourse', false)
                }
            }
            else {
                toast.error('No Changes made to the form')
                dispatch(setStep(2))
                localStorage.setItem('step', 2)
                dispatch(setEditCourse(false))
                localStorage.setItem('editCourse', false)
            }
            return;
        }

        const formData = new FormData();
        formData.append('courseName', data.courseName);
        formData.append('courseDescription', data.courseDescription);
        formData.append('price', data.price);
        formData.append('category', data.category);
        formData.append('tag', data.tag);
        formData.append('thumbnailImage', data.thumbnailImage[0] || data.thumbnailImage);
        formData.append('whatYouWillLearn', data.whatYouWillLearn);
        formData.append('instructions', data.requirements);
        formData.append('status', COURSE_STATUS.DRAFT);

        console.log('formData: ', [...formData])

        const result = await addCourseDetails(formData, token)
        console.log('result: ', result)
        if (result) {
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }


        console.log('getValues: ', getValues())

    }

    return (
        <>
            {courseFormData.map((item, index) => (
                <div key={index} className=' flex flex-col gap-[0.375rem]'>
                    <label
                        htmlFor={item.name}
                        className='text-richblack-5 text-sm flex items-center gap-2'>
                        {item.label}
                        <span className={`flex items-center gap-[0.13rem] text-pink-600  rounded-xl px-2 my-1 bg-pink-50 outline 
                        ${errors[item.name] ? 'visible' : 'invisible hidden'} `}>
                            Required <FaExclamation />
                        </span>
                    </label>

                    {
                        item.label == 'Course Short Description' || item.label == 'Benefits of the course' ?
                            (<textarea
                                id={item.name}
                                type='text'
                                name={item.name}
                                placeholder={`Enter ${item.label}`}
                                rows={5}
                                className={`${inputClasses} flex-1`}
                                {...register(item.name, { required: true })}
                            />) :
                            item.label == 'Course Thumbnail' ?
                                (<div
                                    ref={dropZoneRef}
                                    onDragOver={handleOnDragEnter}
                                    onDragLeave={handleOnDragLeave}
                                    onDrop={handleOnDrop}
                                    className={`flex flex-col h-60 gap-4 items-center justify-center py-6 rounded-md ${!image ? 'bg-richblack-700 border border-dashed border-richblack-500' : `${changeBg()}`}   bg-cover bg-center bg-no-repeat transition-all  relative`}>
                                    <input
                                        type='file'
                                        id={item.name}
                                        accept='image/*'
                                        className='hidden'
                                        {...register(item.name, { required: !image ? true : false })}
                                    />
                                    <FiUploadCloud className={`text-yellow-50 text-2xl ${image ? 'hidden' : ''}`} />
                                    <p
                                        className={`text-xs text-richblack-200 w-[38%] text-center ${image ? 'hidden' : ''}`}>
                                        Drag and drop an image, or
                                        <label
                                            onClick={() => clickedOnBrowse.current = true}
                                            htmlFor={item.name}
                                            className='cursor-pointer text-yellow-50' > Browse </label>
                                        Max 6MB
                                    </p>
                                    <AiFillCloseCircle
                                        onClick={removeImage}
                                        className={`text-[red] bg-[#000000c0] text-3xl rounded-full absolute -top-2 -right-2 cursor-pointer ${image ? '' : 'hidden'} `} />

                                </div>) :
                                item.label == 'Category' ?
                                    (<select
                                        id={item.name}
                                        name={item.label}
                                        className={`${inputClasses}`}
                                        defaultValue={''}
                                        {...register(item.name, { required: true })}>

                                        <option value='' disabled >Choose a category</option>
                                        {
                                            courseCategories.map((category, index) => (
                                                <option value={category._id} key={index} >{category.name}</option>
                                            ))
                                        }

                                    </select>) :
                                    item.label == 'Tags' ?
                                        (<>
                                            <div className={`flex gap-2 pb-1 ${courseTags.length === 0 ? 'hidden' : 'block'} `}>
                                                {courseTags.map((item, index) => (
                                                    <p key={index} className='px-2 py-1 bg-yellow-200 text-richblack-800 w-fit  rounded-full font-semibold 
                                                    text-sm flex items-center gap-1'>
                                                        {item}
                                                        <CgClose
                                                            onClick={() => deleteFromTags(item)}
                                                            className='mt-[0.125rem] cursor-pointer' />
                                                    </p>
                                                ))}
                                            </div>

                                            <input
                                                id={item.name}
                                                type="text"
                                                name={item.name}
                                                placeholder={`Enter ${item.label}`}
                                                className={`${inputClasses}`}
                                                onKeyDown={handleKeyDown}
                                                {...register(item.name, { required: courseTags.length === 0 ? true : false })}
                                            />
                                            <div
                                                ref={tagInputRef}
                                                onClick={handleAddItem}
                                                className='text-yellow-50 font-semibold p-1 pb-0 cursor-pointer w-fit'>
                                                Add Tag
                                            </div>
                                        </>
                                        ) : item.label == 'Requirements/Instructions' ?
                                            (<>
                                                <input

                                                    id={item.name}
                                                    type="text"
                                                    name={item.name}
                                                    onKeyDown={handleKeyDownForReq}
                                                    placeholder={`Enter ${item.label}`}
                                                    className={`${inputClasses}`}
                                                    {...register(item.name, { required: requirements.length === 0 ? true : false })}
                                                />
                                                <div
                                                    ref={reqInputRef}
                                                    onClick={handleAddReq}
                                                    className='text-yellow-50 font-semibold p-1 pb-0 cursor-pointer w-fit'>
                                                    Add
                                                </div>
                                                <div className={`flex flex-col gap-2 pb-1`}>
                                                    {requirements.map((item, index) => (
                                                        <p key={index} className='px-2 py-1 text-richblack-25 w-fit  font-semibold 
                                                    text-sm flex items-center gap-1'>
                                                            {item}
                                                            <CgClose
                                                                onClick={() => deleteFromReq(item)}
                                                                className='mt-[0.125rem] cursor-pointer' />
                                                        </p>
                                                    ))}
                                                </div>
                                            </>

                                            ) :
                                            (
                                                <input
                                                    id={item.name}
                                                    type="text"
                                                    name={item.name}
                                                    placeholder={`Enter ${item.label}`}
                                                    className={`${inputClasses}`}
                                                    {...register(item.name, { required: true })}
                                                />
                                            )}
                </div>
            ))}

            <div className='flex md:gap-3 md:flex-row flex-col gap-2'>
                {
                    editCourse && (
                        <button
                            onClick={() => {
                                localStorage.setItem('step', 2);
                                localStorage.setItem('editCourse', false);
                                dispatch(setStep(2))
                            }}
                            className='py-3 md:px-6 px-2 text-sm md:text-base text-richblack-900 font-medium bg-richblack-300 rounded-lg md:w-fit md:mt-9' >
                            Continue without Saving {`>`}
                        </button>
                    )
                }

                <button
                    onClick={handleSubmit(onSubmit)}
                    className='py-3 md:px-6 px-2 text-sm md:text-base text-richblack-900 font-medium bg-yellow-100 rounded-lg md:w-fit md:mt-9' >
                    Save Changes {`>`}
                </button>
            </div>

        </>
    )
}

export default CourseInfoForm
