import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LogoutButton } from '../../src/Logout/LogoutButton';
import { mockUserSession } from '../utils/MockUserSession';
import { RouteLocation, wrapWithCustomRoutes } from '../utils/renderHelpers';
import userEvent from '@testing-library/user-event';

describe('LogoutButton Component', () => {
  const anUser = { id: '123', username: 'alessio', about: 'About Alessio' };

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('show the LogoutButton when the user is logged in', async () => {
    mockUserSession({ currentUser: anUser });

    render(<LogoutButton />, withRouter({ path: '/' }));

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('do not show the LogoutButton when the user is not logged in', async () => {
    mockUserSession({ currentUser: undefined });

    render(<LogoutButton />, withRouter({ path: '/' }));

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('do not show the LogoutButton while retrieving the user', async () => {
    mockUserSession({ retrieving: true });

    render(<LogoutButton />, withRouter({ path: '/' }));

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('do not show the LogoutButton in the Login page', async () => {
    mockUserSession({ currentUser: undefined });

    render(<LogoutButton />, withRouter({ path: '/login' }));

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls the logout method on Button click', async () => {
    const mock = mockUserSession({ retrieving: false, currentUser: anUser });
    render(<LogoutButton />, withRouter({ path: '/' }));

    userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mock.setUserSession).toHaveBeenCalledWith(undefined));
  });
});

function withRouter(location: RouteLocation) {
  return wrapWithCustomRoutes(location, ['/', '/login']);
}
