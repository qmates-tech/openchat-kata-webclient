import { createContext, ReactNode, useContext, useState } from "react";
import { Post } from "./Post.ts";

export type UserPost = Post & { username?: string | undefined };
export type PostsListState = {
  posts: UserPost[];
  replace(newWall: UserPost[]): void;
  prepend(newPost: UserPost): void;
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
  const [posts, setPosts] = useState<UserPost[]>([]);

  const postListValue = {
    posts,
    replace(newWall: UserPost[]) {
      setPosts(newWall)
    },
    prepend(newPost: UserPost) {
      setPosts(wall => [newPost, ...wall])
    }
  }

  return (
    <PostsListContext.Provider value={postListValue}>
      {children}
    </PostsListContext.Provider>
  );
}