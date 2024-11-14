import { User } from "../User/User.ts";
import React, {useEffect} from "react";
import {usePostsListState} from "../Post/PostsList/PostsListState.tsx";
import {Post} from "../Post/Post.ts";
import {applyAllUserNames} from "../Post/PostWithName.ts";
import {PostsList} from "../Post/PostsList/PostsList.tsx";
import {useTimelinePostsState} from "./TimelinePostState.ts";
import {NewPostForm} from "../Post/NewPost/NewPostForm.tsx";
import {useNewPostState} from "../Post/NewPost/NewPostState.ts";

export interface TimelineProps {
    user: User
    itsMe?: boolean
}

export function Timeline({ user , itsMe }: TimelineProps) {
    const createPostState = useNewPostState(user.id);
    const { timeline } = useTimelinePostsState(user.id);

    return <article className="timeline">
        <header>
            <h3>{title()}</h3>
        </header>
        {itsMe && <NewPostForm {...createPostState} />}
        <PostsList hideOwners posts={timeline} isLoading={false} />
    </article>;

    function title() {
        return itsMe ? 'Your Timeline' : `${user.username}'s Timeline`
    }
}