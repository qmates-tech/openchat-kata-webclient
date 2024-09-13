import { createPostsAPI, PostsAPI } from "../Post/PostsAPI.ts";
import { useEffect, useState } from "react";
import { Post } from "../Post/Post.ts";
import { usePostsListState } from "../Post/PostsListState.tsx";

const postsAPI = createPostsAPI();

export type WallPostsState = {
  isLoading: boolean;
  wall: Post[];
  update(): void;
}

export function useWallPostsState(userId: string, API: PostsAPI = postsAPI): WallPostsState {
  const { posts, replace } = usePostsListState();

  useEffect(update, []);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading,
    wall: posts,
    update
  };

  function update() {
    setIsLoading(true);
    API.retrieveWall(userId).then(replace).finally(() => setIsLoading(false));
  }
}
