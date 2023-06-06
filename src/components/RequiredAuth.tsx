import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { FaSpinner } from "react-icons/fa";
import React from "react";

export default function RequiredAuth({ children }: { children: ReactNode }) {
  const isAuthenticated = useUserStore(state => state.isAuthenticated);
  const getCurrentUser = useUserStore(state => state.getCurrentUser);
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  if (isAuthenticated == undefined) return <FaSpinner></FaSpinner>;
  else if (!isAuthenticated) return <Navigate to="/sign-in"></Navigate>;

  return <>{children}</>;
}
