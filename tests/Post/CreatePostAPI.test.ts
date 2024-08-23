import { HttpResponse } from 'msw';
import { createLoginAPI } from '../../src/Login/LoginAPI';
import { createMockServer } from '../utils/MockServer';
import { createCreatePostAPI } from "../../src/Post/CreatePostAPI.ts";
import { expect } from "vitest";

describe('CreatePostAPI', () => {
  const BASE_URL = 'http://msw.mockapi.local';

  const API = createCreatePostAPI(BASE_URL);
  const mockServer = createMockServer(BASE_URL);

  afterEach(() => {
    mockServer.resetHandlers();
  });

  it('returns the created post on success', async () => {
    const userId = "user-id";

    mockServer.interceptPost(`/users/${userId}/timeline`, HttpResponse.json({
      postId: "599dd5eb-fdea-4472-8baf-81ef7c18a2f2",
      userId: userId,
      text: "the very first post",
      dateTime: "2018-01-10T11:30:00Z"
    }));

    const createdPost = await API.createPost(userId, 'the very first post');

    expect(createdPost).toStrictEqual({
      id: '599dd5eb-fdea-4472-8baf-81ef7c18a2f2',
      userId: userId,
      text: "the very first post",
      dateTime: "2018-01-10T11:30:00Z"
    });
  });

  it('send properly request data to the API', async () => {
    const interceptor = mockServer.interceptPost('/users/an-id/timeline', createdPostOkResponse());

    await API.createPost('an-id', 'a post text');

    expect(interceptor.receivedJsonBody()).toStrictEqual({ text: 'a post text' });
  });
});

function createdPostOkResponse() {
  return HttpResponse.json({
    postId: "any",
    userId: "any",
    text: "any",
    dateTime: "2018-01-10T11:30:00Z"
  });
}
