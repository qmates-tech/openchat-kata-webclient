import { act, renderHook, waitFor } from '@testing-library/react';
import { mockUserSession } from '../utils/MockUserSession';
import { failsWith, mockPostsAPI, succeedWith } from "../utils/MockPostsAPI.ts";
import { usePostState } from "../../src/Post/PostState.ts";
import { Post } from "../../src/Post/Post.ts";
import { describe } from "vitest";
import { mockCreateLoginAPI } from "../utils/MockLoginAPI.ts";
import { useLoginState } from "../../src/Login/LoginState.ts";
import { NewPostAPIException } from "../../src/Post/PostsAPI.ts";

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

    it('should handle USER_NOT_FOUND error', async () => {
      const api = mockPostsAPI({ createNewPost: failsWith<NewPostAPIException>("USER_NOT_FOUND") });
      const { result } = renderHook(() => usePostState("user-id", api));

      act(() => result.current.createNewPost("text"));

      await waitFor(() => expect(result.current.createNewPostError).toBe("User not found"));
    });

    it('should handle INAPPROPRIATE_LANGUAGE error', async () => {
      const api = mockPostsAPI({ createNewPost: failsWith<NewPostAPIException>("INAPPROPRIATE_LANGUAGE") });
      const { result } = renderHook(() => usePostState("user-id", api));

      act(() => result.current.createNewPost("text"));

      await waitFor(() => expect(result.current.createNewPostError).toBe("Inappropriate language detected"));
    });

    it('should handle NETWORK_ERROR error', async () => {
      const api = mockPostsAPI({ createNewPost: failsWith<NewPostAPIException>("NETWORK_ERROR") });
      const { result } = renderHook(() => usePostState("user-id", api));

      act(() => result.current.createNewPost("text"));

      await waitFor(() => expect(result.current.createNewPostError).toBe("Network error"));
    });

    it('should handle as generic error any other unhandled error', async () => {
      const api = mockPostsAPI({ createNewPost: failsWith<NewPostAPIException>("any other error") });
      const { result } = renderHook(() => usePostState("user-id", api));

      act(() => result.current.createNewPost("text"));

      await waitFor(() => expect(result.current.createNewPostError).toBe("Generic error"));
    });

    it('should cleanup the error on every new createNewPost request', async () => {
      const api = mockPostsAPI({ createNewPost: succeedWith(aPost) });
      const { result } = renderHook(() => usePostState("user-id", api));

      act(() => result.current.createNewPost("text"));

      await waitFor(() => expect(api.retrieveWall).toHaveBeenCalledTimes(2));
    });

    it('should update the wall state after a new post is created', async () => {
      let response = failsWith<NewPostAPIException>("any other error");
      const api = mockPostsAPI({ createNewPost: () => response() });
      const { result } = renderHook(() => usePostState("user-id", api));
      act(() => result.current.createNewPost("text"));
      await waitFor(() => expect(result.current.createNewPostError).toStrictEqual("Generic error"));

      response = succeedWith(aPost);
      act(() => result.current.createNewPost("text"));

      await waitFor(() => expect(result.current.createNewPostError).toStrictEqual(undefined));
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
