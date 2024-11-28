import { render, screen } from '@testing-library/react';
import { SearchUser } from '../../src/Search/SearchUser';
import { mockUserSession } from '../utils/MockUserSession';

describe('SearchUser', () => {
  const anUser = { id: '123', username: 'alessio', about: 'About Alessio' };

  it('show the SearchUser when the user is logged in', async () => {
    mockUserSession({ currentUser: anUser });

    render(<SearchUser />);

    expect(searchUserInput()).toBeInTheDocument();
  });

  it('do not show the SearchUser when the user is not logged in', async () => {
    mockUserSession({ currentUser: undefined });

    render(<SearchUser />);

    expect(searchUserInput()).not.toBeInTheDocument();
  });

  it('do not show the SearchUser while retrieving the user', async () => {
    mockUserSession({ retrieving: true });

    render(<SearchUser />);

    expect(searchUserInput()).not.toBeInTheDocument();
  });
});

function searchUserInput() {
  return screen.queryByPlaceholderText('Search user');
}
