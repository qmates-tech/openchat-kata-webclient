import { useEffect, useState } from "react";
import { usePostsListState, UserPost } from "../Post/PostsListState.tsx";
import { createWallPostsAPI, WallPostsAPI } from "./WallPostsAPI.ts";
import { Post } from "../Post/Post.ts";
import { UUID } from "../helpers/uuid";

const wallPostsAPI = createWallPostsAPI();

export type WallPostsState = {
  isLoading: boolean;
  wall: UserPost[];
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
        return replace(applyUserName(post, userId));
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }
}

function applyUserName(posts: Post[], currentUserId: UUID): UserPost[] {
  return posts.map(post => ({
    ...post,
    username: post.userId === currentUserId ? "You" : post.userId
  }));
}