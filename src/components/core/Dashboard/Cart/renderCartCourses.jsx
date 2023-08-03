import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {AiFillStar} from "react-icons/ai";
import {AiOutlineStar} from "react-icons/ai";
import {MdDelete} from "react-icons/md";
import ReactStars from "react-rating-stars-component";

const renderCartCourses = () => {
    
    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    
    return (
        <div className="">
            {
                cart.map((course, isndex) => {
                    <div>
                        <div className="">
                            <img src={course?.thumbnail}/>
                            <div className="">
                                <p>{course?.courseName}</p>
                                <p>{course?.category?.name}</p>
                                
                                <div className="">
                                    {/* hw avarage rating */}
                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={20}
                                        edit={false}
                                        isHalf={true}
                                        emptyIcon={<AiOutlineStar/>}
                                        fullIcon={<AiFillStar/>}
                                        activeColor="#ffd700"
                                    />

                                    <span>{course?.ratingAndReviews.length} Rating</span>
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <button
                                onClick={() => dispatch(removeFromCart(course._id))}>
                                <MdDelete/>
                                <span>Remove</span>
                            </button>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default renderCartCourses;