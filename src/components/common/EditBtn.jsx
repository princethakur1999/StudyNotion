import React from 'react'
import { TbEdit } from 'react-icons/tb'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:N/A ###########//
//#####################################################//

function EditBtn() {
    return (
        <button className='flex items-center justify-center h-fit gap-2 rounded-lg bg-yellow-50  font-medium text-richblack-900 py-2 px-4'>
            <TbEdit /> Edit
        </button>
    )
}

export default EditBtn;
