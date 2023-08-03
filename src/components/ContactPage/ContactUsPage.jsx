import React from "react";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2"; 
import { BiWorld } from "react-icons/bi";
import { IoIosCall } from "react-icons/io";
import ContactUsForm from "./ContactUsForm";
import ReviewSlider from "../common/ReviewSlider";
import Footer from "../common/Footer";

const contactData = [
    {
        img: <HiMiniChatBubbleLeftRight/>,
        first: "Chat on us",
        second: "Our friendly team is here to help.",
        third: "@gmail address"
    },
    {
        img: <BiWorld/>,
        first: "Visit us",
        second: "Come and say hello at our office HQ.",
        third: "Here is the location/address"
    },
    {
        img: <IoIosCall/>,
        first: "Call us",
        second: "Mon - Fri From 8am to 5pm",
        third: "+123 456 7890"
    },
];

const ContactUsPage = () => {
    return (
        <div className="w-11/12 max-w-maxContent mx-auto text-white mt-24">
            <div className="flex gap-x-20">

                {/* left box */}
                <div className="w-[450px] h-[390px] rounded-xl bg-richblack-800 pl-10 pt-10 ml-4">
                    <div className="flex flex-col gap-y-12">
                        {contactData.map((data, index) => {
                            return (
                                <div className="flex gap-x-2" key={index}>
                                    <div className="mt-1">
                                        {data.img}
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="text-[18px] leading-6 font-semibold text-richblack-5">
                                            {data.first}
                                        </p>
                                        <p className="text-[14px] leading-5 font-500 text-richblack-200">
                                            {data.second}
                                        </p>
                                        <p className="text-[14px] leading-5 font-500 text-richblack-200">
                                            {data.third}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* right box */}
                <div className="w-[650px] h-[799px] border-richblack-600 border-[1px] rounded-xl bg-transparent">
                    <div className="flex flex-col gap-y-4 justify-center p-12 pt-12">

                        <h1 className="text-[36px] leading-[44px] font-inter font-semibold text-richblack-5">
                            Got a Idea? We’ve got the skills. Let’s team up
                        </h1>
                        <p className="text-[16px] leading-6 font-500 text-richblack-200">
                            Tall us more about yourself and what you’re got in mind.
                        </p>

                        <div className="">
                            <ContactUsForm/>
                        </div>
                    </div>
                </div>

            </div>
            <h1>
                Reviews from other learners
            </h1>
            <ReviewSlider/>

            <Footer/>
        </div>
    );
};

export default ContactUsPage;
