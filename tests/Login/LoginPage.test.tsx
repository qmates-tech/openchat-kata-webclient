import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { LoginPage } from '../../src/Login/LoginPage';
import { mockLinkTo } from "../utils/MockLinkTo";
import { mockUserSession } from "../utils/MockUserSession";
import { wrapWithRouter } from "../utils/renderHelpers";
import * as LoginFormToMock from "../../src/Login/LoginForm.tsx";
import { LoginState } from "../../src/Login/LoginState.ts";
import { mockUseLoginState } from "../utils/MockLoginState.ts";

describe("LoginPage Component", () => {
  it("passes the full LoginState to the LoginForm", async () => {
    mockUserSession({ currentUser: undefined });
    const mockedLoginForm = mockLoginForm();
    const loginState = { isLoggingIn: false, loginError: undefined, login: () => undefined };
    mockUseLoginState(loginState);

    render(<LoginPage />, wrapWithRouter({ path: "/register" }));

    expect(mockedLoginForm).toHaveBeenCalledWith(loginState)
  });

  it("redirect to RegistrationPage when Register link is clicked", async () => {
    const mockedLinkTo = mockLinkTo();
    mockUserSession({ currentUser: undefined });
    render(<LoginPage />, wrapWithRouter({ path: "/login" }));

    await userEvent.click(screen.getByText("Register"));

    expect(mockedLinkTo).toHaveBeenCalledWith(expect.objectContaining({ to: "registration" }));
  });
});

function mockLoginForm() {
  const spy = vi.fn((_: LoginState) => <></>)
  vi.spyOn(LoginFormToMock, "LoginForm").mockImplementation((props) => spy(props));
  return spy;
}
