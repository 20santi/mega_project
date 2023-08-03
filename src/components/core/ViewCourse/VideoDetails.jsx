import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import { MdSkipNext } from "react-icons/md";
import { RiSkipBackFill } from "react-icons/ri";
import { PiArrowClockwiseBold } from "react-icons/pi";
import IconBtn from "../../common/IconButton";
import { markLectureAsComplete } from "../../../services/oparations/courseDetails";

export default function VideoDetails() {

    const {courseId, sectionId, subSectionId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const playerRef = useRef();
    const {token} = useSelector(state => state.auth);
    const {courseSectionData, courseEntireData, completedLectures} = useSelector(state => state.viewCourse);

    const [videoData, setVideoData] = useState([]);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const setVideoSpecificDetails = async() => {
            if(!courseSectionData.length) {
                return;
            }
            if(!courseId && !sectionId && !subSectionId) {
                navigate("/dashboard/enrolled-courses");
            }
            else {
                // lets assume all 3 fields are present
                const filterData = courseSectionData.filter(
                    course => course._id === sectionId
                )
                const filterVideoData = filterData?.[0]?.subSection.filter(
                    data => data._id === subSectionId
                )
                setVideoData(filterVideoData[0]);
                setVideoEnded(false);
            }
        }
        setVideoSpecificDetails();
    }, [courseSectionData, courseEntireData, location.pathname]);

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            data => data._id === sectionId
        )
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            data => data._id === subSectionId
        )
        if(currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            return true;
        }
        else {
            return false;
        }
    }

    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            data => data._id === sectionId
        )

        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            data => data._id === subSectionId
        )
        if(currentSectionIndex === courseSectionData.length - 1 && 
            currentSubSectionIndex === noOfSubSection - 1) {
            return true;
        }
        else {
            return false;
        }
    }

    const gotoNextVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            data => data._id === sectionId
        )

        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            data => data._id === subSectionId
        )
        if(currentSubSectionIndex !== noOfSubSection - 1) {
            // same section kii first video
            const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSectionIndex + 1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        }
        else {
            const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
            const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
        }
    }

    const gotoPreVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            data => data._id === sectionId
        )

        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            data => data._id === subSectionId
        )
        if(currentSubSectionIndex !== noOfSubSection - 1) {
            // same section kii first video
            const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSectionIndex - 1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        }
        else {
            const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
            const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length
            const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
        }
    }

    const handleLectureCompletion = async() => {
        setLoading(true);

        const res = await markLectureAsComplete({courseId:courseId, subSectionId:subSectionId}, token);
        if(res) {
            dispatch(updateCompletedLectures(subSectionId));
        }
        
        setLoading(false);
    }

    return (
        <div className=" text-white">
            {
                !videoData ? (<div>
                    No Data Found
                </div>) 
                : (
                    <div className="w-[1260px] h-[595px] ml-[324px] relative">
                        <Player
                            ref = {playerRef}
                            aspectRatio = "16:9"
                            playsInline
                            onEnded={() => setVideoEnded(true)}
                            src={videoData?.videoUrl}
                        >
                            {/* <AiFillPlayCircle/> */}

                            {
                                videoEnded && 
                                
                                // <div
                                // // style={{
                                // //     position: 'absolute',
                                // //     top: 0,
                                // //     left: 0,
                                // //     width: '100%',
                                // //     height: '100%',
                                // //     background: 'rgba(0, 0, 0, 0.8)',
                                // //     backdropFilter: 'blur(10px)',
                                // //     display: 'flex',
                                // //     justifyContent: 'center',
                                // //     alignItems: 'center',
                                // //     color: 'white',
                                // //     fontSize: '24px',
                                // //     }}
                                //     className=" absolute w-[1260px] h-[595px] bg-white opacity-[0.8] backdrop-blur-md flex justify-center items-center"
                                // >

                                // </div> &&

                                (
                                    <div className="">
                                        <div className="absolute inset-0 z-[1000]  w-[1260px] h-[680px] mt-6
                                        flex items-center justify-center overflow-auto bg-white bg-opacity-5 backdrop-blur-sm">
                                            {/* <div className="flex gap-x-2 translate-x-32 translate-y-5">
                                                {
                                                    !completedLectures.includes(subSectionId) && (
                                                        <IconBtn
                                                            disabled={loading}
                                                            onclick={() => handleLectureCompletion()}
                                                            text={!loading ? "Mark as Completed" : "Loading..."}
                                                            customClasses={"text-richblack-900 bg-yellow-50 w-[96px] h-[40px] rounded-lg flex items-center justify-center font-semibold"}
                                                        />
                                                    )
                                                }
                                            </div> */}

                                            <div className="flex gap-x-24 items-center relative">
                                                <div className="border border-richblack-100 bg-richblack-700 w-[60px] h-[60px] flex items-center justify-center rounded-full">
                                                    <button
                                                        disabled={loading}
                                                        onClick={gotoPreVideo}
                                                        className={`text-[40px] ${!isFirstVideo() ? ("text-richblack-5") : ("text-richblack-600")}`}
                                                    >
                                                        <RiSkipBackFill/>
                                                    </button>
                                                </div>

                                                <button
                                                    disabled={loading}
                                                    onClick={() => {
                                                        if(playerRef?.current) {
                                                            playerRef.current?.seek(0);
                                                            setVideoEnded(false);
                                                        }
                                                    }}
                                                    className="text-[50px]"
                                                >
                                                    <PiArrowClockwiseBold/>
                                                </button>
                                                <div className="border border-richblack-100 bg-richblack-700 w-[60px] h-[60px] flex items-center justify-center rounded-full">
                                                    <button
                                                        disabled={loading}
                                                        onClick={gotoNextVideo}
                                                        className={`text-[50px] ${!isLastVideo() ? ("text-richblack-5") : ("text-richblack-600")}`}
                                                    >
                                                        <MdSkipNext/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between w-[1260px] h-[40px] mt-5">
                                            <div className=""></div>
                                            {
                                                !completedLectures.includes(subSectionId) && (
                                                    <button
                                                        disabled={loading}
                                                        onlick={() => handleLectureCompletion()}
                                                        className="text-[16px] leading-6 font-inter text-richblack-900 bg-yellow-50 w-[180px] h-[48px] rounded-lg flex items-center justify-center font-semibold"
                                                    >
                                                        {!loading ? "Mark as Completed" : "Loading..."}
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            
                        </Player>
                    </div>
                )
            }
            <h1 className="text-[24px] font-inter font-semibold leading-8 ml-[325px] mt-[130px]">
                {videoData?.title}
            </h1>
            <p className="text-[14px] leading-[22px] font-inter font-medium text-richblack-50 ml-[325px] mt-[]">
                {videoData?.description}
            </p>
        </div>
    )
}