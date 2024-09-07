import { createPostsAPI, NewPostAPIException } from "./PostsAPI.ts";
import { useEffect, useState } from "react";
import { Post } from "./Post.ts";

export type CreatePostState = {
  isCreatingNewPost: boolean;
  createNewPostError: CreateNewPostError | undefined;
  createNewPost(text: string): void;
}

export type WallPostsState = {
  isLoadingWall: boolean;
  wall: Post[];
  updateWall(): void;
}

export type PostState = CreatePostState & WallPostsState;

export type CreateNewPostError = 'User not found' | 'Inappropriate language detected' | 'Network error' | 'Generic error'

const postsAPI = createPostsAPI();

export function usePostState(userId: string, API = postsAPI): PostState {
  const [isCreatingNewPost, setIsCreatingNewPost] = useState<boolean>(false);
  const [wall, setWall] = useState<Post[]>([]);
  const [isLoadingWall, setIsLoadingWall] = useState<boolean>(false);
  const [createNewPostError, setCreateNewPostError] = useState<CreateNewPostError | undefined>();

  useEffect(updateWall, []);

  return {
    isLoadingWall,
    wall,
    updateWall,
    isCreatingNewPost,
    createNewPostError,
    createNewPost
  };

  function updateWall() {
    setIsLoadingWall(true);
    API.retrieveWall(userId).then(setWall).finally(() => setIsLoadingWall(false));
  }

  function createNewPost(text: string) {
    setIsCreatingNewPost(true);
    setCreateNewPostError(undefined);
    API.createNewPost(userId, text)
      .then(() => updateWall())
      .catch((e) => setCreateNewPostError(parseCreateNewPostError(e)))
      .finally(() => setIsCreatingNewPost(false));
  }
}

function parseCreateNewPostError(error: NewPostAPIException): CreateNewPostError {
  switch (error) {
    case "USER_NOT_FOUND":
      return "User not found";
    case "INAPPROPRIATE_LANGUAGE":
      return "Inappropriate language detected";
    case "NETWORK_ERROR":
      return "Network error";
    default:
      return "Generic error";
  }
}
