import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../../src/Login/LoginForm';
import { mockUseLoginState } from '../utils/MockLoginState';

describe('LoginForm Component', () => {
  it('shows the loading message', async () => {
    mockUseLoginState({ isLoggingIn: true });
    render(<LoginForm />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  })

  it('shows the error message', async () => {
    mockUseLoginState({ loginError: "Generic error" });
    render(<LoginForm />);

    expect(screen.getByText('Generic error')).toBeInTheDocument();
  })

  it('trigger the login function with the correct data on button click', async () => {
    const mockedState = mockUseLoginState();
    render(<LoginForm />);

    await userEvent.type(usernameInput(), 'theUser');
    await userEvent.type(passwordInput(), 'thePassword');
    await userEvent.click(screen.getByRole('button'));

    expect(mockedState.login).toHaveBeenCalledWith('theUser', 'thePassword');
  })

  it('hide the error message on username change', async () => {
    mockUseLoginState({ loginError: "Generic error" });
    render(<LoginForm />);

    await userEvent.type(usernameInput(), "usr");

    expect(screen.queryByText('Generic error')).not.toBeInTheDocument();
  })

  it('hide the error message on password change', async () => {
    mockUseLoginState({ loginError: "Generic error" });
    render(<LoginForm />);

    await userEvent.type(passwordInput(), "psw");

    expect(screen.queryByText('Generic error')).not.toBeInTheDocument();
  })

  it('focus the username input on page load', async () => {
    mockUseLoginState();
    render(<LoginForm />);

    expect(usernameInput()).toHaveFocus();
  })

  it('focus the password input when enter is pressed in the username field', async () => {
    mockUseLoginState();
    render(<LoginForm />);

    await userEvent.type(usernameInput(), 'user[enter]');

    expect(passwordInput()).toHaveFocus();
  })

  it('perform the login when enter is pressed in the password field', async () => {
    const mockedState = mockUseLoginState();
    render(<LoginForm />);

    await userEvent.type(passwordInput(), 'psw[enter]');

    expect(mockedState.login).toHaveBeenCalled();
  })

  it('focus the username input when the login throws an error', async () => {
    mockUseLoginState();
    const { rerender } = render(<LoginForm />);
    await userEvent.click(passwordInput())

    mockUseLoginState({ loginError: "Generic error" });
    rerender(<LoginForm />);

    expect(usernameInput()).toHaveFocus();
  })
})

function usernameInput() {
  return screen.getByPlaceholderText('username');
}

function passwordInput() {
  return screen.getByPlaceholderText('password');
}
