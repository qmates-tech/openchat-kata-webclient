import { vi } from 'vitest';
import { TimelinePostsAPI } from "../../src/Timeline/TimelinePostsAPI.ts";

export function mockTimelinePostsAPI(obj: Partial<TimelinePostsAPI> = {}): TimelinePostsAPI {
  return {
    retrieveTimeline: vi.fn(() => Promise.resolve([])),
    ...obj
  };
}
