import React from "react";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_progress from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "../HomePage/Button";

const LearningLanguageSection = () => {
    return (
        <div className="mt-[130px]">
            <div className="flex flex-col gap-5 lg:items-center items-start">

                <div className="font-semibold text-4xl text-center">
                Your swiss knife for
                <HighlightText text={"learning any language"}/>
                </div>

                <div className="lg:text-center text-richblack-600 lg:mx-auto text-base font-medium w-[60%]">
                Using spin making learning multiple languages easy. 
                with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>

                <div className="lg:flex lg:flex-row flex-col items-center mx-auto lg:mx-0 lg:justify-center mt-5 ">
                    <img src={know_your_progress} alt="knowYourProgress"
                    className="object-contail lg:-mr-32"/>

                    <img src={compare_with_others} alt="knowYourProgress"
                    className="object-contail"/>

                    <img src={plan_your_progress} alt="knowYourProgress"
                    className="object-contail lg:-ml-36"/>
                </div>

                <div className="w-fit pb-24 mx-auto">
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                </div>

            </div>
        </div>
    )
}

export default LearningLanguageSection;