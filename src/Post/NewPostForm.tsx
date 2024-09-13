import React, { useEffect, useMemo, useState } from "react";
import "./NewPostForm.css";
import { NewPostState } from "./NewPostState.ts";

export function NewPostForm({ post, create, isCreating, error }: NewPostState) {
  const [text, changeText] = useState<string>("");
  const buttonDisabled = useMemo(() => isCreating || !(text.trim()), [isCreating, text]);

  useEffect(clearTextWhenNewPostIsCreated, [post]);

  return <>
    <fieldset className="new-post" role="group">
    <textarea placeholder="What's on your mind?" maxLength={100}
              value={text} onChange={e => changeText(e.target.value)}
              disabled={isCreating} />
      <button type="submit" onClick={createPost}
              disabled={buttonDisabled} aria-busy={isCreating}>
        Post
      </button>
    </fieldset>
    {error && <article data-testid="create-new-post-error" className="error-message">{error}</article>}
  </>;

  async function createPost(e: React.MouseEvent) {
    e.preventDefault();
    create(text);
  }

  function clearTextWhenNewPostIsCreated() {
    if (post) {
      changeText('');
    }
  }
}
