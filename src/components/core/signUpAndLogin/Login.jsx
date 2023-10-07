import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../../services/operations/authAPI';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function Login() {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className='flex flex-col gap-5 ' >
      {/* email address field */}
      <div className='flex flex-col gap-[0.375rem]'>
        {/* email label */}
        <label
          htmlFor='email'
          className='text-richblack-5 text-sm'>Email Address <span className='text-[red]'>*</span></label>
        {/* email input field */}
        <input
          type='text'
          placeholder='Enter Email Address'
          name='email' value={email}
          onChange={handleOnChange}
          className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline  placeholder:italic'></input>
      </div>
      {/* password field */}
      <div
        className='flex flex-col gap-[0.375rem] relative'>
        {/* password label */}
        <label
          htmlFor='password'
          className='text-richblack-5 text-sm'>Password <span className='text-[red]'>*</span></label>
        {/* password input field */}
        <input
          type={`${showPass ? 'text' : 'password'}`}
          placeholder='Enter Password'
          name='password'
          value={password}
          onChange={handleOnChange}
          className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline  placeholder:italic'></input>
        <BsEyeFill
          className={`cursor-pointer text-richblue-50 absolute right-3 top-[2.35rem] text-2xl `}
          onClick={() => setShowPass(!showPass)} />
        <BsEyeSlashFill
          className={`cursor-pointer text-richblue-50 absolute right-3 top-[2.35rem] text-2xl ${!showPass && 'hidden'}`}
          onClick={() => setShowPass(!showPass)} />
        {/* forgot passowrd link */}
        <Link
          className='text-xs text-blue-100 text-right'
          to={"/forgot-password"}>Forgot Password</Link>
      </div>
      <button
        type='submit'
        className='font-medium bg-yellow-50 py-3 rounded-md mt-6 '>Login</button>
    </form>
  )
}

export default Login
