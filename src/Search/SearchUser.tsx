import { useUserSession } from '../User/UserSessionState';
import './SearchUser.css';

export function SearchUser() {
  const { retrieving, currentUser } = useUserSession();

  if (!currentUser || retrieving) {
    return <></>
  }

  return (
    <fieldset className="search-user" role="group">
      <input
        type="text"
        name="search-user"
        placeholder="Search user"
      />
      <button type="submit" aria-label='Search' onClick={() => alert('Coming Soon')}>
        <i className="fa fa-search"></i>
      </button>
    </fieldset>
  );
}