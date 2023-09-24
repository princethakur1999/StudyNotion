import React from 'react'
import UpdateProfilePic from './SettingsComponents/UpdateProfilePic';
import UpdatePersonalInfo from './SettingsComponents/UpdatePersonalInfo';
import ChangePassword from './SettingsComponents/ChangePassword';
// import DeleteAccount from './SettingsComponents/DeleteAccount';


//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//


function Settings() {

    return (
        <div className='flex flex-col gap-5'>
            {/* Edit profile heading */}
            <h1 className='text-richblack-5 mb-9 font-medium text-3xl'>Edit Profile</h1>

            {/* profile pic upload div */}
            <UpdateProfilePic />


            {/* personal info change div */}
            <UpdatePersonalInfo />


            {/* password change div */}
            <ChangePassword />


            {/* delete account div */}
            {/* <DeleteAccount /> */}

        </div>
    )
}

export default Settings
