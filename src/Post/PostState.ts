import { createPostsAPI } from "./PostsAPI.ts";
import { useEffect, useState } from "react";
import { Post } from "./Post.ts";

export type CreatePostState = {
  isCreatingNewPost: boolean;
  createNewPost(text: string): void;
}

export type WallPostsState = {
  isLoadingWall: boolean;
  wall: Post[];
  updateWall(): void;
}

export type PostState = CreatePostState & WallPostsState;

export type NewPostError = undefined

const postsAPI = createPostsAPI();

export function usePostState(userId: string, API = postsAPI): PostState {
  const [isCreatingNewPost, setIsCreatingNewPost] = useState<boolean>(false);
  const [wall, setWall] = useState<Post[]>([]);
  const [isLoadingWall, setIsLoadingWall] = useState<boolean>(false);

  useEffect(updateWall, []);

  return {
    isLoadingWall,
    wall,
    updateWall,
    isCreatingNewPost,
    createNewPost
  };

  function updateWall() {
    setIsLoadingWall(true);
    API.retrieveWall(userId).then(setWall).finally(() => setIsLoadingWall(false));
  }

  function createNewPost(text: string) {
    setIsCreatingNewPost(true);
    API.createNewPost(userId, text)
      .then(() => updateWall())
      .catch(() => { })
      .finally(() => setIsCreatingNewPost(false));
  }
}
