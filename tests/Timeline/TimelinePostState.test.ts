import { act, renderHook, waitFor } from '@testing-library/react';
import { Post } from "../../src/Post/Post.ts";
import { useTimelinePostsState } from "../../src/Timeline/TimelinePostState.ts";
import { succeedWith } from "../utils/MockAPIResponse.ts";
import { mockTimelinePostsAPI } from "../utils/MockTimelinePostsAPI.ts";
import { mockUserSession } from '../utils/MockUserSession';
import { wrapWithPostListState } from "../utils/renderHelpers.tsx";

describe('TimelinePostState', () => {
  const aPost: Post = { id: "123", userId: "user-id", text: "text to publish", dateTime: "2021-09-01T00:00:00Z" };

  beforeEach(() => {
    mockUserSession();
  });

  it('should update timeline state at the hook initialization', async () => {
    const api = mockTimelinePostsAPI();

    renderHook(() => useTimelinePostsState("user-id", api), wrapWithPostListState());

    await waitFor(() => expect(api.retrieveTimeline).toHaveBeenCalledWith("user-id"));
  });

  it('should call the retrieve timeline API correctly', async () => {
    const api = mockTimelinePostsAPI();
    const { result } = renderHook(() => useTimelinePostsState("user-id", api), wrapWithPostListState());

    act(() => result.current.update());

    await waitFor(() => expect(api.retrieveTimeline).toHaveBeenCalledWith("user-id"));
  });

  it(`should update the timeline's posts state`, async () => {
    const aPost = { id: "123", userId: 'user-id', text: "text", dateTime: "a-date" };
    const api = mockTimelinePostsAPI({ retrieveTimeline: succeedWith([aPost]) });
    const { result } = renderHook(() => useTimelinePostsState("user-id", api), wrapWithPostListState());

    act(() => result.current.update());

    await waitFor(() => expect(result.current.timeline).toStrictEqual([
      { id: "123", userId: "user-id", text: "text", dateTime: "a-date", username: "You" }
    ]));
  });

  it(`should replace old values`, async () => {
    let timelineApiResponse: Post[] = []
    const api = mockTimelinePostsAPI({ retrieveTimeline: () => Promise.resolve(timelineApiResponse) });
    const { result } = renderHook(() => useTimelinePostsState("user-id", api), wrapWithPostListState());
    act(() => result.current.update());


    timelineApiResponse = [
        { id: "456", userId: 'another-id', text: "another", dateTime: "another-date" },
        { id: "123", userId: 'user-id', text: "user", dateTime: "user-date" }
    ];
    act(() => result.current.update());

    await waitFor(() => expect(result.current.timeline).toStrictEqual([
      { id: "456", userId: 'another-id', text: "another", dateTime: "another-date", username: "another-id" },
      { id: "123", userId: 'user-id', text: "user", dateTime: "user-date", username: "You" }
    ]));
  });

  it(`should set loading status to false when API succeeded`, async () => {
    const api = mockTimelinePostsAPI({ retrieveTimeline: succeedWith([aPost]) });
    const { result } = renderHook(() => useTimelinePostsState("user-id", api), wrapWithPostListState());

    act(() => result.current.update());

    expect(result.current.isLoading).toBeTruthy();
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
  });
});
