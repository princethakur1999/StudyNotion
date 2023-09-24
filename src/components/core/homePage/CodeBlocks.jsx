import React from 'react';
import CTAButton from './CTAButton';
import HighlightText from './HighlightText';
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { useSelector } from 'react-redux';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//


function CodeBlocks({ position, startHeading, highlightedHeading, remainingHeading, para, ctabtn1, ctabtn2, codeblock, bgGradientColor, codeColor }) {

  const { user } = useSelector((state => state.profile));

  return (

    <div className={`flex w-[95%]  flex-col mx-auto  xl:w-[75%] lg:mb-64 gap-24 md:gap-32 mb-28  items-center justify-center ${position === 'flex-row-reverse' ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>

      <div className='lg:w-[40%] md:w-[80%] w-full'>

        <h3 className='text-richblack-5  font-semibold text-3xl md:text-4xl leading-[2.75rem]'>{startHeading}<HighlightText text={highlightedHeading} /> {remainingHeading}</h3>
        <p className='text-richblack-300 leading-6 mt-3 '>{para}</p>

        {user?.accountType !== 'Instructor' &&
          (
            <div className='flex md:gap-6 md:mt-16 flex-col md:flex-row gap-4 mt-7'>
              <CTAButton yellow={true} linkTo={ctabtn1.linkto}>{ctabtn1.text}<FaArrowRight className='h-[0.79rem] ml-3' /></CTAButton>
              <CTAButton yellow={false} linkTo={ctabtn2.linkto}>{ctabtn2.text}</CTAButton>
            </div>
          )}

      </div>

      <div className=' flex gap-2 w-full lg:w-[40%] md:w-[60%] backdrop-blur-md bg-gradient-to-br from-[rgba(14,26,45,0.24)] to-[rgba(17,30,50,0.38)] 104.96%)] border-[1px] border-[#555454b1] px-3 py-2 rounded-md relative '>

        <div className={`aspect-square w-72 bg-gradient-to-br ${bgGradientColor} rounded-full absolute blur-2xl -z-20 top-[-3rem] left-[-1rem]`}></div>

        <div className='font-bold text-xs md:text-sm text-richblack-500 leading-[1.375rem] font-mono'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
          <p>13</p>
          <p>14</p>
          <p>15</p>

        </div>

        <div className={`${codeColor} font-mono font-bold text-xs md:text-sm leading-[1.375rem] relative `}>
          <TypeAnimation sequence={[codeblock, 5000, '']} repeat={Infinity} cursor={true} className='whitespace-pre-line' omitDeletionAnimation={true} />
        </div>

      </div>
    </div>
  )
}

export default CodeBlocks;
