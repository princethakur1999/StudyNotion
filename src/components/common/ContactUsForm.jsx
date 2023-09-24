import React, { useEffect } from 'react'
import countryCodes from '../../data/countrycode.json'
import CTAButton from '../core/homePage/CTAButton'
import { useForm } from 'react-hook-form'
import { apiConnector } from '../../services/apiConnector';
import { contactusEndpoint } from '../../services/apis';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function ContactUsForm() {
    const { register, reset, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();
    const {pathname}=useLocation();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: '',
                firstName: '',
                lastName: '',
                message: '',
                phoneNo: ''
            })
        }
    }, [reset, isSubmitSuccessful]);

    async function submitContactForm(data) {
        console.log(data)
        const loading=toast.loading('Loading...');
        try{
            const response=await apiConnector('POST',contactusEndpoint.CONTACT_US_API,data);
            console.log('CONTACT_US_API RESPONSE...',response)
            toast.success('Message sent')
        }catch(error){
            console.log('CONTACT_US_API ERROR...',error)
            toast.error('Something went wrong')
            
        }
        toast.dismiss(loading);
        
        
    }
    


    return (
        <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col gap-9 ' >
            {/* all input fields */}
            <div className='flex flex-col gap-5 '>
                <div className='flex gap-2 md:gap-5'>
                    <div
                        className=' flex flex-col gap-[0.375rem] flex-1 min-w-[0rem]'>
                        {/* first name label */}
                        <label
                            htmlFor='firstName'
                            className='text-richblack-5 text-sm'>First name</label>
                        {/* first name input field */}
                        <input
                            type='text'
                            name='firstName'
                            placeholder='Enter first name'
                            {...register('firstName', { required: true })}
                            className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline  placeholder:italic' />
                        {
                            errors.firstName && (
                                <span className='text-pink-300 font-medium text-sm'>Please Enter First name</span>
                            )
                        }
                    </div>
                    <div
                        className=' flex flex-col gap-[0.375rem] flex-1 min-w-[0rem]'>
                        {/* last name label */}
                        <label
                            htmlFor='lastName'
                            className='text-richblack-5 text-sm'>Last name</label>
                        {/* last name input field */}
                        <input
                            type='text'
                            name='lastName'
                            placeholder='Enter last name'
                            {...register('lastName', { required: true })}
                            className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline  placeholder:italic' />
                        {
                            errors.lastName && (
                                <span className='text-pink-300 font-medium text-sm'>Please Enter First name</span>
                            )
                        }
                    </div>
                </div>

                <div className=' flex flex-col gap-[0.375rem]'>
                    {/* email label */}
                    <label
                        htmlFor='email'
                        className='text-richblack-5 text-sm'>Email Address</label>
                    {/* email input field */}
                    <input
                        type='email'
                        name='email'
                        placeholder='Enter email address'
                        {...register('email', { required: true })}
                        className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline  placeholder:italic'></input>
                    {
                        errors.email && (
                            <span className='text-pink-300 font-medium text-sm'>Please Enter First name</span>
                        )
                    }
                </div>

                <div
                    className=' flex flex-col gap-[0.375rem] '>

                    <label
                        htmlFor="phoneNo"
                        className='text-richblack-5 text-sm'>Phone Number</label>
                    <div
                        className='flex gap-2 md:gap-2'>

                        <select
                            name="countryCode"
                            defaultValue='+91'
                            className={`text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline  placeholder:italic 
                            w-[7.4ch]`}
                            {...register('countryCode', { required: true })}>
                            {countryCodes.map((code, index) => {
                                return <option
                                    key={index}
                                    value={code.code} >{code.code} - {code.country}</option>
                            })}
                        </select>

                        <input
                            type="number"
                            name="phoneNo"
                            placeholder='Enter phone number'
                            {...register('phoneNo',
                                {
                                    maxLength: { value: 10, message: 'Invalid Phone Number' },
                                    minLength: { value: 8, message: 'Invalid Phone Number' },
                                    required: true
                                })}
                            className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline  
                            placeholder:italic spin-button-none flex-1' />
                    </div>
                    {
                        errors.phoneNo && (
                            <span className='text-pink-300 font-medium text-sm'>{errors.phoneNo.message}</span>
                        )
                    }

                </div>
            </div>

            {/* message box */}
            <div className=' flex flex-col gap-[0.375rem] '>
                <label
                    htmlFor="message"
                    className='text-richblack-5 text-sm'>Message</label>
                <textarea
                    type='text'
                    name="message"
                    placeholder='Enter Message'
                    {...register('message', { required: true })}
                    rows={5}
                    className='text-richblack-200 font-medium rounded-md p-3 bg-richblack-800 customGradient-outline  placeholder:italic flex-1'
                />
                {
                    errors.message && (
                        <span className='text-pink-300 font-medium text-sm'>Please Enter First name</span>
                    )
                }
            </div>

            {/* send button */}
            <button
                type='submit'
                className='font-medium bg-yellow-50 py-3 rounded-md mt-6'>Send Message</button>
        </form>
    )
}

export default ContactUsForm
