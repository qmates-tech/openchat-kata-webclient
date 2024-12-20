import { useLocation, useNavigate } from "react-router-dom";
import { pathOf, RouteName } from "../AppRoutes";

export type NavigateFunctionParams = { to: RouteName, pathParams?: Record<string, string>};

export type NavigationState = {
  currentPath: string;
  previousPath?: string;
  navigateTo: (params: NavigateFunctionParams) => void;
};
export function useNavigationState(): NavigationState {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname!;
  const from = location?.state?.from?.pathname;

  return {
    currentPath,
    previousPath: from,
    navigateTo: ({ to, pathParams }) => {
      navigate(pathOf(to, pathParams), { state: { from: currentPath } });
    }
  };
}
