import { render, screen } from '@testing-library/react';
import { App } from '../../src/App.tsx';
import { User } from "../../src/User/User.ts";
import * as WallToMock from "../../src/Wall/Wall.tsx";
import { mockUserSession } from '../utils/MockUserSession.ts';
import { wrapWithRouter } from "../utils/renderHelpers.tsx";

describe("'/' (wall) route", () => {
  const routerWrapper = wrapWithRouter({ path: "/" })
  const anUser = { id: '1', username: 'John Doe', about: '' };

  it("renders the Wall when already logged in", () => {
    mockUserSession({ currentUser: anUser });

    render(<App />, routerWrapper);

    expect(screen.getByText("John Doe's wall")).toBeInTheDocument();
  });

  it("redirects to the Login Page when not logged in", () => {
    mockUserSession({ currentUser: undefined });

    render(<App />, routerWrapper);

    expect(screen.getByText("Welcome to OpenChat")).toBeInTheDocument();
  });

  it("do not render yet the wall page while retrieving the user", () => {
    mockUserSession({ retrieving: true });

    render(<App />, routerWrapper);

    expect(screen.queryByText("'s wall")).not.toBeInTheDocument();
    expect(screen.queryByText("Welcome to OpenChat")).not.toBeInTheDocument();
  });

  it("passes the User to the Wall Component", async () => {
    mockUserSession({ currentUser: anUser });
    const mockedWall = mockWall();

    render(<App />, routerWrapper);

    expect(mockedWall).toHaveBeenCalledWith({ user: anUser })
  });
})

function mockWall() {
  const spy = vi.fn((_: { user: User }) => <></>)
  vi.spyOn(WallToMock, "Wall").mockImplementation((props) => spy(props));
  return spy;
}
