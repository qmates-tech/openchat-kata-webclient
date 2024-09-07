import { NewPostForm } from "../Post/NewPostForm.tsx";
import { User } from "../User/User.ts";
import React from "react";
import { SideGrid } from "./SideGrid.tsx";
import { textAsParagraphs } from "../helpers/textAsParagraphs.tsx";
import { usePostState } from "../Post/PostState.ts";
import { PostsList } from "../Post/PostsList.tsx";

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
      <NewPostForm createNewPost={postState.createNewPost}
                   isCreatingNewPost={postState.isCreatingNewPost}
                   createNewPostError={postState.createNewPostError}
      />
      <PostsList posts={postState.wall} isLoading={postState.isLoadingWall} />
    </SideGrid>
  </article>;
}

