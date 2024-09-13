import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from "react";
import { NewPostForm } from "../../src/Post/NewPostForm.tsx";

describe('NewPostForm', () => {
  const aPost = { id: "123", userId: "user-id", text: "text to publish", dateTime: "2021-09-01T00:00:00Z" };

  it('should call the createPost function', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(undefined));

    render(<NewPostForm post={undefined} create={createPostMock} isCreating={false} error={undefined} />);

    await userEvent.type(writePostInput(), 'the very first post');
    await userEvent.click(sendPostButton());

    expect(createPostMock).toHaveBeenCalledWith("the very first post");
  });

  it('disable the creating post while already creating', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(undefined));
    render(<NewPostForm post={undefined} create={createPostMock} isCreating={true} error={undefined} />);

    expect(writePostInput()).toHaveAttribute('disabled');
    expect(sendPostButton()).toHaveAttribute('disabled');
    expect(sendPostButton()).toHaveAttribute('aria-busy', 'true');
  });

  it('cleanup the text field when post is successfully created', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(aPost));
    const { rerender } = render(<NewPostForm post={undefined} create={createPostMock} isCreating={false} error={undefined} />);
    await userEvent.type(writePostInput(), 'the very first post');

    rerender(<NewPostForm post={undefined} create={createPostMock} isCreating={true} error={undefined} />);
    rerender(<NewPostForm post={aPost} create={createPostMock} isCreating={false} error={undefined} />);

    await waitFor(() => {
      expect(writePostInput()).toHaveValue('');
    });
  });

  it('disable the creating post button when text is empty', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(undefined));
    render(<NewPostForm post={undefined} create={createPostMock} isCreating={false} error={undefined} />);

    expect(sendPostButton()).toHaveAttribute('disabled');
    expect(sendPostButton()).toHaveAttribute('aria-busy', 'false');
  });

  it('disable the creating post button when text is blank', async () => {
    const createPostMock = vi.fn(() => Promise.resolve(undefined));
    render(<NewPostForm post={undefined} create={createPostMock} isCreating={false} error={undefined}  />);

    await userEvent.type(writePostInput(), '\n  ');

    expect(sendPostButton()).toHaveAttribute('disabled');
    expect(sendPostButton()).toHaveAttribute('aria-busy', 'false');
  });

  it('should show the error message and keep the text when a post creation is failed', async () => {
    const { rerender } = render(<NewPostForm post={undefined} error={undefined} isCreating={false} create={vi.fn()} />);
    await userEvent.type(writePostInput(), 'the very first post');

    rerender(<NewPostForm post={undefined} error={undefined} isCreating={true} create={vi.fn()} />);
    rerender(<NewPostForm post={undefined} error={"Network error"} isCreating={false} create={vi.fn()} />);

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
