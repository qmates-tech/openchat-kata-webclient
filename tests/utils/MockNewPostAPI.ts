import { vi } from 'vitest';
import * as toMock from '../../src/Post/NewPostAPI';

export function mockNewPostAPI(obj: Partial<toMock.NewPostAPI> = {}): toMock.NewPostAPI {
  const mocked = {
    createNewPost: vi.fn(),
    ...obj
  };
  vi.spyOn(toMock, "createNewPostAPI").mockImplementation(() => mocked);
  return mocked;
}
