import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
    {
        Logo:Logo1,
        heading:"Leadership",
        description:"Fully committed to the success company"
    },
    {
        Logo:Logo2,
        heading:"Responsibility",
        description:"Students will always be our top priority"
    },
    {
        Logo:Logo3,
        heading:"Flexibility",
        description:"The ability to switch is an important skills"
    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        description:"Code your way to a solution"
    },
]

const TimelineSection = () => {
    return (
        <div>

            <div className="lg:flex lg:flex-row flex-col gap-15 items-center">

                <div className="flex flex-col w-fit lg:w-[45%] gap-5">
                    {
                        timeline.map((ele,idx) => {
                            return (
                                <div className="flex flex-row gap-6" key={idx}>

                                    <div className="w-[52px] h-[52px] rounded-full bg-white flex 
                                    items-center justify-center">
                                        <img src={ele.Logo}/>
                                    </div>

                                    <div className="">
                                        <h2 className="font-semibold text-[18px] w-fit">{ele.heading}</h2>
                                        <p className="text-base">{ele.description}</p>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>

                <div className="relative shadow-blue">
                    <img src={timelineImage} alt="timelineImage"
                    className="shadow-white lg:w-[714px] lg:h-[545px] w-[358px] h-[545px]
                     object-cover pt-16 lg:pt-0 lg:shadow-[20px_20px_0px_0px_rgba(255,255,255,1)]"/>

                    <div className="absolute lg:left-[10.5%]  lg:translate-y-[-50%] translate-y-[-103%] mr-4 right-0 bg-caribbeangreen-700 
                    text-white lg:flex lg:flex-row flex flex-col justify-evenly items-center lg:justify-center uppercase 
                    lg:w-[511px] lg:h-[128px] w-[246px] h-[277px]">

                        <div className="flex gap-[24px] items-center lg:border-r lg:border-caribbeangreen-300
                        p-10 lg:w-[45%] lg:h-[44px]">
                            <p className="font-bold text-[36px] leading-[44px]">10</p>
                            <p className=" text-caribbeangreen-300 text-sm">Years of Experience</p>
                        </div>

                        <div className="flex gap-[24px] items-center p-10 lg:w-[45%] lg:h-[44px]">
                            <p className="font-bold text-[36px] leading-[44px]">250</p>
                            <p className=" text-caribbeangreen-300 text-sm">Type of Courses</p>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default TimelineSection;