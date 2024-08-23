import { vi } from 'vitest';
import * as toMock from '../../src/Post/NewPostAPI';
import { delay } from "msw";
import { Post } from "../../src/Post/Post.ts";
import { NewPostAPIException } from "../../src/Post/NewPostAPI";

export function mockNewPostAPI(obj: Partial<toMock.NewPostAPI> = {}): toMock.NewPostAPI {
  const mocked = {
    createNewPost: vi.fn(() => Promise.resolve(aPost())),
    ...obj
  };
  vi.spyOn(toMock, "createNewPostAPI").mockImplementation(() => mocked);
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