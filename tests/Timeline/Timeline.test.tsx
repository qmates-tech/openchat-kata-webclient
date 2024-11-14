import { render, screen } from '@testing-library/react';
import React from "react";
import { Timeline } from "../../src/Timeline/Timeline.tsx";
import {PostWithName} from "../../src/Post/PostWithName.ts";
import {mockPostListState} from "../utils/MockPostListState.ts";
import {beforeEach} from "vitest";

describe('Timeline', () => {
  const anUser = { id: '1', username: 'John Doe', about: '' };

  beforeEach(() => {
    mockPostListState({ posts: [] });
  });

  it('renders Title of the current user', async () => {
    const currentSessionUser = { id: '1', username: 'John Doe', about: '' };

    render(<Timeline itsMe user={currentSessionUser} />);

    expect(screen.getByText('Your Timeline')).toBeInTheDocument();
  });

  it('renders Title of other users', async () => {
    render(<Timeline user={anUser} />);

    expect(screen.getByText("John Doe's Timeline")).toBeInTheDocument();
  });

  it('renders the post list', async () => {
    const aPost = { id: '1', text: 'POST_TEXT', userId: 'user-id', dateTime: '2024-09-07', username: "Someone" };
    mockPostListState({ posts: [aPost] });

    render(<Timeline user={anUser} />);

    expect(screen.getByText("POST_TEXT")).toBeInTheDocument();
  });
})
