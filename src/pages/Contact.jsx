import React from 'react'
import { data } from '../data/contactUsData'
import {BsFillChatFill} from 'react-icons/bs'
import {GiEarthAmerica} from 'react-icons/gi'
import {MdCall} from 'react-icons/md'
import ContactUsForm from '../components/common/ContactUsForm'
import Footer from '../components/core/homePage/Footer'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function Contact() {
  return (
    <div>
      {/* form section */}
      <div className='py-[2rem] px-[0.5rem] lg:py-[5.625rem] lg:px-[3.4rem] xl:px-[7.5rem] flex md:gap-3 gap-12 md:flex-row flex-col mx-auto max-w-[100rem]'>

        <div className='md:px-3 lg:px-6  px-6 py-8 flex flex-col gap-9 bg-richblack-800 rounded-3xl lg:w-[40%] h-fit'>
          {data.map((item, index) => {
            return <div key={index} className='flex gap-3 '>
              <div className='text-richblack-100 pt-[0.4rem] text-lg'>
                {index==0&&<BsFillChatFill/>}
                {index==1&&<GiEarthAmerica/>}
                {index==2&&<MdCall/>}
              </div>
              <div className='flex flex-col gap-[0.125rem] '>
                <h4 className='text-richblack-5 font-semibold'>{item.heading}</h4>
                <p className='font-medium text-sm text-richblack-200'>{item.desc}</p>
              </div>
            </div>
          })}
        </div>

        {/* form */}
        <div className='lg:w-[60%] xl:p-14 lg:py-8 md:p-4 p-3 border border-richblack-500 rounded-3xl flex flex-col gap-8 '>
          <div className='flex flex-col gap-1 md:gap-3'>
            <h1 className='text-2xl md:text-4xl text-richblack-5 font-semibold  md:leading-10'>Got a Idea? We’ve got the skills. Let’s team up</h1>
            <p className=' text-richblack-300 font-medium md:text-base text-sm'>Tall us more about yourself and what you’re got in mind.</p>
          </div>
          <ContactUsForm/>
        </div>
        
      </div>
      <Footer/>
    </div>
  )
}

export default Contact
