import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import noAuthRequired from "../Data/noAuthRequired.json";

export const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user != undefined && noAuthRequired.includes(router.pathname)) {
      router.push("/dashboard");
    }
    console.log("path", noAuthRequired.includes(router.pathname));
  }, [router, user]);

  return <>{children}</>;
};
