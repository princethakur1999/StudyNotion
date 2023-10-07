import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setSignupData } from '../../../slices/authSlice'
import { sendOtp } from '../../../services/operations/authAPI'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function SignUp({ accountType }) {

  const [showPass, setShowPass] = useState(false);

  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const { firstName, lastName, email, password, confirmPassword } = formData


  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const signupData = {
      ...formData,
      accountType,
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    console.log('Sign up data : ', signupData);
    // Send OTP to user for verification
    dispatch(sendOtp(email, navigate))

  }


  return (
    <form
      onSubmit={handleOnSubmit}
      className=' flex flex-col gap-5 ' >
      {/* first and last name fields div */}
      <div
        className=' grid grid-cols-2 gap-5'>
        <div
          className=' flex flex-col gap-[0.375rem] '>
          {/* first name label */}
          <label
            htmlFor='firstName'
            className='text-richblack-5 text-sm'>First name <span className='text-[red]'>*</span></label>
          {/* first name input field */}
          <input
            type='text'
            name='firstName'
            placeholder='Enter first name'
            value={firstName}
            onChange={handleOnChange}
            className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline  placeholder:italic' />
        </div>

        <div
          className=' flex flex-col gap-[0.375rem] '>
          {/* last name label */}
          <label
            htmlFor='lastName'
            className='text-richblack-5 text-sm'>Last name <span className='text-[red]'>*</span></label>
          {/* last name input field */}
          <input
            type='text'
            name='lastName'
            placeholder='Enter last name'
            value={lastName}
            onChange={handleOnChange}
            className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline  placeholder:italic' />
        </div>
      </div>

      {/* email field div*/}
      <div
        className='flex flex-col gap-[0.375rem] '>
        {/* email label */}
        <label
          htmlFor='email'
          className='text-richblack-5 text-sm'>Email Address <span className='text-[red]'>*</span></label>
        {/* email input field */}
        <input
          type='email'
          name='email'
          placeholder='Enter email address'
          value={email}
          onChange={handleOnChange}
          className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline  placeholder:italic'></input>
      </div>


      {/* create password div */}
      <div
        className=' grid  md:grid-cols-2 gap-5'>
        <div
          className=' flex flex-col gap-[0.375rem] relative'>
          {/* create password label */}
          <label
            htmlFor='password'
            className='text-richblack-5 text-sm'>Create Password <span className='text-[red]'>*</span></label>
          {/* create password input field */}
          <input
            type={`${showPass ? 'text' : 'password'}`}
            placeholder='Enter Password'
            name='password'
            value={password}
            onChange={handleOnChange}
            className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline  placeholder:italic' />
          <BsEyeFill
            className={`cursor-pointer text-richblue-50 absolute right-3 top-[2.35rem] text-2xl `}
            onClick={() => setShowPass(!showPass)} />
          <BsEyeSlashFill
            className={`cursor-pointer text-richblue-50 absolute right-3 top-[2.35rem] text-2xl ${!showPass && 'hidden'}`}
            onClick={() => setShowPass(!showPass)} />
        </div>
        <div
          className=' flex flex-col gap-[0.375rem] relative'>
          {/* confirm password label */}
          <label
            htmlFor='confirmPassword'
            className='text-richblack-5 text-sm'>Confirm Password <span className='text-[red]'>*</span></label>
          {/* confirm password input field */}
          <input
            type={`${showConfirmPass ? 'text' : 'password'}`}
            placeholder='Enter Password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleOnChange} className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline  placeholder:italic' />
          <BsEyeFill
            className={`cursor-pointer text-richblue-50 absolute right-3 top-[2.35rem] text-2xl `}
            onClick={() => setShowConfirmPass(!showConfirmPass)} />
          <BsEyeSlashFill
            className={`cursor-pointer text-richblue-50 absolute right-3 top-[2.35rem] text-2xl ${!showConfirmPass && 'hidden'}`}
            onClick={() => setShowConfirmPass(!showConfirmPass)} />
        </div>
      </div>

      {/* create account button */}
      <button
        type='submit'
        className='font-medium bg-yellow-50 py-3 rounded-md mt-6'>Create account</button>
    </form>
  )
}

export default SignUp
