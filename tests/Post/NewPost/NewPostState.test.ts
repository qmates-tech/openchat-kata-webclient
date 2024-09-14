import { act, renderHook, waitFor } from '@testing-library/react';
import { mockUserSession } from '../../utils/MockUserSession.ts';
import { Post } from "../../../src/Post/Post.ts";
import { describe } from "vitest";
import { NewPostAPIException } from "../../../src/Post/NewPost/NewPostsAPI.ts";
import { useNewPostState } from "../../../src/Post/NewPost/NewPostState.ts";
import { wrapWithPostListState } from "../../utils/renderHelpers.tsx";
import { mockPostListState } from "../../utils/MockPostListState.ts";
import { mockNewPostsAPI } from "../../utils/MockNewPostsAPI.ts";
import { failsWith, succeedWith } from "../../utils/APIResponseMock.ts";
import {mockUseLogoutState} from "../../utils/MockLogoutState.ts";

describe('NewPostState', () => {
  const aPost: Post = { id: "123", userId: "user-id", text: "text to publish", dateTime: "2021-09-01T00:00:00Z" };

  beforeEach(() => {
    mockUseLogoutState();
    mockPostListState();
  });

  it('should call the create new post API correctly', async () => {
    const api = mockNewPostsAPI();
    const { result } = renderHook(() => useNewPostState("user-id", api), wrapWithPostListState());

    act(() => result.current.create("text to publish"));

    await waitFor(() => expect(api.createNewPost).toHaveBeenCalledWith("user-id", "text to publish"));
  });

  it('should set creating status to false when API succeeded', async () => {
    const api = mockNewPostsAPI({ createNewPost: succeedWith(aPost) });
    const { result } = renderHook(() => useNewPostState("user-id", api), wrapWithPostListState());

    act(() => result.current.create("text"));

    expect(result.current.isCreating).toStrictEqual(true);
    await waitFor(() => expect(result.current.isCreating).toStrictEqual(false));
  });

  it('should set creating status to false when API fails', async () => {
    const logoutStateMock = mockUseLogoutState();
    const api = mockNewPostsAPI({ createNewPost: failsWith("any error") });
    const { result } = renderHook(() => useNewPostState("user-id", api), wrapWithPostListState());

    act(() => result.current.create("text"));

    expect(result.current.isCreating).toStrictEqual(true);
    await waitFor(() => expect(result.current.isCreating).toStrictEqual(false));
    await waitFor(() => expect(logoutStateMock.logout).not.toHaveBeenCalled());
  });

  it('should handle USER_NOT_FOUND error and perform a logout', async () => {
    const logoutStateMock = mockUseLogoutState();
    const api = mockNewPostsAPI({ createNewPost: failsWith<NewPostAPIException>("USER_NOT_FOUND") });
    const { result } = renderHook(() => useNewPostState("user-id", api), wrapWithPostListState());

    act(() => result.current.create("text"));

    await waitFor(() => expect(result.current.error).toBe("User not found"));
    await waitFor(() => expect(logoutStateMock.logout).toHaveBeenCalled());
  });

  it('should handle INAPPROPRIATE_LANGUAGE error', async () => {
    const api = mockNewPostsAPI({ createNewPost: failsWith<NewPostAPIException>("INAPPROPRIATE_LANGUAGE") });
    const { result } = renderHook(() => useNewPostState("user-id", api), wrapWithPostListState());

    act(() => result.current.create("text"));

    await waitFor(() => expect(result.current.error).toBe("Inappropriate language detected"));
  });

  it('should handle NETWORK_ERROR error', async () => {
    const api = mockNewPostsAPI({ createNewPost: failsWith<NewPostAPIException>("NETWORK_ERROR") });
    const { result } = renderHook(() => useNewPostState("user-id", api), wrapWithPostListState());

    act(() => result.current.create("text"));

    await waitFor(() => expect(result.current.error).toBe("Network error"));
  });

  it('should handle as generic error any other unhandled error', async () => {
    const api = mockNewPostsAPI({ createNewPost: failsWith<NewPostAPIException>("any other error") });
    const { result } = renderHook(() => useNewPostState("user-id", api), wrapWithPostListState());

    act(() => result.current.create("text"));

    await waitFor(() => expect(result.current.error).toBe("Generic error"));
  });

  it('should cleanup the error on every new createNewPost request', async () => {
    const api = mockNewPostsAPI({ createNewPost: succeedWith(aPost) });
    const mockedPostListState = mockPostListState();
    const { result } = renderHook(() => useNewPostState("user-id", api));

    act(() => result.current.create("text"));

    await waitFor(() => expect(mockedPostListState.prepend).toHaveBeenCalledTimes(1));
  });

  it('should clean the error after a new post is created', async () => {
    let response = failsWith<NewPostAPIException>("any other error");
    const api = mockNewPostsAPI({ createNewPost: () => response() });
    const { result } = renderHook(() => useNewPostState("user-id", api), wrapWithPostListState());
    act(() => result.current.create("text"));
    await waitFor(() => expect(result.current.error).toStrictEqual("Generic error"));

    response = succeedWith(aPost);
    act(() => result.current.create("text"));

    await waitFor(() => expect(result.current.error).toStrictEqual(undefined));
  });

  it('should update the wall state after a new post is created', async () => {
    const aPost = { id: "123", userId: "user-id", text: "post-test", dateTime: "a-date" };
    const postListStateMock = mockPostListState();
    const api = mockNewPostsAPI({ createNewPost: succeedWith(aPost) });
    const { result } = renderHook(() => useNewPostState("user-id", api));

    act(() => result.current.create("text"));

    const expectedUserPost = { id: "123", userId: "user-id", text: "post-test", dateTime: "a-date", username: "You" };
    await waitFor(() => expect(postListStateMock.prepend).toHaveBeenCalledWith(expectedUserPost));
    await waitFor(() => expect(result.current.post).toStrictEqual(expectedUserPost));
  });
});
