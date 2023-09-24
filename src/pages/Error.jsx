import React from 'react'
import lostGIF from '../assets/Images/LOSTgiphy.gif'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function Error() {
  return (
    <div className='w-full h-screen flex flex-col gap-14 items-center justify-center'>
      <p className='text-[#d5d3d3] font-bebas tracking-[0.3em] pl-6 text-4xl md:text-6xl text-center'>
       <span className='text-[#ff4b4b]'>404</span> not found
      </p>
      <img src={lostGIF} className='rounded-xl w-[95vw] md:w-fit'/>
    </div>
  )
}

export default Error
