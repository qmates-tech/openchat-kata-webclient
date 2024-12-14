import React from "react";
import { NavigateTo } from "../Navigation/NavigateTo";
import { useUserSession } from "../User/UserSessionState";

type OnlyPublicRouteProps = {
  children: React.ReactNode;
}
export function OnlyPublicRoute({ children }: OnlyPublicRouteProps) {
  const { currentUser, retrieving } = useUserSession();

  if (retrieving) {
    return <></>
  }

  if (currentUser) {
    return <NavigateTo to="wall" />
  }

  return children;
}
