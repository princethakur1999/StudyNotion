import React from 'react'
import * as Icons from 'react-icons/vsc'
import * as Icons2 from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, matchPath, useLocation, useParams } from 'react-router-dom';
import { resetCourseState } from '../../../slices/courseSlice';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function SidebarLink({ link, iconName }) {
    const Icon = Icons[iconName]?Icons[iconName]:Icons2[iconName];
    const { user } = useSelector((state) => state.profile);
    const location = useLocation();
    const dispatch = useDispatch();
    const {editCourse}=useSelector((state)=>state.course)

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }


    return (
        <NavLink
            onClick={()=>{
                if(link.name=='Add Course'){
                    if(editCourse){
                        dispatch(resetCourseState())
                    }
                }
            }}
            to={link.path}
            className={`flex-1 md:flex-initial  lg:${link.breakpoint==='normal' && 'hidden'}  relative md:px-3 md:py-2 lg:px-8 lg:py-2 text-sm font-medium transition-all  overflow-hidden mx-1 rounded-lg ${matchRoute(link.path) ? 'bg-yellow-800' : 'bg-opacity-0'}`}
        >

            <span 
            className={`absolute md:hidden lg:block bottom-0 left-0 right-0 md:bottom-[unset] md:right-[unset] md:left-[0.5rem] md:top-[50%] md:translate-y-[-50%] h-[2px] md:h-[0.5rem] md:w-[0.5rem]  bg-yellow-50 transition-all md:rounded-full ${matchRoute(link.path) ? 'opacity-100' : 'opacity-0'} `} >
            </span>

            <div 
            className={`flex items-center gap-x-2  p-2  md:p-0 ${user.accountType==='Instructor'&&'md:flex-col lg:flex-row'}`}>
                <Icon className='text-lg flex-1 md:flex-initial'/>
                <span className='hidden md:block'>{link.name}</span>
            </div>
            
        </NavLink>
    )
}

export default SidebarLink
