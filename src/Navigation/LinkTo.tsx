import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { pathOf } from "../AppRoutes";
import { NavigateFunctionParams } from "./NavigationState";

export type LinkToProps = NavigateFunctionParams & {
  children?: ReactNode | undefined,
  newWindow?: boolean
}
export function LinkTo({ to, pathParams, children, ...props }: LinkToProps & Record<string, any>) {
  return <Link to={pathOf(to, pathParams)} {...props}>{children}</Link>
}
