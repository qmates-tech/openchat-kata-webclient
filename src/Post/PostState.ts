import { createNewPostAPI } from "./NewPostAPI.ts";
import { useMemo, useState } from "react";

export type PostState = {
  isCreatingNewPost: boolean;
  createNewPost: (text: string) => Promise<NewPostError>;
}

export type NewPostError = undefined

export function usePostState(userId: string): PostState {
  const API = useMemo(() => createNewPostAPI(), []);
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
