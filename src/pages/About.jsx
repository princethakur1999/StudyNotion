import React from 'react'
import HighlightText from '../components/core/homePage/HighlightText'
import aboutUs1 from '../assets/Images/aboutus1.webp'
import aboutUs3 from '../assets/Images/aboutus3.webp'
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im'
import HeadingParaBlock from '../components/core/About/HeadingParaBlock'
import { data, achievementData, learningData } from '../data/AboutData'
import CTAButton from '../components/core/homePage/CTAButton'
import ContactUsForm from '../components/common/ContactUsForm'
import Footer from '../components/core/homePage/Footer'
import { useSelector } from 'react-redux'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//   

function About() {
  const { token } = useSelector((state => state.auth));
  return (
    <div className='w-full '>
      {/* section 1 div */}
      <div className='xl:px-[7.5rem] bg-richblack-800 flex flex-col gap-[3.25rem] pt-6 xl:pt-20 relative min-h-[30rem] xl:min-h-[33.5rem]  '>
        {/* heading and para div */}
        <div className='flex flex-col gap-4 items-center w-[95%] md:w-[70%] lg:w-[63%] mx-auto  md:text-center  max-w-[57rem]'>
          <h1 className=' font-semibold text-3xl md:text-4xl leading-[2.75rem] text-richblack-5'>Driving Innovation in Online Education for a <HighlightText text={`Brighter Future`} /></h1>
          <p className=' font-medium text-richblack-500 '>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
        </div>

        {/* empty div to maintain height of section 1 div and to not let 
        heading and para to go behind the images if view port width decreases */}
        <div className='md:h-[11rem]'></div>



        {/* images of random women writing something */}
        <div className=' max-w-[54rem] flex md:gap-3 xl:gap-6 gap-2 absolute  left-[50%] translate-x-[-50%] justify-center md:bottom-[-5.5rem] bottom-[-2rem]  z-30'>
          <img src={aboutUs1} alt="img" className='rounded-md lg:min-w-[20rem] lg:block xl:block hidden object-cover' />
          <div className='md:min-w-[23rem] lg:min-w-[20rem] xl:min-w-[384px] lg:h-[311px] min-w-[11rem] backgroundImage-about relative rounded-md bg-cover'>
            {/* empty div for blur behind the images */}
            <div className='md:scale-75 lg:scale-100 scale-50 customGradient-orangeBg h-10 w-[21rem] absolute blur-xl rounded-full left-[50%] translate-x-[-50%] top-[-1rem] opacity-70 -z-50'></div>
          </div>
          <img src={aboutUs3} alt="img" className='rounded-md min-w-[11rem] md:min-w-[23rem] lg:min-w-[20rem] xl:min-w-[unset] object-cover' />
        </div>
      </div>

      {/* section 2 */}
      <div className='md:px-[1rem] lg:px-[7.5rem] px-[0.3rem] mt-[5rem] md:mt-[10.813rem] pb-[5rem] border-b-2 border-richblack-500 '>
        {/* huge quotation para */}
        <p className='text-2xl md:text-4xl leading-[3.25rem] text-richblack-100 font-semibold text-center max-w-[70rem] mx-auto'>
          <sup ><ImQuotesLeft className='inline text-richblack-400 text-3xl align-top' /></sup> We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={'combines technology'} />, <HighlightText text={'expertise'} color={'orange'} />, and community to create an <HighlightText text={'unparalleled educational experience. '} color={'orange'} /><sup><ImQuotesRight className='inline text-richblack-400 text-3xl' /></sup>
        </p>
      </div>

      {/* section 3 */}
      <div className='md:px-[2rem] xl:px-[11.5rem] md:pt-[5.625rem] px-[0.5rem] pt-[2rem] mb-7 max-w-[100rem] mx-auto'>
        <div className='grid md:grid-cols-2 md:grid-rows-2  gap-x-[3rem] lg:gap-x-[5.65rem] md:gap-y-28 xl:gap-y-44 gap-y-9 relative z-20'>
          {data.map((item, index) => {
            return <HeadingParaBlock key={index} heading={item.heading} headingColor={item.headingColor} para={item.para} />
          })}
        </div>
      </div>

      {/* section 4 */}
      <div className='md:py-[2rem] lg:py-[5.625rem] py-[1.5rem] px-[1rem] md:px-[7.5rem] bg-richblack-800'>
        <div className='flex  md:gap-3 w-full justify-center max-w-[90rem] mx-auto'>
          {achievementData.map((item, index) => {
            return <div key={index} className='flex flex-col gap-1 md:gap-3 items-center flex-1'>
              <h3 className='font-bold text-lg md:text-3xl text-richblack-5'>{item.amount}</h3>
              <p className='font-semibold  text-richblack-500 md:text-base text-xs whitespace-nowrap'>{item.desc}</p>
            </div>
          })}
        </div>
      </div>

      {/* section 5 */}
      <div className='md:py-[5.625rem] lg:px-[7.5rem] px-[1rem] py-[3rem] w-full  mx-auto max-w-[100rem]'>
        <div className=' grid xl:grid-cols-4 xl:grid-rows-2 grid-cols-2 gap-2 '>
          <div className='col-span-2 xl:pr-16 mb-4 xl:mb-0'>
            <h1 className='font-semibold text-2xl  md:text-4xl text-richblack-5 mb-3'>World-Class Learning for <HighlightText text={`\nAnyone, Anywhere`} /></h1>
            <p className='font-medium  text-richblack-300 md:mb-12 mb-5 md:text-base text-sm'>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
            <CTAButton yellow={true} linkTo={`${token===null?'/login':'/catalog'} `}>Learn more</CTAButton>
          </div>
          {learningData.map((item, index) => {
            return <div className={`md:p-8 p-2 flex flex-col gap-2 md:gap-8 ${(index == 0 || index == 3 || index == 5) && 'bg-richblack-700'} 
              ${(index == 1 || index == 4) && 'bg-richblack-800'} min-h-[12rem] xl:min-h-[18.375rem] rounded-lg ${index===2&&'hidden xl:block'} ${index===3&&'col-span-2 min-h-fit xl:min-h-[12rem] xl:col-span-1'}`}>
              <h1 className='text-richblack-5 font-semibold md:text-lg'>{item.heading}</h1>
              <p className='text-richblack-100 leading-[1.375rem] text-xs md:text-base'>{item.para}</p>
            </div>
          })}
        </div>
      </div>
 
      {/* section 6 */}
      <div className='xl:px-[26.25rem] xl:pt-[5.625rem] lg:px-[8rem] flex flex-col gap-8 mb-9 mx-auto max-w-[100rem]'>
        <div className='lg:p-11 md:pt-6 md:p-8 md:m-6 lg:m-2 p-3 m-2 flex flex-col gap-8 rounded-2xl outline outline-[#8e8e0b88]'>
          <div className='flex flex-col gap-3' >
            <h3 className='text-center text-richblack-5 text-3xl md:text-4xl font-semibold '>Get in Touch</h3>
            <p className=' text-center text-richblack-300 font-medium text-sm md:text-base'>We’d love to here for you, Please fill out this form.</p>
          </div>
          <ContactUsForm />
        </div>
      </div>

        {/* footer */}
        <Footer/>
        

    </div>
  )
}

export default About
