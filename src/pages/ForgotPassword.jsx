import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs'
import {getPasswordResetToken} from '../services/operations/authAPI'


//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//


function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleOnSubmit(e) {
    console.log('clicked on submit')
    e.preventDefault();
    dispatch(getPasswordResetToken(email,setEmailSent));
  }

  return (
    <div className='flex w-full min-h-[calc(100vh-4rem)] justify-center items-center'>
      <div className='flex flex-col gap-9 p-8 w-[31.75rem]'>

        <div className='flex flex-col gap-3'>
          <h1 className='text-richblack-5 text-3xl font-semibold'>{!emailSent ? 'Reset your Password' : 'Check Email'}</h1>
          <p className='text-richblack-100 text-lg '>{!emailSent ? `Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery`
            : `We have sent the reset email to ${email}`}</p>
        </div>
        <form onSubmit={handleOnSubmit} className='flex flex-col gap-9' >
          <div className='flex flex-col gap-[0.375rem]'>
            {/* email input field */}
            {!emailSent && (<><label
              htmlFor='email'
              className='text-richblack-5 text-sm'>Email Address <span className='text-[red]'>*</span></label>

              <input
                type='text'
                placeholder='Enter Email Address'
                name='email' value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline  placeholder:italic'></input></>)}
          </div>

          <div className='flex flex-col gap-6'>
            <button
              type='submit'
              className='font-medium bg-yellow-50 py-3 rounded-md '>{!emailSent ? 'Reset Password' : 'Resend Email'}</button>
            <Link to='/login' className='text-richblack-5 font-medium flex gap-1 items-center'><BsArrowLeft />Back To Login</Link>
          </div>
        </form>
      </div>


    </div>
  )
}

export default ForgotPassword

