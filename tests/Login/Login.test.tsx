import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Login } from '../../src/Login/Login';
import { mockUseLoginState } from '../utils/MockLoginState';

describe('Login Component', () => {

  afterEach(() => {
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

  it('shows the user name when logged in', async () => {
    mockUseLoginState({ loggedUser: { id: "123", username: "Alessio", about: 'my bio' } })

    render(<Login />)

    expect(screen.getByText('Hi Alessio!')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  })

  it('do not show the login form when logged in', async () => {
    mockUseLoginState({ loggedUser: { id: "123", username: "user name", about: 'my bio' } })

    render(<Login />)

    expect(screen.queryByPlaceholderText('username')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('password')).not.toBeInTheDocument();
  })

  it('trigger the login function with the correct data on button click', async () => {
    const useLoginState = mockUseLoginState({ login: vi.fn() })
    render(<Login />)

    await userEvent.type(usernameInput(), 'theUser')
    await userEvent.type(passwordInput(), 'thePassword')
    await userEvent.click(screen.getByRole('button'))

    expect(useLoginState.login).toHaveBeenCalledWith('theUser', 'thePassword')
  })

  it('shows the user name when logged in', async () => {
    const useLoginState = mockUseLoginState({ loggedUser: { id: "123", username: "Alessio", about: 'my bio' } })
    render(<Login />)

    await userEvent.click(screen.getByRole('button'))

    expect(useLoginState.logout).toHaveBeenCalled()
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

  it('focus the username input when the user is cleaned up due to a logout', async () => {
    mockUseLoginState({ loggedUser: { id: "1", username: "name", about: "me" } })
    const { rerender } = render(<Login />)

    mockUseLoginState({ loggedUser: undefined })
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
