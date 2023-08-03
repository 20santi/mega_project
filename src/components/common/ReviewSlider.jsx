import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import 'swiper/css/navigation';
import ReactStars from "react-rating-stars-component";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";
import { FreeMode, Autoplay, Pagination, Navigation } from "swiper/modules"
import { FaStar } from 'react-icons/fa'

const ReviewSlider = () => {

    const [review, setReviews] = useState([]);
    const truncatWord = 15;

    useEffect(() => {
        const allReviews = async() => {
            const {data} = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
            console.log("response in rating: ", data);

            if(data?.success) {
                setReviews(data?.data);
            }
            console.log("Printing reviews: ", review);
        }
        allReviews();
    }, []);
    return (
        <div className="text-white w-8/12 mx-auto mb-24">
            <div className="h-[190px] w-full">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    loop={true}
                    centeredSlides={true}
                    autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                    }}
                    pagination={{
                    clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="w-full"
                >

                    {
                        review.map((review, index) => (
                            <SwiperSlide key={index} 
                                className="w-[282px] h-[184px] bg-richblack-800 p-3"
                            >
                               <div className="flex gap-x-2 items-center">
                                    <img
                                    src={review?.user?.image
                                    ? review?.user?.image
                                    : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                                    alt='Profile Pic'
                                    className='h-9 w-9 object-cover rounded-full'
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-[14px] leading-[22px] font-inter font-semibold text-richblack-5">
                                            {review?.user?.firstName} {review?.user?.lastName}
                                        </p>
                                        <p className="text-[12px] leading-5 font-inter font-medium text-richblack-600">
                                            {review?.course?.courseName}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-[12px] leading-5 font-inter font-medium text-richblack-100 pt-2">
                                    {review?.review}
                                </p>
                                <div className="flex gap-x-1 items-center pt-1">
                                    <p className="text-yellow-50 -mb-1">
                                        {review?.rating?.toFixed(1)}
                                    </p>
                                    <ReactStars
                                        count={5}
                                        value={review?.rating}
                                        size={20}
                                        edit={false}
                                        activeColor={"#ffd700"}
                                        emptyIcon={<FaStar />}
                                        fullIcon={<FaStar />}
                                    />
                                </div>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>
        </div>
    )
}

export default ReviewSlider;