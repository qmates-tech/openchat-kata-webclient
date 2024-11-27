import { useUserSession } from "../User/UserSessionState.tsx";
import { Timeline } from "./Timeline.tsx";

export function YourTimelinePage() {
    const { currentUser } = useUserSession();

    return <Timeline itsMe user={currentUser!} />;
}
