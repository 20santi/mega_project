import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";
import { useState } from "react";
import { useEffect } from "react";
import GetAvgRating from "../../../utils/GetAvgRating";

export default function CourseCard({course, Weidth, Height}) {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course]);

    return (
        <div className="w-[384px] h-[371px]">
            <Link to={`/courses/${course._id}`}>
                <div>
                    <div className={`${Weidth} ${Height}`}>
                        <img src={course?.thumbnail} alt="courseThumbnail"
                            className={`${Height} ${Weidth} w-full rounded-xl object-cover`}
                        />
                    </div>
                    <div className="flex flex-col gap-y-1 mt-5">
                        <p className="text-[16px] leading-6 font-inter font-medium text-richblack-5">
                            {course?.courseName}
                        </p>
                        <p className="text-[16px] leading-6 font-normal font-inter text-richblack-300">
                            {course?.instructor?.firstName} {course?.instructor?.lastName}
                        </p>
                        <div className="flex gap-x-1 mt-1">
                            <span className=" text-yellow-50">{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount}/>
                            <span className="text-[16px] leading-6 font-normal text-richblack-400">
                                (Ratings)
                            </span>
                        </div>
                        <p className="font-semibold">Rs.  {course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}