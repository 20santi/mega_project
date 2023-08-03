import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import{MdCurrencyRupee} from "react-icons/md";
import RequirementField from "./RequirementField";
import {setCourse, setStep} from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconButton";
import { toast } from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/Constants";
import ChipInput from "./ChipInput";
import Upload from "./Upload";
import { fetchCourseCategories, addCourseDetails, editCourseDetails} from "../../../../../services/oparations/courseDetails";

export default function CourseInformationForm() {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    } = useForm();

    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth);
    const {course, editCourse} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const getCategories = async() => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if(categories.length > 0 ) {
                setCourseCategories(categories);
            }
            setLoading(false);

            if(editCourse) {
                setValue("courseTitle", course.courseName)
                setValue("courseShortDesc", course.courseDescription)
                setValue("coursePrice", course.price)
                setValue("courseTags", course.tag)
                setValue("courseBenefits", course.whatYouWillLearn)
                setValue("courseCategory", course.category)
                setValue("courseRequirements", course.instructions)
                setValue("courseImage", course.thumbnail)
            }
        }
        getCategories();
    }, []);

    const isFormUpdate = () => {
        const currentValues = getValues();

        if (!course) {
            return false;
        }

        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory !== course.category
            || currentValues.courseRequirements.toString() !== course.instructions.toString()
            || currentValues.courseImage !== course.thumbnail
            ) {
            return true;
        }
        else{
            return false;
        }
    }

    const fromSubmit = async(data) => {

        //edit course
        if(isFormUpdate()) {
            if(editCourse) {
                const currentValues = getValues();
                const formData = new FormData();
    
                formData.append("courseId", course._id);
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle)
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc)
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice)
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags))
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }
                if (currentValues.courseCategory !== course.category) {
                    formData.append("category", data.courseCategory)
                }
                if (
                    currentValues.courseRequirements.toString() !==
                    course.instructions.toString()
                ) {
                    formData.append(
                      "instructions",
                      JSON.stringify(data.courseRequirements)
                    )
                }
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage)
                  }
    
                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if(result) {
                    setStep(2);
                    dispatch(setCourse(result));
                }
            }
            else{
                toast.error("No Changes made so far");
            }
            console.log("printing result -> ", result);

            return;
        }

        //create a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("status", COURSE_STATUS.DRAFT)
                                              
        setLoading(true);
        const result = await addCourseDetails(formData, token);
        if(result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
        console.log("printing result -> ", result);
    }

    return (
        <form
            onSubmit={handleSubmit(fromSubmit)}
            className="ml-[150px] mt-[50px] rounded-md w-[600px] border-richblack-700 bg-richblack-800 p-6 space-y-6"
        >
            <div className="">
                <label htmlFor="courseTitle" className="text-[14px] leading-[22px] font-inter font-normal text-richblack-5">
                    Course Title<sup className=" text-pink-200"> *</sup>
                </label>
                <input
                    id="courseTitle"
                    placeholder="Enter Course Title"
                    {...register("courseTitle", {required:true})}
                    className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"    
                />
                {
                    errors.courseTitle && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Title is required</span>
                    )
                }
            </div>

            <div className="">
                <label htmlFor="courseShortDesc" className="text-[14px] leading-[22px] font-inter font-normal text-richblack-5">
                    Course Short Description<sup className=" text-pink-200"> *</sup>
                </label>
                <textarea
                    id="courseShortDesc"
                    placeholder="Enter Description"
                    {...register("courseShortDesc", {required:true})}
                    className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px] min-h-[140px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                />
                {
                    errors.courseShortDesc && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Description required
                        </span>
                    )
                }
            </div>

            <div className="">
                <label htmlFor="coursePrice" className="text-[14px] leading-[22px] font-inter font-normal text-richblack-5">
                    Course Price<sup className=" text-pink-200"> *</sup>
                </label>
                <input
                    id="coursePrice"
                    placeholder="Enter Course Price"
                    {...register("coursePrice", {
                        required:true,
                        valueAsNumber:true
                    })}
                    className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)] relative"    
                />
                {/* <MdCurrencyRupee className=" absolute text-richblack-600"/> */}
                {
                    errors.courseTitle && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Price is required</span>
                    )
                }
            </div>

            <div className="">
                <label htmlFor="courseCategory" className="text-[14px] leading-[22px] font-inter font-normal text-richblack-5">
                    Course Category <sup className=" text-pink-200"> *</sup>
                </label>
                <select
                    id="courseCategory"
                    defaultValue=""
                    {...register("courseCategory", {required:true})}
                    className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                >
                    <option>
                        Choose Category
                    </option>
                    {
                        !loading && courseCategories.map((category, index) => (
                            <option key={index} value={category?._id} >
                                {category?.name}
                            </option>
                        ))
                    }
                </select>
                {
                    errors.courseCategory && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Category is required
                        </span>
                    )
                }
            </div>

            {/* create a custom component for tags */}
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter tags and press enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            {/* create component for uploading thumbnail */}
            <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                errors={errors}
                setValue={setValue}
                editData = {editCourse ? course?.thumbnail : null}
            />

            <div className="">
                <label htmlFor="courseBenefits" className="text-[14px] leading-[22px] font-inter font-normal text-richblack-5">
                    Benefits of the Course <sup className=" text-pink-200"> *</sup>
                </label>
                <textarea
                    id="courseBenefits"
                    placeholder="Enter Benefits of the course"
                    {...register("courseBenefits", {required:true})}
                    className="w-full min-h-[130px] p-3 mt-[6px] font-inter font-bold text-[12px]
                    leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                    shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                />
                {
                    errors.courseBenefits && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Benefits of the Course required
                        </span>
                    )
                }
            </div>

            <RequirementField
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            <div className="flex gap-x-3">
                {
                    editCourse && (
                        <button
                            onClick={() => dispatch(setStep(2))}
                            className="gap-x-2 w-[220px] h-[48px] rounded-lg bg-richblack-700 text-richblack-5 flex items-center justify-center font-semibold"
                        >
                            Continue without Saving
                        </button>
                    )
                }

                <IconBtn 
                    text={!editCourse ? "Next" : "Save Changes"}
                    customClasses={"gap-x-2 w-[139px] h-[48px] rounded-lg bg-yellow-50 text-richblack-900 flex items-center justify-center font-semibold"}
                />
            </div>

        </form>
    )
}