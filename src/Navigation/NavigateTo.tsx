import { Navigate } from "react-router-dom";
import { pathOf } from "../AppRoutes";
import { NavigateFunctionParams, useNavigationState } from "./NavigationState";

export function NavigateTo({ to, pathParams }: NavigateFunctionParams) {
  const { currentPath } = useNavigationState();

  return <Navigate
    to={pathOf(to, pathParams)}
    state={{ from: currentPath }}
    replace
  />
}
