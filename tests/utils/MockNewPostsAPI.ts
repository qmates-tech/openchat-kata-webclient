import { vi } from 'vitest';
import { NewPostsAPI } from '../../src/Post/NewPostsAPI.ts';

export function mockNewPostsAPI(obj: Partial<NewPostsAPI> = {}): NewPostsAPI {
  return {
    createNewPost: vi.fn(() => Promise.resolve({
      id: 'post-id',
      userId: 'user-id',
      text: 'text',
      dateTime: '2021-09-01T00:00:00Z'
    })),
    ...obj
  };
}
