import { Route, RouteProps, Routes } from "react-router-dom";
import { OnlyPublicRoute } from "./App/OnlyPublicRoute.tsx";
import { PrivateRoute } from "./App/PrivateRoute";
import { LoginPage } from "./Login/LoginPage";
import { PageNotFound } from "./NotFound/PageNotFound";
import { PostsListStateProvider } from "./Post/PostsList/PostsListState.tsx";
import { RegistrationPage } from "./Registration/RegistrationPage";
import { UserTimelinePage } from "./Timeline/UserTimelinePage.tsx";
import { YourTimelinePage } from "./Timeline/YourTimelinePage.tsx";
import { WallPage } from "./Wall/WallPage";

export type RouteName = 'login' | 'registration' | 'wall' | 'timeline' | 'userTimeline';

const routes: Record<RouteName, RouteProps> = {
  login: { path: '/login', element: <OnlyPublicRoute><LoginPage /></OnlyPublicRoute> },
  wall: { path: '/', element: <PrivateRoute><PostsListStateProvider><WallPage /></PostsListStateProvider></PrivateRoute> },
  registration: { path: '/register', element: <OnlyPublicRoute><RegistrationPage /></OnlyPublicRoute> },
  timeline: { path: '/timeline', element: <PrivateRoute><PostsListStateProvider><YourTimelinePage /></PostsListStateProvider></PrivateRoute> },
  userTimeline: { path: '/users/:userId/timeline', element: <PrivateRoute><PostsListStateProvider><UserTimelinePage /></PostsListStateProvider></PrivateRoute> }
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
