import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import UnauthPage from "./pages/unauth";
import NotFound from "./pages/notFound";
import { useSelector } from "react-redux";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/auth/OpenRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/Dashboard/MyProfile";
import Settings from "./components/Dashboard/Settings";
import AllUsersList from "./components/admin/allUsersList";

function App() {
  const { user, token, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  // console.log(token, '-token');
  // console.log(user, "-user");

  return (
    // <div className="bg-[#000814] w-screen min-h-screen relative flex flex-col font-inter">
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={<CheckAuth token={token} user={user}></CheckAuth>}
    //     />

    //     <Route path="auth">
    //       <Route path="login" element={<LoginPage />} />
    //       <Route path="register" element={<RegisterPage />} />
    //     </Route>

    //     <Route
    //       element={
    //         <PrivateRoute>
    //           <Dashboard />
    //         </PrivateRoute>
    //       }
    //     >
    //       {/* profile route */}
    //       <Route path="dashboard/my-profile" element={<MyProfile />} />

    //       {/* setting */}
    //       <Route path="dashboard/settings" element={<Settings />} />

    //       {user?.accountType === ACCOUNT_TYPE.STUDENT && (
    //         <>
    //           {/* enrolled courses */}
    //           <Route
    //             path="dashboard/enrolled-courses"
    //             element={<EnrolledCourses />}
    //           />

    //           {/* enrolled courses */}
    //           <Route path="dashboard/cart" element={<Cart />} />
    //         </>
    //       )}

    //       {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
    //         <>
    //           {/* add course */}
    //           <Route path="dashboard/add-course" element={<AddCourse />} />

    //           {/* my course */}
    //           <Route path="dashboard/my-courses" element={<MyCourses />} />

    //           {/* {edit course} */}
    //           <Route
    //             path="dashboard/edit-course/:courseId"
    //             element={<EditCourse />}
    //           />

    //           {/* Dashboard */}
    //           <Route path="dashboard/instructor" element={<Instructor />} />
    //         </>
    //       )}
    //     </Route>

    //     <Route
    //       path="admin"
    //       element={
    //         <CheckAuth token={token} user={user}>
    //           <AdminLayout />
    //         </CheckAuth>
    //       }
    //     >
    //       <Route path="dashboard" element={<AdminDashboard />} />
    //       {/* <Route path="orders" element={<AdminOrders />} />
    //       <Route path="products" element={<Products />} />
    //       <Route path="features" element={<Features />} /> */}
    //     </Route>

    //     <Route
    //       path="user"
    //       element={
    //         <CheckAuth token={token} user={user}>
    //           <UserLayout />
    //         </CheckAuth>
    //       }
    //     >
    //       <Route path="dashboard" element={<UserDashboard />} />
    //       {/* <Route path="orders" element={<AdminOrders />} />
    //       <Route path="products" element={<Products />} />
    //       <Route path="features" element={<Features />} /> */}
    //     </Route>

    //     <Route path="*" element={<NotFound />} />
    //     <Route path="/unath-page" element={<UnauthPage />} />
    //   </Routes>
    // </div>
    <div className="bg-richblack-900 w-screen min-h-screen relative flex flex-col font-inter">
      <Navbar />

      <div>
        {/* <ScrollToTop /> */}
        <Routes>
          <Route
            path="/"
            element={
              <OpenRoute token={token} user={user}>
                <LoginPage />
              </OpenRoute>
            }
          />

          <Route
            path="/login"
            element={
              <OpenRoute>
                <LoginPage />
              </OpenRoute>
            }
          />

          <Route
            path="/register"
            element={
              <OpenRoute>
                <RegisterPage />
              </OpenRoute>
            }
          />

          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            {/* profile route */}
            <Route path="dashboard/my-profile" element={<MyProfile />} />

            {/* setting */}
            <Route path="dashboard/settings" element={<Settings />} />

            {/* {user?.role === "USER" && (
              <>
                <Route
                  path="dashboard/enrolled-courses"
                  element={<EnrolledCourses />}
                />

                <Route path="dashboard/cart" element={<Cart />} />
              </>
            )} */}

            {user?.role === "Admin" && (
              <>
                <Route path="dashboard/all-users" element={<AllUsersList />} />

                {/* <Route path="dashboard/my-courses" element={<MyCourses />} />

                <Route
                  path="dashboard/edit-course/:courseId"
                  element={<EditCourse />}
                />

                <Route path="dashboard/instructor" element={<Instructor />} /> */}
              </>
            )}
          </Route>

          <Route path="*" element={<NotFound />} />
          <Route path="/unath-page" element={<UnauthPage />} />
        </Routes>
      </div>

      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
