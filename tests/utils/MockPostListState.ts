import { vi } from 'vitest';
import * as toMock from '../../src/Post/PostsListState.tsx';

export function mockPostListState(obj: Partial<toMock.PostsListState> = {}): toMock.PostsListState {
  const mocked = {
    posts: [],
    replace: vi.fn(),
    prepend: vi.fn(),
    ...obj
  };
  vi.spyOn(toMock, "usePostsListState").mockImplementation(() => mocked);
  return mocked;
}
