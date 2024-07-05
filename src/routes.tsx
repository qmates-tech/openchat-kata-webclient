import { RouteProps } from "react-router-dom";
import { PageNotFound } from "./App/PageNotFound";
import { PrivateRoute } from "./App/PrivateRoute";
import { Login } from "./Login/Login";
import { Wall } from "./Wall/Wall";

export type RouteName = 'login' | 'wall' | 'pageNotFound';

export const routes: Record<RouteName, RouteProps> = {
  login: { path: '/login', element: <Login /> },
  wall: { path: '/', element: <PrivateRoute><Wall /></PrivateRoute> },
  pageNotFound: { path: '*', element: <PageNotFound /> }
}

export function pathOf(routeName: RouteName): string {
  return routes[routeName].path!;
}
