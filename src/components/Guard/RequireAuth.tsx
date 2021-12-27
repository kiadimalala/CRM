import { ROUTES } from "@app/constants";
import { useAppContext } from "@app/store";
import { getFromLS } from "@app/utils";
import React from "react";
import { Navigate, useLocation } from "react-router";

interface Props {
  className?: string;
  children: JSX.Element;
}

const RequireAuth: React.FC<Props> = ({ children }) => {
  const {
    AuthHook: { user },
  } = useAppContext();
  const location = useLocation();
  const token = getFromLS("token");
  if (!token && !user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
