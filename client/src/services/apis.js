const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
  SIGNUP_API: BASE_URL + "/auth/register",
  LOGIN_API: BASE_URL + "/auth/login",
};

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/profile/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
  GET_ALL_USERS: BASE_URL + "/profile/getAllUsers",
  GET_USER_DETAILS: BASE_URL + "/profile/getUserDetails",
}

// export const adminEndpoints = {
//   GET_ALL_USERS: BASE_URL + "/admin/getAllUsers",
// }