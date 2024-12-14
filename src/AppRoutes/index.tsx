import { Route, RouteProps, Routes } from "react-router-dom";
import { PageNotFound } from "../NotFound/PageNotFound.tsx";
import { LoginRoute } from "./routes/LoginRoute.tsx";
import { RegistrationRoute } from "./routes/RegistrationRoute.tsx";
import { UserTimelineRoute } from "./routes/UserTimelineRoute.tsx";
import { WallRoute } from "./routes/WallRoute.tsx";
import { YourTimelineRoute } from "./routes/YourTimelineRoute.tsx";

export type RouteName = 'login' | 'registration' | 'wall' | 'timeline' | 'userTimeline';

const routes: Record<RouteName, RouteProps> = {
  login: { path: '/login', element: <LoginRoute /> },
  wall: { path: '/', element: <WallRoute /> },
  registration: { path: '/register', element: <RegistrationRoute /> },
  timeline: { path: '/timeline', element: <YourTimelineRoute /> },
  userTimeline: { path: '/users/:userId/timeline', element: <UserTimelineRoute /> },
}

export function AppRoutes() {
  return <Routes>
    {Object.entries(routes).map(([key, props]) => (
      <Route key={key} {...props} />
    ))}
    <Route path="*" element={<PageNotFound />} />
  </Routes>
}

export function pathOf(routeName: RouteName, pathParams?: Record<string, string>): string {
  const path = routes[routeName].path!;
  if (!pathParams) return path;

  return path.replace(/:(\w+)/g, (_, key) => pathParams[key]);
}
