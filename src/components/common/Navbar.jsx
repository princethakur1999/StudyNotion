import React, { useEffect, useState } from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { BsCart2 } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector'
import { courseEndpoints } from '../../services/apis'
import { AiOutlineDown } from 'react-icons/ai'
import Drawer from './Drawer'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function Navbar() {

  const { token } = useSelector((state => state.auth));
  const { user } = useSelector((state => state.profile));
  const { totalItems } = useSelector((state => state.cart));

  let location = useLocation();

  const [selected, setSelected] = useState(location.pathname);
  const [subLinks, setSubLinks] = useState([]);


  const fetchCatalogItems = async () => {

    try {

      const result = await apiConnector('GET', courseEndpoints.COURSE_CATEGORIES_API);
      const data = result.data.allCategories;

      setSubLinks(data);

    } catch (error) {

      console.log('Error while fetching category items:', error);
    }
  };


  useEffect(() => {

    fetchCatalogItems();

  }, [])


  function changeBgcolor(btn) {

    setSelected(`/${btn}`)
  }

  useEffect(() => {
    // to change background color if the path is not login or signup
    location.pathname === '/login' || location.pathname === '/signup' ? setSelected(location.pathname) : setSelected('')
  }, [location])

  return (

    <div className='bg-richblack-800 min-h-[4rem] py-[0.65rem] border-b-2 border-richblack-700' >

      <div className=' lg:w-[85%]  mx-auto flex pt-1 justify-between items-center shrink-0 w-[95%]'>
        {/* studyNotion logo */}
        <Link
          to={'/'}
          className='w-40'>
          <img src={logo} alt="logo" />
        </Link>

        {/* navbar itmes */}
        <div className=' gap-6 text-richblack-25 hidden md:flex '>
          {NavbarLinks.map((item, index) => {
            return <div key={index}>
              {item.title === 'Catalog' ?
                (<div className='flex items-center gap-1 cursor-pointer group relative z-40'>
                  Catalog <AiOutlineDown />
                  <div className=' h-0 overflow-hidden p-0  min-w-[17rem] absolute bg-richblack-5  rounded-md top-[2.7rem] left-[-7rem] z-10 flex flex-col group-hover:p-2  group-hover:h-fit    text-richblack-800 font-medium gap-2 transition-all '>
                    {subLinks.map((link, index) => {
                      return <Link
                        key={index}
                        className='hover:bg-richblack-25 p-4 rounded-md transition-all'
                        to={`/catalog/${link.name.split(" ").join("-").toLowerCase()}`}>
                        {link.name}
                      </Link>
                    })}

                  </div>
                  <div className=' scale-0 absolute rounded-md  aspect-square group-hover:w-10 group-hover:scale-100 bg-richblack-5 rotate-45 top-8 left-[3.2rem]  transition-all'></div>
                </div>) :
                (<div className='hover:scale-[1.03] transition-all'><NavLink to={item.path}  >{item.title}</NavLink></div>)}

            </div>

          })}
        </div>

        {/* signup and login buttons with other icons */}
        <div className='flex gap-5 items-center'>
          {user && user.accountType !== "Instructor" && (
            <Link to='/dashboard/cart' className='relative'>
              <BsCart2 className='text-richblack-200 font-semibold text-xl' />
              {
                totalItems > 0 && (
                  <span className='bg-richblack-600  text-yellow-100 p-2 text-[0.75rem] rounded-full  w-[18px] h-[18px] flex items-center justify-center 
                  top-[-0.8rem] right-[-0.5rem] absolute'>{totalItems}</span>
                )
              }
            </Link>
          )}

          {
            token === null && (<>
              <Link className={`${selected === '/signup' ? 'bg-yellow-50 text-richblack-900 font-semibold' : 'text-richblack-200 '} py-2 px-2 rounded-lg border border-[#808080a1] font-medium transition-all hover:border-yellow-50 hidden md:block`} onClick={() => changeBgcolor('signup')} to={'/signup'}>Sign up</Link>

              <Link className={`${selected === '/login' ? 'bg-yellow-50 text-richblack-900 font-semibold' : 'text-richblack-200 '} py-2 px-2 rounded-lg border border-[#808080a1] font-medium transition-all hover:border-yellow-50 hidden md:block`} onClick={() => changeBgcolor('login')} to={'/login'}>Login</Link></>
            )
          }

          {
            token !== null && <ProfileDropDown />
          }
          <Drawer />


        </div>
      </div>
    </div>
  )
}

export default Navbar
