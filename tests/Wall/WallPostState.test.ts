import { act, renderHook, waitFor } from '@testing-library/react';
import { mockUserSession } from '../utils/MockUserSession';
import { mockPostsAPI, succeedWith } from "../utils/MockPostsAPI.ts";
import { Post } from "../../src/Post/Post.ts";
import { describe } from "vitest";
import { useWallPostsState } from "../../src/Wall/WallPostState.ts";
import { wrapWithPostListState } from "../utils/renderHelpers.tsx";

describe('PostState', () => {
  const aPost: Post = { id: "123", userId: "user-id", text: "text to publish", dateTime: "2021-09-01T00:00:00Z" };
  const anotherPost: Post = { id: "456", userId: "user-id", text: "another text", dateTime: "2021-09-02T00:00:00Z" };

  beforeEach(() => {
    mockUserSession();
  });

  it('should update wall state at the hook initialization', async () => {
    const api = mockPostsAPI();

    renderHook(() => useWallPostsState("user-id", api), wrapWithPostListState());

    await waitFor(() => expect(api.retrieveWall).toHaveBeenCalledWith("user-id"));
  });

  it('should call the retrieve wall API correctly', async () => {
    const api = mockPostsAPI();
    const { result } = renderHook(() => useWallPostsState("user-id", api), wrapWithPostListState());

    act(() => result.current.update());

    await waitFor(() => expect(api.retrieveWall).toHaveBeenCalledWith("user-id"));
  });

  it(`should update the wall's posts state`, async () => {
    const api = mockPostsAPI({ retrieveWall: () => Promise.resolve([aPost]) });
    const { result } = renderHook(() => useWallPostsState("user-id", api), wrapWithPostListState());

    act(() => result.current.update());

    await waitFor(() => expect(result.current.wall).toStrictEqual([aPost]));
  });

  it(`should replace old values`, async () => {
    let wallApiResponse: Post[] = []
    const api = mockPostsAPI({ retrieveWall: () => Promise.resolve(wallApiResponse) });
    const { result } = renderHook(() => useWallPostsState("user-id", api), wrapWithPostListState());
    act(() => result.current.update());

    wallApiResponse = [anotherPost];
    act(() => result.current.update());

    await waitFor(() => expect(result.current.wall).toStrictEqual([anotherPost]));
  });

  it(`should set loading status to false when API succeeded`, async () => {
    const api = mockPostsAPI({ retrieveWall: succeedWith([aPost]) });
    const { result } = renderHook(() => useWallPostsState("user-id", api), wrapWithPostListState());

    act(() => result.current.update());

    expect(result.current.isLoading).toBeTruthy();
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
  });
});
