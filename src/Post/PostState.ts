import { createNewPostAPI } from "./NewPostAPI.ts";
import { useState } from "react";

export type PostState = {
  isCreatingNewPost: boolean;
  createNewPost: (text: string) => Promise<NewPostError>;
}

export type NewPostError = undefined

const newPostAPI = createNewPostAPI();

export function usePostState(userId: string, API = newPostAPI): PostState {
  const [isCreatingNewPost, setIsCreatingNewPost] = useState<boolean>(false);

  return {
    isCreatingNewPost,
    createNewPost: async (text: string) => {
      setIsCreatingNewPost(true);
      await API.createNewPost(userId, text)
        .catch(e => {})
        .finally(() => setIsCreatingNewPost(false));
      return undefined;
    }
  };
}
