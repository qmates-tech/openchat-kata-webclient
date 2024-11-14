import React from "react";
import { PostWithName } from "../PostWithName.ts";

export function PostItem({ post, hideOwners }: { post: PostWithName, hideOwners?: boolean }) {
  return <article>
    {post.text}
    <footer><small>{footer()}</small></footer>
  </article>;

  function footer() {
    return hideOwners
      ? post.dateTime
      : `${post.username} - ${post.dateTime}`
  }
}