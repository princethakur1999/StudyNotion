import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { changePassword } from '../../../../services/operations/profileAPI';
import { useSelector } from 'react-redux';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function ChangePassword() {
    const [showCurrPass, setShowCurrPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const { token } = useSelector((state) => state.auth);

    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '',
        newPassword: ''
    })

    function handleOnChangePassword(e) {
        console.log('target.name : ', e.target.name, ' target.value name: ', e.target.value);
        setPasswordForm((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    function newPasswordSave(e) {
        e.preventDefault();
        if (passwordForm.newPassword == passwordForm.oldPassword) {
            return toast.error('new password cannot be same as old password')
        }
        console.log(passwordForm)
        changePassword(passwordForm, token);
    }
    return (
        <div className='p-6 bg-richblack-700 rounded-lg flex flex-col gap-5 '>
            <h4 className='font-semibold text-richblack-5 text-lg'>Change Password</h4>
            <form onSubmit={newPasswordSave} className='grid md:grid-cols-2 md:grid-rows-2 gap-x-5  gap-y-4 md:gap-y-[unset]'>
                {/* current password */}
                <div className='flex flex-col gap-[0.375rem] relative'>
                    <label
                        htmlFor="oldPassword"
                        className='text-richblack-300 text-sm'>
                        Current Password
                    </label>
                    <input
                        value={passwordForm.oldPassword}
                        onChange={handleOnChangePassword}
                        name='oldPassword'
                        type={`${showCurrPass ? 'text' : 'password'}`}
                        className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline
                                     placeholder:text-richblack-300 placeholder:italic' />
                    <BsEyeFill
                        className={`cursor-pointer text-richblue-50 absolute right-3 top-[2.35rem] text-2xl `}
                        onClick={() => setShowCurrPass(!showCurrPass)} />
                    <BsEyeSlashFill
                        className={`cursor-pointer text-richblue-50 absolute right-3 top-[2.35rem] text-2xl ${!showCurrPass && 'hidden'}`}
                        onClick={() => setShowCurrPass(!showCurrPass)} />
                </div>

                {/* new password */}
                <div className='flex flex-col gap-[0.375rem] relative'>
                    <label
                        htmlFor="newPassword"
                        className='text-richblack-300 text-sm'>
                        New Password
                    </label>
                    <input
                        value={passwordForm.newPassword}
                        onChange={handleOnChangePassword}
                        name='newPassword'
                        type={`${showNewPass ? 'text' : 'password'}`}
                        className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline
                                     placeholder:text-richblack-300 placeholder:italic' />
                    <BsEyeFill
                        className={`cursor-pointer text-richblue-50 absolute right-3 top-[2.35rem] text-2xl `}
                        onClick={() => setShowNewPass(!showNewPass)} />
                    <BsEyeSlashFill
                        className={`cursor-pointer text-richblue-50 absolute right-3 top-[2.35rem] text-2xl ${!showNewPass && 'hidden'}`}
                        onClick={() => setShowNewPass(!showNewPass)} />
                </div>
                <button
                    type='submit'
                    className='font-medium bg-yellow-50 py-3 px-6 rounded-md mt-6 w-fit '>
                    Save
                </button>
            </form>
        </div>
    )
}

export default ChangePassword
