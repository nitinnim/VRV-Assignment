import React, { useEffect, useState } from "react";
import { sidebarLinks } from "../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import { VscSignOut } from "react-icons/vsc";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";
import ConfirmationModal from "../common/ConfirmationModal";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { apiConnector } from "../../services/apiConnector.js";
import { BsCart } from "react-icons/bs";
import SideBarLink from "./SideBarLink.js";

const SideBar = () => {
  const { loading: authLoading, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const { sidebar } = useSelector((state) => state.admin);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const handleDropDown = () => {
    setDropdown((prev) => !prev);
  };

  return (
    <>
      {/* for smaller devices */}
      {sidebar && (
        <div className="lg:hidden z-50 flex gap-y-4 flex-col min-w-[222px] bg-richblack-800 min-h-[calc(100vh-3.5rem)] fixed py-10 border-r-richblack-700">
          {/* user info */}
          <div className="flex flex-col mx-auto gap-y-3" onClick={() => {}}>
            {/* image */}
            <Link to="/dashboard/my-profile" className="flex gap-x-3">
              <img
                src={user?.image}
                className="rounded-full w-12 h-12"
                alt=""
              />

              <div>
                <p className="text-richblack-5 font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-richblack-300 text-sm">{user.email}</p>
              </div>
            </Link>
          </div>

          {/* dashboard dropdown */}
          <div className="py-5 border-b border-t">
            <div
              onClick={() => handleDropDown()}
              className="w-full flex justify-center items-center gap-x-2"
            >
              <h3 className="font-semibold text-xl">Dashboard</h3>
              <span className="bg-transparent rounded-full border">
                <MdOutlineKeyboardArrowDown />
              </span>
            </div>
            {dropdown === true && (
              <div className="">
                <div className="flex mt-3 flex-col">
                  {sidebarLinks.map((link) => {
                    if (link.type && link.type !== user.role) return null;
                    return (
                      <SideBarLink
                        link={link}
                        key={link.id}
                        iconName={link.icon}
                        // onclick={handleSidebars}
                      />
                    );
                  })}
                </div>

                <div className="w-10/12 mx-auto h-[1px] bg-richblack-600 my-6"></div>

                <div className="flex relative flex-col">
                  {/* setting and logout */}
                  <div className="flex flex-col">
                    <SideBarLink
                      link={{ path: "/dashboard/settings", name: "settings" }}
                      iconName={"VscSettingsGear"}
                      // onclick={handleSidebars}
                    />

                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Are You Sure?",
                          text2: "You will be logged out of your account",
                          btn1text: "Logout",
                          btn2text: "Cancel",
                          btn1Handler: () => dispatch(logout(navigate)),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                      className={`relative text-sm px-8 font-medium py-2 text-richblack-400`}
                    >
                      <div className="flex items-center gap-x-2">
                        <VscSignOut />
                        <p>Logout</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* for larger devices */}
      <div className="lg:flex hidden gap-y-4 flex-col z-10 min-w-[222px] bg-richblack-800 min-h-[calc(100vh-3.5rem)] fixed py-10 border-r-richblack-700">
        <div className="flex mt-3 flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && link.type !== user.role) return null;
            return (
              <SideBarLink link={link} key={link.id} iconName={link.icon} />
            );
          })}
        </div>

        <div className="w-10/12 mx-auto h-[1px] bg-richblack-600 my-6"></div>

        <div className="flex relative flex-col">
          {/* setting and logout */}
          <div className="flex flex-col">
            <SideBarLink
              link={{ path: "/dashboard/settings", name: "settings" }}
              iconName={"VscSettingsGear"}
            />

            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are You Sure?",
                  text2: "You will be logged out of your account",
                  btn1text: "Logout",
                  btn2text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className={`relative text-sm px-8 font-medium py-2 text-richblack-400`}
            >
              <div className="flex items-center gap-x-2">
                <VscSignOut />
                <p>Logout</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* confirmation modal */}
      <div>
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </div>
    </>
  );
};

export default SideBar;
