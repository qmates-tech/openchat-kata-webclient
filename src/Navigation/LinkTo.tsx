import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { pathOf, RouteName } from "../AppRoutes";

export type LinkToProps = { to: RouteName, className?: string, children?: ReactElement | string }
export function LinkTo({ to, className, children }: LinkToProps) {
  return <Link className={className} to={pathOf(to)}>{children}</Link>
}
