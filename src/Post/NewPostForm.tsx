import React, { useRef } from "react";
import "./NewPostForm.css";

export interface NewPostFormProps {
  createPost: (text: string) => void,
  isCreatingNewPost: boolean
}

export function NewPostForm({ createPost, isCreatingNewPost }: NewPostFormProps) {
  const postTextRef = useRef<HTMLTextAreaElement>(null);

  return <fieldset className="new-post" role="group">
    <textarea ref={postTextRef} placeholder="What's on your mind?"
              maxLength={100} disabled={isCreatingNewPost} />
    <button type="submit" onClick={createNewPost}
            disabled={isCreatingNewPost} aria-busy={isCreatingNewPost}>
      Post
    </button>
  </fieldset>;

  async function createNewPost(e: React.MouseEvent) {
    e.preventDefault();
    createPost(postTextRef.current!.value);
  }
}
