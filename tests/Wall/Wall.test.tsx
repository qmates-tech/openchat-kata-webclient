import { render, screen } from '@testing-library/react';
import React from "react";
import { Wall } from "../../src/Wall/Wall.tsx";
import { mockPostListState } from "../utils/MockPostListState.ts";
import { PostWithName } from "../../src/Post/PostWithName.ts";

describe('Wall', () => {
  const anUser = { id: '1', username: 'John Doe', about: '' };

  it('renders the username', async () => {
    mockPostListState({ posts: [] });
    const johnDoe = { id: '1', username: 'John Doe', about: '' };

    render(<Wall user={johnDoe} />);

    expect(screen.getByText('John Doe\'s wall')).toBeInTheDocument();
  });

  it('renders the user bio transforming \n with separate paragraphs', async () => {
    mockPostListState({ posts: [] });
    const aDeveloper = { id: '1', username: 'John Doe', about: 'I am a\ndeveloper' };

    render(<Wall user={aDeveloper} />);

    expect(screen.getByText("I am a", { selector: 'p' })).toBeInTheDocument();
    expect(screen.getByText("developer", { selector: 'p' })).toBeInTheDocument();
  });

  it('renders the new post creation form', async () => {
    mockPostListState({ posts: [] });

    render(<Wall user={anUser} />);

    expect(screen.getByText("Post", { selector: 'button' })).toBeInTheDocument();
  });

  it('renders the post list', async () => {
    const aPost: PostWithName = { id: '1', text: 'POST_TEXT', userId: '1', dateTime: '2024-09-07', username: "You" };
    mockPostListState({ posts: [aPost] });

    render(<Wall user={anUser} />);

    expect(screen.getByText("POST_TEXT")).toBeInTheDocument();
  });
})
