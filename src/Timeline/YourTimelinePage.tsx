import React from "react";
import { Timeline } from "./Timeline.tsx";
import { useUserSession } from "../User/UserSessionState.tsx";

export function YourTimelinePage() {
    const { currentUser } = useUserSession();

    return <Timeline itsMe user={currentUser!} />;
}
