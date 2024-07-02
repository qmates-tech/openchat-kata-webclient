import '@testing-library/jest-dom/vitest';
import { render, screen } from "@testing-library/react";
import React from 'react';
import { describe, expect, it } from 'vitest';
import { App } from "../src/App";
import { renderWithRouter } from './utils/renderWithRouter';

describe("App", () => {
  it("renders the not found page", () => {
    renderWithRouter(<App />, ["/not-found"]);

    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });

  it("renders the login page", () => {
    renderWithRouter(<App />, ["/login"]);

    expect(screen.getByText("Welcome to OpenChat")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Login");
  });
});
