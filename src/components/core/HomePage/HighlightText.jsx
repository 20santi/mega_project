import React from "react";

const HighlightText = ({text, style}) => {
    return (
        <span className={`${style}`}>
            {text}    {/* try gradient -> bg-gradient-to-b from[] to[] */}
        </span>
    )
}

export default HighlightText;