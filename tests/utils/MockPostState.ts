import { vi } from 'vitest';
import * as toMock from '../../src/Post/PostState';

export function mockUsePostState(obj: Partial<toMock.PostState> = {}): toMock.PostState {
  const mocked: toMock.PostState = {
    isCreatingNewPost: false,
    createNewPost: vi.fn(),
    isLoadingWall: false,
    wall: [],
    updateWall: vi.fn(),
    ...obj
  };
  vi.spyOn(toMock, "usePostState").mockImplementation(() => mocked);
  return mocked;
}
