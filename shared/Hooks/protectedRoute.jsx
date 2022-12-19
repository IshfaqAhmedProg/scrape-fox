import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import noAuthRequired from "../Data/noAuthRequired.json";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.push("/auth/login");
    }
    console.log("path", noAuthRequired.includes(router.pathname));
  }, [router, user]);

  return <>{user ? children : <h1>Loading...</h1>}</>;
};
