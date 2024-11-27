import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { App } from "../../src/App/App";
import * as RegistrationFormToMock from "../../src/Registration/RegistrationForm";
import { RegistrationState } from "../../src/Registration/RegistrationState";
import { User } from "../../src/User/User";
import { mockUseRegistrationState } from "../utils/MockRegistrationState";
import { mockUserSession } from "../utils/MockUserSession";
import { wrapWithRouter } from "../utils/renderHelpers";

describe("'/register' route", () => {
  const routerWrapper = wrapWithRouter({ path: "/register" })
  const anUser: User = { id: "1", username: "Pippo", about: "Pippo description" }

  it("renders the registration page when not logged in", () => {
    mockUserSession({ currentUser: undefined });

    render(<App />, routerWrapper);

    expect(screen.getByText("Register now")).toBeInTheDocument();
  });

  it("redirects to the wall page when already logged in", () => {
    mockUserSession({ currentUser: anUser });

    render(<App />, routerWrapper);

    expect(screen.getByText("Pippo's wall")).toBeInTheDocument();
  });

  it("do not render yet the registration page while retrieving the user", () => {
    mockUserSession({ retrieving: true });

    render(<App />, routerWrapper);

    expect(screen.queryByText("'s wall")).not.toBeInTheDocument();
    expect(screen.queryByText("Register now")).not.toBeInTheDocument();
  });

  it("redirect to LoginPage when Login link is clicked", async () => {
    mockUserSession({ currentUser: undefined });
    render(<App />, routerWrapper);

    await userEvent.click(screen.getByText("Login"));

    expect(screen.getByText("Welcome to OpenChat")).toBeInTheDocument();
  });

  it("passes the full RegistrationState to the RegistrationForm", async () => {
    mockUserSession({ currentUser: undefined });
    const mockedRegistrationForm = mockRegistrationForm();
    const registrationState = mockUseRegistrationState();

    render(<App />, routerWrapper);

    expect(mockedRegistrationForm).toHaveBeenCalledWith(registrationState)
  });
});

function mockRegistrationForm() {
  const spy = vi.fn((_: RegistrationState) => <></>)
  vi.spyOn(RegistrationFormToMock, "RegistrationForm").mockImplementation((props) => spy(props));
  return spy;
}
