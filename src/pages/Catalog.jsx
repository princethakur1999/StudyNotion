import React from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCatalogPageData } from '../services/pageAndComponentData';
import { fetchCourseCategories } from '../services/operations/courseDetailsAPI';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Footer from '../components/core/homePage/Footer';

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function Catalog() {

    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {

        async function getCategories() {

            try {

                const res = await fetchCourseCategories();

                const category = res.find((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName);

                if (category) {

                    setCategoryId(category._id);
                } else {
                    // Handle the case when category is not found
                    console.error(`Category not found for catalogName: ${catalogName}`);
                }
            } catch (error) {
                // Handle any errors that occur during the data retrieval
                console.error("Error fetching categories:", error);
            }
        }
        getCategories();

    }, [catalogName]);

    async function getCategoryDetails() {

        try {
            const res = await getCatalogPageData(categoryId);

            console.log("#####", res);

            console.log("#####", categoryId);


            setCatalogPageData(res);

        } catch (error) {

            // Handle any errors that occur during the data retrieval
            console.error("Error fetching catalog page data:", error);
        }
    }

    useEffect(() => {

        if (categoryId) {

            getCategoryDetails();
        }
    }, [categoryId]);

    return (
        <div className='flex flex-col gap-14'>
            <div className='bg-richblack-800'>
                <div className='flex flex-col px-2 md:px-[7.5rem] py-8 gap-3  max-w-[95rem]'>
                    <p className='text-sm text-richblack-300 '>Home / Catalog / <span className='text-yellow-50'>{catalogPageData?.data?.selectedCategory?.name}</span></p>
                    <h1 className='text-richblack-5 text-3xl font-medium'>{catalogPageData?.data?.selectedCategory?.name}</h1>
                    <p className='text-sm text-richblack-200 leading-6 '>
                        {catalogPageData?.data?.selectedCategory?.description}
                    </p>
                </div>
            </div>


            <div className='flex flex-col gap-8 px-2 md:px-5 lg:px-[7.5rem] max-w-[95rem]'>
                <h2 className='text-richblack-5 text-3xl font-semibold'>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</h2>
                <div className='flex gap-1'>
                    <button className={`text-yellow-50 border-b-yellow-50 border-b-2 px-3 py-2`}>Most popular</button>
                </div>
                <div>
                    <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses} />
                </div>
            </div>

            <div className='flex flex-col gap-8 px-2 md:px-5 lg:px-[7.5rem] max-w-[95rem]'>
                <h2 className='text-richblack-5 text-3xl font-semibold'>Courses to get you started</h2>
                <div >
                    <CourseSlider courses={catalogPageData?.data?.differentCategory?.courses} />
                </div>
            </div>

            <div className='flex flex-col gap-8 px-2 md:px-5 lg:px-[7.5rem] max-w-[95rem]'>
                <h2 className='text-richblack-5 text-3xl font-semibold'>Top Selling</h2>

                <div className=''>
                    <CourseSlider courses={catalogPageData?.data?.mostSellingCourses?.slice(0, 4)} />
                </div>


            </div>
            <Footer />
        </div>
    )
}

export default Catalog
