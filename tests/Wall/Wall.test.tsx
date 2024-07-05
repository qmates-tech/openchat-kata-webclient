import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Wall } from '../../src/Wall/Wall';
import { mockUserSession } from '../utils/MockUserSession';

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renders the username', async () => {
    mockUserSession({ currentUser: { id: '1', username: 'John Doe', about: '' } });

    render(<Wall />);

    expect(screen.getByText('John Doe\'s wall')).toBeInTheDocument();
  });

  it('renders the user bio transforming \n with separate paragraphs', async () => {
    mockUserSession({ currentUser: { id: '1', username: 'John Doe', about: 'I am a\ndeveloper' } });

    render(<Wall />);

    expect(screen.getByText("I am a", { selector: 'p' })).toBeInTheDocument();
    expect(screen.getByText("developer", { selector: 'p' })).toBeInTheDocument();
  });
})
