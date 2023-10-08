import React from 'react';
import { Link } from 'react-router-dom';
import { FooterLink2 } from '../../../data/footer-links';

function FooterLinks({ heading }) {

    const footerItems = FooterLink2.filter((footerItem) => {

        return footerItem.title === heading;
    });

    return (

        <div className="mb-6 lg:mb-0">

            {/* Heading */}
            <h4 className="mb-2 font-semibold text-richblack-100">{heading}</h4>

            {/* Links */}
            <ul className="space-y-1">

                {
                    footerItems[0].links.map((item, index) => (

                        <li key={index}>
                            <Link
                                className="font-normal text-sm text-richblack-400 leading-8 hover:text-richblack-600 transition duration-300"
                                to={item.link}
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default FooterLinks;
