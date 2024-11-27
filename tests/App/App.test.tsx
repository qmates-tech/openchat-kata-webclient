import { render, screen } from "@testing-library/react";
import { App } from "../../src/App/App";
import { User } from "../../src/User/User";
import { mockUserSession } from '../utils/MockUserSession';
import { wrapWithRouter } from '../utils/renderHelpers';

describe("App", () => {
  const anUser: User = { id: "1", username: "Pippo", about: "Pippo description" }

  describe("Wall Page", () => {
    it("renders the Wall when already logged in", () => {
      mockUserSession({ currentUser: anUser });

      render(<App />, wrapWithRouter({ path: "/" }));

      expect(screen.getByText("Pippo's wall")).toBeInTheDocument();
    });

    it("redirects to the Login Page when not logged in", () => {
      mockUserSession({ currentUser: undefined });

      render(<App />, wrapWithRouter({ path: "/" }));

      expect(screen.getByText("Welcome to OpenChat")).toBeInTheDocument();
    });

    it("do not render yet the wall page while retrieving the user", () => {
      mockUserSession({ retrieving: true });

      render(<App />, wrapWithRouter({ path: "/" }));

      expect(screen.queryByText("'s wall")).not.toBeInTheDocument();
      expect(screen.queryByText("Welcome to OpenChat")).not.toBeInTheDocument();
    });
  });

  describe("Not Found Page", () => {
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

  describe("Your Timeline", () => {
    it("renders Your Timeline when already logged in", () => {
      mockUserSession({ currentUser: anUser });

      render(<App />, wrapWithRouter({ path: "/timeline" }));

      expect(screen.getByText("Your Timeline")).toBeInTheDocument();
    });

    it("redirects to the Login Page when not logged in", () => {
      mockUserSession({ currentUser: undefined });

      render(<App />, wrapWithRouter({ path: "/timeline" }));

      expect(screen.getByText("Welcome to OpenChat")).toBeInTheDocument();
    });

    it("do not render yet Your Timeline page while retrieving the user", () => {
      mockUserSession({ retrieving: true });

      render(<App />, wrapWithRouter({ path: "/timeline" }));

      expect(screen.queryByText("Your Timeline")).not.toBeInTheDocument();
      expect(screen.queryByText("Welcome to OpenChat")).not.toBeInTheDocument();
    });
  });
});
