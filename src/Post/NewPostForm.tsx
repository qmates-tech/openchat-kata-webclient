import React, { useRef } from "react";
import "./NewPostForm.css";

export interface NewPostFormProps {
  createPost: (text: string) => void;
}

export function NewPostForm({ createPost }: NewPostFormProps) {
  const postTextRef = useRef<HTMLTextAreaElement>(null);

  return <fieldset className="new-post" role="group">
    <textarea ref={postTextRef} placeholder="What's on your mind?" maxLength={100} />
    <button type="submit" onClick={createNewPost}>Post</button>
  </fieldset>;

  async function createNewPost(e: React.MouseEvent) {
    e.preventDefault();
    createPost(postTextRef.current!.value);
  }
}
