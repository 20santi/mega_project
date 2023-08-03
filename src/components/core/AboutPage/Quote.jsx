import React from "react";
import HighlightText from "../HomePage/HighlightText";

const Quote = () => {
    return (
        <div className=" text-4xl leading-[52px] h-[156px] font-semibold">
            We are passionate about revolutionizing the way we learn. Our innovative platform 
            <HighlightText text=" combines technology " 
            style={"font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] from-100% via-[#12D8FA] via-100% to-[#A6FFCB] to-100% "}/>
            
            ,<HighlightText text=" expertise " 
            style={"font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF512F] from-100% to-[#F09819] to-100% "}/>, 
            
            and community to create an <HighlightText text=" unparalleled educational experience." 
            style={"font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E65C00] from-100% to-[#F9D423] to-100% "}/>
        
        </div>
    )
}

export default Quote;