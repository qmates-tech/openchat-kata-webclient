import { render } from '@testing-library/react';
import { WallPage } from '../../src/Wall/WallPage';
import { mockUserSession } from '../utils/MockUserSession';
import { wrapWithRouter } from "../utils/renderHelpers.tsx";
import * as WallToMock from "../../src/Wall/Wall.tsx";
import { User } from "../../src/User/User.ts";

describe('WallPage', () => {
  const anUser = { id: '1', username: 'John Doe', about: '' };

  it("passes the User to the Wall Component", async () => {
    mockUserSession({ currentUser: anUser });
    const mockedWall = mockWall();

    render(<WallPage />, wrapWithRouter({ path: "/" }));

    expect(mockedWall).toHaveBeenCalledWith({ user: anUser })
  });
})

function mockWall() {
  const spy = vi.fn((_: { user: User }) => <></>)
  vi.spyOn(WallToMock, "Wall").mockImplementation((props) => spy(props));
  return spy;
}
