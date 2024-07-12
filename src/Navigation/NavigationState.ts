import { useLocation } from "react-router-dom";
import { pathOf } from "../AppRoutes";

export type NavigationState = {
  currentPath: string;
  previousPath?: string;
};
export function useNavigationState(): NavigationState {
  const location = useLocation();

  const from = location?.state?.from?.pathname;
  const currentPath = location.pathname!;

  return {
    currentPath,
    previousPath: from
  }
}
