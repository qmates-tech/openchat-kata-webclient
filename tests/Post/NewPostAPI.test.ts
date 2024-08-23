import { HttpResponse } from 'msw';
import { createMockServer } from '../utils/MockServer';
import { createNewPostAPI } from "../../src/Post/NewPostAPI.ts";
import { expect } from "vitest";

describe('NewPostAPI', () => {
  const BASE_URL = 'http://msw.mockapi.local';
  const API = createNewPostAPI(BASE_URL);
  const mockServer = createMockServer(BASE_URL);

  afterEach(() => {
    mockServer.resetHandlers();
  });

  it('returns the created post on success', async () => {
    mockServer.interceptPost(`/users/user-id/timeline`, HttpResponse.json({
      postId: "599dd5eb-fdea-4472-8baf-81ef7c18a2f2",
      userId: "user-id",
      text: "the very first post",
      dateTime: "2018-01-10T11:30:00Z"
    }));

    const createdPost = await API.createNewPost("user-id", 'the very first post');

    expect(createdPost).toStrictEqual({
      id: '599dd5eb-fdea-4472-8baf-81ef7c18a2f2',
      userId: "user-id",
      text: "the very first post",
      dateTime: "2018-01-10T11:30:00Z"
    });
  });

  it('send properly request data to the API', async () => {
    const interceptor = mockServer.interceptPost('/users/an-id/timeline', createdPostOkResponse());

    await API.createNewPost('an-id', 'a post text');

    expect(interceptor.receivedJsonBody()).toStrictEqual({ text: 'a post text' });
  });

  it('throws USER_NOT_FOUND error when status code is 404', async () => {
    mockServer.interceptPost('/users/wrong-id/timeline', notFoundResponse());

    await expect(async () => {
      await API.createNewPost('wrong-id', 'any');
    }).rejects.toThrow("USER_NOT_FOUND");
  });

  it('throws INAPPROPRIATE_LANGUAGE error when status code is 400', async () => {
    mockServer.interceptPost('/users/an-id/timeline', badRequestResponse());

    await expect(async () => {
      await API.createNewPost('an-id', 'inappropriate language here!');
    }).rejects.toThrow("INAPPROPRIATE_LANGUAGE");
  });

  it('throws Network Error when Server is not reachable', async () => {
    mockServer.interceptPost('/users/any/timeline', HttpResponse.error());

    await expect(async () => {
      await API.createNewPost('any', 'any');
    }).rejects.toThrow("NETWORK_ERROR");
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

function notFoundResponse() {
  return new HttpResponse('404', {
    status: 404,
    headers: { 'Content-Type': 'text/plain' },
  });
}

function badRequestResponse() {
  return new HttpResponse('400', {
    status: 400,
    headers: { 'Content-Type': 'text/plain' },
  });
}
