import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import LoginForm from "../Users/Login/Login";
import Register from "../Users/Register/Register";
import Classes from "../Pages/Classes/Classes";
import Instructors from "../Pages/Instructors/Instructors";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import MySelectedClasses from "../Dashboard/StudentDashboard/Students/MySelectedClasses";
import Payment from "../Dashboard/StudentDashboard/Students/Payment";
import PaymentHistory from "../Dashboard/StudentDashboard/Students/PaymentHistory";
import EnrolledClasses from "../Dashboard/StudentDashboard/EnrolledClasses/EnrolledClasses";
import AdminRouters from "./AdminRouters";
import DashboardManageUsers from "../Dashboard/AdminDashboard/ManageUsers/DashboardManageUsers";
import Error from "../Pages/Error/Error";
import Feedback from "../Dashboard/AdminDashboard/Feedback/Feedback";
import TotalEnrolledStudents from "../Dashboard/TeacherDashboard/TotalEnrolledStudents/TotalEnrolledStudents";
import MyAddedClasses from "../Dashboard/TeacherDashboard/MyClasses/MyAddedClasses";
import AddClass from "../Dashboard/TeacherDashboard/AddClass/AddClass";
import ManageClasses from "../Dashboard/AdminDashboard/ManageClasses/ManageClasses";
import EditProfileForm from "../Dashboard/TeacherDashboard/EditProfile/EditProfileForm";
import Details from "../Users/Details/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <LoginForm></LoginForm>,
      },
      {
        path: "/registration",
        element: <Register></Register>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
      },
      {
        path: "/details/:id",
        element: (
          // <PrivateRoute>
          <Details></Details>
          // </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://skillz-zone-server.vercel.app/users/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/my-selected-classes",
        element: <MySelectedClasses></MySelectedClasses>,
      },
      {
        path: "/dashboard/pay",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "/dashboard/enrolled-classes",
        element: <EnrolledClasses></EnrolledClasses>,
      },
      // admin
      {
        path: "/dashboard/manage-users",
        element: <DashboardManageUsers></DashboardManageUsers>,
      },
      {
        path: "/dashboard/manage-classes",
        element: <ManageClasses></ManageClasses>,
      },
      // Instructors
      {
        path: "/dashboard/add-class",
        element: <AddClass></AddClass>,
      },
      {
        path: "/dashboard/my-classes",
        element: <MyAddedClasses></MyAddedClasses>,
      },
      {
        path: "/dashboard/total-enrolled-students",
        element: <TotalEnrolledStudents></TotalEnrolledStudents>,
      },
      {
        path: "/dashboard/feedback",
        element: <Feedback></Feedback>,
      },
      {
        path: "/dashboard/editprofile",
        element: <EditProfileForm></EditProfileForm>,
      },
    ],
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);
export default router;
