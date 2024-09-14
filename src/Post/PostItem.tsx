import React from "react";
import { UserPost } from "./PostsListState.tsx";

export function PostItem({ post }: { post: UserPost }) {
  return <article>
    {post.text}
    <footer><small>{post.username} - {post.dateTime}</small></footer>
  </article>;
}