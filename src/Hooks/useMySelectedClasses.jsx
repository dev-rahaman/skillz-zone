import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";

const useMySelectedClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: mySelectedClasses = [] } = useQuery({
    queryKey: ["mySelectedClasses", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/mySelectedClasses/${user?.email}`);
      // console.log("res from axios", res);
      return res.data;
    },
  });
  return [mySelectedClasses, refetch];
};

export default useMySelectedClasses;
