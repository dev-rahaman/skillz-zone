import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

// const useAdmin = () => {
// const { user, loading } = useContext(AuthContext);
// const [axiosSecure] = useAxiosSecure();
// const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
//   queryKey: ["isAdmin", user?.email],
//   enabled: !loading,
//   queryFn: async () => {
//     const res = await axiosSecure.get(`/dashboard/manage-classes`);
//     return res.data.admin;
//   },
// });
// return [isAdmin, isAdminLoading];
const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      if (!user) {
        return false;
      }
      const res = await axiosSecure.get(
        `/dashboard/manage-users/${user?.email}`
      );
      return res.data.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};
// };
export default useAdmin;

// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// export const useAdmin = () => {
//   const { user, loading } = useAuth();
//   const [axiosSecure] = useAxiosSecure();
//   // use axios secure with react query
//   const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
//     queryKey: ["isAdmin", user?.email],
//     enabled: !loading,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/admin/${user?.email}`);
//       return res.data.admin;
//     },
//   });
//   return [isAdmin, isAdminLoading];
// };

// export const useInstractor = () => {
//   const { user, loading } = useAuth();
//   const [axiosSecure] = useAxiosSecure();
//   // use axios secure with react query
//   const { data: isInstractor, isLoading: isInsLoading } = useQuery({
//     queryKey: ["isInstractor", user?.email],
//     enabled: !loading,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/instractor/${user?.email}`);
//       return res.data.instractor;
//     },
//   });
//   return [isInstractor, isInsLoading];
// };
