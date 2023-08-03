import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconButton";
import { buyCourse } from "../../../../services/oparations/studentFeatureApi";
import { useNavigate } from "react-router-dom";

const renderTotalAmount = () => {
    
    const {total, cart} = useSelector((state) => state.cart);
    const {user} = useSelector(state => state.profile);
    const {token} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        buyCourse(token, course, user, navigate, dispatch);
    }

        return (
        <div className="">
            <p>Total</p>
            <p>Rs {total}</p>

            <IconBtn
                text="Buy Now"
                onclick={handleBuyCourse} 
                customClasses={"w-full justify-center"}   
            />
        </div>
    )
}

export default renderTotalAmount;