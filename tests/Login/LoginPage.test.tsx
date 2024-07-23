import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { LoginPage } from '../../src/Login/LoginPage';
import { mockLinkTo } from "../utils/MockLinkTo";
import { mockUserSession } from "../utils/MockUserSession";
import { wrapWithRouter } from "../utils/renderHelpers";

describe("LoginPage Component", () => {
  it("redirect to RegistrationPage when Register link is clicked", async () => {
    const mockedLinkTo = mockLinkTo();
    mockUserSession({ currentUser: undefined });
    render(<LoginPage />, wrapWithRouter({ path: "/login" }));

    await userEvent.click(screen.getByText("Register"));

    expect(mockedLinkTo).toHaveBeenCalledWith(expect.objectContaining({ to: "registration" }));
  });
});
