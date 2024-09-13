import { vi } from 'vitest';
import { WallPostsAPI } from "../../src/Wall/WallPostsAPI.ts";

export function mockWallPostsAPI(obj: Partial<WallPostsAPI> = {}): WallPostsAPI {
  return {
    retrieveWall: vi.fn(() => Promise.resolve([])),
    ...obj
  };
}
