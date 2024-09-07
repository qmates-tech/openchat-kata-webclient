import { vi } from 'vitest';
import { PostsAPI, NewPostAPIException } from '../../src/Post/PostsAPI.ts';
import { delay } from "msw";
import { Post } from "../../src/Post/Post.ts";

export function mockPostsAPI(obj: Partial<PostsAPI> = {}): PostsAPI {
  return {
    createNewPost: vi.fn(() => Promise.resolve(aPost())),
    retrieveWall: vi.fn(() => Promise.resolve([])),
    ...obj
  };
}

export function succeedWith<T>(response: T, delayMs: number = 0) {
  return vi.fn().mockImplementation(async () => {
    await delay(delayMs);
    return response;
  });
}

export function failsWith<E>(exception: E | string, delayMs: number = 0) {
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