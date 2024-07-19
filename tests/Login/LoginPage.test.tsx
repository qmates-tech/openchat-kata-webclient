import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import * as LoginFormToMock from "../../src/Login/LoginForm";
import { LoginPage } from '../../src/Login/LoginPage';
import { LoginState } from "../../src/Login/LoginState";
import { mockLinkTo } from "../utils/MockLinkTo";
import { mockUseLoginState } from "../utils/MockLoginState";
import { wrapWithRouter } from "../utils/renderHelpers";

describe("LoginPage Component", () => {
  it("passes the full LoginState to the LoginForm when user is not logged in", async () => {
    const mockedLoginForm = mockLoginForm();
    const loginState = { isLoggingIn: false, loggedUser: undefined, loginError: undefined, login: () => "LOGIN" };
    mockUseLoginState(loginState);

    render(<LoginPage />, wrapWithRouter({ path: "/login" }));

    expect(mockedLoginForm).toHaveBeenCalledWith(loginState)
  });

  it("redirect to RegistrationPage when Register link is clicked", async () => {
    const mockedLinkTo = mockLinkTo();
    mockUseLoginState({ isLoggingIn: false, loggedUser: undefined });
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
