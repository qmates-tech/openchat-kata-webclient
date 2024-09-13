import { createContext, ReactNode, useContext, useState } from "react";
import { Post } from "./Post.ts";

export type PostsListState = {
  posts: Post[];
  replace(newWall: Post[]): void;
  prepend(newPost: Post): void;
};
const PostsListContext = createContext<PostsListState | undefined>(undefined);

export const usePostsListState = () => {
  const context = useContext(PostsListContext);
  if (context === undefined) {
    throw new Error('usePostsListState must be used within a PostsListStateProvider');
  }
  return context;
};

export function PostsListStateProvider({ children }: { children: ReactNode }): ReactNode {
  const [posts, setPosts] = useState<Post[]>([]);

  const postListValue = {
    posts,
    replace(newWall: Post[]) {
      setPosts(newWall)
    },
    prepend(newPost: Post) {
      setPosts(wall => [newPost, ...wall])
    }
  }

  return (
    <PostsListContext.Provider value={postListValue}>
      {children}
    </PostsListContext.Provider>
  );
}