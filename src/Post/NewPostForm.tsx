import React, { useEffect, useRef } from "react";
import "./NewPostForm.css";
import { PostState } from "./PostState.ts";

export function NewPostForm({ createNewPost, isCreatingNewPost }: PostState) {
  const postTextRef = useRef<HTMLTextAreaElement>(null);

  useEffect(clearTextWhenNewPostIsCreated, [isCreatingNewPost]);

  return <fieldset className="new-post" role="group">
    <textarea ref={postTextRef} placeholder="What's on your mind?"
              maxLength={100} disabled={isCreatingNewPost} />
    <button type="submit" onClick={createPost}
            disabled={isCreatingNewPost} aria-busy={isCreatingNewPost}>
      Post
    </button>
  </fieldset>;

  async function createPost(e: React.MouseEvent) {
    e.preventDefault();
    createNewPost(postTextRef.current!.value);
  }

  function clearTextWhenNewPostIsCreated() {
    if (!isCreatingNewPost && postTextRef.current) {
      postTextRef.current.value = '';
    }
  }
}
