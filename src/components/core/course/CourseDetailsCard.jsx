import {ACCOUNT_TYPE} from "../../../utils/Constants"
import copy from "copy-to-clipboard";
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../slices/cartSlice";

export default function CourseDetailsCard({course, setModal, handleBuyCourse}) {

    const {user} = useSelector(state => state.profile);
    const {token} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, you can't buy course")
        }
        if(token) {
            dispatch(addToCart(course));
            return;
        }
        setModal({
            text1:"you are not logged in",
            text2:"please login to add to cart",
            btn1text:"login",
            btn2text:"cancel",
            btn1Handler:() => navigate("/login"),
            btn2Handler:() => setModal(null)
        })

    }

    const handleOnShare = () => {
        copy(window.location.href);
        toast.success("Link copied successfully");
    }
    
    return (
        <div className="w-[384px] h-[669px] rounded-xl flex flex-col">
            <img src={course.thumbnail} alt="Thumbnail image"
                className="h-[250px] w-[385px] object-cover"
            />

            <div className="p-6 bg-richblack-700 flex flex-col ">

                <div className="font-bold text-[30px] leading-[38px] font-inter text-richblack-5">
                    Rs. {course.price}
                </div>
                <div className="flex flex-col gap-y-3 mt-2">
                    <button
                        onClick={
                            user && course?.studentEnrolled.includes(user?._id)
                            ? () => navigate("/dashboard/enrolled-courses")
                            : handleBuyCourse
                        }
                        className=" rounded-lg  w-[336px] h-[43px] bg-yellow-50 text-richblack-900 text-[16px] font-inter leading-6 font-semibold"
                    >
                        {
                            user && course?.studentEnrolled.includes(user?._id) ? "Go To Course" : "Buy Now"
                        }
                    </button>

                    {
                        (!course?.studentEnrolled.includes(user?._id)) && (
                            <button onClick={handleAddToCart} className=" rounded-lg  w-[336px] h-[43px] text-white bg-richblack-800 text-[16px] font-inter leading-6 font-medium">
                                Add to Cart
                            </button>
                        )
                    }
                </div>

                <div className="mt-3">
                    <p className="ml-[72px] text-[14px] leading-[22px] font-inter font-normal text-richblack-100">
                        30-Day Money-Back Guarantee
                    </p>
                    <p className="text-[14px] leading-[22px] font-inter font-normal text-richblack-5 mt-4">
                        This Course includes: 
                    </p>
                    <div className="flex flex-col gap-y-3">
                        {
                            course?.instructions?.map((item, index) => {
                                return (
                                    <p className="flex flex-col gap-y-3" key={index}>
                                        <span className="text-caribbeangreen-100">{item}</span>
                                    </p>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <button
                        className="mx-auto flex items-center gap-2 p-6 text-yellow-50"
                        onClick={handleOnShare}
                    >
                        Share
                    </button>
                </div>

            </div>
        </div>
    )
}