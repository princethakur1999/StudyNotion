import React from 'react'
import HighlightText from '../homePage/HighlightText'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function HeadingParaBlock({ heading, headingColor, para }) {

    return (<>
        {heading == '' ?
            (<>
                {/* div with backgroung image */}
                <div className={`backgroundImage-about2 bg-no-repeat bg-cover h-[15rem] xl:w-[470px] md:min-h-[17.375rem] rounded-md relative border border-[#cd5e5ea4]`}>
                    {/* glowing blur behind the image */}
                    <div className='aspect-video absolute bg-pink-300 w-96 rounded-full opacity-70 blur-3xl top-[-1rem] -z-30 md:scale-[0.8] lg:scale-100'></div>
                </div>
            </>) :
            (<div className='flex flex-col md:gap-6 gap-2'>
                <h1 className=' font-semibold md:text-4xl text-2xl'><HighlightText text={heading} color={headingColor} /></h1>
                <p className=' font-medium text-richblack-300 text-sm md:text-base'>{para}</p>
            </div>)}
    </>

    )
}

export default HeadingParaBlock
