import { useEffect, useState } from "react";
import { usePostsListState } from "../Post/PostsList/PostsListState.tsx";
import { createTimelinePostsAPI, TimelinePostsAPI } from "./TimelinePostsAPI.ts";
import { Post } from "../Post/Post.ts";
import { applyAllUserNames, PostWithName } from "../Post/PostWithName.ts";

const timelinePostsAPI = createTimelinePostsAPI();

export type TimelinePostsState = {
  isLoading: boolean;
  timeline: PostWithName[];
  update(): void;
}

export function useTimelinePostsState(userId: string, API: TimelinePostsAPI = timelinePostsAPI): TimelinePostsState {
  const { posts, replace } = usePostsListState();

  useEffect(update, []);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading,
    timeline: posts,
    update
  };

  function update() {
    setIsLoading(true);
    API.retrieveTimeline(userId)
      .then((posts: Post[]) => {
        return replace(applyAllUserNames(posts, userId));
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }
}
