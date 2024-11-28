import { useRef } from 'react';
import { useModal } from '../helpers/Modal/ModalProvider';
import { useUserSession } from '../User/UserSessionState';
import './SearchUser.css';
import { SearchUserList } from './SearchUserList';

export function SearchUser() {
  const { retrieving, currentUser } = useUserSession();
  const { open } = useModal();
  const searchInput = useRef<HTMLInputElement>(null);

  if (!currentUser || retrieving) {
    return <></>
  }

  return (
    <fieldset className="search-user" role="group">
      <input
        ref={searchInput}
        type="text"
        name="search-user"
        placeholder="Search user"
      />
      <button type="submit" aria-label='Search' onClick={openUsersModal}>
        <i className="fa fa-search"></i>
      </button>
    </fieldset>
  );

  function openUsersModal() {
    const searchText = searchInput.current!.value;
    open(`Users found for "${searchText}"`, <SearchUserList search={searchText} />);
  }
}