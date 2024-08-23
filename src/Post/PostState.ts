import { createNewPostAPI } from "./NewPostAPI.ts";
import { useMemo, useState } from "react";
import { createLoginAPI } from "../Login/LoginAPI.ts";

export type PostState = {
  isCreatingNewPost: boolean;
  createNewPost: (text: string) => void;
}

export function usePostState(userId: string): PostState {
  const API = useMemo(() => createNewPostAPI(), []);
  const [isCreatingNewPost, setIsCreatingNewPost] = useState<boolean>(false);

  return {
    isCreatingNewPost,
    createNewPost: (text: string) => {
      setIsCreatingNewPost(true);
      API.createNewPost(userId, text)
        .catch(e => {})
        .finally(() => setIsCreatingNewPost(false));
    }
  };
}
