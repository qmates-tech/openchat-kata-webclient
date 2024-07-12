import { RouteProps } from "react-router-dom";
import { PageNotFound } from "./App/PageNotFound";
import { PrivateRoute } from "./App/PrivateRoute";
import { LoginPage } from "./Login/LoginPage";
import { WallPage } from "./Wall/WallPage";

export type RouteName = 'login' | 'wall' | 'pageNotFound';

export const routes: Record<RouteName, RouteProps> = {
  login: { path: '/login', element: <LoginPage /> },
  wall: { path: '/', element: <PrivateRoute><WallPage /></PrivateRoute> },
  pageNotFound: { path: '*', element: <PageNotFound /> }
}

export function pathOf(routeName: RouteName): string {
  return routes[routeName].path!;
}
