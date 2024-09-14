import { act, renderHook, waitFor } from '@testing-library/react';
import { wrapWithPostListState } from '../../utils/renderHelpers.tsx';
import { usePostsListState } from "../../../src/Post/PostsList/PostsListState.tsx";

describe('PostsListState', () => {
  it('throw error if it is used outside its Provider', async () => {
    suppressConsoleErrors();

    expect(() => renderHook(usePostsListState))
      .toThrowError('usePostsListState must be used within a PostsListStateProvider');
  });

  it('should give empty posts on init', async () => {
    const { result } = renderHook(usePostsListState, wrapWithPostListState());

    expect(result.current.posts).toStrictEqual([]);
  });

  it('should replace the posts list', async () => {
    const firstPost = { id: "123", userId: "user-id", text: "text 1", dateTime: "2021-09-01T00:00:00Z", username: "You" };
    const secondPost = { id: "321", userId: "user-id", text: "text 2", dateTime: "2021-09-02T00:00:00Z", username: "You" };
    const anotherPost = { id: "456", userId: "another-id", text: "a text", dateTime: "2024-10-22T00:00:00Z", username: "another-id" };
    const { result } = renderHook(usePostsListState, wrapWithPostListState());
    act(() => result.current.replace([firstPost, secondPost]));

    act(() => result.current.replace([anotherPost]));

    await waitFor(() => expect(result.current.posts).toStrictEqual([anotherPost]));
  });

  it('should prepend to the posts list', async () => {
    const firstPost = { id: "123", userId: "user-id", text: "text 1", dateTime: "2021-09-01T00:00:00Z", username: "You" };
    const secondPost = { id: "321", userId: "user-id", text: "text 2", dateTime: "2021-09-02T00:00:00Z", username: "You" };
    const anotherPost = { id: "456", userId: "another-id", text: "a text", dateTime: "2024-10-22T00:00:00Z", username: "another-id" };
    const { result } = renderHook(usePostsListState, wrapWithPostListState());
    act(() => result.current.replace([firstPost, secondPost]));

    act(() => result.current.prepend(anotherPost));

    await waitFor(() => expect(result.current.posts).toStrictEqual([anotherPost, firstPost, secondPost]));
  });
});

function suppressConsoleErrors() {
  vi.spyOn(console, 'error').mockImplementation(() => {
  });
}

