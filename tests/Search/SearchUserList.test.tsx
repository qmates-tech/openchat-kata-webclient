import { render, screen } from '@testing-library/react';
import { SearchUserList } from '../../src/Search/SearchUserList';

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
});
