import { LinkTo } from "../Navigation/LinkTo";
import { SearchUsersState } from "../User/UsersByNameState";
import './SearchUserList.css';

export type SearchUserListProps = SearchUsersState;

export function SearchUserList({ users, retrieving }: SearchUserListProps) {
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
                <LinkTo to="userTimeline" pathParams={{ userId: user.id }} newWindow>{user.username}</LinkTo>
              </td>
              <td>{trimmedText(user.about, 25)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>);
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