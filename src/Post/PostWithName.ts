import {Post} from "./Post.ts";
import {UUID} from "../helpers/uuid";

export type PostWithName = Post & { username: string };

export function applyUserName(post: Post, currentUserId: UUID): PostWithName {
    return {
        ...post,
        username: post.userId === currentUserId ? "You" : post.userId
    };
}

export function applyAllUserNames(posts: Post[], currentUserId: UUID): PostWithName[] {
    return posts.map(post => applyUserName(post, currentUserId));
}