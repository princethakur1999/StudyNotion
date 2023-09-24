import React from 'react'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function ListItem({heading,logo,para}) {
    return (
        <div className='flex  gap-6 items-center  '>
            <div className=' bg-richblack-25 drop-shadow-sm lg:w-[3.25rem]  md:min-w-[3.4rem]  min-w-[2.4rem] aspect-square rounded-full flex items-center justify-center'>
                <img src={logo} alt="icon" className='h-[1.5rem] w-[1.5rem] ' />
            </div>
            <div>
                <h4 className='text-base font-semibold'>{heading}</h4>
                <p className='text-sm text-richblack-700'>{para}</p>
            </div>
        </div>
    )
}

export default ListItem
