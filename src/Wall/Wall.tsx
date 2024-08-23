import "./NewPostForm.css";
import { NewPostForm } from "./NewPostForm.tsx";
import { User } from "../User/User.ts";
import React from "react";
import { SideGrid } from "./SideGrid.tsx";
import { textAsParagraphs } from "../helpers/textAsParagraphs.tsx";

interface WallProps {
  user: User
}

export function Wall({ user }: WallProps) {
  return <article className="wall">
    <header>
      <h3>{user.username}'s wall</h3>
    </header>
    <SideGrid sideBar={textAsParagraphs(user.about)}>
      <NewPostForm />
    </SideGrid>
  </article>;
}

