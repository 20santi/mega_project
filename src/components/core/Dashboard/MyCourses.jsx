import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconButton";
import CoursesTable from "./InstructorCourses/CoursesTable";
import { fetchInstructorCourses } from "../../../services/oparations/courseDetails";

const MyCourses = () => {
    
    const {token} = useSelector(state => state.auth);
    const nevigate = useNavigate();
    const [courses, setCourses] = useState();

    useEffect(() => {
        const fetchCourses = async() => {
            const result = await fetchInstructorCourses(token);
            if(result) {
                setCourses(result);
            }
        }
        fetchCourses();
    }, []);

    return (
        <div className="ml-[20%] mt-28">
            <div>
                <h1 className="text-white">
                    My Courses
                </h1>
                <IconBtn
                    text="Add Course"
                    onclick={() => nevigate("/dashboard/add-course")}
                    //add icon
                />
            </div>

            {courses && <CoursesTable courses={courses} setCourses={setCourses}/>}
        </div>
    )
}

export default MyCourses;