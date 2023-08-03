import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import {AiOutlineDown} from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi2";

export default function CourseAccordionBar({isActive, handleActive, section}) {

    const currentEle = useRef(null);
    const [active, setActive] = useState(false);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setActive(isActive?.includes(section._id));
    }, [isActive]);

    useEffect(() => {
        setHeight(active ? currentEle.current.scrollHeight : 0);
    }, [active]);

    return (
        <div className="">
            <div 
                onClick={() => handleActive(section._id)}
                className="">
                <div className="">
                    <AiOutlineDown />
                    <p>
                        {section.sectionName}
                    </p>
                </div>

                <div className="">

                </div>
            </div>

            <div 
                className={`relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
                style={{
                  height: height,
                }}
                ref={currentEle}
            >
                {
                    section.subSection.map((subSection, index) => {
                        return (
                            <div>
                                <HiOutlineVideoCamera/>
                                <p>
                                    {subSection.title}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}