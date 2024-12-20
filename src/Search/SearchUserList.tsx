import { User } from "../User/User";
import { SearchUsersState } from "../User/UsersByNameState";
import './SearchUserList.css';

export type SearchUserListProps = SearchUsersState & { onUserSelected: (userId: User["id"]) => void };

export function SearchUserList({ users, retrieving, onUserSelected }: SearchUserListProps) {
  const hasUsers = users.length > 0;

  return (<div className="search-user-list">
    <div data-testid="spinner" aria-busy={retrieving}></div>
    {!retrieving && !hasUsers && <NotFound />}
    {!retrieving && hasUsers && (
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>About</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <a href="#" onClick={userNameLinkClickedFor(user.id)}>{user.username}</a>
              </td>
              <td>{trimmedText(user.about, 25)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>);

  function userNameLinkClickedFor(userId: User["id"]) {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onUserSelected(userId);
    }
  }
}

function trimmedText(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

function NotFound() {
  return (
    <div className="not-found">
      <i></i>
      <span>No users found.</span>
    </div>
  );
}