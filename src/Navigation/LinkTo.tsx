import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { pathOf, RouteName } from "../AppRoutes";

export type LinkToProps = {
  to: RouteName,
  pathParams?: Record<string, string>,
  children?: ReactNode | undefined,
  newWindow?: boolean
}
export function LinkTo({ to, pathParams, children, newWindow, ...props }: LinkToProps & Record<string, any>) {
  if (newWindow) {
    return <Link to={pathOf(to, pathParams)} target="_blank" rel="noopener noreferrer">{children}</Link>
  }
  return <Link to={pathOf(to, pathParams)} {...props}>{children}</Link>
}
