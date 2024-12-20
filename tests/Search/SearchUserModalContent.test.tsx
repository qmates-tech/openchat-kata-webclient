import { act, render, screen } from "@testing-library/react";
import * as SearchUserListToMock from "../../src/Search/SearchUserList";
import { SearchUserListProps } from "../../src/Search/SearchUserList";
import { SearchUserModalContent } from "../../src/Search/SearchUserModalContent";
import { mockUsersByName } from "../utils/MockUsersByName";
import { mockUserSession } from "../utils/MockUserSession";
import { wrapWithCustomRoutes, wrapWithRouter } from "../utils/renderHelpers";

describe('SearchUserModalContent', () => {
  const anUser = { id: '123', username: 'alessio', about: 'About Alessio' };
  const foundUsers = [{ id: '456', username: 'found-user', about: '' }];

  beforeEach(() => {
    mockUserSession({ currentUser: anUser });
  });

  it('passes the users state to the SearchUserList component', async () => {
    const usersState = mockUsersByName({ users: foundUsers });
    const list = mockSearchUserList();

    render(<SearchUserModalContent search="username" pauseModal={vi.fn()} />, wrapWithRouter({ path: "/current" }));

    expect(list.mock).toHaveBeenCalledWith({...usersState, onUserSelected: expect.any(Function)});
  });

  it('pause the modal and redirect to the user timeline when a user is selected', async () => {
    const pauseModal = vi.fn();
    const list = mockSearchUserList();
    render(<SearchUserModalContent search="username" pauseModal={pauseModal} />, wrapWithCustomRoutes({ path: "/" }, ["/users/:userId/timeline"]));

    act(() => list.triggerOnUserSelected('456'));

    expect(pauseModal).toHaveBeenCalledOnce();
    expect(screen.getByText('ROUTE: /users/456/timeline')).toBeInTheDocument();
  });
});

function mockSearchUserList() {
  const spy = vi.fn((_: SearchUserListProps) => <></>)
  vi.spyOn(SearchUserListToMock, "SearchUserList").mockImplementation((props) => spy(props));
  return {
    mock: spy,
    triggerOnUserSelected: (userId: string) => spy.mock.calls[0][0].onUserSelected(userId)
  }
}
