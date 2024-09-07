import React from "react";
import "./PostsList.css";
import { Post } from "./Post.ts";
import { PostItem } from "./PostItem.tsx";

type PostsProps = {
  posts: Post[]
  isLoading: boolean
};
export function PostsList({ posts, isLoading }: PostsProps) {
  if (posts.length === 0 && !isLoading) {
    return (<div className="wall-post-list">No posts present.</div>);
  }

  return <div className="posts-list">
    <div data-testid="posts-list-loading" className="loading" aria-busy={isLoading}></div>
    {posts.map(post => <PostItem key={post.id} post={post} />)}
  </div>;
}


