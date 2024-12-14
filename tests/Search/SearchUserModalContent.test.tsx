import { render } from "@testing-library/react";
import { SearchUserModalContent } from "../../src/Search/SearchUserModalContent";
import { mockUsersByName } from "../utils/MockUsersByName";
import { mockUserSession } from "../utils/MockUserSession";
import * as SearchUserListToMock from "../../src/Search/SearchUserList";
import { SearchUserListProps } from "../../src/Search/SearchUserList";

describe('SearchUserModalContent', () => {
  const anUser = { id: '123', username: 'alessio', about: 'About Alessio' };
  const foundUsers = [{ id: '456', username: 'found-user', about: '' }];

  beforeEach(() => {
    mockUserSession({ currentUser: anUser });
  });

  it('passes the users state to the SearchUserList component', async () => {
    const usersState = mockUsersByName({ users: foundUsers });
    const list = mockSearchUserList();

    render(<SearchUserModalContent search="username" />);

    expect(list).toHaveBeenCalledWith(usersState);
  });
});

function mockSearchUserList() {
  const spy = vi.fn((_: SearchUserListProps) => <></>)
  vi.spyOn(SearchUserListToMock, "SearchUserList").mockImplementation((props) => spy(props));
  return spy;
}