import { render, screen } from '@testing-library/react';
import React from "react";
import { PostsList } from "../../../src/Post/PostsList/PostsList.tsx";

describe('Posts', () => {
  it('empty posts', async () => {
    render(<PostsList posts={[]} isLoading={false} />);
    expect(screen.getByText("No posts present.")).toBeInTheDocument();
  });

  it('should not show "no posts present" while loading', async () => {
    render(<PostsList posts={[]} isLoading={true} />);
    expect(screen.queryByText("No posts present.")).not.toBeInTheDocument();
  });

  it('should show the loader while loading', async () => {
    render(<PostsList posts={[]} isLoading={true} />);
    expect(screen.queryByTestId("posts-list-loading")).toBeInTheDocument();
  });

  it('should show the older posts while loading', async () => {
    const anOldPost = { id: "1", userId: "user1", text: "an older post", dateTime: "2021-01-01", username: "username" };

    render(<PostsList posts={[anOldPost]} isLoading={true} />);

    expect(screen.getByText("an older post")).toBeInTheDocument();
    expect(screen.getByText("username - 2021-01-01")).toBeInTheDocument();
  });

  it('should show the post list', async () => {
    const secondPost = { id: "2", userId: "user2", text: "another post", dateTime: "2021-01-02", username: "name2" };
    const firstPost = { id: "1", userId: "user1", text: "an old post", dateTime: "2021-01-01", username: "name1" };

    render(<PostsList posts={[secondPost, firstPost]} isLoading={true} />);

    expect(screen.getByText("an old post")).toBeInTheDocument();
    expect(screen.getByText("name1 - 2021-01-01")).toBeInTheDocument();
    expect(screen.getByText("another post")).toBeInTheDocument();
    expect(screen.getByText("name2 - 2021-01-02")).toBeInTheDocument();
  });
});
