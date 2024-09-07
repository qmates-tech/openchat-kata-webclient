import { renderHook, waitFor } from '@testing-library/react';
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
      const api = mockNewPostAPI();
      const { result } = renderHook(() => usePostState("user-id", api));

      await result.current.createNewPost("text to publish");

      await waitFor(() => expect(api.createNewPost).toHaveBeenCalledWith("user-id", "text to publish"));
    });

    it('should set creating status to false when API succeeded', async () => {
      const api = mockNewPostAPI({ createNewPost: succeedWith(aPost) });
      const { result } = renderHook(() => usePostState("user-id", api));

      await result.current.createNewPost("text");

      expect(result.current.isCreatingNewPost).toStrictEqual(true);
      await waitFor(() => expect(result.current.isCreatingNewPost).toStrictEqual(false));
    });

    it('should set creating status to false when API fails', async () => {
      const api = mockNewPostAPI({ createNewPost: failsWith("any error") });
      const { result } = renderHook(() => usePostState("user-id", api));

      await result.current.createNewPost("text");

      expect(result.current.isCreatingNewPost).toStrictEqual(true);
      await waitFor(() => expect(result.current.isCreatingNewPost).toStrictEqual(false));
    });
  });
});
