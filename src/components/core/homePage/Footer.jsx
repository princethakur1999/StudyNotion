import React from 'react'
import LogoImg from '../../../assets/Logo/Logo-Full-Light.png'
import FooterLinks from './FooterLinks'
import { FooterLink2 } from '../../../data/footer-links'
import { Link } from 'react-router-dom'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function Footer() {

    return (
        <div className='w-full bg-richblack-800 py-[3.25rem] lg:px-[7.5rem] xl:px-[7.5rem] md:px-[3rem] flex flex-col gap-8'>
            {/* footer div containing 2 sections */}
            <div className='flex flex-col md:flex-row lg:gap-[5.25rem] md:gap-[2rem] justify-between gap-4'>
                {/* first footer section */}
                <div className='md:w-[50%] w-[95%] mx-auto grid grid-cols-3 col-start-1 gap-7 '>
                    <div className='flex flex-col '>
                        <img src={LogoImg} alt="Logo Image" className='w-40 mb-4' />
                        <FooterLinks heading={FooterLink2[0].title} />
                    </div>
                    <div className='flex flex-col gap-9'>
                        <FooterLinks heading={FooterLink2[1].title} />
                        <FooterLinks heading={FooterLink2[2].title} />
                    </div>
                    <div className='flex flex-col gap-9'>
                        <FooterLinks heading={FooterLink2[3].title} />
                        <FooterLinks heading={FooterLink2[4].title} />
                    </div>
                </div>

                {/* dividing line */}
                <div className='md:w-[2px] w-[90%] mx-auto h-[2px]  rounded-full md:h-[58rem] md:my-auto  bg-richblack-600 '></div>

                {/* second footer div */}
                <div className='md:w-[50%] w-[95%] mx-auto grid grid-cols-3 col-start-1 gap-7 '>
                    <div className='flex flex-col gap-9'>
                        <FooterLinks heading={FooterLink2[5].title} />
                    </div>

                    <div className='flex flex-col gap-9'>
                        <FooterLinks heading={FooterLink2[6].title} />
                    </div>

                    <div className='flex flex-col gap-9'>
                        <FooterLinks heading={FooterLink2[7].title} />
                    </div>
                </div>

            </div>
            {/* footers footer */}
            <div className='flex gap-2  w-full pt-8 border-t-2 border-richblack-600'>
                <Link className='text-sm text-richblack-300 font-medium  pr-3 border-r-2'>Privacy Policy</Link>
                <Link className='text-sm text-richblack-300 font-medium pr-3 border-r-2'>Cookie Policy</Link>
                <Link className='text-sm text-richblack-300 font-medium pr-3'>Terms</Link>
            </div>
        </div>
    )
}

export default Footer;
