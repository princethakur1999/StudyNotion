import React, { useState } from 'react'
import HighlightText from '../components/core/homePage/HighlightText';
import Login from '../components/core/signUpAndLogin/Login';
import imageBackground from '../assets/Images/frame.png'
import SignUp from '../components/core/signUpAndLogin/SignUp';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//


function SignUpLoginTemplate({ formType }) {
  const heading = formType == 'login' ? 'Welcome Back' : 'Join the millions learning to code with StudyNotion for free';
  const [currentAccountType,setCurrentAccountType]=useState('Student');
  const para=currentAccountType == 'Student' ? 'Build skills for today, tomorrow, and beyond. ' : `Discover your passions,`;
  const HighlightPara=currentAccountType == 'Student' ?'Education to future-proof your career.':`\nBe Unstoppable`

  function handleAccountType(type) {
    //let typeToSet=type=='Student'?'Student':'Instructor'
    setCurrentAccountType(type);
  }

  return (
    <div className='w-[95%] md:w-[65%] lg:w-[95%] xl:w-[85%] mx-auto my-7 flex lg:gap-3 xl:gap-28 justify-between max-w-[90rem]'>
      {/* forms */}
      <div className=' lg:w-[50%] xl:w-[40%] flex flex-col gap-9 p-3  xl:p-8'>
      {/* heading and para div */}
        <div className='flex flex-col gap-3'>
          <h1 className='font-semibold text-2xl md:text-3xl text-richblack-5 '>{heading}</h1>
          <p className='text-sm md:text-lg leading-6 text-richblack-100 transition-all'>{para}<span className='font-edu-sa text-base md:text-xl font-semibold'>
          <HighlightText text={HighlightPara}/></span></p>
        </div>
        {/* Student Instructor selecting buttons */}
        <div className={`font-medium text-richblack-5 flex bg-richblack-800 w-fit rounded-full gap-1 p-1 ${formType=='login'?'hidden':''}`} >
          <button className={`transition-all  px-5 py-2 ${currentAccountType=='Student'?'bg-richblack-900':'text-richblack-200'}  rounded-full`} 
          onClick={()=>handleAccountType('Student')}>Student</button>
          <button className={`transition-all  px-5 py-2 ${currentAccountType=='Instructor'?'bg-richblack-900':'text-richblack-200'}  rounded-full`} 
          onClick={()=>handleAccountType('Instructor')}>Instructor</button>
        </div>
        {formType=='login'?<Login/>:<SignUp accountType={currentAccountType}/>}
        
      </div>

      {/* picture */}
      <div className='hidden lg:block w-[50%] p-8 z-30'>
        <div className={` ${currentAccountType=='Student'?'backgroundImage-loginPage':'backgroundImage-instructorLogin'} backgroundImage-loginPage  relative  bg-cover rounded-lg max-w-[34.875rem] h-[31.5rem] bg-no-repeat bg-center transition-all `}>
          <img src={imageBackground} className='absolute -z-20 xl:top-[1.5rem] xl:left-[1.5rem] rounded-lg lg:h-[31.5rem] lg:w-[34.875rem] lg:top-[1rem] lg:left-4 border-[1px] border-richblack-300 object-cover' />
        </div>
        
      </div>

    </div>
  )
}

export default SignUpLoginTemplate
