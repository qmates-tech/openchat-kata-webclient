import { vi } from 'vitest';
import * as toMock from '../../src/Post/PostsAPI.ts';
import { delay } from "msw";
import { Post } from "../../src/Post/Post.ts";

export function mockNewPostAPI(obj: Partial<toMock.PostsAPI> = {}): toMock.PostsAPI {
  const mocked = {
    createNewPost: vi.fn(() => Promise.resolve(aPost())),
    retrieveWall: vi.fn(() => Promise.resolve([])),
    ...obj
  };
  vi.spyOn(toMock, "createPostsAPI").mockImplementation(() => mocked);
  return mocked;
}

export function succeedWith(post: Post, delayMs: number = 0) {
  return vi.fn().mockImplementation(async () => {
    await delay(delayMs);
    return post;
  });
}

export function failsWith(exception: toMock.NewPostAPIException | string, delayMs: number = 0) {
  return vi.fn().mockImplementation(async () => {
    await delay(delayMs);
    throw exception;
  });
}

function aPost() {
  return {
    id: 'post-id',
    userId: 'user-id',
    text: 'text',
    dateTime: '2021-09-01T00:00:00Z'
  };
}