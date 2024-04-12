import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import App from "../src/App"

test("renders the app component", () => {
  render(<App />);

  expect(screen.getByText("Welcome to OpenChat")).toBeInTheDocument();
});
