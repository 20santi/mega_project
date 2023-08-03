import React from "react";
import CTAButton from "../HomePage/Button";
import HighlightText from "./HighlightText";
import {FaArrowRight} from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
    position,heading,subheading,ctabtn1, ctabtn2, codeblock, gradient, codeColor
}) => {
    return (
        <div className={`flex ${position} my-20 justify-between gap-10`}>
            
            {/*section 1 */}
            <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
                {heading}
                <div className="text-richblack-300 font-bold">
                    {subheading}
                </div>

                <div className="flex gap-7 mt-7 mx-auto lg:mx-0 lg:items-start">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex gap-2 items-center">
                            {ctabtn1.btnText}
                            <FaArrowRight/>
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>

            {/*section 2*/}
            <div className="relative h-fit flex text-[14px] w-[100%] py-4 lg:w-[500px]">
                {/*hw gradiant*/}
                <div className={` bottom-14 right-36 absolute w-[372.95px] h-[257.05px] blur-2xl opacity-20 rounded-full ${gradient}`}>
                </div>

                <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                    <TypeAnimation
                    sequence={[codeblock, 1000, ""]}
                    repeat={Infinity}
                    cursor={true}

                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block",
                        }
                    }
                    omitDeletionAnimation={true}
                    />
                </div>

            </div>

        </div>
    )
}

export default CodeBlocks