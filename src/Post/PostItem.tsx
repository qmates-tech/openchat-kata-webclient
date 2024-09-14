import React from "react";
import { PostWithName } from "./PostWithName.tsx";

export function PostItem({ post }: { post: PostWithName }) {
  return <article>
    {post.text}
    <footer><small>{post.username} - {post.dateTime}</small></footer>
  </article>;
}