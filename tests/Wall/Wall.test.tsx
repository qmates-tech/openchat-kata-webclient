import { render, screen } from '@testing-library/react';
import React from "react";
import { Wall } from "../../src/Wall/Wall.tsx";

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
})
