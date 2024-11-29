import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchUser } from '../../src/Search/SearchUser';
import { mockUserSession } from '../utils/MockUserSession';
import { wrapWithModal } from '../utils/renderHelpers';
import * as SearchUserListToMock from "../../src/Search/SearchUserList";
import { SearchUserListProps } from "../../src/Search/SearchUserList";

describe('SearchUser', () => {
  const anUser = { id: '123', username: 'alessio', about: 'About Alessio' };

  it('show the SearchUser when the user is logged in', async () => {
    mockUserSession({ currentUser: anUser });

    render(<SearchUser />, wrapWithModal());

    expect(querySearchUserInput()).toBeInTheDocument();
  });

  it('do not show the SearchUser when the user is not logged in', async () => {
    mockUserSession({ currentUser: undefined });

    render(<SearchUser />, wrapWithModal());

    expect(querySearchUserInput()).not.toBeInTheDocument();
  });

  it('do not show the SearchUser while retrieving the user', async () => {
    mockUserSession({ retrieving: true });

    render(<SearchUser />, wrapWithModal());

    expect(querySearchUserInput()).not.toBeInTheDocument();
  });

  it('open the user search modal', async () => {
    mockUserSession({ currentUser: anUser });
    const mockedSearchUserList = mockSearchUserList();
    render(<SearchUser />, wrapWithModal());

    await userEvent.type(searchUserInput(), 'text-to-search');
    await userEvent.click(screen.getByLabelText("Search"));

    expect(screen.getByText('Users found for "text-to-search"')).toBeVisible();
    expect(mockedSearchUserList).toHaveBeenCalledWith({ search: 'text-to-search' });
  });

  it('disable the Search button when no text is present', async () => {
    mockUserSession({ currentUser: anUser });
    render(<SearchUser />, wrapWithModal());
    expect(screen.getByLabelText("Search")).toBeDisabled();

    await userEvent.type(searchUserInput(), 'text-to-search');

    expect(screen.getByLabelText("Search")).toBeEnabled();
  });

  it('cleanup search text when the modal is closed', async () => {
    mockUserSession({ currentUser: anUser });
    mockSearchUserList();
    render(<SearchUser />, wrapWithModal());
    await userEvent.type(searchUserInput(), 'text-to-search');
    await userEvent.click(screen.getByLabelText("Search"));

    await userEvent.click(screen.getByLabelText("Close Modal"));

    await waitFor(() => expect(searchUserInput()).toHaveValue(''));
  });
});

function searchUserInput() {
  return screen.getByPlaceholderText('Search user');
}

function querySearchUserInput() {
  return screen.queryByPlaceholderText('Search user');
}

function mockSearchUserList() {
  const spy = vi.fn((_: SearchUserListProps) => <></>)
  vi.spyOn(SearchUserListToMock, "SearchUserList").mockImplementation((props) => spy(props));
  return spy;
}