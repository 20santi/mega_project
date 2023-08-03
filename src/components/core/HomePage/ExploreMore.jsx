import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[1]);
    const [courses, setCourses] = useState(HomePageExplore[1].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[1].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div className="">
            <div className="text-4xl font-semibold lg:text-center items-start">
                Unlock the
                <HighlightText text={" Power of Code"}
                style={"font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] from-100% via-[#12D8FA] via-100% to-[#A6FFCB] to-100% "}/>
            </div>

            <p className="items-start lg:text-center text-richblack-300 text-sm mt-3 text-[16px]">Learn to Build Anything You Can Imagine</p>

            <div className="flex rounded-full bg-richblack-800 mb-5 mt-20 px-1 py-1 w-fit mx-auto">
                {
                    tabsName.map((ele, index) => {
                        return (
                            <div className={`text-[16px] flex items-center gap-2 
                            ${currentTab === ele ? 
                            "bg-richblack-900 text-richblack-5 font-medium" :
                            "text-richblack-200"} rounded-full cursor-pointer transition-all
                             duration-200 hover:bg-richblack-900 hover:text-richblack-5 px-7 py-3`}
                             key={index}
                             onClick={() => setMyCards(ele)}>
                                {ele}
                            </div>
                        )
                    })
                }
            </div>

            <div className="h-[150px]"></div>

            {/* course card create */}
            <div className="lg:flex lg:flex-row flex-col lg:gap-[36px]">
                {
                    courses.map((ele,index) => {
                        return (
                            <CourseCard
                            key={index}
                            cardData = {ele}
                            currentCard = {currentCard}
                            setCurrentCard = {setCurrentCard}
                            />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default ExploreMore;