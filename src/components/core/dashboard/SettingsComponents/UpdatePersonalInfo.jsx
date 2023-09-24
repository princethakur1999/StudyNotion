import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateProfileInfo } from '../../../../services/operations/profileAPI';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

const personalDetails = [
    { label: 'First Name', name: 'firstName' },
    { label: 'Last Name', name: 'lastName' },
    { label: 'Date of Birth', name: 'dateOfBirth' },
    { label: 'Gender', name: 'gender' },
    { label: 'Phone Number', name: 'contactNumber' },
    { label: 'About', name: 'about' },
]

function UpdatePersonalInfo() {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.additionalDetails.dateOfBirth,
        gender: user.additionalDetails.gender,
        contactNumber: user.additionalDetails.contactNumber,
        about: user.additionalDetails.about,
    })



    function handleOnChangeProfile(e) {
        // console.log('target.name : ',e.target.name,' target.value name: ',e.target.value );
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    function profileInfoSave(e) {
        e.preventDefault();

        if (String(formData.contactNumber).length != 10) {
            return toast.error('Enter a valid phone number')
        }
        if (formData.firstName == '' || formData.lastName == '') {
            return toast.error('We require your full name')
        }
        console.log(formData)
        updateProfileInfo(formData, token)

    }
  return (
    <div className='p-6 bg-richblack-700 rounded-lg flex flex-col gap-5 '>
                <h4 className='font-semibold text-richblack-5 text-lg'>Profile information</h4>

                <form onSubmit={profileInfoSave} className='grid md:grid-cols-2 md:grid-rows-3 gap-x-5 gap-y-5'>
                    {personalDetails.map((item, index) => {
                        return (
                            <div key={index} className='flex flex-col gap-[0.375rem]'>
                                <label
                                    htmlFor={item.name}
                                    className='text-richblack-300 text-sm'>
                                    {item.label}
                                </label>
                                {item.name == 'gender' ?
                                    (<select
                                        value={formData[item.name]}
                                        onChange={handleOnChangeProfile}
                                        name={item.name}
                                        //defaultValue={`${user.additionalDetails.gender && user.additionalDetails.gender}`}
                                        className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline
                                     placeholder:text-richblack-300 placeholder:italic' >
                                        {!user.additionalDetails.gender && <option value=''>Choose here</option>}
                                        <option value='Female'>Female</option>
                                        <option value='Male'>Male</option>
                                    </select>) :
                                    (<input
                                        value={formData[item.name]}
                                        onChange={handleOnChangeProfile}
                                        type={`${item.name == 'dateOfBirth' ? 'date' : item.name == 'contactNumber' ? 'number' : 'text'}`}
                                        name={item.name}
                                        placeholder={`${user[item.name] ? user[item.name] : user.additionalDetails[item.name] ? user.additionalDetails[item.name] : 'Enter here'}`}
                                        className='text-richblack-100 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline
                                     placeholder:text-richblack-400 placeholder:italic spin-button-none' />
                                    )}


                            </div>

                        )
                    })}
                    <button
                        type='submit'
                        className='font-medium bg-yellow-50 py-3 px-6 rounded-md mt-6 w-fit '>
                        Save
                    </button>
                </form>

            </div>
  )
}

export default UpdatePersonalInfo
