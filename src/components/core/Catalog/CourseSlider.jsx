import React, {useRef} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import 'swiper/css/navigation';
import "./CourseSlider.css"

import CourseCard from "./CourseCard";
import { FreeMode, Autoplay, Pagination, Navigation } from "swiper/modules"

export default function CourseSlider({Courses, Weidth, Height}) {

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    return (
        <div className="">
            {
                Courses?.length ? (
                    <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    breakpoints={{
                      1024: {
                        slidesPerView: 3,
                      },
                    }}
                    centeredSlides={true}
                    autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    }}
                    pagination={{
                    clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, FreeMode, Pagination, Navigation]}
                    onAutoplayTimeLeft={onAutoplayTimeLeft}
                    className="max-h-[30rem] mySwiper"
                    >
                        {
                            Courses?.map((course, index) => (
                                <SwiperSlide key={index}>
                                    <CourseCard course={course} Weidth={Weidth} Height={Height}/>
                                </SwiperSlide>
                            ))
                        }
                        <div className="autoplay-progress" slot="container-end">
                        <svg viewBox="0 0 48 48" ref={progressCircle}>
                            <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span ref={progressContent}></span>
                        </div>
                    </Swiper>
                ) : (
                    <p>No course found</p>
                )
            }
        </div>
    )
}