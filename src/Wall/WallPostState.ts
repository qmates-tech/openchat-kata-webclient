import { useEffect, useState } from "react";
import { usePostsListState } from "../Post/PostsListState.tsx";
import { createWallPostsAPI, WallPostsAPI } from "./WallPostsAPI.ts";
import { Post } from "../Post/Post.ts";
import { applyAllUserNames, PostWithName } from "../Post/PostWithName.tsx";

const wallPostsAPI = createWallPostsAPI();

export type WallPostsState = {
  isLoading: boolean;
  wall: PostWithName[];
  update(): void;
}

export function useWallPostsState(userId: string, API: WallPostsAPI = wallPostsAPI): WallPostsState {
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
    API.retrieveWall(userId)
      .then((post: Post[]) => {
        return replace(applyAllUserNames(post, userId));
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }
}
