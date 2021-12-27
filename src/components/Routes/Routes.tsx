import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { LoggedOut } from "@app/components";

import { ROUTES } from "@app/constants";
import { RequireAuth } from "@app/components";

const Home = lazy(() =>
  import("@app/pages").then((module) => {
    return { default: module.Home };
  })
);
const Dashboard = lazy(() =>
  import("@app/pages").then((module) => {
    return { default: module.Dashboard };
  })
);
const Login = lazy(() =>
  import("@app/pages").then((module) => {
    return { default: module.Login };
  })
);

const Clients = lazy(() =>
  import("@app/pages").then((module) => {
    return { default: module.Clients };
  })
);

const Products = lazy(() =>
  import("@app/pages").then((module) => {
    return { default: module.Products };
  })
);

const Settings = lazy(() =>
  import("@app/pages").then((module) => {
    return { default: module.Settings };
  })
);

const MainRoute: React.FC = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={<Navigate replace to={ROUTES.DASHBOARD} />}
      />
      <Route
        path={ROUTES.HOME}
        element={
          <Suspense fallback={<>loading...</>}>
            <RequireAuth>
              <Home />
            </RequireAuth>
          </Suspense>
        }
      >
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.CLIENTS} element={<Clients />} />
        <Route path={ROUTES.PRODUCTS} element={<Products />} />
        <Route path={ROUTES.SETTINGS} element={<Settings />} />
      </Route>
      <Route
        path={ROUTES.LOGIN}
        element={
          <Suspense fallback={<>loading...</>}>
            <LoggedOut>
              <Login />
            </LoggedOut>
          </Suspense>
        }
      />
    </Routes>
  );
};

export default MainRoute;
