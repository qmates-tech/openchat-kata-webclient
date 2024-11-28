import { useParams } from "react-router-dom";
import { PageNotFound } from "../NotFound/PageNotFound.tsx";
import { useUserById } from "../User/UserByIdState.ts";
import { Timeline } from "./Timeline.tsx";

export function UserTimelinePage() {
  const { userId } = useParams();
  const { user, error, retrieving } = useUserById(userId);

  if (retrieving) {
    return <></>;
  }

  if (error) {
    return <PageNotFound />;
  }

  return <Timeline user={user!} />;
}
