import { render, screen } from '@testing-library/react';
import { App } from '../../src/App/App.tsx';
import * as TimelineToMock from "../../src/Timeline/Timeline.tsx";
import { TimelineProps } from "../../src/Timeline/Timeline.tsx";
import { mockUserSession } from '../utils/MockUserSession.ts';
import { wrapWithRouter } from "../utils/renderHelpers.tsx";

describe("'/timeline' route", () => {
  const routerWrapper = wrapWithRouter({ path: "/timeline" })
  const anUser = { id: '1', username: 'John Doe', about: '' };

  it("renders Your Timeline when already logged in", () => {
    mockUserSession({ currentUser: anUser });

    render(<App />, routerWrapper);

    expect(screen.getByText("Your Timeline")).toBeInTheDocument();
  });

  it("redirects to the Login Page when not logged in", () => {
    mockUserSession({ currentUser: undefined });

    render(<App />, routerWrapper);

    expect(screen.getByText("Welcome to OpenChat")).toBeInTheDocument();
  });

  it("do not render yet Your Timeline page while retrieving the user", () => {
    mockUserSession({ retrieving: true });

    render(<App />, routerWrapper);

    expect(screen.queryByText("Your Timeline")).not.toBeInTheDocument();
    expect(screen.queryByText("Welcome to OpenChat")).not.toBeInTheDocument();
  });

  it("passes current user and itsMe flag to the Timeline Component", async () => {
    mockUserSession({ currentUser: anUser });
    const mockedTimeline = mockTimeline();

    render(<App />, routerWrapper);

    expect(mockedTimeline).toHaveBeenCalledWith({ user: anUser, itsMe: true });
  });
})

function mockTimeline() {
  const spy = vi.fn((_: TimelineProps) => <></>)
  vi.spyOn(TimelineToMock, "Timeline").mockImplementation((props) => spy(props));
  return spy;
}
