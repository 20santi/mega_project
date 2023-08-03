import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/oparations/courseDetails";
import { getInstructorData } from "../../../../services/oparations/ProfileApi";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

export default function Instructor() {
    
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);
    const {token} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.profile)

    useEffect(() => {
        const getCourseDataWithStatus = async() => {
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            console.log("instructorDashboard backend data: ", instructorApiData);

            if(instructorApiData.length) {
                setInstructorData(instructorApiData);
            }
            if(result) {
                setCourses(result);
            }
            setLoading(false);
        }
        getCourseDataWithStatus();
    }, []);

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);
    console.log("courses -> ", courses.length);
    return (
        <div className="text-white ml-60 mt-20">
            <div className="">
                <p>HI {user?.firstName}</p>
                <p>Let's start somthing new</p>
            </div>

            {loading ? (<div className="spinner"></div>) 
            : courses.length > 0
            ? (
                <div>
                    <div>
                        <div>
                            <InstructorChart courses={instructorData}/>
                            <div>
                                <p>Statistics</p>
                                <div>
                                    <p>Total Courses</p>
                                    <p>
                                        {courses.length}
                                    </p>
                                </div>

                                <div>
                                    <p>
                                        Total Students
                                    </p>
                                    <p>
                                        {totalStudents}
                                    </p>
                                </div>

                                <div>
                                    <p>Total Income</p>
                                    <p>{totalAmount}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* render 3 courses */}
                        <div>
                            <p>
                                Your Courses
                            </p>
                            <Link to="/dashboard/my-courses">
                                <p>
                                    View all
                                </p>
                            </Link>
                        </div>

                        <div>
                            {
                                courses.slice(0,3).map((course) => (
                                    <div>
                                        <img src={course.thumbnail}/>
                                        <div>
                                            <p>
                                                {course.courseName}
                                            </p>
                                            <div>
                                                <p>
                                                    {course.totalStudentsEnrolled}
                                                </p>
                                                <p> | </p>
                                                <p>
                                                    Rs {course.price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            ) : (<div>
                <p>
                    You have not create a course
                </p>
                <Link to="dashboard/add-course">
                    Create a course
                </Link>
            </div>)}
        </div>
    )
}
