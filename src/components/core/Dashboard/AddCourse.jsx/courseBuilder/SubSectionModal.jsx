import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../../../slices/courseSlice";
import { RxCross1 } from "react-icons/rx";
import IconBtn from "../../../../common/IconButton";
import Upload from "../CourseInformation/Upload";
import { createSubSection } from "../../../../../services/oparations/courseDetails";
import { updateSubSection } from "../../../../../services/oparations/courseDetails";

const SubSectionModal = function ({
    modalData, setModalData, add = false, view = false, edit = false
}) {

    const {
        register, handleSubmit, setValue, formState: { errors }, getValues
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector(state => state.course);
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        if (view || edit) {
            setValue("LectureTitle", modalData.title);
            setValue("LectureDesc", modalData.description);
            setValue("LectureVideo", modalData.videoUrl);
        }
    }, []);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl) {
            return true;
        }
        else {
            return false;
        }
    };

    const handleEditSubSection = async () => {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }

        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("description", currentValues.lectureDesc);
        }

        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("video", currentValues.lectureVideo);
        }

        setLoading(true);
        const result = await updateSubSection(formData, token);
        if (result) {
            const updatedCourseContent = course.courseContent.map((section) => 
                section._id === modalData.sectionId ? result : section
            );
            const updaedCourse = {...course, courseContent:updatedCourseContent};
            dispatch(setCourse(updaedCourse));
        }
        setModalData(null);
        setLoading(false);
    };

    const onSubmit = async (data) => {
        if (view) {
            return;
        }

        if (edit) {
            if (!isFormUpdated) {
                toast.error("No changes made to the form");
            }
            else {
                handleEditSubSection();
            }
            return;
        }

        const formData = new FormData();
        formData.append("sectionid", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("video", data.lectureVideo);
        setLoading(true);

        const result = await createSubSection(formData, token);
        if (result) {
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData ? result : section
            );
            const updaedCourse = {...course, courseContent:updatedCourseContent};
            dispatch(setCourse(updaedCourse));
        }
        setModalData(null);
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">

            <div className="w-11/12 max-w-[665px] rounded-lg border border-richblack-400 bg-richblack-800">
                <div className="flex justify-between items-center pl-6 pr-6 bg-richblack-700 h-[58px]">
                    <p className="text-[18px] font-inter font-semibold leading-[26px] text-richblack-5">
                        {view && "Viewing Lecture"}
                        {edit && "Editing Lecture"}
                        {add && "Adding Lecture"}
                    </p>
                    <button onClick={() => (!loading ? setModalData(null) : {})}>
                        <RxCross1 className=" text-richblack-5"/>
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} 
                    className="flex flex-col p-6 mt-3"
                >
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null} />
                    <div className="mt-4">
                        <label className="text-[14px] leading-[22px] font-inter font-normal text-richblack-5">
                            Lecture Title<sup className=" text-pink-200"> *</sup>
                        </label>
                        <input
                            id="lectureTitle"
                            placeholder="Enter Lecture Title"
                            {...register("lectureTitle", {required:true})}
                            className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                        />
                        {
                            errors.lectureTitle && (<span>
                                Lecture Title is required
                            </span>)
                        }
                    </div>
                    <div className="mt-4">
                        <label className="text-[14px] leading-[22px] font-inter font-normal text-richblack-5">
                            Lecture Description<sup className=" text-pink-200">*</sup>
                        </label>
                        <textarea
                            id="lectureDesc"
                            placeholder="Enter Lecture Description"
                            {...register("lectureDesc", {required:true})}
                            className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px] min-h-[130px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                        />
                        {
                            errors.lectureDesc && (
                                <span>
                                    Lecture Description is required
                                </span>
                            )
                        }
                    </div>
                    {!view && (
                        <div className="flex justify-end mt-6">
                        <IconBtn
                            disabled={loading}
                            text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
                            customClasses="text-richblack-900 bg-yellow-50 w-[128px] h-[40px] rounded-lg flex items-center justify-center font-semibold  text-richblack-900"
                        />
                        </div>
                    )}
                </form>
            </div>

        </div>
    );
}

export default SubSectionModal;