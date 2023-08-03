import React from "react";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import {FaCheck} from "react-icons/fa";
import CourseBuilderForm from "./courseBuilder/CourseBuilder";
import PublishCourse from "./PublishCourse";

export default function RenderSteps() {

    const {step} = useSelector((state) => state.course);

    const steps = [
        {
            id:1,
            title:"Course Information"
        },
        {
            id:2,
            title:"Course Builder"
        },
        {
            id:3,
            title:"Publish"
        }
    ]
    return (
        <div className="ml-">
            <div className="flex gap-x-20">
                {steps.map((item) => {
                    return (
                        <div key={item.id} className="pl-28 ml-[45px]">
    
                            <div className="flex flex-col relative">
                                <div className={`${step >= item.id ?
                                " bg-yellow-900 border border-yellow-50 text-yellow-50" : 
                                "border border-richblack-700 bg-richblack-800 text-richblack-300"} 
                                text-[18px] leading-[26px] font-inter font-normal flex items-center justify-center rounded-full w-[34px] h-[34px]`}>
                                    {
                                        step > item.id ?(<FaCheck className="text-yellow-50"/>) : (item.id)
                                    }
                                 
                                </div>
                            </div>
                            {/* add code for dashes */}
                            <div className="">
                                {
                                    item.id < steps.length && (
                                    <div className="h-[1px] border-dashed border-yellow-50">
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="flex gap-x-16 pt-3 text-richblack-5">
                <div className="ml-28">
                    Course Information
                </div>
                
                <div className="ml-[78px]">
                    Course Builder
                </div>

                <div className="ml-[130px]">
                    Publish
                </div>
            </div>

            <div className="mt-12">
                {step === 1 && <CourseInformationForm/>}
                {step === 2 && <CourseBuilderForm/>}
                {step === 3 && <PublishCourse/>}
            </div>

        </div>
    )
}