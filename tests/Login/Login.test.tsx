import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Login } from '../../src/Login/Login';
import { mockUseLoginState } from '../utils/MockLoginState';

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('shows the loading message', async () => {
    mockUseLoginState({ isLoggingIn: true })

    render(<Login />)

    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  })

  it('shows the error message', async () => {
    mockUseLoginState({ loginError: "Generic error" })

    render(<Login />)

    expect(screen.getByText('Generic error')).toBeInTheDocument();
  })

  it('trigger the login function with the correct data on button click', async () => {
    const useLoginState = mockUseLoginState({ login: vi.fn() })
    render(<Login />)

    await userEvent.type(usernameInput(), 'theUser')
    await userEvent.type(passwordInput(), 'thePassword')
    await userEvent.click(screen.getByRole('button'))

    expect(useLoginState.login).toHaveBeenCalledWith('theUser', 'thePassword')
  })

  it('hide the error message on username change', async () => {
    mockUseLoginState({ loginError: "Generic error" })
    render(<Login />)

    await userEvent.type(usernameInput(), "usr")

    expect(screen.queryByText('Generic error')).not.toBeInTheDocument();
  })

  it('hide the error message on password change', async () => {
    mockUseLoginState({ loginError: "Generic error" })
    render(<Login />)

    await userEvent.type(passwordInput(), "psw")

    expect(screen.queryByText('Generic error')).not.toBeInTheDocument();
  })

  it('focus the username input on page load', async () => {
    render(<Login />)

    expect(usernameInput()).toHaveFocus();
  })

  it('focus the password input when enter is pressed in the username field', async () => {
    render(<Login />)

    await userEvent.type(usernameInput(), 'user[enter]')

    expect(passwordInput()).toHaveFocus();
  })

  it('perform the login when enter is pressed in the password field', async () => {
    const useLoginState = mockUseLoginState({ login: vi.fn() })
    render(<Login />)

    await userEvent.type(passwordInput(), 'psw[enter]')

    expect(useLoginState.login).toHaveBeenCalled();
  })

  it('focus the username input when the login throws an error', async () => {
    const { rerender } = render(<Login />)

    mockUseLoginState({ loginError: "Generic error" })
    rerender(<Login />)

    expect(usernameInput()).toHaveFocus();
  })
})

function usernameInput() {
  return screen.getByPlaceholderText('username');
}

function passwordInput() {
  return screen.getByPlaceholderText('password');
}
