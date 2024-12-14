import { render, screen } from '@testing-library/react';
import { SearchUserList } from '../../src/Search/SearchUserList';

describe('SearchUserList', () => {
  it('show "no users found" when no users are given', async () => {
    render(<SearchUserList users={[]} retrieving={false} error={undefined} />);

    expect(screen.getByText('No users found.')).toBeInTheDocument();
  });
});
