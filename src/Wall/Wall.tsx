import { NewPostForm } from "../Post/NewPostForm.tsx";
import { User } from "../User/User.ts";
import React from "react";
import { SideGrid } from "./SideGrid.tsx";
import { textAsParagraphs } from "../helpers/textAsParagraphs.tsx";
import { usePostState } from "../Post/PostState.ts";

interface WallProps {
  user: User
}

export function Wall({ user }: WallProps) {
  const postState = usePostState(user.id);

  return <article className="wall">
    <header>
      <h3>{user.username}'s wall</h3>
    </header>
    <SideGrid sideBar={textAsParagraphs(user.about)}>
      <NewPostForm createPost={postState.createNewPost} />
    </SideGrid>
  </article>;
}

