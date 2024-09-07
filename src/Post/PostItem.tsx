import { Post } from "./Post.ts";
import React from "react";

export function PostItem({ post }: { post: Post }) {
  return <article>
    {post.text}
    <footer><small>{post.userId} - {post.dateTime}</small></footer>
  </article>;
}