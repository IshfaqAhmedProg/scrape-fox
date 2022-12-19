import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
const noAuthRequired = [
  "/auth/login",
  "/auth/signup",
  "/auth/resetPass",
  "/verifyfox",
];

export const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user != undefined && noAuthRequired.includes(router.pathname)) {
      router.replace("/dashboard");
    }
  }, [router, user]);

  return <>{children}</>;
};
