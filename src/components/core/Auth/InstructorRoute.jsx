import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../../../utils/constants';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:N/A ###########//
//#####################################################//

function InstructorRoute({ children }) {
    const { user } = useSelector((state) => state.profile);

    if (user.accountType == ACCOUNT_TYPE.INSTRUCTOR)
        return children
    else
        return <Navigate to="/error" />
}

export default InstructorRoute
