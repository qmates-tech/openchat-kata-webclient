import { useEffect, useState } from "react";
import { Post } from "../Post/Post.ts";
import { usePostsListState } from "../Post/PostsList/PostsListState.tsx";
import { applyAllUserNames, PostWithName } from "../Post/PostWithName.ts";
import { createWallPostsAPI, WallPostsAPI } from "./WallPostsAPI.ts";

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
      .then((posts: Post[]) => {
        return replace(applyAllUserNames(posts, userId));
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }
}
