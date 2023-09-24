import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { MdCurrencyRupee } from 'react-icons/md'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component"
import { removeFromCart } from '../../../slices/cartSlice'
import { buyCourse } from '../../../services/operations/studentsFeaturesAPI'
import { useNavigate } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function Cart() {
    const { total, totalItems, cart } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleBuyCourse() {

        const courses = cart.map((course) => course._id);

        buyCourse(token, courses, user, navigate, dispatch);
    }

    return (
        <div>
            {/* Cart heading */}
            <h1 className='text-richblack-5 mb-9 font-medium text-3xl'>Cart</h1>

            {/* number of itmes in cart heading */}
            <h4 className='text-richblack-400 font-semibold border-b-[1px] py-3 mb-6 border-richblack-500 '>{totalItems} Courses in cart</h4>

            {
                total === 0 ?
                    (<div className='w-full h-[20rem] flex justify-center items-center'>
                        <p className='text-richblack-50 text-2xl font-bold tracking-wider'>Your cart is empty</p>
                    </div>) :
                    (
                        <div className='flex gap-6  flex-col-reverse md:flex-row md:justify-between'>

                            {/* div for courses in cart and their total */}
                            <div className='flex flex-col gap-6 '>
                                {/* courses card */}
                                {
                                    cart.map((course, index) => (
                                        <div key={index} className=' flex flex-col justify-between xl:flex-row gap-5 pb-8 mb-8 border-b-[1px] last:border-b-0 border-richblack-500'>
                                            <div className='flex flex-col xl:flex-row gap-5'>
                                                {/* course thumnail */}
                                                <img src={course.thumbnail} alt="thumbnail" className='rounded-lg bg-white xl:w-[11.563rem] h-[9.25rem] object-cover '>
                                                </img>

                                                {/* course description div */}
                                                <div className='flex flex-col justify-between'>
                                                    <h3 className='font-medium text-lg text-richblack-5'>{course.courseName}</h3>
                                                    <p className='font-normal text-richblack-300'>{course.category.name}</p>
                                                    <div className='font-semibold text-yellow-100 flex items-center gap-2'>
                                                        {GetAvgRating(course.ratingAndReviews)}
                                                        <div>
                                                            {/* <AiFillStar className='text-richblack-700' /> */}
                                                            <ReactStars
                                                                value={GetAvgRating(course.ratingAndReviews)}
                                                                count={5}
                                                                size={20}
                                                                edit={false}
                                                                activeColor='#ffd700'
                                                                emptyIcon={<AiFillStar className='text-yellow-50' />}
                                                                fullIcon={<AiFillStar className='text-richblack-700' />} />
                                                        </div>
                                                    </div>
                                                    <p className='font-medium text-sm text-richblack-300'>Total Courses • Lesson • Beginner</p>
                                                </div>
                                            </div>


                                            {/* course amount and remove button */}
                                            <div className='flex flex-col gap-5 '>
                                                <button
                                                    onClick={() => dispatch(removeFromCart(course._id))}
                                                    className='px-2 py-3 bg-richblack-800 text-pink-200 rounded-lg border border-richblack-700 flex items-center gap-2'>
                                                    <RiDeleteBin5Fill /> Remove
                                                </button>
                                                <p className='text-yellow-50 font-semibold text-2xl flex gap-[0.05rem] items-center' >
                                                    <MdCurrencyRupee />
                                                    {course.price}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>

                            {/* total */}
                            <div className=' max-h-[13.3rem]  min-h[13.3rem] min-w-[15rem]  flex flex-col justify-between gap-4 p-6 rounded-md bg-richblack-800'>
                                <div className='flex flex-col gap-1'>
                                    <p className='text-richblack-200 font-semibold text-sm'>Total:</p>
                                    <p className='text-yellow-50 text-2xl font-semibold flex gap-[0.05rem] items-center'> <MdCurrencyRupee /> {total}</p>
                                    <p className='text-richblack-300 text-sm line-through flex gap-[0.05rem] items-center'><MdCurrencyRupee /> {total + 1000}</p>
                                </div>

                                <button
                                    onClick={handleBuyCourse}
                                    className='mx-auto py-3 w-full bg-yellow-50 rounded-lg text-richblack-900 font-medium '>
                                    Buy Now
                                </button>

                            </div>

                        </div>)
            }

        </div>
    )
}

export default Cart
