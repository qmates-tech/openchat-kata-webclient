import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchUser } from '../../src/Search/SearchUser';
import { mockUserSession } from '../utils/MockUserSession';
import { wrapWithModal } from '../utils/renderHelpers';
import * as SearchUserModalContentToMock from "../../src/Search/SearchUserModalContent";
import { SearchUserModalContentProps } from "../../src/Search/SearchUserModalContent";

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
    const mockedSearchUserModalContent = mockSearchUserModalContent();
    render(<SearchUser />, wrapWithModal());

    await userEvent.type(searchUserInput(), 'text-to-search');
    await userEvent.click(screen.getByLabelText("Search"));

    expect(screen.getByText('Users found for "text-to-search"')).toBeVisible();
    expect(mockedSearchUserModalContent).toHaveBeenCalledWith({ search: 'text-to-search' });
  });

  it('open the user search modal when enter is typed', async () => {
    mockUserSession({ currentUser: anUser });
    mockSearchUserModalContent();
    render(<SearchUser />, wrapWithModal());

    await userEvent.type(searchUserInput(), 'text-to-search[enter]');

    expect(screen.getByText('Users found for "text-to-search"')).toBeVisible();
  });

  it('do not open the user search modal when enter is typed but the text is empty', async () => {
    mockUserSession({ currentUser: anUser });
    mockSearchUserModalContent();
    render(<SearchUser />, wrapWithModal());

    await userEvent.type(searchUserInput(), '[enter]');

    expect(screen.queryByText(/Users found for/i)).not.toBeInTheDocument();
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
    mockSearchUserModalContent();
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

function mockSearchUserModalContent() {
  const spy = vi.fn((_: SearchUserModalContentProps) => <></>)
  vi.spyOn(SearchUserModalContentToMock, "SearchUserModalContent").mockImplementation((props) => spy(props));
  return spy;
}