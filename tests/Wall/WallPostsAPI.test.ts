import { HttpResponse } from 'msw';
import { createMockServer } from '../utils/MockServer';
import { describe, expect } from "vitest";
import { createWallPostsAPI } from "../../src/Wall/WallPostsAPI.ts";

describe('WallPostsAPI', () => {
  const BASE_URL = 'http://msw.mockapi.local';
  const API = createWallPostsAPI(BASE_URL);
  const mockServer = createMockServer(BASE_URL);

  afterEach(() => {
    mockServer.resetHandlers();
  });

  it('returns the list of posts on success', async () => {
    mockServer.interceptGet(`/users/user-id/wall`, HttpResponse.json([
      post("uuid-2", "followee-id"),
      post("uuid-1", "user-id")
    ]));

    const wall = await API.retrieveWall("user-id");

    expect(wall).toStrictEqual([
      { id: "uuid-2", userId: "followee-id", text: "any text", dateTime: "any-date-time" },
      { id: 'uuid-1', userId: "user-id", text: "any text", dateTime: "any-date-time" }
    ]);
  });

  it('throws USER_NOT_FOUND error when status code is 404', async () => {
    mockServer.interceptGet(`/users/any/wall`, notFoundResponse());

    await expect(async () => {
      await API.retrieveWall("any");
    }).rejects.toThrow("USER_NOT_FOUND");
  });

  it('throws Network Error when Server is not reachable', async () => {
    mockServer.interceptGet('/users/any/wall', HttpResponse.error());

    await expect(async () => {
      await API.retrieveWall('any');
    }).rejects.toThrow("NETWORK_ERROR");
  });
});

function notFoundResponse() {
  return new HttpResponse('404', {
    status: 404,
    headers: { 'Content-Type': 'text/plain' },
  });
}

function post(
  postId: string | null = null,
  userId: string | null = null,
  text: string | null = null,
  dateTime: string | null = null
) {
  return {
    postId: postId || "199dd5eb-fdea-4472-8baf-81ef7c18a2f2",
    userId: userId || "any-user-id",
    text: text || "any text",
    dateTime: dateTime || "any-date-time"
  }
}