import { createNewPostAPI } from "./NewPostAPI.ts";
import { useState } from "react";

export type PostState = {
  isCreatingNewPost: boolean;
  createNewPost: (text: string) => void;
}

export type NewPostError = undefined

const newPostAPI = createNewPostAPI();

export function usePostState(userId: string, API = newPostAPI): PostState {
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
