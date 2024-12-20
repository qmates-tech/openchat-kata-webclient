import { useEffect, useState } from 'react';
import { useModal } from '../helpers/Modal/ModalProvider';
import { useUserSession } from '../User/UserSessionState';
import './SearchUser.css';
import { SearchUserModalContent } from './SearchUserModalContent';

export function SearchUser() {
  const { retrieving, currentUser } = useUserSession();
  const { open, resume, pause, isClosed, isPaused } = useModal();
  const [searchText, setSearchText] = useState('');
  const searchIcon = isPaused ? 'fa-search-plus' : isClosed ? 'fa-search' : 'fa-search-minus';

  useEffect(cleanSearchTextWhenModalClosed, [isClosed]);

  if (!currentUser || retrieving) {
    return <></>
  }

  if (isPaused) {
    return <button
      type="button"
      aria-label='Search'
      disabled={searchText.length === 0}
      onClick={resume}
    >
      <i className={`fa fa-search-plus`}></i>
      &nbsp; <span>Resume search</span>
    </button>
  }

  return (
    <fieldset className="search-user" role="group">
      <input
        type="text"
        name="search-user"
        value={searchText}
        onChange={updateSearchText}
        onKeyDown={openModalOnEnter}
        placeholder="Search user"
      />
      <button
        type="submit"
        aria-label='Search'
        disabled={searchText.length === 0}
        onClick={openUsersModal}
      >
        <i className={`fa ${searchIcon}`}></i>
      </button>
    </fieldset>
  );

  function openUsersModal() {
    open({
      title: `Users found for "${searchText}"`,
      content: <SearchUserModalContent search={searchText} pauseModal={pause} />
    });
  }

  function openModalOnEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && searchText.length > 0) {
      event.preventDefault();
      openUsersModal();
    }
  }

  function updateSearchText(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function cleanSearchTextWhenModalClosed() {
    if (isClosed) {
      setSearchText('');
    }
  }
}