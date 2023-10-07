import React, { useEffect, useRef, useState } from 'react';

import OTPInput from 'react-otp-input';

import { BsArrowLeft } from 'react-icons/bs';
import { FaHistory } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, signUp } from '../services/operations/authAPI';


//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function VerifyEmail() {

    const [otp, setOtp] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { signupData } = useSelector((state) => state.auth);

    let otpValue = useRef('');

    useEffect(() => {
        if (!signupData) {
            navigate('/signup');
        }
    }, [])


    function handleOnChange({ target }) {

        const value = target.value
        otpValue.current += value;
        setOtp(otpValue.current);
    }


    function handleOnClick() {

        const { accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword } = signupData;

        dispatch(signUp(accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate));

        console.log('signupData: ', signupData)
        console.log('otp: ', otp)
        console.log('otp type: ', typeof otp)


    }

    return (
        <div className='flex w-full min-h-[calc(100vh-4rem)] justify-center items-center'>
            <div className=' flex flex-col gap-9 md:p-11 lg:p-8 p-2 w-screen  lg:w-[31.75rem]'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-richblack-5 text-3xl font-semibold'>Verify email</h1>
                    <p className='text-richblack-100 text-lg '>A verification code has been sent to you. Enter the code below</p>
                </div>

                <div className='mx-auto lg:mx-[unset]'>
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<div className='md:w-[3.583rem] w-[0.5rem]'></div>}
                        renderInput={(props) => (
                            <input {...props}
                                placeholder=' '
                                type='number'
                                className='text-center aspect-square min-w-[2.7rem] md:w-[3.583rem] text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline spin-button-none mscale-[0.8] md:scale-100' />)}

                    />
                </div>
                <button
                    onClick={handleOnClick}
                    className='font-medium bg-yellow-50 py-3 rounded-md '>Verify Email</button>

                <div className='flex justify-between'>
                    <Link to='/login' className='text-richblack-5 font-medium flex gap-1 items-center'><BsArrowLeft />Back To Login</Link>
                    <button onClick={() => dispatch(sendOtp(signupData.email, navigate))} className='font-medium text-blue-100 flex items-center gap-1'><FaHistory />Resend it</button>
                </div>
            </div>

        </div>
    )
}

export default VerifyEmail
