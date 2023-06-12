import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Users/Login/Login";
import Register from "../Users/Register/Register";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import Classes from "../Pages/Classes/Classes";
import AddClassForm from "../DashboardPages/AddClass/AddClass";
import Instructors from "../Pages/Instructors/Instructors";
import Dashboard from "../Layout/Dashboard";
import MySelectedClasses from "../DashboardPages/Students/MySelectedClasses";
import PaymentHistory from "../DashboardPages/Students/PaymentHistory";
import Payment from "../DashboardPages/Students/Payment";
import DashboardManageUsers from "../DashboardPages/DashboardManageUsers/DashboardManageUsers";
import ManageClasses from "../DashboardPages/ManageClasses/ManageClasses";
import EnrolledClasses from "../DashboardPages/EnrolledClasses/EnrolledClasses";
import MyAddedClasses from "../DashboardPages/MyClasses/MyAddedClasses";
import Feedback from "../DashboardPages/Feedback/Feedback";
import PrivateRoute from "./PrivateRoute";
import TotalEnrolledStudents from "../DashboardPages/TotalEnrolledStudents/TotalEnrolledStudents";

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
        element: <Login></Login>,
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
        element: <AddClassForm></AddClassForm>,
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
    ],
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);
export default router;
