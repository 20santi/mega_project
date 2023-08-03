import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {BiSearch} from "react-icons/bi";
import  ProfileDropdown  from "../core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import {IoChevronDownOutline} from "react-icons/io5";

const Navbar = () => {

    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        ;(async () => {
          setLoading(true)
          try {
            const res = await apiConnector("GET", categories.CATEGORIES_API)
            setSubLinks(res.data.data)
          } catch (error) {
            console.log("Could not fetch Categories.", error)
          }
          setLoading(false)
        })()
      }, [])

    console.log("printing subLinks: ", subLinks);
    const matchRoute = (route) => {
        return matchPath(location.pathname, {
            path: route.path,
            exact: route.exact,
            strict: route.strict
        });
    }

    return (
        <div  className=" fixed z-50 w-full mb-5 flex items-center justify-center border-b-[1px] h-14 border-b-richblack-700 bg-richblack-800">
            <div className="w-11/12 flex max-w-maxContent items-center justify-between">

                <Link to="/">
                    <img src={logo} width={160} height={42} loading="lazy" alt="logo"/>
                </Link>

                <nav>
                    <ul className="flex gap-x-6 text-richblack-25">
                        {
                            NavbarLinks.map( (link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? (
                                        <div  className="flex items-center gap-2 group relative">
                                            <p>{link.title}</p>
                                            <IoChevronDownOutline/>

                                            <div className="invisible absolute left-[50%] top-[50%] flex
                                             flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0
                                              transition-all duration-200 group-hover:visible translate-y-[10%] 
                                              group-hover:opacity-100 lg:w-[300px] translate-x-[-50%] z-50">

                                                <div className=" absolute left-[50%] top-0 h-6 w-6 rotate-45
                                                rounded bg-richblack-5 translate-y-[-50%] translate-x-[80%]">   
                                                </div>

                                                {
                                                    loading ? (
                                                        <p className="text-center">Loading...</p>
                                                    ): subLinks.length ? (
                                                        <>
                                                            {subLinks
                                                                ?.map((subLink, i) => (
                                                                    <Link
                                                                    to={`/catalog/${subLink.name
                                                                        .split(" ")
                                                                        .join("-")
                                                                        .toLowerCase()}`}
                                                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                                    key={i}
                                                                    >
                                                                    <p>{subLink.name}</p>
                                                                    </Link>
                                                                ))}
                                                        </> 
                                                    ) :
                                                    (<p className="text-center">No Courses Found</p>)
                                                }

                                                </div>

                                        </div>
                                        ) : (
                                            <div>
                                                <Link to={link.path}>
                                                    <p className="text-richblack-25">
                                                        {link.title}
                                                    </p>
                                                </Link>
                                            </div>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* login signup dashboard */}
                <div className="flex gap-x-4 items-center">
                    
                    {
                        user  && (
                            <div className="flex gap-x-4 items-center justify-center">
                                <Link>
                                    <BiSearch size="25px" color="white"/>
                                </Link>

                                <Link to="/dashboard/cart" className="relative">
                                    <AiOutlineShoppingCart size="25px" color="white"/>
                                    {
                                        totalItems > 0 && (
                                            <span>
                                                {totalItems}
                                            </span>
                                        )
                                    }
                                </Link>

                                <img src={user?.image} alt={`profile-${user?.firstName}`}
                                    className="w-[28px] h-[28px] rounded-full"
                                />

                            </div>
                        )
                    }
                    
                    {
                        token === null && (
                            <Link to="/login">
                                <button className=" border-[1px] border-richblack-700 bg-richblack-800
                                 px-[12px] py-[8px] text-richblack-100 rounded-md">
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className="border-[1px] border-richblack-700 bg-richblack-800
                                 px-[12px] py-[8px] text-richblack-100 rounded-md">
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }

                </div>

            </div>
        </div>
    )
}

export default Navbar;