import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegistrationForm } from '../../src/Registration/RegistrationForm';
import { mockUseRegistrationState } from '../utils/MockRegistrationState';

describe('RegistrationForm Component', () => {

  it('should not call the validate function at the first render', async () => {
    const state = mockUseRegistrationState();
    render(<RegistrationForm {...state} />);

    expect(state.validate).not.toHaveBeenCalled();
  })

  it('should call the validate function with some empty data', async () => {
    const state = mockUseRegistrationState();
    render(<RegistrationForm {...state} />);

    await userEvent.type(usernameInput(), "an user");

    expect(state.validate).toHaveBeenCalledWith({
      username: "an user",
      password: "",
      repeatPassword: ""
    });
  })

  it('should call the validate function with some data', async () => {
    const state = mockUseRegistrationState();
    render(<RegistrationForm {...state} />);

    await userEvent.type(usernameInput(), "an user");
    await userEvent.type(passwordInput(), "a password");
    await userEvent.type(repeatPasswordInput(), "a password");

    expect(state.validate).toHaveBeenCalledWith({
      username: "an user",
      password: "a password",
      repeatPassword: "a password"
    });
  })

  it('should call the validate function on every input change', async () => {
    const state = mockUseRegistrationState();
    render(<RegistrationForm {...state} />);

    await userEvent.type(usernameInput(), "12");
    await userEvent.type(passwordInput(), "34");
    await userEvent.type(repeatPasswordInput(), "5");

    expect(state.validate).toHaveBeenCalledTimes(5);
  })

  it('should disable the registration when the form has a FIELDS_MISSING error', async () => {
    const state = mockUseRegistrationState({ validationError: "FIELDS_MISSING" });
    render(<RegistrationForm {...state} />);

    await userEvent.type(usernameInput(), "any");

    expect(screen.getByRole('button')).toHaveAttribute('disabled');
    expect(screen.getByText('Please fill in all fields')).toBeVisible();
    expect(passwordInput()).not.toHaveAttribute('aria-invalid');
    expect(repeatPasswordInput()).not.toHaveAttribute('aria-invalid');
  })

  it('should disable the registration when the form has a PASSWORDS_MISMATCH error', async () => {
    const state = mockUseRegistrationState({ validationError: "PASSWORDS_MISMATCH" });
    render(<RegistrationForm {...state} />);

    await userEvent.type(usernameInput(), "any");

    expect(screen.getByRole('button')).toHaveAttribute('disabled');
    expect(screen.getByText('Passwords do not match')).toBeVisible();
    expect(passwordInput()).toHaveAttribute('aria-invalid', 'true');
    expect(repeatPasswordInput()).toHaveAttribute('aria-invalid', 'true');
  })

  it('should enable the button when the form is valid', async () => {
    const state = mockUseRegistrationState({});
    render(<RegistrationForm {...state} />);

    await userEvent.type(usernameInput(), "any");

    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
  })
})

function usernameInput() {
  return screen.getByPlaceholderText('username');
}

function passwordInput() {
  return screen.getByPlaceholderText('password');
}

function repeatPasswordInput() {
  return screen.getByPlaceholderText('repeat password');
}