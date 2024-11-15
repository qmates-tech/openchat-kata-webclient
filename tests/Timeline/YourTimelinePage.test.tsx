import {render} from '@testing-library/react';
import {mockUserSession} from '../utils/MockUserSession';
import {wrapWithRouter} from "../utils/renderHelpers.tsx";
import * as TimelineToMock from "../../src/Timeline/Timeline.tsx";
import { YourTimelinePage } from "../../src/Timeline/YourTimelinePage.tsx";
import { TimelineProps } from "../../src/Timeline/Timeline.tsx";

describe('YourTimelinePage', () => {
  const anUser = { id: '1', username: 'John Doe', about: '' };

  it("passes current user and itsMe flag to the Timeline Component", async () => {
    mockUserSession({ currentUser: anUser });
    const mockedTimeline = mockTimeline();

    render(<YourTimelinePage />, wrapWithRouter({ path: "/" }));

    expect(mockedTimeline).toHaveBeenCalledWith({ user: anUser, itsMe: true });
  });
})

function mockTimeline() {
  const spy = vi.fn((_: TimelineProps) => <></>)
  vi.spyOn(TimelineToMock, "Timeline").mockImplementation((props) => spy(props));
  return spy;
}
