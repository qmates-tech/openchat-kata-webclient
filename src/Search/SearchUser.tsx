import { useEffect, useState } from 'react';
import { useModal } from '../helpers/Modal/ModalProvider';
import { useUserSession } from '../User/UserSessionState';
import './SearchUser.css';
import { SearchUserList } from './SearchUserList';

export function SearchUser() {
  const { retrieving, currentUser } = useUserSession();
  const { open, isClosed } = useModal();
  const [searchText, setSearchText] = useState('');

  useEffect(cleanSearchTextWhenModalClosed, [isClosed]);

  if (!currentUser || retrieving) {
    return <></>
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
      <button type="submit" aria-label='Search' disabled={searchText.length === 0} onClick={openUsersModal}>
        <i className="fa fa-search"></i>
      </button>
    </fieldset>
  );

  function openUsersModal() {
    open({
      title: `Users found for "${searchText}"`,
      content: <SearchUserList search={searchText} />
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