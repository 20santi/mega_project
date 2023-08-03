import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import RenderSteps from "../AddCourse.jsx/RenderSteps"
import { useEffect } from "react";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import { getFullCourseDetails } from "../../../../services/oparations/courseDetails";

export default function EditCourse() {
    
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector(state => state.course);
    const [loading, setLoading] = useState();
    const {token} = useSelector(state => state.auth); 

    useEffect(() => {
        const populateCourseDetails = async() => {
            setLoading(true);
            const result = await getFullCourseDetails(courseId, token);
            if(result?.courseDetails) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        }
        populateCourseDetails();
    }, [])
   
    if(loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    
    return (
        <div className="ml-[300px] mt-[100px]">
            <h1 className="ml-[30px] text-[14px] leading-[22px] font-inter font-bold text-richblack-5">
                Edit Course
            </h1>
            <div>
                {
                    course ? (<RenderSteps/>) : (<p>Course Not Found</p>)
                }
            </div>

        </div>
    )
}