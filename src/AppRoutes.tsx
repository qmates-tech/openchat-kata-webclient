import { Route, RouteProps, Routes } from "react-router-dom"
import { Login } from "./Login/Login"
import { PageNotFound } from "./PageNotFound"
import { PrivateRoute } from "./PrivateRoute"
import { Wall } from "./Wall/Wall"

export type RouteName = 'login' | 'wall' | 'pageNotFound'

const routes: Record<RouteName, RouteProps> = {
  login: { path: '/login', element: <Login /> },
  wall: { path: '/', element: <PrivateRoute><Wall /></PrivateRoute> },
  pageNotFound: { path: '*', element: <PageNotFound /> }
}

export function pathOf(route: RouteName): string {
  return routes[route].path!
}

export function AppRoutes() {
  return <Routes>
    {Object.entries(routes).map(([key, props]) => (
      <Route key={key} {...props} />
    ))}
  </Routes>
}