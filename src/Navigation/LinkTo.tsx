import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { pathOf, RouteName } from "../AppRoutes";

export type LinkToProps = { to: RouteName, pathParams?: Record<string, string>, children?: ReactElement | string }
export function LinkTo({ to, pathParams, children, ...props }: LinkToProps & Record<string, any>) {
  return <Link to={pathOf(to, pathParams)} {...props}>{children}</Link>
}
