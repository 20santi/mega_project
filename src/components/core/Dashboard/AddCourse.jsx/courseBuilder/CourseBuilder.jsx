import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconButton";
import {IoAddCircleOutline} from "react-icons/io5"
import { IoIosArrowBack } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import NestedView from "./NestedView";
import { updateSection } from "../../../../../services/oparations/courseDetails";
import { createSection } from "../../../../../services/oparations/courseDetails";

const CourseBuilderForm = () => {

    const [editSectionName, setEditSectionName] = useState(null);
    const [loading, setLoading] = useState(false);
    const {course} = useSelector(state => state.course);
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors}
    } = useForm()

    const cancellEdit = () => {
        setEditSectionName(null);
        setValue("sectionName", "")
    }
    
    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const gotoNext = () => {
        if(course.courseContent.length === 0) {
            toast.error("Please Add atleast one section")
        }
        if(course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Atleast add one lectiure in each section");
            return;
        }
        dispatch(setStep(3));
    }

    const handleChangedSectionName = (sectionId, sectionName) => {
        if(editSectionName === sectionId) {
            cancellEdit();
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    }

    const onSubmit = async(data) => {
        setLoading(true);
        let result;

        if(editSectionName) {
            result = await updateSection({
                sectionName: data.sectionName,
                sectionId: editSectionName,
                courseId: course._id
            }, token)
        }
        else{
            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id
            }, token)
        }

        // update values
        if(result) {
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", "");
        }

        setLoading(false);

    }

    return (
        <div className="rounded-lg bg-richblack-800 border border-richblack-700 p-6 ml-[25px]">
            <p className="font-inter text-[24px] leading-[32px] text-richblack-5 font-semibold">
                Course Builder
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mt-5">
                    <label htmlFor="sectionName" className="text-[14px] leading-[22px] font-inter font-normal text-richblack-5">
                        Secion Name<sup className=" text-pink-200">*</sup>
                    </label>
                    <input
                        id="sectionName"
                        placeholder="Add Section name"
                        {...register("sectionName", {required:true})}
                        className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                    />
                    {
                        errors.sectionName && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Section name is required
                            </span>
                        )
                    }
                </div>
                <div className="">

                <IconBtn
                    type="submit"
                    disabled={loading}
                    text={editSectionName ? "Edit Section Name" : "Create Section"}
                    outline={true}
                    customClasses="bg-richblack-800 border border-yellow-50 text-yellow-50 rounded-lg p-2 mt-3"
                >
                    <IoAddCircleOutline size={20} className="text-yellow-50" />
                </IconBtn>
                    
                </div>
            </form>

            {
                course.courseContent?.length > 0 && (
                    <NestedView handleChangedSectionName={handleChangedSectionName}/>
                )
            }
            <div className="flex justify-end gap-x-3 mt-10">
                <button onClick={goBack} className="rounded-md text-richblack-5 cursor-pointer flex gap-x-2 items-center bg-richblack-700 p-2 w-[100px] justify-center">
                    <IoIosArrowBack/>
                    Back
                </button>
                <IconBtn text="Next" onclick={gotoNext} />
            </div>

        </div>
    )
}

export default CourseBuilderForm