import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import IconBtn from "../../common/IconButton";
import ReactStars from "react-rating-stars-component";
import { createRating } from "../../../services/oparations/courseDetails";
import { ImCross } from "react-icons/im";

export default function CourseReviewModal({setReviewModal}) {

    const {user} = useSelector(state => state.profile);
    const {token} = useSelector(state => state.auth);
    const {courseEntireData} = useSelector(state => state.viewCourse)

    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors}
    } = useForm();

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, []);

    const onSubmit = async(data) => {
        await createRating(
            {
                courseId: courseEntireData._id,
                rating:data.courseRating,
                review:data.courseExperience
            },
            token
        )
    }

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);
    }

    return(
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-[665px] rounded-lg border border-richblack-400 bg-richblack-800">
                {/* modal header */}
                <div className="flex bg-richblack-700 text-richblack-5 p-5 border-b border-richblack-5 justify-between">
                    <p className="text-[18px] leading-[26px] font-inter font-semibold pl-2">
                        Add Review
                    </p>

                    <button
                        onClick={() => setReviewModal(false)}
                        className="pr-2"
                    >
                        <ImCross/>
                    </button>
                </div>

                {/* modal body */}
                <div className="flex flex-col items-center justify-center mt-8">

                    <div className="flex gap-x-2 items-center">
                        <img
                            src={user.image} alt="user Image"
                            className=" aspect-square w-[50px] rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                            <p className="text-richblack-5 text-[16px] leading-6 font-inter font-semibold">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-[14px] leading-[22px] font-inter font-normal text-richblack-100">
                                Posting Publicaly
                            </p>
                        </div>
                    </div>
                </div>

                <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-6 flex flex-col items-center"
                    >
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                        />

                        <div className="ml-8 mt-6">
                            <label htmlFor="courseExperience"
                                className="text-[14px] leading-[22px] font-inter font-normal text-richblack-5"
                            >
                                Add your Experience<span className="text-pink-200"> *</span>
                            </label>
                            <textarea
                                id="courseExperience"
                                placeholder="Add Your Review"
                                {...register("courseExperience", {required:true})}
                                className="w-[601px] min-h-[139px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                            />
                            {
                                errors.courseExperience && (
                                    <span>
                                        Please add your review
                                    </span>
                                )
                            }
                        </div>

                        {/* buttons */}
                        <div className="flex justify-between w-full h-[80px] p-8 mb-7">
                            <div className=""></div>
                            <div className="flex gap-x-5 pt-5 items-center">
                                <button 
                                    onClick={() => setReviewModal(false)}
                                    className="w-[128px] h-[48px] rounded-lg bg-richblack-700 text-richblack-5 flex items-center justify-center font-semibold"
                                >
                                    Cancell
                                </button>
                                <IconBtn
                                    text="Save"
                                    customClasses={"text-richblack-900 bg-yellow-50 w-[128px] h-[48px] rounded-lg flex items-center justify-center font-semibold"}
                                />
                            </div>
                        </div>
                    </form>
            </div> 
        </div>
    )
}