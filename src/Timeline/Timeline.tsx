import { User } from "../User/User.ts";
import React, {useEffect} from "react";
import {usePostsListState} from "../Post/PostsList/PostsListState.tsx";
import {Post} from "../Post/Post.ts";
import {applyAllUserNames} from "../Post/PostWithName.ts";
import {PostsList} from "../Post/PostsList/PostsList.tsx";

export interface TimelineProps {
    user: User
    itsMe?: boolean
}

export function Timeline({ user , itsMe }: TimelineProps) {
    const { posts, replace } = usePostsListState();

    return <article className="timeline">
        <header>
            <h3>{title()}</h3>
        </header>
        <PostsList posts={posts} isLoading={false} />
    </article>;

    function title() {
        return itsMe ? 'Your Timeline' : `${user.username}'s Timeline`
    }
}