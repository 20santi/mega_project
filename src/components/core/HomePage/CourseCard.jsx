import React from "react";
import {HiUsers} from "react-icons/hi";
import {AiFillBook} from "react-icons/ai";

const CourseCard = ({cardData,currentCard,setCurrentCard}) => {
    return (
        // <div className={`flex flex-col gap-3 w-[341.33px] h-[300px] text-[20px]
        // ${currentCard === cardData.heading ? "bg-white shadow-[12px_12px_0px_0px_rgba(255,214,10,1)]" 
        // : " bg-richblack-800"}
        // `}>
            
        //     <p className={``}>{cardData.heading}</p>
        //     <p className={``}>{cardData.description}</p>

        //     <div className="flex justify-between border border-t">
        //         <p>{cardData.level}</p>
        //         <p>{cardData.lessionNumber}</p>
        //     </div>

        // </div>

        <div className="flex flex-col gap-3 w-[341.33px] h-[300px]">
            
            {currentCard === cardData.heading ? 
            
                <div className="bg-white shadow-[12px_12px_0px_0px_rgba(255,214,10,1)] w-[341.33px] h-[300px] ">
                    <p className={`font-semibold font-inter text-[20px] leading-[28px] text-richblack-800
                     pt-10 pl-6`}>{cardData.heading}</p>
                    <p className={` text-[16px] font-inter font-[400] leading-[24px] text-richblack-500
                    ml-6 mt-4 w-[285px]`}>{cardData.description}</p>

                    <div className="border-t-2 border-dashed border-richblack-50 mt-16"></div>

                    <div className="flex justify-between mt-4">
                        <div className="flex gap-2 ml-5">
                            <HiUsers color="rgba(15,122,157,1)" size="20px"/>
                            <p className=" font-inter font-500 text-[16px] leading-[24px] text-blue-500">{cardData.level}</p>
                        </div>

                        <div className="flex gap-2 mr-5">
                            <AiFillBook color="rgba(15,122,157,1)" size="20px"/>
                            <p className=" font-inter font-500 text-[16px] leading-[24px] text-blue-500">{cardData.lessionNumber} Lesons</p>
                        </div>
                    </div>
                </div>
             
                : 

                <div>
                    <div className=" bg-richblack-800 w-[341.33px] h-[300px]">

                        <p className={`font-semibold font-inter text-[20px] leading-[28px] text-richblack-25
                         pt-9 pl-6`}>{cardData.heading}</p>
                        <p className={` text-[16px] font-inter font-[400] leading-[24px] text-richblack-400
                        ml-6 mt-4 w-[285px]`}>{cardData.description}</p>

                        <div className="border-t-2 border-dashed border-richblack-600 mt-16"></div>

                        <div className="flex justify-between mt-4">

                            <div className="flex gap-2 ml-5">
                                <HiUsers color="rgba(110,114,127,1)" size="20px"/>
                                <p className=" font-inter font-500 text-[16px] leading-[24px] text-richblack-300">{cardData.level}</p>
                            </div>

                            <div className="flex gap-2 mr-5">
                                <AiFillBook color="rgba(110,114,127,1)" size="20px"/>
                                <p className=" font-inter font-500 text-[16px] leading-[24px] text-richblack-300">{cardData.lessionNumber} Lesons</p>
                            </div>

                        </div>
                    </div>
                </div>
            }
            
        </div>
    )
}

export default CourseCard;