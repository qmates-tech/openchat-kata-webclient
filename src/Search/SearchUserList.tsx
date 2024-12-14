import { SearchUsersState } from "../User/UsersByNameState";
import './SearchUserList.css';

export type SearchUserListProps = SearchUsersState;

export function SearchUserList({ }: SearchUserListProps) {
  return (<div className="search-user-list">
    <div className="not-found">
      <i></i>
      <span>No users found.</span>
    </div>
  </div>);
}