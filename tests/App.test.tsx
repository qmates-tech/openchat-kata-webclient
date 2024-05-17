import '@testing-library/jest-dom/vitest';
import { render, screen } from "@testing-library/react";
import React from 'react';
import App from "../src/App";
import { expect, test } from 'vitest';

test("renders the app component", () => {
  render(<App />);

  expect(screen.getByText("Welcome to OpenChat")).toBeInTheDocument();
});
