import { useUserSession } from '../User/UserSessionState';
import './WallPage.css';
import React from "react";
import { Wall } from "./Wall.tsx";

export function WallPage() {
  const { currentUser } = useUserSession();

  return <Wall user={currentUser!}></Wall>;
}
