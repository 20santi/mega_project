import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../../../../common/Modal"
import { setCourse } from "../../../../../slices/courseSlice";
import SubSectionModal from "./SubSectionModal";
import { deleteSection } from "../../../../../services/oparations/courseDetails";
import { deleteSubsection } from "../../../../../services/oparations/courseDetails";

export default function NestedView({handleChangedSectionName}) {

    const {course} = useSelector(state => state.course);
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [modal, setModal] = useState(null);

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id
        }, token)

        if(result) {
            dispatch(setCourse(result));
        }
        setModal(null);
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubsection({subSectionId, sectionId}, token);
        if(result) {
            const updatedCourseContent = course.courseContent.map((section) => 
                section._id === sectionId ? result : section
            );
            const updaedCourse = {...course, courseContent:updatedCourseContent};
            dispatch(setCourse(updaedCourse));
        }
        setModal(null);
    }

    return(
        <div className="">
            <div className="flex flex-col gap-y-6 rounded-lg bg-richblack-700 p-6 px-8 mt-5">
                {course?.courseContent?.map((section) => {
                    return(
                        <details key={section._id} open>

                            <summary className="flex items-center justify-between gap-x-3 border-b border-richblack-600 p-2">
                                <div className="flex items-center gap-x-3">
                                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                                    <p className="font-semibold text-richblack-50">
                                        {section.sectionName}
                                    </p>
                                </div>
                                <div className="flex gap-x-2 items-center justify-center">
                                    <button
                                        onClick={() => handleChangedSectionName(section._id, section.sectionName)}
                                        className="text-richblack-400"
                                    >
                                        <MdEdit/>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setModal({
                                                text1:"Delete this Section",
                                                text2:"All the lectures in this section will be deleted",
                                                btn1Text:"Delete",
                                                btn2Text:"Cancell",
                                                btn1Handeler:() => handleDeleteSection(section._id),
                                                btn2Handeler:() => setModal(null)
                                            })
                                        }}
                                    >
                                        <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                    </button>
                                    <span className=" text-richblack-400">|</span>
                                    <BiSolidDownArrow className="text-sm ml-2 text-richblack-300"/>
                                </div>
                            </summary>

                            <div className="">
                                {
                                    section?.subSection?.map(data => (
                                        <div
                                                key={data?._id}
                                                onClick={() => setViewSubSection(data)}
                                                className="flex items-center justify-between gap-x-3 border-b border-richblack-600 p-2"
                                            >
                                                <div className="flex items-center gap-x-3 ml-9">
                                                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                                                    <p className=" font-medium font-inter text-[14px] leading-[22px] text-richblack-50">
                                                        {data.title}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-x-3"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <button onClick={() => setEditSubSection({...data, sectionId:section._id})}
                                                        className=" text-richblack-400"
                                                    >
                                                        <MdEdit/>
                                                    </button>
                                                    <button
                                                        onClick={() => setModal({
                                                            text1:"Delete this Sub Section",
                                                            text2:"Selected lectures will be deleted",
                                                            btn1Text:"Delete",
                                                            btn2Text:"Cancell",
                                                            btn1Handeler:() => handleDeleteSubSection( data._id, section._id),
                                                            btn2Handeler:() => setModal(null)
                                                        })}
                                                    >
                                                        <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                                    </button>
                                                </div>

                                            </div>
                                    ))
                                }
                                <button 
                                    onClick={() => setAddSubSection(section._id)}
                                    className="flex items-center mt-4 gap-x-2 text-yellow-50"
                                >
                                    <AiOutlinePlus/>
                                    <p>Add Lecture</p>
                                </button>
                            </div>
                        </details>
                    )
                })}
            </div>

            {addSubSection ? (<SubSectionModal
                modalData = {addSubSection}
                setModalData = {setAddSubSection}
                add = {true}
            />) :
             viewSubSection ? (<SubSectionModal
                modalData = {viewSubSection}
                setModalData = {setViewSubSection}
                view = {true}
             />) 
            :editSubSection ? (<SubSectionModal
                modalData = {editSubSection}
                setModalData = {setEditSubSection}
                edit = {true}
            />) : (<div></div>)}

            {modal ? 
            (<Modal modalData={modal}/>) : (<div></div>)    
        }
        </div>
    )
}