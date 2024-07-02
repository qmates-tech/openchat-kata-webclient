import { render } from "@testing-library/react";
import React, { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";

export function renderWithRouter(
  component: ReactElement,
  initialEntries = ["/"]
) {
  return render(component, {
    wrapper: ({ children }) => <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  });
};