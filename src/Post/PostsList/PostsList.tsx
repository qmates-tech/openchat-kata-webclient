import React from "react";
import "./PostsList.css";
import { PostItem } from "./PostItem.tsx";

import {PostWithName} from "../PostWithName.ts";

type PostsProps = {
  posts: PostWithName[]
  isLoading: boolean
};

export function PostsList({ posts, isLoading }: PostsProps) {
  if (posts.length === 0 && !isLoading) {
    return (<div className="posts-list empty-list">No posts present.</div>);
  }

  return <div className="posts-list">
    <div data-testid="posts-list-loading" className="loading" aria-busy={isLoading}></div>
    {posts.map(post => <PostItem key={post.id} post={post} />)}
  </div>;
}


