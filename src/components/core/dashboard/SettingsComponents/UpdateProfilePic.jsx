import React from 'react'
import { updateDisplayPicture } from '../../../../services/operations/profileAPI';
import { useDispatch, useSelector } from 'react-redux';
import { FiUpload } from 'react-icons/fi'
import { toast } from 'react-hot-toast';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function UpdateProfilePic() {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const selectedPic = new FormData();

    function handleImage(e) {
        if (e.target.files[0]) {
            const picture = e.target.files[0]
            selectedPic.append("displayPicture", picture);
            updateDisplayPicture(selectedPic, token)
        } else {
            toast(<span>Please Upload a Picture</span>)
        }
    }

    return (
        <div className='p-6 bg-richblack-700 rounded-lg flex gap-5 items-center'>
            {/* profile pic */}
            <img src={user.image} alt="profileIMG" className='aspect-square w-[4.625rem] rounded-full' />

            <div className='flex flex-col gap-3'>
                <h4 className='text-sm text-richblack-5 font-medium'>Change profile picture</h4>
                <div className='relative flex gap-3'>
                    <input type='file' id='profilePic' accept='image/*' className='hidden' onChange={handleImage} />
                    <label htmlFor="profilePic" className='flex gap-2 items-center px-5 py-2 bg-yellow-50 rounded-lg font-medium absolute left-0 top-0 cursor-pointer' >
                        <FiUpload /> Upload</label>
                    {/* filler div to maintain div height */}
                    <div className='px-5 py-2  invisible' >*</div>
                    {/* <div className={`flex gap-2 items-center text-caribbeangreen-200  ${profilePic ? 'visible' : 'invisible'}`}><FaCheck />Image selected</div> */}
                </div>
            </div>

        </div>
    )
}

export default UpdateProfilePic
