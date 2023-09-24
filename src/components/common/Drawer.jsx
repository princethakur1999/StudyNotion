import React from 'react'
import { FiMenu } from 'react-icons/fi'

import DrawerItems from './DrawerItems'
import { useState } from 'react'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function Drawer() {
    const [navDrawer, setNavDrawer] = useState(false)

    return (
        <>
            <button
                onClick={() => setNavDrawer(true)}
                className='md:hidden'>
                <FiMenu className='text-3xl text-richblack-25' />
            </button>
            <div className={`absolute ${navDrawer ? 'translate-x-[0%]' : 'translate-x-[100%]'} h-screen bottom-0 top-0 left-20 right-0 z-[60] p-3 flex flex-col gap-4 backdrop-blur-xl bg-[#00000067] rounded-l-xl border-l-[1px] border-l-richblack-200 transition-all overflow-y-scroll overflow-x-hidden`}>
                {navDrawer && <DrawerItems navDrawer={navDrawer} setNavDrawer={setNavDrawer} />}
            </div>

            {navDrawer && <div
                onClick={() => setNavDrawer(false)}
                className='absolute inset-0 z-40 -scale-x-150 -translate-x-2'></div>}

        </>


    )
}

export default Drawer
