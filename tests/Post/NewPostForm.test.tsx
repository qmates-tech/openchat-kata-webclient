import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from "react";
import { NewPostForm } from "../../src/Post/NewPostForm.tsx";

describe('NewPostForm', () => {
  it('should call the createPost function', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(undefined));

    render(<NewPostForm createPost={createPostMock} isCreatingNewPost={false} />);

    await userEvent.type(writePostInput(), 'the very first post');
    await userEvent.click(sendPostButton());

    expect(createPostMock).toHaveBeenCalledWith("the very first post");
  });

  it('disable the creating post while already creating', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(undefined));
    render(<NewPostForm createPost={createPostMock} isCreatingNewPost={true}  />);

    expect(writePostInput()).toHaveAttribute('disabled');
    expect(sendPostButton()).toHaveAttribute('disabled');
    expect(sendPostButton()).toHaveAttribute('aria-busy', 'true');
  })

  it('cleanup the text field when post is successfully created', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(undefined));
    render(<NewPostForm createPost={createPostMock} isCreatingNewPost={false}  />);

    await userEvent.type(writePostInput(), 'the very first post');
    await userEvent.click(sendPostButton());

    expect(writePostInput()).toHaveValue('');
  })
})

function writePostInput() {
  return screen.getByPlaceholderText('What\'s on your mind?')
}

function sendPostButton() {
  return screen.getByRole('button')
}
