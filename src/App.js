import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignUpLoginTemplate from "./pages/SignUpLoginTemplate";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/dashboard/MyProfile";
import Settings from "./components/core/dashboard/Settings";
import EnrolledCourses from "./components/core/dashboard/EnrolledCourses";
import Cart from "./components/core/dashboard/Cart";
import StudentRoute from "./components/core/Auth/StudentRoute";
import Error from "./pages/Error";
import InstructorRoute from "./components/core/Auth/InstructorRoute";
import MyCourses from "./components/core/dashboard/MyCourses";
import AddCourse from "./components/core/dashboard/AddCourse";
import EditCourse from "./components/core/dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import Course from "./pages/Course";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/dashboard/InstructorDashboard/Instructor";
import ExploreCatalog from "./pages/ExploreCatalog";





function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter relative">
      <Navbar />
      <Routes>
        <Route path='/'
          element={<Home />} />

        <Route path='/signup'
          element={<OpenRoute>
            <SignUpLoginTemplate formType={'signUp'} />
          </OpenRoute>} />

        <Route path='/login'
          element={<OpenRoute>
            <SignUpLoginTemplate formType={'login'} />
          </OpenRoute>} />

        <Route path='/forgot-password'
          element={<OpenRoute>
            <ForgotPassword />
          </OpenRoute>} />

        <Route path='/update-password/:token'
          element={<OpenRoute>
            <UpdatePassword />
          </OpenRoute>} />

        <Route path='/verify-email'
          element={<OpenRoute>
            <VerifyEmail />
          </OpenRoute>} />

        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/catalog/:catalogName' element={<Catalog />} />
        <Route path='/catalog' element={<ExploreCatalog />} />
        <Route path='/courses/:courseId' element={<Course />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>

          }
        >
          <Route path='/dashboard/my-profile' element={<MyProfile />} />
          <Route path='/dashboard/settings' element={<Settings />} />
          <Route path='/dashboard/enrolled-courses' element={
            <StudentRoute>
              <EnrolledCourses />
            </StudentRoute>} />

          <Route path='/dashboard/cart' element={
            <StudentRoute>
              <Cart />
            </StudentRoute>} />
          <Route path='/dashboard/my-courses' element={
            <InstructorRoute>
              <MyCourses />
            </InstructorRoute>
          } />
          <Route path='/dashboard/add-course' element={
            <InstructorRoute>
              <AddCourse />
            </InstructorRoute>
          } />
          <Route path='/dashboard/edit-course/:courseId' element={
            <InstructorRoute>
              <EditCourse />
            </InstructorRoute>
          } />
          <Route path='/dashboard/instructor' element={
            <InstructorRoute>
              <Instructor />
            </InstructorRoute>
          } />
        </Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }>

          <Route path='/view-course/:courseId/section/:sectionId/sub-section/:subSectionId'
            element={
              <StudentRoute>
                <VideoDetails />
              </StudentRoute>
            }
          />

        </Route>


        <Route path='*' element={<Error />} />


      </Routes>
    </div>
  );
}

export default App;
