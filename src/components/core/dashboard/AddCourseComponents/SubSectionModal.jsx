import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../slices/courseSlice';
import { FaExclamation } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FiUploadCloud } from 'react-icons/fi'
import useOnClickOutside from '../../../../hooks/useOnClickOutside';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function SubSectionModal({ modalData, setModalData, add = false, view = false, edit = false }) {
  let [opacity, setOpacity] = useState('0');
  const inputClasses = 'text-richblack-50 font-medium rounded-md p-3 bg-richblack-700 customGradient-outline placeholder:text-sm placeholder:font-normal placeholder:text-richblack-400 placeholder:italic';
  const labelClasses = 'text-richblack-5 text-sm flex items-center gap-2'
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const { register, handleSubmit, setValue, getValues, formState: { errors }, watch } = useForm();
  const dispatch = useDispatch();
  const file = watch("lectureVideo", [])
  const [video, setVideo] = useState(null);
  const dropZoneRef = useRef('')
  const modal = useRef();
  const renderCount = useRef(0)


  //*************************************************************************//
  //*********** FUNCTIONS TO STOP SCROLL WHEN MODAL IS OPEN *****************//
  //*************************************************************************//

  useOnClickOutside(modal, () => setModalData(null), () => resumeScroll())

  useEffect(()=>{
    if(modalData!==null){
      stopScroll()
    }
  },[])

  function stopScroll() {
    console.log('stopScoll ran')
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
    

  }
  function resumeScroll() {
    console.log('resumeScroll called')
    // const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    // window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  

  //*************************************************************************//
  //*********END OF FUNCTIONS TO STOP SCROLL WHEN MODAL IS OPEN *************//
  //*************************************************************************//



  //*************************************************************************//
  //********************* FUNCTIONS FOR VIDEO *******************************//
  //*************************************************************************//

  useEffect(() => {
    // console.log('useEffect to set video')
    // console.log('typeof file[0]: ',typeof(file[0]))
    // console.log('file: ',file)
    if (!view) {
      if (edit && file[0] && typeof (file) == 'object') {
        //console.log('file',file)
        setVideo(URL.createObjectURL(file[0]))
      }
      if (add) {
        if (file[0]) {
          setVideo(URL.createObjectURL(file[0]))
        }
      }

    }

  }, [file])

  useEffect(() => {
    setOpacity('100')
    // console.log('useEffect called')
    if (edit) {
      setVideo(modalData.videoUrl)
    }
  }, [])


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
      setVideo(URL.createObjectURL(e.dataTransfer.files[0]))
      setValue('lectureVideo', e.dataTransfer.files[0])
    }
  }

  function removeVideo() {
    setVideo()
    setValue('lectureVideo', '')
  }

  //*************************************************************************//
  //*********************END OF FUNCTIONS FOR VIDEO *************************//
  //*************************************************************************//



  useEffect(() => {
    setOpacity('100')

    if (view || edit) {
      setValue('lectureTitle', modalData.title);
      setValue('lectureDesc', modalData.description);
      setValue('lectureVideo', modalData.videoUrl);
      //setVideo(modalData.videoUrl)
    }
  }, [])

  function isFormUpdated() {
    const currentValues = getValues();
    // console.log('getvalues in isformupdated : ',getValues())
    // console.log('modalData.title : ',modalData.title)
    // console.log('modalData.description : ',modalData.description)
    // console.log('modalData.videoUrl : ',modalData.videoUrl)

    if (currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl) {
      return true
    }
    else {
      return false;
    }
  }

  async function handleEditSubSection(data) {
    const currentValues = getValues();
    const formData = new FormData();
    //formData.append('sectionId', modalData.sectionId);
    formData.append('courseId', course._id);
    formData.append('subSectionId', modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append('title', currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append('description', currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append('video', currentValues.lectureVideo[0]);
    }

    console.log('formData: ', [...formData])
    const result = await updateSubSection(formData, token);
    if (result) {
      dispatch(setCourse(result))
    }

    setModalData(null)
    resumeScroll()

  }

  async function onSubmit(data) {

    // console.log('getValues: ', getValues())
    if (edit) {
      if (!isFormUpdated()) {
        return toast.error('No Changes made to the form')
      }
      else {
        handleEditSubSection();

        return
      }
    }

    const formData = new FormData();
    formData.append('sectionId', modalData);
    formData.append('title', data.lectureTitle);
    formData.append('description', data.lectureDesc);

    formData.append('video', data.lectureVideo[0]);

    formData.append('courseId', course._id);

    console.log('formData: ', [...formData])

    const result = await createSubSection(formData, token);

    if (result) {
      dispatch(setCourse(result))
    }

    setModalData(null)
    resumeScroll()

  }


  return (
    <div className={`absolute inset-0  flex items-center justify-center opacity-${opacity} transition-all duration-300 backdrop-blur-md z-50 h-[calc(100vh-4rem)]`}>
      <div ref={modal} className='relative flex flex-col  bg-richblack-800 rounded-lg  w-[95%] md:w-[75%] lg:w-[60%] xl:w-[35%] max-h-[calc(100vh-8rem)] '>
        <h1 className='sticky z-10 left-0 right-0 top-0 text-white text-lg font-semibold py-4 px-6 flex justify-between items-center bg-richblack-700 rounded-t-lg'>
          <p>{view && 'Viewing'}{add && 'Adding'}{edit && 'Editing'} lecture</p>
          <AiFillCloseCircle
            onClick={() => { setModalData(null); resumeScroll() }}
            className='text-[red] text-2xl cursor-pointer hover:text-pink-200 transition-all' />
        </h1>
        <form className='pt-8 pb-4 flex flex-col gap-6 px-2 md:px-8 overflow-y-scroll customScrollBar'
        onSubmit={handleSubmit(onSubmit)}
        >
          <div className=' flex flex-col gap-[0.375rem] '>
            <label
              className={`${labelClasses}`}
              htmlFor="lectureVideo">
              Lecture Video
              <span
                className={`flex items-center gap-[0.13rem] text-pink-600  rounded-xl px-2 my-1 bg-pink-50 outline 
                        ${errors.lectureVideo ? 'visible' : 'invisible hidden'} `}>
                Required <FaExclamation />
              </span>
            </label>
            {view ? (<video src={modalData.videoUrl} controls className='rounded-lg aspect-video object-cover border border-richblack-500'></video>) :
              (<div
                ref={dropZoneRef}
                onDragOver={handleOnDragEnter}
                onDragLeave={handleOnDragLeave}
                onDrop={handleOnDrop}
                className={`flex flex-col aspect-video  gap-4   rounded-md ${!video ? 'bg-richblack-700 border border-dashed border-richblack-500 py-6 items-center justify-center' :
                  `border border-richblack-500 `} transition-all  relative`}>
                {video && <video src={video} controls className='rounded-lg aspect-video object-cover' ></video>}
                <input
                  type='file'
                  id='lectureVideo'
                  accept='video/*'
                  className='hidden'
                  {...register('lectureVideo', { required: !video ? true : false })}
                />
                <FiUploadCloud className={`text-yellow-50 text-2xl ${video ? 'hidden' : ''}`} />
                <p
                  className={`text-xs text-richblack-200 w-[38%] text-center ${video ? 'hidden' : ''}`}>
                  Drag and drop a Video, or
                  <label
                    htmlFor='lectureVideo'
                    className='cursor-pointer text-yellow-50' > Browse </label>
                  Max 12MB
                </p>
                <AiFillCloseCircle
                  onClick={removeVideo}
                  className={`text-richblack-400 hover:text-pink-300 transition-all bg-[#000000c0] text-3xl rounded-full absolute -top-2 -right-2 cursor-pointer ${video ? '' : 'hidden'} `} />

              </div>)}

          </div>

          <div className=' flex flex-col gap-[0.375rem]'>
            <label
              className={`${labelClasses}`}
              htmlFor="lectureTitle">
              Lecture Title
              <span
                className={`flex items-center gap-[0.13rem] text-pink-600  rounded-xl px-2 my-1 bg-pink-50 outline 
                        ${errors.lectureTitle ? 'visible' : 'invisible hidden'} `}>
                Required <FaExclamation />
              </span>
            </label>

            <input
              id='lectureTitle'
              type="text"
              name='lectureTitle'
              placeholder={`Enter Lecture Title`}
              readOnly={view ? true : false}
              className={`${inputClasses} `}
              {...register('lectureTitle', { required: true })}
            />


          </div>

          <div className=' flex flex-col gap-[0.375rem]'>
            <label
              className={`${labelClasses}`}
              htmlFor="lectureDesc">
              Lecture Description
              <span
                className={`flex items-center gap-[0.13rem] text-pink-600  rounded-xl px-2 my-1 bg-pink-50 outline 
                        ${errors.lectureDesc ? 'visible' : 'invisible hidden'} `}>
                Required <FaExclamation />
              </span>
            </label>

            <textarea
              rows={3}
              id='lectureDesc'
              type="text"
              name='lectureDesc'
              readOnly={view ? true : false}
              placeholder={`Enter Lecture Description`}
              className={`${inputClasses}`}
              {...register('lectureDesc', { required: true })}
            />

          </div>

          {!view && (<button
            type='submit'
            className='py-3 px-6 text-richblack-900 font-medium bg-yellow-100 rounded-lg hover:rounded-xl transition-all w-fit mt-5' >
            {edit ? 'Save Changes' : 'Save'}
          </button>)}
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal
