import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from "react";
import { NewPostForm } from "../../src/Post/NewPostForm.tsx";

describe('NewPostForm', () => {
  it('should call the createPost function', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(undefined));

    render(<NewPostForm createNewPost={createPostMock} isCreatingNewPost={false} createNewPostError={undefined} />);

    await userEvent.type(writePostInput(), 'the very first post');
    await userEvent.click(sendPostButton());

    expect(createPostMock).toHaveBeenCalledWith("the very first post");
  });

  it('disable the creating post while already creating', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(undefined));
    render(<NewPostForm createNewPost={createPostMock} isCreatingNewPost={true} createNewPostError={undefined} />);

    expect(writePostInput()).toHaveAttribute('disabled');
    expect(sendPostButton()).toHaveAttribute('disabled');
    expect(sendPostButton()).toHaveAttribute('aria-busy', 'true');
  });

  it('cleanup the text field when post is successfully created', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(undefined));
    const { rerender } = render(<NewPostForm createNewPost={createPostMock} isCreatingNewPost={false} createNewPostError={undefined} />);
    await userEvent.type(writePostInput(), 'the very first post');

    rerender(<NewPostForm createNewPost={createPostMock} isCreatingNewPost={true} createNewPostError={undefined} />);
    rerender(<NewPostForm createNewPost={createPostMock} isCreatingNewPost={false} createNewPostError={undefined} />);

    await waitFor(() => {
      expect(writePostInput()).toHaveValue('');
    });
  });

  it('disable the creating post button when text is empty', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(undefined));
    render(<NewPostForm createNewPost={createPostMock} isCreatingNewPost={false} createNewPostError={undefined} />);

    expect(sendPostButton()).toHaveAttribute('disabled');
    expect(sendPostButton()).toHaveAttribute('aria-busy', 'false');
  });

  it('disable the creating post button when text is blank', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(undefined));
    render(<NewPostForm createNewPost={createPostMock} isCreatingNewPost={false} createNewPostError={undefined}  />);

    await userEvent.type(writePostInput(), '\n  ');

    expect(sendPostButton()).toHaveAttribute('disabled');
    expect(sendPostButton()).toHaveAttribute('aria-busy', 'false');
  });

  it('should show the error message and keep the text when a post creation is failed', async () => {
    const { rerender } = render(<NewPostForm createNewPostError={undefined} isCreatingNewPost={false} createNewPost={vi.fn()} />);
    await userEvent.type(writePostInput(), 'the very first post');

    rerender(<NewPostForm createNewPostError={undefined} isCreatingNewPost={true} createNewPost={vi.fn()} />);
    rerender(<NewPostForm createNewPostError={"Network error"} isCreatingNewPost={false} createNewPost={vi.fn()} />);

    await waitFor(() => expect(createNewPostError()).toBeInTheDocument());
    expect(createNewPostError()).toHaveTextContent('Network error');
    expect(writePostInput()).toHaveValue('the very first post');
  });
});

function createNewPostError() {
  return screen.getByTestId('create-new-post-error')
}

function writePostInput() {
  return screen.getByPlaceholderText('What\'s on your mind?')
}

function sendPostButton() {
  return screen.getByRole('button')
}
