import { render, screen } from '@testing-library/react';
import { SearchUserList } from '../../src/Search/SearchUserList';
import { User } from '../../src/User/User';
import userEvent from '@testing-library/user-event';
import { wrapWithCustomRoutes } from '../utils/renderHelpers';
import * as LinkToMock from '../../src/Navigation/LinkTo';
import { Children } from 'react';
import { pathOf } from '../../src/AppRoutes';

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
    mockLinkTo();
    const users: User[] = [
      { id: '1', username: 'Alice', about: 'Its Alice' },
      { id: '2', username: 'Bob', about: 'Bob Description' }
    ]
    render(<SearchUserList users={users} retrieving={false} error={undefined} />);

    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Its Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Bob Description')).toBeInTheDocument();
  });

  it('trim the about column if text longer than 25', async () => {
    mockLinkTo();
    const users: User[] = [
      { id: '1', username: 'Alice', about: '1234567890123456789012345+++++' },
    ]
    render(<SearchUserList users={users} retrieving={false} error={undefined} />);

    expect(screen.getByText('1234567890123456789012345...')).toBeInTheDocument();
  });

  it('show a link to the user timeline that opens in a new window', async () => {
    const linkToMock = mockLinkTo();
    const users: User[] = [{ id: '1', username: 'Alice', about: 'Its Alice' }]
    render(<SearchUserList users={users} retrieving={false} error={undefined} />);

    expect(linkToMock).toHaveBeenCalledWith({
      to: 'userTimeline',
      pathParams: { userId: '1' },
      newWindow: true,
      children: 'Alice',
    });
  });
});

export function mockLinkTo() {
  const spy = vi.fn(({ children }: LinkToMock.LinkToProps) => <>{children}</>);
  vi.spyOn(LinkToMock, "LinkTo").mockImplementation((props) => spy(props));
  return spy;
}
