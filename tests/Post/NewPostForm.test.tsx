import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from "react";
import { NewPostForm } from "../../src/Post/NewPostForm.tsx";

describe('NewPostForm', () => {
  it('should call the createPost function', async () => {
    const createPostMock = vi.fn();

    render(<NewPostForm createPost={createPostMock} />);

    await userEvent.type(writePostInput(), 'the very first post');
    await userEvent.click(sendPostButton());

    expect(createPostMock).toHaveBeenCalledWith("the very first post");
  });
})

function writePostInput() {
  return screen.getByPlaceholderText('What\'s on your mind?')
}

function sendPostButton() {
  return screen.getByRole('button')
}
