import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ token, user, children }) {
  const location = useLocation();

  if(location.pathname==='/') {
    if(!token) {
      return <Navigate to="/auth/login" />;
    }else{
      if (user.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/user/dashboard" />;
      }
    }
  }

  // if user is not login and try to access other pages
  if (
    !token &&
    !(
      location.pathname.includes("login") ||
      location.pathname.includes("register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // if user or admin is logged in and trying to go to login or register page
  if (
    token &&
    (location.pathname.includes("login") ||
      location.pathname.includes("register"))
  ) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/user/dashboard" />;
    }
  }

  // is normal user try to go to the admin page
  if (
    token &&
    location.pathname.includes("admin") &&
    user.role !== "admin"
  ) {
    return <Navigate to="/unath-page" />;
  }

  // if admin try to go to shopping page
  if (
    token &&
    location.pathname.includes("user") &&
    user.role === "admin"
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
