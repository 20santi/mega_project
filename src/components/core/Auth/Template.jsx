import React from "react";
import SignupFrom from "./SignupForm";
import LoginForm from "./LoginForm";
import frameImage from "../../../assets/Images/frame.png";
import { useSelector } from "react-redux";

const Template = ({title, description1, description2, image, fromType}) => {
    const {loading} = useSelector((state) => state.auth);
    return (
        <div className="mt-20">

            {
                loading ? (<div className="spinner"></div>) :
                (
                <div className="flex justify-center gap-x-[150px]">
                    <div className="flex flex-col ">
                        <h1 className=" font-semibold font-inter font-600 text-[30px] leading-10 text-richblack-5 w-[434px]">
                            {title}
                        </h1>

                        <p className="w-[444px] mt-2 h-[100px] text-[18px] font-inter leading-[26px] font-400 text-richblack-100">
                            {description1} <span className="text-[16px] leading-[24px] font-700 font-edu-sa text-blue-100">{description2}</span>
                        </p>
 
                        <div className="-mt-9">
                            {
                                fromType === "signup" ? <SignupFrom/> : <LoginForm/>
                            }   
                        </div>
                    </div>

                    <div className=" relative">
                        <img src={frameImage} alt="frameImage" 
                        className="absolute w-[558px] h-[484px] left-5 top-5 z-0"
                        />

                        <img src={image} alt="image"
                        className="w-[558px] h-[484px] z-10 relative"
                        />
                    </div>
                </div>
                )
            }

        </div>
    )
}

export default Template;
