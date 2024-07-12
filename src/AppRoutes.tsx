import { Route, RouteProps, Routes } from "react-router-dom";
import { PageNotFound } from "./App/PageNotFound";
import { PrivateRoute } from "./App/PrivateRoute";
import { LoginPage } from "./Login/LoginPage";
import { WallPage } from "./Wall/WallPage";

export type RouteName = 'login' | 'wall' | 'pageNotFound';

const routes: Record<RouteName, RouteProps> = {
  login: { path: '/login', element: <LoginPage /> },
  wall: { path: '/', element: <PrivateRoute><WallPage /></PrivateRoute> },
  pageNotFound: { path: '*', element: <PageNotFound /> }
}

export function AppRoutes() {
  return <Routes>
    {Object.entries(routes).map(([key, props]) => (
      <Route key={key} {...props} />
    ))}
  </Routes>
}

export function pathOf(routeName: RouteName): string {
  return routes[routeName].path!;
}
