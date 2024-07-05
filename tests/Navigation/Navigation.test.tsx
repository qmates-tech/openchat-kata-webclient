import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Navigation } from '../../src/Navigation/Navigation';
import { mockUserSession } from '../utils/MockUserSession';
import { wrapWithRouter } from '../utils/renderHelpers';

describe('Navigation Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('show the logout button when logged in', async () => {
    mockUserSession({ currentUser: { id: "996", username: "usr", about: "about usr" } });

    render(<Navigation />, wrapWithRouter({ path: '/' }));

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('do not show the logout button when not logged in', async () => {
    mockUserSession({ currentUser: undefined });

    render(<Navigation />, wrapWithRouter({ path: '/' }));

    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('do not show the logout button when loading', async () => {
    mockUserSession({ retrieving: true });

    render(<Navigation />, wrapWithRouter({ path: '/' }));

    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('redirect to the login page when logout is pressed', async () => {
    mockUserSession({ currentUser: { id: "996", username: "usr", about: "about usr" } });
    render(<Navigation />, wrapWithRouter({ path: '/' }));

    await userEvent.click(screen.getByText('Logout'));

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it('do not show the logout button in the login page even if already logged in', async () => {
    mockUserSession({ currentUser: { id: "996", username: "usr", about: "about usr" } });

    render(<Navigation />, wrapWithRouter({ path: '/login' }));

    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });
});
