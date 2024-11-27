import { toast } from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { setAllUsers, setCurrentUser } from "../../slices/adminSlice";

const { GET_ALL_USERS, GET_USER_DETAILS } = settingsEndpoints;
export function getAllUsers(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "GET",
        GET_ALL_USERS,
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );
      // const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData);
    //   console.log("GET_ALL_USERS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setAllUsers(response.data.data))
    } catch (error) {
      console.log("GET_ALL_USERS API ERROR............", error);
    //   toast.error("Could Not Update Profile");
    }
    toast.dismiss(toastId);
  };
}

export function getUserDetails(token, userId) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...");
      try {
        const response = await apiConnector(
          "GET",
          `${GET_USER_DETAILS}/${userId}`,
          {},
          {
            Authorization: `Bearer ${token}`,
          }
        );
        // const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData);
        //   console.log("GET_USER_DETAILS API RESPONSE............", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        dispatch(setCurrentUser(response.data.data))
      } catch (error) {
        console.log("GET_ALL_USERS API ERROR............", error);
      //   toast.error("Could Not Update Profile");
      }
      toast.dismiss(toastId);
    };
}