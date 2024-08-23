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

  describe("Login Page", () => {
    it("renders the login page when not logged in", () => {
      mockUserSession({ currentUser: undefined });

      render(<App />, wrapWithRouter({ path: "/login" }));

      expect(screen.getByText("Welcome to OpenChat")).toBeInTheDocument();
    });

    it("redirects to the wall page when already logged in", () => {
      mockUserSession({ currentUser: anUser });

      render(<App />, wrapWithRouter({ path: "/login" }));

      expect(screen.getByText("Pippo's wall")).toBeInTheDocument();
    });

    it("do not render yet the login page while retrieving the user", () => {
      mockUserSession({ retrieving: true });

      render(<App />, wrapWithRouter({ path: "/login" }));

      expect(screen.queryByText("'s wall")).not.toBeInTheDocument();
      expect(screen.queryByText("Welcome to OpenChat")).not.toBeInTheDocument();
    });
  });

  describe("Registration Page", () => {
    it("renders the registration page when not logged in", () => {
      mockUserSession({ currentUser: undefined });

      render(<App />, wrapWithRouter({ path: "/register" }));

      expect(screen.getByText("Register now")).toBeInTheDocument();
    });

    it("redirects to the wall page when already logged in", () => {
      mockUserSession({ currentUser: anUser });

      render(<App />, wrapWithRouter({ path: "/register" }));

      expect(screen.getByText("Pippo's wall")).toBeInTheDocument();
    });

    it("do not render yet the registration page while retrieving the user", () => {
      mockUserSession({ retrieving: true });

      render(<App />, wrapWithRouter({ path: "/register" }));

      expect(screen.queryByText("'s wall")).not.toBeInTheDocument();
      expect(screen.queryByText("Register now")).not.toBeInTheDocument();
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
});
