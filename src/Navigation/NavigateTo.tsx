import { Navigate } from "react-router-dom";
import { pathOf, RouteName } from "../AppRoutes";
import { useNavigationState } from "./NavigationState";

export function NavigateTo({ to }: { to: RouteName }) {
  const { currentPath } = useNavigationState();

  return <Navigate
    to={pathOf(to)}
    state={{ from: currentPath }}
    replace
  />
}
