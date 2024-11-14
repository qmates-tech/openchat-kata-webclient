import { User } from "../User/User.ts";
import React from "react";

export interface TimelineProps {
    user: User
    itsMe?: boolean
}

export function Timeline({ user , itsMe }: TimelineProps) {
    return <article className="timeline">
        <header>
            <h3>{title()}</h3>
        </header>
    </article>;

    function title() {
        return itsMe ? 'Your Timeline' : `${user.username}'s Timeline`
    }
}