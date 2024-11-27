import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { apiConnector } from "../../services/apiConnector.js";
import { categories } from "../../services/apis";
import { AiOutlineMenu } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import SideBar from "../Dashboard/SideBar.js";
import ProfileDropDown from '../auth/ProfileDropDown.js'
import { setSidebar } from "../../slices/adminSlice.js";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { sidebar } = useSelector((state) => state.admin);

  const [loading, setLoading] = useState(false);

  function matchRoutes(route) {
    return matchPath({ path: route }, location.pathname);
  }

  const handleSidebar = () => {
    // console.log("inside function sidebar")
    dispatch(setSidebar(!sidebar));
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : "bg-richblack-900"
      } transition-all duration-200 fixed w-full z-50`}
    >
      <div className="flex relative flex-row-reverse lg:flex-row items-center justify-between w-11/12 max-w-maxContent mx-auto">
        <Link to="/">
          <p className='text-white font-bold text-2xl'>VRV</p>
        </Link>

        {/* login/signup/dashboard */}
        <div className="gap-x-4 hidden lg:flex items-center">
          {token !== null && <ProfileDropDown />}
        </div>

        {/* menu button */}
        <button className="mr-4 lg:hidden" onClick={() => handleSidebar()}>
          {sidebar ? (
            <MdClose fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          )}
        </button>

        {/* phone devices menubar */}
        {!token && sidebar && (
          <div className="bg-richblack-800 block md:hidden z-50 min-w-[252px] absolute min-h-[calc(100vh-3.5rem)] top-11 -left-4">
            <div className="py-4">
              {/* login/signup/dashboard */}
              <div className="gap-y-4 flex flex-col items-center">

                {token === null && (
                  <Link to="/login" onClick={()=>{}}>
                    <button className="border-richblack-700 border px-[12px] py-[8px] text-richblack-100 bg-richblack-800 rounded-md">
                      Log in
                    </button>
                  </Link>
                )}

                {token === null && (
                  <Link to="/signup" onClick={()=>{}}>
                    <button className="border-richblack-700 border px-[12px] py-[8px] text-richblack-100 bg-richblack-800 rounded-md">
                      Sign up
                    </button>
                  </Link>
                )}
              </div>
            </div>

            <hr className="text-richblack-5" />
          </div>
        )}

        {token && sidebar && (
          <div className="bg-richblack-800 text-richblack-25 block md:hidden z-50 min-w-[252px] absolute min-h-[calc(100vh-3.5rem)] top-11 -left-4">
            <SideBar />
          </div>
        )}

        {sidebar && (<div className="top-14 z-10 absolute w-[100vw] h-[100vh]" onClick={handleSidebar}></div>)}
        
      </div>
    </div>
  );
};

export default Navbar;
