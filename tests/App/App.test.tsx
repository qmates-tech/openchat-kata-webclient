import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from "@testing-library/react";
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from "../../src/App/App";
import { mockUserSession } from '../utils/MockUserSession';
import { wrapWithRouter } from '../utils/renderHelpers';

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("do not render any private page while retrieving the user", () => {
    mockUserSession({ retrieving: true });

    render(<App />, wrapWithRouter({ path: "/" }));

    expect(screen.queryByText("Pippo's wall")).not.toBeInTheDocument();
    expect(screen.queryByText("Welcome to OpenChat")).not.toBeInTheDocument();
  });

  it("renders the login page", () => {
    mockUserSession({ currentUser: undefined });

    render(<App />, wrapWithRouter({ path: "/login" }));

    expect(screen.getByText("Welcome to OpenChat")).toBeInTheDocument();
  });

  describe("Wall Page", () => {
    it("renders the Wall when already logged in", () => {
      mockUserSession({ currentUser: { id: "1", username: "Pippo", about: "Pippo description" } });

      render(<App />, wrapWithRouter({ path: "/" }));

      expect(screen.getByText("Pippo's wall")).toBeInTheDocument();
    });

    it("redirects to the Login Page when not logged in", () => {
      mockUserSession({ currentUser: undefined });

      render(<App />, wrapWithRouter({ path: "/" }));

      expect(screen.getByText("Welcome to OpenChat")).toBeInTheDocument();
    });
  });

  describe("Not Found Page", () => {
    it("renders the not found page when not logged in", () => {
      mockUserSession({ currentUser: undefined });

      render(<App />, wrapWithRouter({ path: "/not-found" }));

      expect(screen.getByText("Page not found")).toBeInTheDocument();
    });

    it("renders the not found page when logged in", () => {
      mockUserSession({ currentUser: { id: "1", username: "i", about: "a" } });

      render(<App />, wrapWithRouter({ path: "/not-found" }));

      screen.logTestingPlaygroundURL();
      expect(screen.getByText("Page not found")).toBeInTheDocument();
    });
  });
});
