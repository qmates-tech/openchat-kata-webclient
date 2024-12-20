import { useNavigationState } from "../Navigation/NavigationState";
import { User } from "../User/User";
import { useUsersByName } from "../User/UsersByNameState";
import { SearchUserList } from "./SearchUserList";

export type SearchUserModalContentProps = {
  search: string;
  pauseModal: () => void;
};

export function SearchUserModalContent({ search, pauseModal }: SearchUserModalContentProps) {
  const { navigateTo } = useNavigationState();
  const usersState = useUsersByName(search);

  return <SearchUserList {...usersState} onUserSelected={onUserSelected} />;

  function onUserSelected(userId: User["id"]) {
    pauseModal();
    navigateTo({ to: "userTimeline", pathParams: { userId } });
  }
}