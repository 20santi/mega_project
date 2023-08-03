import React from "react";
import { Link } from "react-router-dom";

const Button = ({children, active, linkto, style}) => {
    return (
        <div>
            <Link to={linkto}>
                <div className={`text-center text-[16px] px-3 py-3 leading-[24px] ${style}
                ${active ? "bg-yellow-50 text-richblack-900" : "bg-richblack-800"}
                hover:scale-95 transition-all duration-200 rounded-[8px] font-[500] font-inter
                `}>
                    {children}
                </div>
            </Link>
        </div>
    )
}

export default Button;