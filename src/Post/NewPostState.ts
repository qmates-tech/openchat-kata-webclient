import { createPostsAPI, NewPostAPIException, PostsAPI } from "./PostsAPI.ts";
import { useState } from "react";
import { Post } from "./Post.ts";
import { usePostsListState } from "./PostsListState.tsx";

const postsAPI = createPostsAPI();

export type CreateNewPostError =
  'User not found'
  | 'Inappropriate language detected'
  | 'Network error'
  | 'Generic error'

export type NewPostState = {
  isCreating: boolean;
  error: CreateNewPostError | undefined;
  post: Post | undefined;
  create(text: string): void;
}

export function useNewPostState(userId: string, API: PostsAPI = postsAPI): NewPostState {
  const { prepend } = usePostsListState();
  const [post, setPost] = useState<Post | undefined>(undefined);
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
        setPost(post)
        prepend(post)
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
