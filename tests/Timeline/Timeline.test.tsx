import { render, screen } from '@testing-library/react';
import { beforeEach } from "vitest";
import { Timeline } from "../../src/Timeline/Timeline.tsx";
import { mockPostListState } from "../utils/MockPostListState.ts";
import { mockUserSession } from "../utils/MockUserSession.ts";

describe('Timeline', () => {
  const anUser = { id: '1', username: 'John Doe', about: '' };

  beforeEach(() => {
    mockUserSession();
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

  it('does not render the post owner', async () => {
    const aPost = { id: '1', text: 'POST_TEXT', userId: 'user-id', dateTime: '2024-09-07', username: "Someone" };
    mockPostListState({ posts: [aPost] });

    render(<Timeline user={anUser} />);

    expect(screen.queryByText(/Someone/i)).not.toBeInTheDocument();
  });

  it('does not render the new post creation form on other users timeline', async () => {
    render(<Timeline user={anUser} />);

    expect(screen.queryByText("Post", { selector: 'button' })).not.toBeInTheDocument();
  });

  it('renders the new post creation form on current user timeline', async () => {
    render(<Timeline itsMe user={anUser} />);

    expect(screen.getByText("Post", { selector: 'button' })).toBeInTheDocument();
  });
})

