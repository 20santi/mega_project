import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconButton";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { useEffect } from "react";
import { COURSE_STATUS } from "../../../../../utils/Constants";
import { editCourseDetails } from "../../../../../services/oparations/courseDetails";

export default function PublishCourse() {

    const {
        register,
        handleSubmit,
        setValue,
        getValues
    } = useForm()

    const {course} = useSelector(state => state.course);
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true);
        }
    }, []);

    const goToCourses = () => {
        dispatch(resetCourseState());
    }

    const handleCoursePublish = async() => {
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
        course?.status === COURSE_STATUS.DRAFT && getValues("public") === false) {
            //no updation in form
            //no need to make api call
            goToCourses();
            return;
        }
        //if form update
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);

        setLoading(true)
        // update courseStatus of course details 
        const result = await editCourseDetails(formData, token);

        if(result) {
            goToCourses();
        }
        setLoading(false);
    }

    const onSubmit = () => {
        handleCoursePublish()
    }

    const goBack = () => {
        dispatch(setStep(2));
    }

    return (
        <div className="rounded-md border bg-richblack-800 p-6 border-richblack-700">
            <p>Publish Course</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>
                    <input
                        type="checkbox"
                        id="public"
                        {...register("public")}
                        className="rounded-lg h-4 w-4"
                    />
                        <span className="ml-3">
                            Make this Course as Public
                        </span>
                    </label>
                </div>

                <div className="flex justify-end gap-x-3">
                    <button
                        disabled={loading}
                        type="button"
                        onClick={goBack}
                        className="flex text-richblack-5 items-center rounded-md bg-richblack-600"
                    >
                        Back
                    </button>
                    <IconBtn disable={loading} text="save changes"/>
                </div>
            </form>
        </div>
    )
}