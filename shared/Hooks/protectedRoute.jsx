import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.replace("/auth/login");
    }
  }, [router, user]);

  return <>{user ? children : <h1>Loading...</h1>}</>;
};
