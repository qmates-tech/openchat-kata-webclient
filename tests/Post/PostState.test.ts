import { act, renderHook, waitFor } from '@testing-library/react';
import { mockUserSession } from '../utils/MockUserSession';
import { failsWith, mockPostsAPI, succeedWith } from "../utils/MockPostsAPI.ts";
import { usePostState } from "../../src/Post/PostState.ts";
import { Post } from "../../src/Post/Post.ts";
import { describe } from "vitest";

describe('PostState', () => {
  const aPost: Post = { id: "123", userId: "user-id", text: "text to publish", dateTime: "2021-09-01T00:00:00Z" };
  const anotherPost: Post = { id: "456", userId: "user-id", text: "another text", dateTime: "2021-09-02T00:00:00Z" };

  beforeEach(() => {
    mockUserSession();
  });

  describe('createNewPost', () => {
    it('should call the create new post API correctly', async () => {
      const api = mockPostsAPI();
      const { result } = renderHook(() => usePostState("user-id", api));

      act(() => result.current.createNewPost("text to publish"));

      await waitFor(() => expect(api.createNewPost).toHaveBeenCalledWith("user-id", "text to publish"));
    });

    it('should set creating status to false when API succeeded', async () => {
      const api = mockPostsAPI({ createNewPost: succeedWith(aPost) });
      const { result } = renderHook(() => usePostState("user-id", api));

      act(() => result.current.createNewPost("text"));

      expect(result.current.isCreatingNewPost).toStrictEqual(true);
      await waitFor(() => expect(result.current.isCreatingNewPost).toStrictEqual(false));
    });

    it('should set creating status to false when API fails', async () => {
      const api = mockPostsAPI({ createNewPost: failsWith("any error") });
      const { result } = renderHook(() => usePostState("user-id", api));

      act(() => result.current.createNewPost("text"));

      expect(result.current.isCreatingNewPost).toStrictEqual(true);
      await waitFor(() => expect(result.current.isCreatingNewPost).toStrictEqual(false));
    });

    it('should update the wall state after a new post is created', async () => {
      const api = mockPostsAPI({ createNewPost: succeedWith(aPost) });
      const { result } = renderHook(() => usePostState("user-id", api));

      act(() => result.current.createNewPost("text"));

      await waitFor(() => expect(api.retrieveWall).toHaveBeenCalledTimes(2));
    });
  });

  describe('updateWall', () => {
    it('should update wall state at the hook initialization', async () => {
      const api = mockPostsAPI();

      renderHook(() => usePostState("user-id", api));

      await waitFor(() => expect(api.retrieveWall).toHaveBeenCalledWith("user-id"));
    });

    it('should call the retrieve wall API correctly', async () => {
      const api = mockPostsAPI();
      const { result } = renderHook(() => usePostState("user-id", api));

      act(() => result.current.updateWall());

      await waitFor(() => expect(api.retrieveWall).toHaveBeenCalledWith("user-id"));
    });

    it(`should update the wall's posts state`, async () => {
      const api = mockPostsAPI({ retrieveWall: () => Promise.resolve([aPost]) });
      const { result } = renderHook(() => usePostState("user-id", api));

      act(() => result.current.updateWall());

      await waitFor(() => expect(result.current.wall).toStrictEqual([aPost]));
    });

    it(`should replace old values`, async () => {
      let wallApiResponse: Post[] = []
      const api = mockPostsAPI({ retrieveWall: () => Promise.resolve(wallApiResponse) });
      const { result } = renderHook(() => usePostState("user-id", api));
      act(() => result.current.updateWall());

      wallApiResponse = [anotherPost];
      act(() => result.current.updateWall());

      await waitFor(() => expect(result.current.wall).toStrictEqual([anotherPost]));
    });

    it(`should set loading status to false when API succeeded`, async () => {
      const api = mockPostsAPI({ retrieveWall: succeedWith([aPost]) });
      const { result } = renderHook(() => usePostState("user-id", api));

      act(() => result.current.updateWall());

      expect(result.current.isLoadingWall).toBeTruthy();
      await waitFor(() => expect(result.current.isLoadingWall).toBeFalsy());
    });
  });
});
