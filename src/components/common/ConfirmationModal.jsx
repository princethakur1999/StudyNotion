import React, { useEffect, useRef, useState } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//


function ConfirmationModal({ modalData }) {
  let [opacity,setOpacity]=useState('0');

  
  const modal = useRef();


  useEffect(()=>{
    setOpacity('100')
  },[])
  

  useOnClickOutside(modal, () => modalData.btn2Handler(),()=>resumeScroll())

  function stopScroll() {
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
  }
  function resumeScroll() {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  

  useEffect(()=>{
    if(modalData!==null){
      stopScroll()
    }
  },[])


  return (
    <div
      className={`absolute inset-0  flex items-center justify-center opacity-${opacity} transition-all duration-300 backdrop-blur-md z-50 h-[calc(100vh-4rem)]`}>
      <div
        ref={modal}
        className='bg-richblack-800 min-w-[18.9rem] px-8 py-5 rounded-3xl flex flex-col gap-2 text-lg font-medium text-richblack-100 border border-richblack-500'>
        <p className='text-2xl font-bold text-richblack-5'>
          {modalData.text1}
        </p>
        <p>
          {modalData.text2}
        </p>
        <div className='mt-6 flex justify-between gap-3 '>

          <button
            className='bg-yellow-25 text-richblack-700 font-semibold py-2 px-4 rounded-xl  hover:outline hover:outline-[orange] transition-all flex-1'
            onClick={() =>{ 
              modalData.btn1Handler()
              resumeScroll()
              }}>
            {modalData.btn1Text}
          </button>
          <button
            className='bg-richblack-200 text-richblack-900 font-semibold py-2 px-4 rounded-xl  hover:outline hover:outline-[orange] transition-all flex-1'
            onClick={() => {
              modalData.btn2Handler()
              resumeScroll()
            }}>
            {modalData.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
