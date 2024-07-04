import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from "../src/App";
import { mockUserSession } from './utils/MockUserSession';
import { wrapWithRouter } from './utils/renderHelpers';

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("renders the Wall as home page when logged in", () => {
    mockUserSession({ currentUser: { id: "1", username: "Pippo", about: "Pippo description" } });

    render(<App />, wrapWithRouter({ path: "/" }));

    expect(screen.getByText("Pippo's wall")).toBeInTheDocument();
  });

  it("renders the Login Page instead the wall when not logged in", () => {
    mockUserSession({ currentUser: undefined });

    render(<App />, wrapWithRouter({ path: "/" }));

    expect(screen.getByText("Welcome to OpenChat")).toBeInTheDocument();
  });

  it("do not render any page while retrieving the user", () => {
    mockUserSession({ retrieving: true });

    render(<App />, wrapWithRouter({ path: "/" }));

    expect(screen.queryByText("Pippo's wall")).not.toBeInTheDocument();
    expect(screen.queryByText("Welcome to OpenChat")).not.toBeInTheDocument();
  });

  it("renders the login page", () => {
    render(<App />, wrapWithRouter({ path: "/login" }));

    expect(screen.getByText("Welcome to OpenChat")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Login");
  });

  it("renders the wall page when already logged in", () => {
    mockUserSession({ currentUser: { id: "1", username: "Pippo", about: "Pippo description" } });
    render(<App />, wrapWithRouter({ path: "/login" }));

    expect(screen.getByText("Pippo's wall")).toBeInTheDocument();
  });

  it("renders the not found page", () => {
    render(<App />, wrapWithRouter({ path: "/not-found" }));

    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });
});
