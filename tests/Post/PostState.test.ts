import { renderHook } from '@testing-library/react';
import { mockUserSession } from '../utils/MockUserSession';
import { mockNewPostAPI } from "../utils/MockNewPostAPI.ts";
import { usePostState } from "../../src/Post/PostState.ts";

describe('PostState', () => {
  beforeEach(() => {
    mockUserSession();
  });

  it('should call the API correctly', async () => {
    const mockedAPI = mockNewPostAPI();
    const state = renderHook(() => usePostState("user-id")).result.current;

    await state.createNewPost("text to publish");

    expect(mockedAPI.createNewPost).toHaveBeenCalledWith("user-id", "text to publish");
  });
});
