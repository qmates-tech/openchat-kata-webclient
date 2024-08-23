import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../../src/Login/LoginForm';
import { vi } from "vitest";
import { LoginState } from "../../src/Login/LoginState.ts";

describe('LoginForm', () => {
  it('shows the loading message', async () => {
    render(<LoginForm {...loginState({ isLoggingIn: true })} />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  })

  it('shows the error message', async () => {
    render(<LoginForm {...loginState({ loginError: "Generic error" })} />);

    expect(screen.getByText('Generic error')).toBeInTheDocument();
  })

  it('trigger the login function with the correct data on button click', async () => {
    const loginSpy = vi.fn();
    render(<LoginForm {...loginState({ login: loginSpy })} />);

    await userEvent.type(usernameInput(), 'theUser');
    await userEvent.type(passwordInput(), 'thePassword');
    await userEvent.click(screen.getByRole('button'));

    expect(loginSpy).toHaveBeenCalledWith('theUser', 'thePassword');
  })

  it('hide the error message on username change', async () => {
    render(<LoginForm {...loginState({ loginError: "Generic error" })} />);

    await userEvent.type(usernameInput(), "usr");

    expect(screen.queryByText('Generic error')).not.toBeInTheDocument();
  })

  it('hide the error message on password change', async () => {
    render(<LoginForm {...loginState({ loginError: "Generic error" })} />);

    await userEvent.type(passwordInput(), "psw");

    expect(screen.queryByText('Generic error')).not.toBeInTheDocument();
  })

  it('focus the username input on page load', async () => {
    render(<LoginForm {...loginState()} />);

    expect(usernameInput()).toHaveFocus();
  })

  it('focus the password input when enter is pressed in the username field', async () => {
    render(<LoginForm {...loginState()} />);

    await userEvent.type(usernameInput(), 'user[enter]');

    expect(passwordInput()).toHaveFocus();
  })

  it('perform the login when enter is pressed in the password field', async () => {
    const loginSpy = vi.fn();
    render(<LoginForm {...loginState({ login: loginSpy })} />);

    await userEvent.type(passwordInput(), 'psw[enter]');

    expect(loginSpy).toHaveBeenCalled();
  })

  it('focus the username input when the login throws an error', async () => {
    const { rerender } = render(<LoginForm {...loginState()} />);
    await userEvent.click(passwordInput())

    rerender(<LoginForm {...loginState({ loginError: "Generic error" })} />);

    expect(usernameInput()).toHaveFocus();
  })
})

function usernameInput() {
  return screen.getByPlaceholderText('username');
}

function passwordInput() {
  return screen.getByPlaceholderText('password');
}

function loginState(opts: Partial<LoginState> = {}): LoginState {
  return {
    login: vi.fn(),
    isLoggingIn: false,
    loginError: undefined,
    ...opts
  };
}