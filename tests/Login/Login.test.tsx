import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
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

    fireEvent.input(screen.getByPlaceholderText('username'), { target: { value: 'theUser' } })
    fireEvent.input(screen.getByPlaceholderText('password'), { target: { value: 'thePassword' } })
    screen.getByRole('button').click()

    expect(useLoginState.login).toHaveBeenCalledWith('theUser', 'thePassword')
  })

  it('shows the user name when logged in', async () => {
    const useLoginState = mockUseLoginState({ loggedUser: { id: "123", username: "Alessio", about: 'my bio' } })
    render(<Login />)

    screen.getByRole('button').click()

    expect(useLoginState.logout).toHaveBeenCalled()
  })
})

