import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { setLoading, setToken, setUser } from "../../slices/authSlice";

const { LOGIN_API, SIGNUP_API } = endpoints;

export function signup(firstName, lastName, email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
      });

      // console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error(`${error.response.data.message}`);
      navigate("/register");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Login Successful");
      // console.log(response, '-response');
      // console.log(response.data.data, '-data');
      // console.log(response.data.token, '-token');

      dispatch(setToken(response.data.token));

      const userImage = response.data?.data?.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      dispatch(setUser({ ...response.data.data, image: userImage }));

      // console.log(response.data, '-image')
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.data));

      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(`${error.response.data.message}`);
      navigate("/login");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return async (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/login");
  };
}
