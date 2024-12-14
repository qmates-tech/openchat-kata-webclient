import { SearchUsersState } from "../User/UsersByNameState";
import './SearchUserList.css';

export type SearchUserListProps = SearchUsersState;

export function SearchUserList({ retrieving }: SearchUserListProps) {
  return (<div className="search-user-list">
    <div data-testid="spinner" aria-busy={retrieving}></div>
    {!retrieving && <NotFound />}
  </div>);
}

function NotFound() {
  return (
    <div className="not-found">
      <i></i>
      <span>No users found.</span>
    </div>
  );
}