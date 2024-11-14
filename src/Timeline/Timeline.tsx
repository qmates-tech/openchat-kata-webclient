import {User} from "../User/User.ts";
import React from "react";

export interface TimelineProps {
    user: User
    itsMe?: boolean
}

export function Timeline({ user , itsMe }: TimelineProps) {
    return <>Your Timeline</>
}