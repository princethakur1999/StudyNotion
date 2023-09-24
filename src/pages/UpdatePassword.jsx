import React, { useState } from 'react'
import { BsCheckCircleFill,BsArrowLeft } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function UpdatePassword() {
    const dispatch=useDispatch();
    const location=useLocation();
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        password:'',
        confirmPassword:''
    })
    const {password,confirmPassword}=formData;

    function handleOnChange(e){
        setFormData((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    function handleOnClick() {
        const token=location.pathname.split('/').at(-1)
        dispatch(resetPassword(password,confirmPassword,token,navigate))
    }

    return (
        <div className='flex w-full min-h-[calc(100vh-4rem)] justify-center items-center'>
            <div className='flex flex-col gap-6 p-8 w-[31.75rem]'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-richblack-5 text-3xl font-semibold'>Choose  new password</h1>
                    <p className='text-richblack-100 text-lg '>Almost done. Enter your new password and youre all set.</p>
                </div>


                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-[0.375rem]'>
                        <label
                            htmlFor='password'
                            className='text-richblack-5 text-sm'>New Password <span className='text-[red]'>*</span>
                        </label>

                        <input
                            type='password'
                            placeholder='Enter New Password'
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                            className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline  placeholder:italic'>

                        </input>


                    </div>
                    <div className='flex flex-col gap-[0.375rem]'>
                        <label
                            htmlFor='confirmPassword'
                            className='text-richblack-5 text-sm'>Confirm new Password <span className='text-[red]'>*</span>
                        </label>

                        <input
                            type='password'
                            placeholder='Confirm new Password'
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleOnChange}
                            className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline  placeholder:italic'>

                        </input>

                    </div>
                </div>


                <ul className='grid grid-cols-2 w-[85%] text-xs text-caribbeangreen-300 leading-5'>
                    <li className='flex gap-2 items-center'><BsCheckCircleFill /> one lowercase character</li>
                    <li className='flex gap-2 items-center'><BsCheckCircleFill /> one special character</li>
                    <li className='flex gap-2 items-center'><BsCheckCircleFill /> one uppercase character</li>
                    <li className='flex gap-2 items-center'><BsCheckCircleFill /> 8 character minimum</li>
                    <li className='flex gap-2 items-center'><BsCheckCircleFill /> one number</li>
                </ul>

                <div className='flex flex-col gap-6'>
                    <button
                        onClick={handleOnClick}
                        className='font-medium bg-yellow-50 py-3 rounded-md '>Reset Password</button>
                    <Link to='/login' className='text-richblack-5 font-medium flex gap-1 items-center'><BsArrowLeft />Back To Login</Link>
                </div>
            </div>

        </div>
    )
}

export default UpdatePassword
