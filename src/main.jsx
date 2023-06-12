import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./Provider/AuthProvider";
import router from "./Routers/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
// const [data, setData] = useState();

// axios.defaults.baseURL = `http://localhost:5173/users `;
// axios.interceptors.request.use((request) => {
//   request.headers.Authorization = "bearer rsrahaman";
//   console.log("from mina jsx", request);
//   return request;
// });

// useEffect(() => {
//   const url = "/users";
//   axios
//     .get(url)
//     .then((res) => {
//       setData(res.data);
//       console.log("from main jsx", res.data);
//     })
//     .then((err) => {
//       console.log(err);
//     });
// }, []);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
