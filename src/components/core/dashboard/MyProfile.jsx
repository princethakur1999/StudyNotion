import { RiEditBoxLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { formattedDate } from '../../../utils/dateFormatter';

import EditBtn from '../../common/EditBtn';

export default function MyProfile() {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (

        <>
            <h1 className="mb-8 text-2xl md:text-3xl lg:text-4xl font-medium text-richblack-5">
                My Profile
            </h1>

            <div className="flex flex-col md:flex-row items-center md:justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 md:p-8 lg:p-12">

                <div className="flex items-center gap-4">
                    <img
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[78px] h-[78px] md:w-[120px] md:h-[120px] rounded-full object-cover"
                    />

                    <div className="space-y-1">
                        <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-richblack-5">
                            {user?.firstName + ' ' + user?.lastName}
                        </p>

                        <p className="text-sm md:text-base text-richblack-300">{user?.email}</p>
                    </div>

                </div>

                <div onClick={() => navigate('/dashboard/settings')}>
                    <EditBtn>
                        <RiEditBoxLine />
                    </EditBtn>
                </div>
            </div>

            <div className="my-8 md:my-10 flex flex-col gap-6 md:gap-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 md:p-8 lg:p-12">
                <div className="flex w-full items-center justify-between">
                    <p className="text-lg md:text-xl lg:text-2xl font-semibold text-richblack-5">
                        About
                    </p>

                    <div onClick={() => navigate('/dashboard/settings')}>
                        <EditBtn>
                            <RiEditBoxLine />
                        </EditBtn>
                    </div>
                </div>

                <p
                    className={`${user?.additionalDetails?.about
                        ? 'text-richblack-5'
                        : 'text-richblack-400'
                        } text-sm md:text-base font-medium`}
                >
                    {user?.additionalDetails?.about ?? 'Write something about yourself'}
                </p>
            </div>

            <div className="my-8 md:my-10 flex flex-col gap-6 md:gap-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 md:p-8 lg:p-12">
                <div className="flex w-full items-center justify-between">
                    <p className="text-lg md:text-xl lg:text-2xl font-semibold text-richblack-5">
                        Personal Details
                    </p>

                    <div onClick={() => navigate('/dashboard/settings')}>
                        <EditBtn>
                            <RiEditBoxLine />
                        </EditBtn>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row max-w-full md:max-w-[500px] lg:max-w-[800px]">
                    <div className="flex flex-col gap-4 md:gap-5">
                        <div>
                            <p className="mb-1 md:mb-2 text-sm md:text-base text-richblack-600">First Name</p>
                            <p className="text-sm md:text-base font-medium text-richblack-5">
                                {user?.firstName}
                            </p>
                        </div>
                        <div>
                            <p className="mb-1 md:mb-2 text-sm md:text-base text-richblack-600">Email</p>
                            <p className="text-sm md:text-base font-medium text-richblack-5">
                                {user?.email}
                            </p>
                        </div>
                        <div>
                            <p className="mb-1 md:mb-2 text-sm md:text-base text-richblack-600">Gender</p>
                            <p className="text-sm md:text-base font-medium text-richblack-5">
                                {user?.additionalDetails?.gender ?? 'Add gender'}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 md:gap-5">
                        <div>
                            <p className="mb-1 md:mb-2 text-sm md:text-base text-richblack-600">Last Name</p>
                            <p className="text-sm md:text-base font-medium text-richblack-5">
                                {user?.lastName}
                            </p>
                        </div>
                        <div>
                            <p className="mb-1 md:mb-2 text-sm md:text-base text-richblack-600">Phone Number</p>
                            <p className="text-sm md:text-base font-medium text-richblack-5">
                                {user?.additionalDetails?.contactNumber ?? 'Add contact number'}
                            </p>
                        </div>
                        <div>
                            <p className="mb-1 md:mb-2 text-sm md:text-base text-richblack-600">Date Of Birth</p>
                            <p className="text-sm md:text-base font-medium text-richblack-5">
                                {formattedDate(user?.additionalDetails?.dateOfBirth) ?? 'Add date of birth'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
