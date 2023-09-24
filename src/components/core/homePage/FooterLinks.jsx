import React from 'react'
import { Link } from 'react-router-dom'
import { FooterLink2 } from '../../../data/footer-links'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function FooterLinks({ heading }) {
    const footerItems = FooterLink2.filter((footerItem) => {
        return footerItem.title == heading;
    })

    return (
        <div>
            {/* heading */}
            <h4 className='mb-2 font-semibold text-richblack-100 '>{heading}</h4>
            {/* links */}
            {footerItems[0].links.map((item, index) => {
                return <div key={index} className='flex flex-col'>
                    <Link  className='font-normal text-sm text-richblack-400 leading-8' to={item.link} >{item.title}</Link>
                </div>
            })}

        </div>

    )
}

export default FooterLinks
