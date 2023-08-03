import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/oparations/studentFeatureApi";
import { fetchCourseDetails } from "../services/oparations/courseDetails";
import GetAvgRating from "../utils/GetAvgRating";
import Error from "./Error";
import Modal from "../components/common/Modal";
import RatingStars from "../components/common/RatingStars";
import CourseDetailsCard from "../components/core/course/CourseDetailsCard";
import { formatDate } from "../services/FormateDate";
import {BiInfoCircle} from "react-icons/bi";
import {HiOutlineGlobeAlt} from "react-icons/hi";
import Footer from "../components/common/Footer";
import CourseAccordionBar from "../components/core/course/CourseAccordionBar";

export default function CourseDetailsPage() {
    
    const {user} = useSelector(state => state.profile);
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();
    const {loading} = useSelector(state => state.profile);
    const {paymentLoading} = useSelector(state => state.course);

    const [courseData, setCourseDetails] = useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [totalLectures, setTotalLectures] = useState(0);
    const [modal, setModal] = useState(null);
    const [isActive, setIsActive] = useState(Array(0));
   
     const handleActive = (id) => {
        setIsActive(
        !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter(e => e != id)
        )
        console.log("array -------- ", isActive[0]);
    }

    useEffect(() => {
        let count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
        count = count ? count : 0;
        setAvgReviewCount(count);
    }, [courseData]);

    useEffect(() => {
        const getCourseFullDetails = async() => {
            try {
                const result = await fetchCourseDetails(courseId);
                setCourseDetails(result);
    
            } catch(error) {
                console.log("Could not fetch Course Details: ", error);
            }
        }
        getCourseFullDetails();
    }, [courseId]);

    useEffect(() => {
        let lectures = 0;
        courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0;
        })  
        setTotalLectures(lectures);
    }, [courseData]);

    const handleBuyCourse = () => {
        if(token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setModal({
            text1:"you are not Logged in",
            text2:"Please login to purchase the course",
            btn1Text:"Login",
            btn2Text:"Cancell",
            btn1Handler:() => navigate("/login"),
            btn2Handler:() => setModal(null)
        })
    }

    if(loading || !courseData) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if(!courseData.success) {
        return(
            <div>
                <Error/>
            </div>
        )
    }

    const {
        _id:course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentEnrolled,
        createdAt
    } = courseData.courseDetails[0];

    return (
        <div className="flex flex-col text-white">
            <div className="bg-richblack-800 relative">
                <div className=" w-[65%] mx-auto flex flex-col gap-y-3 mt-12 mb-12">
                    <p className="text-[30px] leading-[38px] font-inter font-medium text-richblack-5">
                        {courseName}
                    </p>
                    <p className="text-[14px] leading-[22px] font-inter font-normal text-richblack-200">
                        {courseDescription}
                    </p>
                    <div className="flex gap-x-2">
                        <div>
                            <span className="text-yellow-50">{avgReviewCount}</span>
                        </div>  
                        <div>
                            <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                        </div> 
                        <div>
                            <span className="text-[16px] leading-[24px] font-inter font-normal text-richblack-100">
                                {`(${ratingAndReviews.length} reviews)`}
                            </span>    
                        </div> 
                        <div>
                            <span className="text-[16px] leading-[24px] font-inter font-normal text-richblack-100">
                                {`(${studentEnrolled.length} students enrolled)`}
                            </span>
                        </div>                  
                    </div>

                    <div>
                        <p className="text-[16px] leading-[24px] font-inter font-normal text-richblack-50">
                            Created By {`${instructor.firstName}`}
                        </p>
                    </div>

                    <div className="flex gap-x-3">
                        <div className="flex items-center gap-x-1">
                            <BiInfoCircle/>
                            <p className="text-[16px] leading-[24px] font-inter font-normal text-richblack-50">
                                Created at {formatDate(createdAt)}
                            </p>
                        </div>
                        <div className="flex items-center gap-x-1">
                            <HiOutlineGlobeAlt/>
                            <p className="text-[16px] leading-[24px] font-inter font-normal text-richblack-50">
                                {" "} English
                            </p>
                        </div>
                    </div>

                    <div className=" absolute right-80">
                        <CourseDetailsCard
                            course = {courseData.courseDetails[0]}
                            setModal = {setModal}
                            handleBuyCourse = {handleBuyCourse}
                        />
                    </div>
                </div>
            </div>
            <div className="w-[65%] mx-auto">
                <div className="w-[792px] mt-10 border border-richblack-600 p-6">
                    <p className="text-[30px] leading-[38px] font-inter font-medium text-richblack-5">
                        What You will Learn
                    </p>
                    <div className=" w-full mt-2 text-[14px] leading-[22px] font-inter font-medium text-richblack-100">
                        {whatYouWillLearn}
                    </div>
                </div>

                <div className="mt-10">
                    <div>
                        <p className=" w-full mt-2 text-[24px] leading-[32px] font-inter font-medium text-richblack-5">
                            Course Content
                        </p>
                        
                        <div className="flex justify-between w-[792px] items-center">
                            <div className="flex mt-2 mb-2 gap-x-3">
                                <span className="text-[14px] leading-[22px] font-inter font-medium text-richblack-100">
                                    {courseContent.length} sections
                                </span>

                                <span className="text-[14px] leading-[22px] font-inter font-medium text-richblack-100">
                                    {totalLectures} lectures
                                </span>
                                <span className="text-[14px] leading-[22px] font-inter font-medium text-richblack-100">
                                    {courseData.data?.totalDuration} total Duration
                                </span>

                            </div>

                            <div>
                                <button className="text-yellow-50"
                                    onClick={() => setIsActive([])}    
                                >
                                    Collapse all Sections
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                courseContent.map((section, index) => {
                    return(
                        <div 
                            key={index} 
                            className=""
                        >
                            <CourseAccordionBar 
                                isActive={isActive}
                                handleActive={handleActive}
                                section={section}
                            />
                        </div>
                    )
                })
            }

            {modal && <Modal modalData={modal}/>}
            <div className="mt-40">
                <Footer/>
            </div>
        </div>
    )
} 