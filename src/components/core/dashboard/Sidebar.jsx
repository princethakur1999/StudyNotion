import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'
import { logout } from '../../../services/operations/authAPI';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function Sidebar() {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmationModal, setConfirmationModal] = useState(null);

    return (
        <>
            <div className='fixed bottom-0 min-w-[100vw] lg:static flex lg:min-w-[13.875rem] lg:flex-col lg:border-r-[1px] lg:border-r-richblack-700 lg:min-h-[calc(100vh-4rem)] bg-richblack-800 lg:py-10 text-richblack-300 z-50 md:z-50 border-t-richblack-700 border-t-[2px] lg:border-t-0' >
                <div className='flex lg:flex-col justify-between lg:justify-start gap-2 lg:gap-0 flex-1 lg:flex-initial px-2 py-1  lg:p-0 items-center lg:items-stretch text-xl' >
                    {
                        sidebarLinks.map((link) => {
                            if (link.type && user?.accountType !== link.type) return null
                            return <SidebarLink key={link.id} link={link} iconName={link.icon} />
                        })
                    }
                    <div className='block lg:hidden'>
                        <button
                            onClick={() => setConfirmationModal({
                                visibility: true,
                                text1: 'Are you sure?',
                                text2: `You'll be logged out`,
                                btn1Text: 'Logout',
                                btn2Text: 'Cancel',
                                btn1Handler: () => dispatch(logout(navigate)),
                                btn2Handler: () => setConfirmationModal(null)
                            })}>
                            <div className={`flex items-center gap-x-2 px-2 py-2 font-medium mx-1 ${user.accountType==='Instructor'&&'md:flex-col lg:flex-row'}`}>
                                <VscSignOut className='text-lg ' />
                                <span className='text-sm hidden md:block '>Logout</span>
                            </div>
                        </button>
                    </div>


                </div>

                <div className='mx-auto mt-6 mb-6 h-[0.063rem] w-10/12 bg-richblack-600 hidden lg:block' ></div>

                <div className='flex-col hidden lg:flex' >
                    <SidebarLink
                        link={{ name: "Settings", path: "dashboard/settings" }}
                        iconName='VscSettingsGear'
                    />

                    <button
                        onClick={() => setConfirmationModal({
                            visibility: true,
                            text1: 'Are you sure?',
                            text2: `You'll be logged out`,
                            btn1Text: 'Logout',
                            btn2Text: 'Cancel',
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null)
                        })}>
                        <div className=' flex items-center gap-x-2 px-8 py-2 font-medium mx-1'>
                            <VscSignOut className='text-lg ' />
                            <span className='text-sm'>Logout</span>
                        </div>
                    </button>
                </div>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    )
}

export default Sidebar
