import { useUserSession } from '../User/UserSessionState';
import './WallPage.css';
import React from "react";
import { SideGrid } from "./SideGrid.tsx";
import { Wall } from "./Wall.tsx";

export function WallPage() {
  const { currentUser } = useUserSession();
  const about = currentUser?.about
    .split('\n')
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);

  return (
    <article className="wall">
      <header>
        <h3>{currentUser?.username}'s wall</h3>
      </header>
      <SideGrid sideBar={about}><></></SideGrid>
    </article>
  );
}
