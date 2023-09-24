import React from 'react'
import { Link } from 'react-router-dom'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE: YES ##########//
//#####################################################//

function CTAButton({children,yellow,linkTo}) {
  return (
    <Link to={linkTo}>
        <div className={`w-fit font-medium flex items-center justify-evenly py-3 px-6 ${yellow?'bg-yellow-50 text-black':'bg-richblack-800  text-richblack-5'} rounded-lg 
        shadow-[1px_1px_0px_0.5px_rgba(255,255,255,0.51)] hover:scale-95 transition-all duration-200 hover:shadow-[0px_0px_0px_2px_rgba(18,216,250,1)] whitespace-nowrap md:whitespace-normal`}>
            {children}
        </div>
    </Link>
    
  )
}

export default CTAButton
