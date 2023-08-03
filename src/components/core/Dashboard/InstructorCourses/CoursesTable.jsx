import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Thead, Tr, Td, Th } from "react-super-responsive-table";
import { COURSE_STATUS } from "../../../../utils/Constants";
import Modal from "../../../common/Modal";
import { deleteCourse } from "../../../../services/oparations/courseDetails";
import { fetchInstructorCourses } from "../../../../services/oparations/courseDetails";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useNavigate } from "react-router-dom";

const CoursesTable = ({courses, setCourses}) => {
    
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(null);
    const navigate = useNavigate();
    const TRUNCATE_LENGTH = 30;

    const handleCourseDelete = async(courseId) => {
        setLoading(true);

        await deleteCourse({courseId:courseId}, token);
        const result = await fetchInstructorCourses(token);
        if(result) {
            setCourses(result);
        }
        setModal(null);
        setLoading(false);
    }
    
    return (
        <div className="text-white">
            <Table className="flex flex-col ml-44 table-auto">
                <Thead>
                    <Tr className="flex gap-x-10 justify-between border border-richblack-800 p-4 pr-8 pl-8">
                        <Th className="">Courses</Th>
                        <div className="flex gap-x-14 ">
                            <Th>Duration</Th>
                            <Th>Price</Th>
                            <Th>Action</Th>
                        </div>
                    </Tr>
                </Thead>
                <Tbody className="">
                    {
                        courses.length === 0 ? (
                            <Tr>
                                <Td>
                                    No Courses Found
                                </Td>
                            </Tr>
                        ) :
                        (
                            courses.map((course) => (
                                <Tr key={course._id} className="flex gap-x-10 border border-richblack-800 p-8">
                                    <Td className="flex gap-x-4 max-w-[767px] justify-between">
                                        <img src={course.thumbnail}
                                            className=" rounded-lg object-cover h-[150px] w-[220px]"
                                        />
                                        <div className="max-w-[500px] flex flex-col gap-y-2">
                                            <p>
                                                {course.courseName}
                                            </p>
                                            <p>
                                            {course.courseDescription.split(" ").length >
                                                TRUNCATE_LENGTH
                                                    ? course.courseDescription
                                                        .split(" ")
                                                        .slice(0, TRUNCATE_LENGTH)
                                                        .join(" ") + "..."
                                                    : course.courseDescription}
                                            </p>
                                            <p>Created: </p>
                                            {
                                                course.status === COURSE_STATUS.DRAFT ? (
                                                    <p className="text-pink-50">DRAFTED</p>
                                                ) : 
                                                (
                                                    <p className="text-yellow-50">PUBLISHED</p>
                                                )
                                            }
                                        </div>
                                    </Td>
                                    <Td className="">
                                        2hr 30min
                                    </Td>
                                    <Td>
                                        ${course.price}
                                    </Td>
                                    <Td className="">
                                        <button
                                            disabled={loading}
                                            onClick={() => {
                                                navigate(`/dashboard/edit-course/${course._id}`);
                                            }}
                                            className="mr-4"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            disabled={loading}
                                            onClick={() => {
                                                setModal({
                                                    text1:"Do you want to delete this course",
                                                    text2:"All the data related to this course will be deleted",
                                                    btn1Text:"Delete",
                                                    btn2Text:"Cancel",
                                                    btn1Handeler: !loading ? ()=>handleCourseDelete(course._id) : () => (<div></div>),
                                                    btn2Handeler: !loading ? ()=>setModal(null) : () => (<div></div>)
                                                })
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </Td>
                                </Tr>
                            ))
                        )
                    }
                </Tbody>
            </Table>
            {modal && <Modal modalData={modal}/>}
        </div>
    )
}

export default CoursesTable;