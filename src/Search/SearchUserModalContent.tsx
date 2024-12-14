import { useUsersByName } from "../User/UsersByNameState";
import { SearchUserList } from "./SearchUserList";

export type SearchUserModalContentProps = {
  search: string;
};

export function SearchUserModalContent({ search }: SearchUserModalContentProps) {
  const usersState = useUsersByName(search);
  return <SearchUserList {...usersState} />;
}