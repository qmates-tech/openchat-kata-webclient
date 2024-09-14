import { createNewPostsAPI, NewPostAPIException, NewPostsAPI } from "./NewPostsAPI.ts";
import { useState } from "react";
import { usePostsListState } from "./PostsListState.tsx";
import { applyUserName, PostWithName } from "./PostWithName.tsx";

const newPostsAPI = createNewPostsAPI();

export type CreateNewPostError =
  'User not found'
  | 'Inappropriate language detected'
  | 'Network error'
  | 'Generic error'

export type NewPostState = {
  isCreating: boolean;
  error: CreateNewPostError | undefined;
  post: PostWithName | undefined;
  create(text: string): void;
}

export function useNewPostState(userId: string, API: NewPostsAPI = newPostsAPI): NewPostState {
  const { prepend } = usePostsListState();
  const [post, setPost] = useState<PostWithName | undefined>(undefined);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [error, setError] = useState<CreateNewPostError | undefined>();

  return {
    isCreating,
    error,
    post,
    create
  };

  function create(text: string) {
    setPost(undefined);
    setError(undefined);
    setIsCreating(true);
    API.createNewPost(userId, text)
      .then((post) => {
        const userPost = applyUserName(post, userId)
        setPost(userPost)
        prepend(userPost)
      })
      .catch((e) => setError(parseCreateNewPostError(e)))
      .finally(() => setIsCreating(false));
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