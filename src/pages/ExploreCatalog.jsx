import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { courseEndpoints } from '../services/apis';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function ExploreCatalog() {
    const [subLinks, setSubLinks] = useState([]);

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
        fetchCatalogItems();
      }, [])

    return (
        <div className='flex flex-col gap-4 py-4 px-2 md:py-6 md:w-[70%] lg:w-[65%] max-w-[60rem]   mx-auto'>
            <h1 className='text-richblack-5 font-bold text-3xl xl:text-center xl:text-4xl'>Explore Catalog</h1>
            <div className='py-1 px-3 text-blue-200 flex flex-col  bg-[#151727] rounded-xl'>
            {subLinks.map((link, index) => {
                      return <Link
                        key={index}
                        className='border-b-[1px] border-richblack-400 py-4 pl-1 last:border-none'
                        to={`/catalog/${link.name.split(" ").join("-").toLowerCase()}`}>
                        {link.name}
                      </Link>
                    })}
            </div>
        </div>
    )
}

export default ExploreCatalog
