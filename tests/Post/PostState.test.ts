import { act, renderHook, waitFor } from '@testing-library/react';
import { mockUserSession } from '../utils/MockUserSession';
import { mockNewPostAPI, succeedWith, failsWith } from "../utils/MockNewPostAPI.ts";
import { usePostState } from "../../src/Post/PostState.ts";
import { Post } from "../../src/Post/Post.ts";

describe('PostState', () => {
  const aPost: Post = { id: "123", userId: "user-id", text: "text to publish", dateTime: "2021-09-01T00:00:00Z" };

  beforeEach(() => {
    mockUserSession();
  });

  describe('createNewPost', () => {
    it('should call the create new post API correctly', async () => {
      const mockedAPI = mockNewPostAPI();
      const { result } = renderHook(() => usePostState("user-id"));

      act(() => result.current.createNewPost("text to publish"));

      await waitFor(() => expect(mockedAPI.createNewPost).toHaveBeenCalledWith("user-id", "text to publish"));
    });

    it('should set creating status to false when API succeeded', async () => {
      mockNewPostAPI({ createNewPost: succeedWith(aPost) });
      const { result } = renderHook(() => usePostState("user-id"));

      act(() => result.current.createNewPost("text"));

      await waitFor(() => expect(result.current.isCreatingNewPost).toStrictEqual(true));
      await waitFor(() => expect(result.current.isCreatingNewPost).toStrictEqual(false));
    });

    it('should set creating status to false when API fails', async () => {
      mockNewPostAPI({ createNewPost: failsWith("any error", 100) });
      const { result } = renderHook(() => usePostState("user-id"));

      act(() => result.current.createNewPost("text"));

      await waitFor(() => expect(result.current.isCreatingNewPost).toStrictEqual(true));
      await waitFor(() => expect(result.current.isCreatingNewPost).toStrictEqual(false));
    });
  });
});
