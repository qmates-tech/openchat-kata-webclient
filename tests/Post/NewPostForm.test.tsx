import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from "react";
import { NewPostForm } from "../../src/Post/NewPostForm.tsx";

describe('NewPostForm', () => {
  it('should call the createPost function', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(undefined));

    render(<NewPostForm createNewPost={createPostMock} isCreatingNewPost={false} />);

    await userEvent.type(writePostInput(), 'the very first post');
    await userEvent.click(sendPostButton());

    expect(createPostMock).toHaveBeenCalledWith("the very first post");
  });

  it('disable the creating post while already creating', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(undefined));
    render(<NewPostForm createNewPost={createPostMock} isCreatingNewPost={true}  />);

    expect(writePostInput()).toHaveAttribute('disabled');
    expect(sendPostButton()).toHaveAttribute('disabled');
    expect(sendPostButton()).toHaveAttribute('aria-busy', 'true');
  });

  it('cleanup the text field when post is successfully created', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(undefined));
    const { rerender } = render(<NewPostForm createNewPost={createPostMock} isCreatingNewPost={false}  />);
    await userEvent.type(writePostInput(), 'the very first post');

    rerender(<NewPostForm createNewPost={createPostMock} isCreatingNewPost={true} />);
    rerender(<NewPostForm createNewPost={createPostMock} isCreatingNewPost={false} />);

    await waitFor(() => {
      expect(writePostInput()).toHaveValue('');
    });
  });

  it('disable the creating post button when text is empty', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(undefined));
    render(<NewPostForm createNewPost={createPostMock} isCreatingNewPost={false}  />);

    expect(sendPostButton()).toHaveAttribute('disabled');
    expect(sendPostButton()).toHaveAttribute('aria-busy', 'false');
  });

  it('disable the creating post button when text is blank', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(undefined));
    render(<NewPostForm createNewPost={createPostMock} isCreatingNewPost={false}  />);

    await userEvent.type(writePostInput(), '\n  ');

    expect(sendPostButton()).toHaveAttribute('disabled');
    expect(sendPostButton()).toHaveAttribute('aria-busy', 'false');
  });
})

function writePostInput() {
  return screen.getByPlaceholderText('What\'s on your mind?')
}

function sendPostButton() {
  return screen.getByRole('button')
}
