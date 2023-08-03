import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullCourseDetails } from "../services/oparations/courseDetails";
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLectures } from "../slices/viewCourseSlice";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import ViewDetailsSidebar from "../components/core/ViewCourse/ViewDetailsSidebar";

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseDetails = async() => {
            const courseData = await getFullCourseDetails(courseId, token);
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
            dispatch(setCourseEntireData(courseData?.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos))

            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((section) => {
                lectures += section.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseDetails();
    }, []);

    return(
        <div className="mt-[55px]">
            <div>
                <div className="w-[300px] bg-richblack-800 border border-richblack-700 h-[5000px] fixed">
                    <ViewDetailsSidebar setReviewModal={setReviewModal}/>
                </div>

                <div>
                    <Outlet/>
                </div>
                {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
            </div>
        </div>
    )
}

export default ViewCourse;