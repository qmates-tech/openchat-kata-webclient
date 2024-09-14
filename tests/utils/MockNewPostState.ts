import { vi } from 'vitest';
import * as toMock from '../../src/Post/NewPost/NewPostState';

export function mockNewPostState(obj: Partial<toMock.NewPostState> = {}): toMock.NewPostState {
  const mocked = {
    isCreating: false,
    error: undefined,
    post: undefined,
    create: vi.fn(),
    ...obj
  };
  vi.spyOn(toMock, "useNewPostState").mockImplementation(() => mocked);
  return mocked;
}
