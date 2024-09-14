import React, { useEffect, useMemo, useRef, useState } from "react";
import "./NewPostForm.css";
import { CreateNewPostError, NewPostState } from "./NewPostState.ts";

export function NewPostForm({ post, create, isCreating, error }: NewPostState) {
  const textInput = useRef<HTMLTextAreaElement>(null);
  const [text, changeText] = useState<string>("");
  const buttonDisabled = useMemo(() => isCreating || !(text.trim()), [isCreating, text]);
  const [errorToShow, setErrorToShow] = useState<CreateNewPostError | undefined>(undefined);

  useEffect(clearTextWhenNewPostIsCreated, [post]);
  useEffect(updateErrorToShow, [error]);

  return <>
    <fieldset className="new-post" role="group">
      <textarea ref={textInput} placeholder="What's on your mind?" maxLength={100}
                value={text} onChange={onPostTextChange}
                disabled={isCreating} onKeyUpCapture={createPostOnCtrlEnterPressed} />
      <button type="submit" onClick={createPost}
              disabled={buttonDisabled} aria-busy={isCreating}>
        Post
        <small>(Ctrl + Enter)</small>
      </button>
    </fieldset>
    {errorToShow && <article data-testid="create-new-post-error" className="error-message">{errorToShow}</article>}
  </>;

  async function createPost(e: React.MouseEvent) {
    e.preventDefault();
    create(text);
  }

  function createPostOnCtrlEnterPressed(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault()
      create(text);
    }
  }

  function clearTextWhenNewPostIsCreated() {
    if (post) {
      changeText('');
    }
  }

  function onPostTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    changeText(e.target.value);
    setErrorToShow(undefined);
  }

  function updateErrorToShow() {
    setErrorToShow(error);
    textInput.current?.focus();
  }
}
