import React from 'react'
import Sidebar from '../components/core/dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function Dashboard() {
  return (
    <div className='relative flex min-h-[calc(100vh-4rem)] '>
      <Sidebar/>
      <div className='mx-auto lg:w-[75%] w-11/12 max-w-[1000px] py-10'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard
