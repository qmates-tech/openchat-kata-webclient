import React, { useEffect, useMemo, useState } from "react";
import "./NewPostForm.css";
import { CreatePostState } from "./PostState.ts";

export function NewPostForm({ createNewPost, isCreatingNewPost, createNewPostError }: CreatePostState) {
  const [text, changeText] = useState<string>("");
  const buttonDisabled = useMemo(() => isCreatingNewPost || !(text.trim()), [isCreatingNewPost, text]);

  useEffect(clearTextWhenNewPostIsCreated, [isCreatingNewPost]);

  return <>
    <fieldset className="new-post" role="group">
    <textarea placeholder="What's on your mind?" maxLength={100}
              value={text} onChange={e => changeText(e.target.value)}
              disabled={isCreatingNewPost} />
      <button type="submit" onClick={createPost}
              disabled={buttonDisabled} aria-busy={isCreatingNewPost}>
        Post
      </button>
    </fieldset>
    {createNewPostError && <article data-testid="create-new-post-error" className="error-message">{createNewPostError}</article>}
  </>;

  async function createPost(e: React.MouseEvent) {
    e.preventDefault();
    createNewPost(text);
  }

  function clearTextWhenNewPostIsCreated() {
    if (!isCreatingNewPost && !createNewPostError) {
      changeText('');
    }
  }
}
