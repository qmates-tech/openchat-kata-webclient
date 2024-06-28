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

    expect(screen.getByText('Logging in...')).toBeInTheDocument();
  })

  it('shows the error message', async () => {
    mockUseLoginState({ loginError: "Generic error" })

    render(<Login />)

    expect(screen.getByText('An error occurred: Generic error')).toBeInTheDocument();
  })

  it('shows the user name', async () => {
    mockUseLoginState({ loggedUser: { id: "123", username: "user name", about: 'my bio' } })

    render(<Login />)

    expect(screen.getByText('Logged in as user name')).toBeInTheDocument();
  })

  it('trigger the login function with the correct data on button click', async () => {
    const useLoginState = mockUseLoginState({ login: vi.fn() })

    render(<Login />)

    fireEvent.input(screen.getByPlaceholderText('username'), { target: { value: 'theUser' } })
    fireEvent.input(screen.getByPlaceholderText('password'), { target: { value: 'thePassword' } })

    screen.getByRole('button').click()

    expect(useLoginState.login).toHaveBeenCalledWith('theUser', 'thePassword')
  })
})

