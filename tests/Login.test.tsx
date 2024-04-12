import { render } from "@testing-library/react";
import Login from "../src/Login";

test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the main page", () => {
  render(<Login />);
  expect(true).toBeTruthy();
});
