import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconButton";

export default function ViewDetailsSidebar({setReviewModal}) {

    const [activeStatus, setActiveStatus] = useState("");
    const [videobarActive, setVideobarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId, subSectionId} = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector(state => state.viewCourse);

    useEffect(() => {
        const setActiveFlags = () => {
            if(!courseSectionData.length)
                return;
            const currentSectionIndex = courseSectionData.findIndex(
                data => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.
            findIndex(
                data => data._id === subSectionId
            )

            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.
            [currentSubSectionIndex]?._id;

            // set current section
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            //set current subsection
            setVideobarActive(activeSubSectionId);
        }
        setActiveFlags();
    }, [courseSectionData, courseEntireData, location.pathname])

    return (
        <div className="text-white">
            <div className="mt-8">
                {/* for buttons and heading */}
                <div>
                    {/* for buttons */}
                    <div>

                        <div className="text-[14px] leading-[22px] font-inter font-semibold text-richblack-25 flex pt-3 pl-4 gap-x-2">
                            <p className="">
                                {courseEntireData?.courseName}
                            </p>

                            {/* for heading */}
                            <div>
                                <p className=" text-caribbeangreen-200">
                                    {completedLectures?.length} / {totalNoOfLectures}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-x-3 items-center pl-4 h-[90px] border-b border-richblack-600">
                            <div
                                onClick={() => {
                                    navigate("/dashboard/enrolled-courses")
                                }}
                                className="w-[90px] h-[48px] rounded-lg bg-richblack-700 text-richblack-5 flex items-center justify-center font-semibold"
                            >
                                Back
                            </div>

                            <div>
                                <IconBtn
                                    text="Add Review"
                                    onclick={() => setReviewModal(true)}
                                    customClasses={"text-richblack-900 bg-yellow-50 w-[110px] h-[48px] rounded-lg flex items-center justify-center font-semibold"}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* for sections and subSections */}
                <div>
                    {
                        courseSectionData.map((course, index) => {
                            return (
                                <div
                                onClick={() => setActiveStatus(course._id)}
                                key={index}
                                className=" cursor-pointer mt-4"
                                >
                                    <div className="">
                                        <div className="pl-4 bg-richblack-700 border border-richblack-600 w-full h-[54px] items-center flex justify-between">
                                            {course?. sectionName}
                                        </div>

                                        {/* add arrow icon */}
                                    </div>

                                    <div className="">
                                        {
                                            activeStatus === course?._id && (
                                                <div className="">
                                                    {
                                                        course.subSection.map((topic, index) => (
                                                            <div 
                                                                className={`flex gap-5 p-5 ${
                                                                    videobarActive === topic._id 
                                                                    ? " text-blue-200"
                                                                    : "bg-richblack-900 text-white" 
                                                                }`}
                                                                key={index}
                                                                onClick={() => {
                                                                    navigate(
                                                                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                                                                    )
                                                                    setVideobarActive(topic?._id)
                                                                }}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={completedLectures.includes(topic?._id)}
                                                                    onChange={() => {}}
                                                                />
                                                                <span className="">
                                                                    {topic.title}
                                                                </span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }) 
                    }
                </div>
            </div>
        </div>
    )
}