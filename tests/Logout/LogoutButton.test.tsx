import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LogoutButton } from '../../src/Logout/LogoutButton';
import { mockUserSession } from '../utils/MockUserSession';

describe('LogoutButton', () => {
  const anUser = { id: '123', username: 'alessio', about: 'About Alessio' };

  it('show the LogoutButton when the user is logged in', async () => {
    mockUserSession({ currentUser: anUser });

    render(<LogoutButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('do not show the LogoutButton when the user is not logged in', async () => {
    mockUserSession({ currentUser: undefined });

    render(<LogoutButton />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('do not show the LogoutButton while retrieving the user', async () => {
    mockUserSession({ retrieving: true });

    render(<LogoutButton />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('do not show the LogoutButton in the Login page', async () => {
    mockUserSession({ currentUser: undefined });

    render(<LogoutButton />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls the logout method on Button click', async () => {
    const mock = mockUserSession({ retrieving: false, currentUser: anUser });
    render(<LogoutButton />);

    await userEvent.click(screen.getByRole('button'));

    expect(mock.setUserSession).toHaveBeenCalledWith(undefined);
  });
});
