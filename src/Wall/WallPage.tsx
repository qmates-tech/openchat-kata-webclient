import { useUserSession } from '../User/UserSessionState';
import { Wall } from "./Wall.tsx";
import './WallPage.css';

export function WallPage() {
  const { currentUser } = useUserSession();

  return <Wall user={currentUser!}></Wall>;
}
