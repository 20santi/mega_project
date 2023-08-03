import React from "react";
import { useSelector } from "react-redux";

export default function Cart() {
    
    const {total, totalItems} = useSelector((state) => state.cart);

    return(
        <div className="text-white">
            <h1>Your Cart</h1>
            <p>{totalItems} Courses in cart</p>

            {
                total > 0 ?
                (
                    <div className="">
                        <renderCartCourses/>
                        <renderTotalAmount/>
                    </div>
                ) : (
                    <p>Your Cart is empty</p>
                )
            }
        </div>
    )
}