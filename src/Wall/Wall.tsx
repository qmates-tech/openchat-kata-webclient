import { NewPostForm } from "../Post/NewPostForm.tsx";
import { User } from "../User/User.ts";
import React from "react";
import { SideGrid } from "./SideGrid.tsx";
import { textAsParagraphs } from "../helpers/textAsParagraphs.tsx";
import { useNewPostState } from "../Post/NewPostState.ts";
import { useWallPostsState } from "./WallPostState.ts";
import { PostsList } from "../Post/PostsList.tsx";

interface WallProps {
  user: User
}

export function Wall({ user }: WallProps) {
  const createPostState = useNewPostState(user.id);
  const wallPostsState = useWallPostsState(user.id);

  return <article className="wall">
    <header>
      <h3>{user.username}'s wall</h3>
    </header>
    <SideGrid sideBar={textAsParagraphs(user.about)}>
      <NewPostForm {...createPostState} />
      <PostsList posts={wallPostsState.wall} isLoading={wallPostsState.isLoading} />
    </SideGrid>
  </article>;
}

