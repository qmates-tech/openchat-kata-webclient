import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import * as RegistrationFormToMock from "../../src/Registration/RegistrationForm";
import { RegistrationPage } from "../../src/Registration/RegistrationPage";
import { RegistrationState } from "../../src/Registration/RegistrationState";
import { mockLinkTo } from "../utils/MockLinkTo";
import { mockUseRegistrationState } from "../utils/MockRegistrationState";
import { mockUserSession } from "../utils/MockUserSession";
import { wrapWithRouter } from "../utils/renderHelpers";

describe("RegistrationPage Component", () => {
  it("passes the full RegistrationState to the RegistrationForm", async () => {
    mockUserSession({ currentUser: undefined });
    const mockedRegistrationForm = mockRegistrationForm();
    const registrationState = { validationErrors: { hasErrors: false }, validate: () => false }
    mockUseRegistrationState(registrationState);

    render(<RegistrationPage />, wrapWithRouter({ path: "/register" }));

    expect(mockedRegistrationForm).toHaveBeenCalledWith(registrationState)
  });

  it("redirect to LoginPage when Login link is clicked", async () => {
    const mockedLinkTo = mockLinkTo();
    mockUserSession({ currentUser: undefined });
    mockUseRegistrationState();
    render(<RegistrationPage />, wrapWithRouter({ path: "/register" }));

    await userEvent.click(screen.getByText("Login"));

    expect(mockedLinkTo).toHaveBeenCalledWith(expect.objectContaining({ to: "login" }));
  });
});

function mockRegistrationForm() {
  const spy = vi.fn((_: RegistrationState) => <></>)
  vi.spyOn(RegistrationFormToMock, "RegistrationForm").mockImplementation((props) => spy(props));
  return spy;
}
