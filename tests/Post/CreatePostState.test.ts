import { act, renderHook, waitFor } from '@testing-library/react';
import { mockUserSession } from '../utils/MockUserSession';
import { failsWith, mockPostsAPI, succeedWith } from "../utils/MockPostsAPI.ts";
import { Post } from "../../src/Post/Post.ts";
import { describe } from "vitest";
import { NewPostAPIException } from "../../src/Post/PostsAPI.ts";
import { useNewPostState } from "../../src/Post/NewPostState.ts";
import { wrapWithPostListState } from "../utils/renderHelpers.tsx";
import { mockPostListState } from "../utils/MockPostListState.ts";

describe('CreatePostState', () => {
  const aPost: Post = { id: "123", userId: "user-id", text: "text to publish", dateTime: "2021-09-01T00:00:00Z" };

  beforeEach(() => {
    mockUserSession();
    mockPostListState();
  });

  it('should call the create new post API correctly', async () => {
    const api = mockPostsAPI();
    const { result } = renderHook(() => useNewPostState("user-id", api), wrapWithPostListState());

    act(() => result.current.create("text to publish"));

    await waitFor(() => expect(api.createNewPost).toHaveBeenCalledWith("user-id", "text to publish"));
  });

  it('should set creating status to false when API succeeded', async () => {
    const api = mockPostsAPI({ createNewPost: succeedWith(aPost) });
    const { result } = renderHook(() => useNewPostState("user-id", api), wrapWithPostListState());

    act(() => result.current.create("text"));

    expect(result.current.isCreating).toStrictEqual(true);
    await waitFor(() => expect(result.current.isCreating).toStrictEqual(false));
  });

  it('should set creating status to false when API fails', async () => {
    const api = mockPostsAPI({ createNewPost: failsWith("any error") });
    const { result } = renderHook(() => useNewPostState("user-id", api), wrapWithPostListState());

    act(() => result.current.create("text"));

    expect(result.current.isCreating).toStrictEqual(true);
    await waitFor(() => expect(result.current.isCreating).toStrictEqual(false));
  });

  it('should handle USER_NOT_FOUND error', async () => {
    const api = mockPostsAPI({ createNewPost: failsWith<NewPostAPIException>("USER_NOT_FOUND") });
    const { result } = renderHook(() => useNewPostState("user-id", api), wrapWithPostListState());

    act(() => result.current.create("text"));

    await waitFor(() => expect(result.current.error).toBe("User not found"));
  });

  it('should handle INAPPROPRIATE_LANGUAGE error', async () => {
    const api = mockPostsAPI({ createNewPost: failsWith<NewPostAPIException>("INAPPROPRIATE_LANGUAGE") });
    const { result } = renderHook(() => useNewPostState("user-id", api), wrapWithPostListState());

    act(() => result.current.create("text"));

    await waitFor(() => expect(result.current.error).toBe("Inappropriate language detected"));
  });

  it('should handle NETWORK_ERROR error', async () => {
    const api = mockPostsAPI({ createNewPost: failsWith<NewPostAPIException>("NETWORK_ERROR") });
    const { result } = renderHook(() => useNewPostState("user-id", api), wrapWithPostListState());

    act(() => result.current.create("text"));

    await waitFor(() => expect(result.current.error).toBe("Network error"));
  });

  it('should handle as generic error any other unhandled error', async () => {
    const api = mockPostsAPI({ createNewPost: failsWith<NewPostAPIException>("any other error") });
    const { result } = renderHook(() => useNewPostState("user-id", api), wrapWithPostListState());

    act(() => result.current.create("text"));

    await waitFor(() => expect(result.current.error).toBe("Generic error"));
  });

  it('should cleanup the error on every new createNewPost request', async () => {
    const api = mockPostsAPI({ createNewPost: succeedWith(aPost) });
    const mockedPostListState = mockPostListState();
    const { result } = renderHook(() => useNewPostState("user-id", api));

    act(() => result.current.create("text"));

    await waitFor(() => expect(mockedPostListState.prepend).toHaveBeenCalledTimes(1));
  });

  it('should update the wall state after a new post is created', async () => {
    let response = failsWith<NewPostAPIException>("any other error");
    const api = mockPostsAPI({ createNewPost: () => response() });
    const { result } = renderHook(() => useNewPostState("user-id", api), wrapWithPostListState());
    act(() => result.current.create("text"));
    await waitFor(() => expect(result.current.error).toStrictEqual("Generic error"));

    response = succeedWith(aPost);
    act(() => result.current.create("text"));

    await waitFor(() => expect(result.current.error).toStrictEqual(undefined));
  });
});
