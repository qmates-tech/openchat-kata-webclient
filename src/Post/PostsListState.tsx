import { createContext, ReactNode, useContext, useState } from "react";
import { PostWithName } from "./PostWithName.tsx";

export type PostsListState = {
  posts: PostWithName[];
  replace(newWall: PostWithName[]): void;
  prepend(newPost: PostWithName): void;
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
  const [posts, setPosts] = useState<PostWithName[]>([]);

  const postListValue = {
    posts,
    replace(newWall: PostWithName[]) {
      setPosts(newWall)
    },
    prepend(newPost: PostWithName) {
      setPosts(wall => [newPost, ...wall])
    }
  }

  return (
    <PostsListContext.Provider value={postListValue}>
      {children}
    </PostsListContext.Provider>
  );
}