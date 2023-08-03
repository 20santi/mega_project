import React from "react";

const IconBtn = ({
    text,
    onclick,
    children,
    disable,
    outline=false,
    customClasses,
    type
}) => {
    return (
        
            <button
            disabled={disable}
            type={type}
            onClick={onclick}
            className={
                customClasses ? 
                (`${customClasses}`) :
                (" text-richblack-900 bg-yellow-50 w-[96px] h-[40px] rounded-lg flex items-center justify-center font-semibold")
            }
            >
                {
                    children ? (
                    <div className="flex gap-x-2 items-center flex-row-reverse">
                        <span className=" text-[16px] leading-6 font-inter ">
                            {text}
                        </span>
                        {children}
                    </div>
                        ) : (text)
                }
            </button>
        
    )
}

export default IconBtn;