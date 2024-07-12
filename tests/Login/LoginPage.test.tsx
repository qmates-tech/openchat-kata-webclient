import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from "@testing-library/react";
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LoginPage } from '../../src/Login/LoginPage';
import { mockUserSession } from '../utils/MockUserSession';
import { wrapWithCustomRoutes } from '../utils/renderHelpers';

describe("LoginPage Component", () => {
  const anUser = { id: "1", username: "Pippo", about: "Pippo description" }

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("renders the login page when not logged in", () => {
    mockUserSession({ currentUser: undefined });

    render(<LoginPage />, wrapWithCustomRoutes({ path: "/login" }, [ "/", "/login"]));

    expect(screen.getByText("Welcome to OpenChat")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Login");
  });

  it("redirects to the home page when already logged in", () => {
    mockUserSession({ currentUser: anUser });

    render(<LoginPage />, wrapWithCustomRoutes({ path: "/login" }, [ "/", "/login"]));

    expect(screen.getByText("ROUTE: /")).toBeInTheDocument();
  });
});
