import { render, screen } from "@testing-library/react";
import { App } from "../../src/App";
import { User } from "../../src/User/User";
import { mockUserSession } from '../utils/MockUserSession';
import { wrapWithRouter } from '../utils/renderHelpers';

describe("Not Found Route", () => {
  const anUser: User = { id: "1", username: "Pippo", about: "Pippo description" }

  it("renders the not found page when not logged in", () => {
    mockUserSession({ currentUser: undefined });

    render(<App />, wrapWithRouter({ path: "/not-found" }));

    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });

  it("renders the not found page when logged in", () => {
    mockUserSession({ currentUser: anUser });

    render(<App />, wrapWithRouter({ path: "/not-found" }));

    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });
});
