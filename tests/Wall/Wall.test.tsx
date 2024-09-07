import { render, screen } from '@testing-library/react';
import React from "react";
import { Wall } from "../../src/Wall/Wall.tsx";
import { mockUsePostState } from "../utils/MockPostState.ts";
import { Post } from "../../src/Post/Post.ts";

describe('Wall', () => {
  it('renders the username', async () => {
    const user = { id: '1', username: 'John Doe', about: '' };

    render(<Wall user={user} />);

    expect(screen.getByText('John Doe\'s wall')).toBeInTheDocument();
  });

  it('renders the user bio transforming \n with separate paragraphs', async () => {
    const user = { id: '1', username: 'John Doe', about: 'I am a\ndeveloper' };
    
    render(<Wall user={user} />);

    expect(screen.getByText("I am a", { selector: 'p' })).toBeInTheDocument();
    expect(screen.getByText("developer", { selector: 'p' })).toBeInTheDocument();
  });

  it('renders the new post creation form', async () => {
    const user = { id: '1', username: 'John Doe', about: 'I am a\ndeveloper' };

    render(<Wall user={user} />);

    expect(screen.getByText("Post", { selector: 'button' })).toBeInTheDocument();
  });

  it('renders the post list', async () => {
    const user = { id: '1', username: 'John Doe', about: 'I am a\ndeveloper' };
    const aPost: Post = { id: '1', text: 'POST_TEXT', userId: '1', dateTime: '2024-09-07' };
    mockUsePostState({ wall: [aPost] });

    render(<Wall user={user} />);

    expect(screen.getByText("POST_TEXT")).toBeInTheDocument();
  });
})
