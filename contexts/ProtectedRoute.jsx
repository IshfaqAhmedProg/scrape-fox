import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user == null) {
      router.push("/auth/login");
    }
  }, [router, user]);

  return <>{user ? children : null}</>;
};
