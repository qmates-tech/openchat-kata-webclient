import { render } from "@testing-library/react";
import * as LoginFormToMock from "../../src/Login/LoginForm";
import { LoginPage } from '../../src/Login/LoginPage';
import { LoginState } from "../../src/Login/LoginState";
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
});

function mockLoginForm() {
  const spy = vi.fn((_: LoginState) => <></>)
  vi.spyOn(LoginFormToMock, "LoginForm").mockImplementation((props) => spy(props));
  return spy;
}
