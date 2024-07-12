import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LoginForm } from '../../src/Login/LoginForm';
import { LoginState } from '../../src/Login/LoginState';

describe('LoginForm Component', () => {
  beforeEach(() => {
    cleanup();
  });

  it('shows the loading message', async () => {
    render(<LoginForm {...defaults()} isLoggingIn />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  })

  it('shows the error message', async () => {
    render(<LoginForm {...defaults()} loginError="Generic error" />);

    expect(screen.getByText('Generic error')).toBeInTheDocument();
  })

  it('trigger the login function with the correct data on button click', async () => {
    const loginSpy = vi.fn();
    render(<LoginForm {...defaults()} login={loginSpy} />);

    await userEvent.type(usernameInput(), 'theUser');
    await userEvent.type(passwordInput(), 'thePassword');
    await userEvent.click(screen.getByRole('button'));

    expect(loginSpy).toHaveBeenCalledWith('theUser', 'thePassword');
  })

  it('hide the error message on username change', async () => {
    render(<LoginForm {...defaults()} loginError="Generic error" />);

    await userEvent.type(usernameInput(), "usr");

    expect(screen.queryByText('Generic error')).not.toBeInTheDocument();
  })

  it('hide the error message on password change', async () => {
    render(<LoginForm {...defaults()} loginError="Generic error" />);

    await userEvent.type(passwordInput(), "psw");

    expect(screen.queryByText('Generic error')).not.toBeInTheDocument();
  })

  it('focus the username input on page load', async () => {
    render(<LoginForm {...defaults()} />);

    expect(usernameInput()).toHaveFocus();
  })

  it('focus the password input when enter is pressed in the username field', async () => {
    render(<LoginForm {...defaults()} />);

    await userEvent.type(usernameInput(), 'user[enter]');

    expect(passwordInput()).toHaveFocus();
  })

  it('perform the login when enter is pressed in the password field', async () => {
    const loginSpy = vi.fn();
    render(<LoginForm {...defaults()} login={loginSpy} />);

    await userEvent.type(passwordInput(), 'psw[enter]');

    expect(loginSpy).toHaveBeenCalled();
  })

  it('focus the username input when the login throws an error', async () => {
    const { rerender } = render(<LoginForm {...defaults()} />);

    rerender(<LoginForm {...defaults()} loginError="Generic error" />);

    expect(usernameInput()).toHaveFocus();
  })
})

function usernameInput() {
  return screen.getByPlaceholderText('username');
}

function passwordInput() {
  return screen.getByPlaceholderText('password');
}

function defaults(): LoginState {
  return {
    login: vi.fn,
    isLoggingIn: false,
    loggedUser: undefined,
    loginError: undefined
  }
}
