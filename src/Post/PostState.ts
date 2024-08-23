import { createNewPostAPI } from "./NewPostAPI.ts";

export function usePostState(userId: string) {
  const API = createNewPostAPI();

  return {
    createNewPost: async (text: string): Promise<void> => {
      await API.createNewPost(userId, text);
    }
  };
}
