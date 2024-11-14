import { render, screen } from '@testing-library/react';
import React from "react";
import { Timeline } from "../../src/Timeline/Timeline.tsx";

describe('Timeline', () => {
  const anUser = { id: '1', username: 'John Doe', about: '' };

  it('renders Title of the current user', async () => {
    const currentSessionUser = { id: '1', username: 'John Doe', about: '' };

    render(<Timeline itsMe user={currentSessionUser} />);

    expect(screen.getByText('Your Timeline')).toBeInTheDocument();
  });

  it('renders Title of other users', async () => {
    render(<Timeline user={anUser} />);

    expect(screen.getByText("John Doe's Timeline")).toBeInTheDocument();
  });
})
