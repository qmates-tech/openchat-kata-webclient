import React from "react";
import { PostWithName } from "../PostWithName.ts";

export function PostItem({ post }: { post: PostWithName }) {
  return <article>
    {post.text}
    <footer><small>{post.username} - {post.dateTime}</small></footer>
  </article>;
}