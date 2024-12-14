import { render, screen } from '@testing-library/react';
import { SearchUserList } from '../../src/Search/SearchUserList';
import { User } from '../../src/User/User';

describe('SearchUserList', () => {
  it('show "no users found" when no users are given', async () => {
    render(<SearchUserList users={[]} retrieving={false} error={undefined} />);

    expect(screen.getByText('No users found.')).toBeInTheDocument();
  });

  it('show a spinner when is retrieving the data', async () => {
    render(<SearchUserList users={[]} retrieving={true} error={undefined} />);

    expect(screen.getByTestId('spinner')).toHaveAttribute('aria-busy', 'true');
    expect(screen.queryByText('No users found.')).not.toBeInTheDocument();
  });

  it('ignore the error message and show user not found when an error is thrown', async () => {
    render(<SearchUserList users={[]} retrieving={false} error={'Generic error'} />);

    expect(screen.getByTestId('spinner')).toHaveAttribute('aria-busy', 'false');
    expect(screen.queryByText('No users found.')).toBeInTheDocument();
    expect(screen.queryByText('Generic error')).not.toBeInTheDocument();
  });

  it('show the users when some users are given', async () => {
    const users: User[] = [
      { id: '1', username: 'Alice', about: 'Its Alice' },
      { id: '2', username: 'Bob', about: 'Bob Description' }
    ]
    render(<SearchUserList users={users} retrieving={false} error={undefined} />);

    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });
});
