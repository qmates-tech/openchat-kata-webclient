import { createPostsAPI } from "./PostsAPI.ts";
import { useState } from "react";

export type PostState = {
  isCreatingNewPost: boolean;
  createNewPost: (text: string) => void;
}

export type NewPostError = undefined

const postsAPI = createPostsAPI();

export function usePostState(userId: string, API = postsAPI): PostState {
  const [isCreatingNewPost, setIsCreatingNewPost] = useState<boolean>(false);

  return {
    isCreatingNewPost,
    createNewPost: (text: string) => {
      setIsCreatingNewPost(true);
      API.createNewPost(userId, text)
        .catch(() => {})
        .finally(() => setIsCreatingNewPost(false));
    }
  };
}
