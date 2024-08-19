import { NavigateTo } from "../Navigation/NavigateTo";
import { useUserSession } from "../User/UserSessionState";
import React from "react";

type PrivateRouteProps = {
  children: React.ReactNode;
}
export function PrivateRoute({ children }: PrivateRouteProps) {
  const { currentUser, retrieving } = useUserSession();

  if (retrieving) {
    return <></>
  }

  if (!currentUser) {
    return <NavigateTo to="login" />
  }

  return children;
}
