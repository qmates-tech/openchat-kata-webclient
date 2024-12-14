import { render, screen } from '@testing-library/react';
import { App } from '../../src/App.tsx';
import * as TimelineToMock from "../../src/Timeline/Timeline.tsx";
import { TimelineProps } from "../../src/Timeline/Timeline.tsx";
import { mockUserSession } from '../utils/MockUserSession.ts';
import { wrapWithRouter } from "../utils/renderHelpers.tsx";
import { mockUserById } from '../utils/MockUserById.ts';

describe("'/users/:userId/timeline' route", () => {
  const currentUser = { id: '1', username: 'Current User', about: '' };
  const theUser = { id: '123', username: 'John Doe', about: '' };
  const routerWrapper = wrapWithRouter({ path: "/users/123/timeline" })

  beforeEach(() => {
    mockUserSession({ currentUser });
  })

  it("renders User's Timeline when already logged in", () => {
    mockUserById({ user: theUser });

    render(<App />, routerWrapper);

    expect(screen.getByText("John Doe's Timeline")).toBeInTheDocument();
  });

  it("redirects to the Login Page when not logged in", () => {
    mockUserSession({ currentUser: undefined });

    render(<App />, routerWrapper);

    expect(screen.getByText("Welcome to OpenChat")).toBeInTheDocument();
  });

  it("do not render yet Your Timeline page while retrieving the user", () => {
    mockUserSession({ retrieving: true });

    render(<App />, routerWrapper);

    expect(screen.queryByText("John Doe's Timeline")).not.toBeInTheDocument();
    expect(screen.queryByText("Welcome to OpenChat")).not.toBeInTheDocument();
  });

  it("passes the retrieved user without the itsMe flag to the Timeline Component", async () => {
    mockUserById({ user: theUser });
    const mockedTimeline = mockTimeline();

    render(<App />, routerWrapper);

    expect(mockedTimeline).toHaveBeenCalledWith({ user: theUser });
  });

  it("shows nothing while retrieving", async () => {
    mockUserById({ retrieving: true });

    render(<App />, routerWrapper);

    expect(screen.queryByText("John Doe's Timeline")).not.toBeInTheDocument();
    expect(screen.queryByText("Page not found")).not.toBeInTheDocument();
  });

  it("shows 404 when the userId is not found", async () => {
    mockUserById({ error: "User not found" });

    render(<App />, routerWrapper);

    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });

  it("shows 404 when network error", async () => {
    mockUserById({ error: "Network error" });

    render(<App />, routerWrapper);

    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });

  it("shows 404 when generic error", async () => {
    mockUserById({ error: "Generic error" });

    render(<App />, routerWrapper);

    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });
})

function mockTimeline() {
  const spy = vi.fn((_: TimelineProps) => <></>)
  vi.spyOn(TimelineToMock, "Timeline").mockImplementation((props) => spy(props));
  return spy;
}
