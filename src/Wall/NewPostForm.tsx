import React, { useRef } from "react";

export interface NewPostFormProps {
  createPost: (props: { text: string }) => void,
}

export function NewPostForm({ createPost }: NewPostFormProps) {
  const postTextRef = useRef<HTMLTextAreaElement>(null);

  return <fieldset className="new-post" role="group">
    <textarea ref={postTextRef} placeholder="What's on your mind?" maxLength={100} />
    <button type="submit" onClick={createNewPost}>Post</button>
  </fieldset>;

  function createNewPost(e: React.MouseEvent) {
    e.preventDefault();
    createPost({ text: postTextRef.current!.value });
  }
}
