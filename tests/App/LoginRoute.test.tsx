import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { App } from "../../src/App/App.tsx";
import * as LoginFormToMock from "../../src/Login/LoginForm.tsx";
import { LoginState } from "../../src/Login/LoginState.ts";
import { User } from "../../src/User/User.ts";
import { mockUseLoginState } from "../utils/MockLoginState.ts";
import { mockUserSession } from "../utils/MockUserSession.ts";
import { wrapWithRouter } from "../utils/renderHelpers.tsx";

describe("'/login' route", () => {
  const routerWrapper = wrapWithRouter({ path: "/login" })
  const anUser: User = { id: "1", username: "Pippo", about: "Pippo description" }

  it("renders the login page when not logged in", () => {
    mockUserSession({ currentUser: undefined });

    render(<App />, routerWrapper);

    expect(screen.getByText("Welcome to OpenChat")).toBeInTheDocument();
  });

  it("redirects to the wall page when already logged in", () => {
    mockUserSession({ currentUser: anUser });

    render(<App />, routerWrapper);

    expect(screen.getByText("Pippo's wall")).toBeInTheDocument();
  });

  it("do not render yet the login page while retrieving the user", () => {
    mockUserSession({ retrieving: true });

    render(<App />, routerWrapper);

    expect(screen.queryByText("'s wall")).not.toBeInTheDocument();
    expect(screen.queryByText("Welcome to OpenChat")).not.toBeInTheDocument();
  });

  it("redirect to RegistrationPage when Register link is clicked", async () => {
    mockUserSession({ currentUser: undefined });
    render(<App />, routerWrapper);

    await userEvent.click(screen.getByText("Register"));

    expect(screen.getByText("Register now")).toBeInTheDocument();
  });

  it("passes the full LoginState to the LoginForm", async () => {
    mockUserSession({ currentUser: undefined });
    const loginState = mockUseLoginState();
    const mockedLoginForm = mockLoginForm();

    render(<App />, routerWrapper);

    expect(mockedLoginForm).toHaveBeenCalledWith(loginState)
  });
});

function mockLoginForm() {
  const spy = vi.fn((_: LoginState) => <></>)
  vi.spyOn(LoginFormToMock, "LoginForm").mockImplementation((props) => spy(props));
  return spy;
}
