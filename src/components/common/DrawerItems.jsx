import React, { useEffect, useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { NavbarLinks } from '../../data/navbar-links'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { apiConnector } from '../../services/apiConnector'
import { courseEndpoints } from '../../services/apis'
import { AiOutlineDown } from 'react-icons/ai'
import { logout } from '../../services/operations/authAPI'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function DrawerItems({ navDrawer, setNavDrawer }) {
    const { token } = useSelector((state => state.auth));
    const { user } = useSelector((state => state.profile));
    let location = useLocation();
    const [selected, setSelected] = useState(location.pathname);
    const [catalogClicked, setCatalogClicked] = useState(false);
    const [subLinks, setSubLinks] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchCatalogItems = async () => {
        try {
            const result = await apiConnector('GET', courseEndpoints.COURSE_CATEGORIES_API);
            const data = result.data.allCategories;
            setSubLinks(data)
        } catch (error) {
            console.log('Error while fetching category itmes');
            console.log('Error :', error.message);
        }
    }

    useEffect(() => {

        document.body.style.position = 'fixed';
        document.body.style.overflowY = "hidden";
        return () => {

            document.body.style.overflowY = "scroll";
            document.body.style.position = '';
        };
    }, [])

    useEffect(() => {
        fetchCatalogItems();
    }, [])


    return (
        <>
            <div
                onClick={() => setNavDrawer(false)}
                className='flex justify-end text-3xl mb-6'>
                <GrClose className='bg-richblack-25 aspect-square rounded-full p-1' />
            </div>
            {
                token !== null &&
                (
                    <Link
                        to="/dashboard/my-profile"
                        onClick={() => {
                            setCatalogClicked(false)
                            setNavDrawer(false)
                        }}
                        className='rounded-lg flex gap-3 items-center mb-3 active:bg-richblack-700 transition-all py-1'>
                        <img src={user?.image}
                            className='w-[52px] aspect-square rounded-full object-cover border-[3px] border-blue-200' />
                        <p className='text-richblack-25 text-xl font-medium tracking-wide'>{user?.firstName} {user?.lastName}</p>
                    </Link>
                )
            }
            <div className='bg-richblack-800 rounded-lg flex flex-col px-2 border-[1px] border-richblack-500 text-richblack-5 font-medium transition-all'>
                {NavbarLinks.map((item, index) => (
                    <>
                        {item.title == 'Catalog' ?
                            (<>
                                <div
                                    onClick={() => setCatalogClicked(!catalogClicked)}
                                    key={index}
                                    className='border-b-[1px] border-richblack-500 py-2 last:border-none flex items-center gap-1'>
                                    Catalog <AiOutlineDown />
                                </div>
                                <div className={`flex flex-col gap-1 bg-richblack-600 ${catalogClicked ? 'h-full py-1 px-1 mx-2 my-3' : 'h-0 overflow-hidden py-0 px-0 mx-0 my-0'}  rounded-lg transition-all duration-300`}>
                                    {subLinks.map((link, index) => {
                                        return <Link
                                            key={index}
                                            className='px-4 py-2 rounded-md transition-all'
                                            to={`/catalog/${link.name.split(" ").join("-").toLowerCase()}`}
                                            onClick={() => {
                                                setCatalogClicked(false)
                                                setNavDrawer(false)
                                            }}>
                                            {link.name}
                                        </Link>
                                    })}
                                </div>
                            </>

                            ) :
                            (<NavLink
                                className='border-b-[1px] border-richblack-500 py-2 last:border-none'
                                to={item.path}
                                onClick={() => setNavDrawer(false)} >{item.title}</NavLink>)}
                    </>


                ))}

            </div>


            {
                token &&
                (
                    <div className='flex h-full items-end'>
                        <button
                            onClick={() => {
                                setNavDrawer(false)
                                dispatch(logout(navigate))
                            }}
                            className='text-richblack-25 bg-richblack-600 rounded-lg py-2 font-medium  active:border-blue-200 active:border flex-1'>
                            Logout
                        </button>
                    </div>

                )
            }
            {
                token === null &&
                (
                    <div className='flex h-full items-end gap-4 '>
                        <Link className={` customGradient-Bg text-richblack-900 font-semibold  py-2 px-2 rounded-lg border border-[#808080a1]  transition-all  flex-1 text-center`} to={'/signup'} onClick={() => setNavDrawer(false)}>Sign up</Link>

                        <Link className={` customGradient-orangeBg text-richblack-900 font-semibold  py-2 px-2 rounded-lg border border-[#808080a1]  transition-all  flex-1 text-center`} to={'/login'} onClick={() => setNavDrawer(false)}>Login</Link>
                    </div>

                )
            }

        </>


    )
}

export default DrawerItems
