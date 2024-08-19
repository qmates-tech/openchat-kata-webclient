import { Route, RouteProps, Routes } from "react-router-dom";
import { PrivateRoute } from "./App/PrivateRoute";
import { LoginPage } from "./Login/LoginPage";
import { PageNotFound } from "./NotFound/PageNotFound";
import { RegistrationPage } from "./Registration/RegistrationPage";
import { WallPage } from "./Wall/WallPage";
import { OnlyPublicRoute } from "./App/OnlyPublicRoute.tsx";

export type RouteName = 'login' | 'registration' | 'wall';

const routes: Record<RouteName, RouteProps> = {
  login: { path: '/login', element: <OnlyPublicRoute><LoginPage /></OnlyPublicRoute> },
  wall: { path: '/', element: <PrivateRoute><WallPage /></PrivateRoute> },
  registration: { path: '/register', element: <OnlyPublicRoute><RegistrationPage /></OnlyPublicRoute> },
}

export function AppRoutes() {
  return <Routes>
    {Object.entries(routes).map(([key, props]) => (
      <Route key={key} {...props} />
    ))}
    <Route path="*" element={<PageNotFound />} />
  </Routes>
}

export function pathOf(routeName: RouteName): string {
  return routes[routeName].path!;
}
