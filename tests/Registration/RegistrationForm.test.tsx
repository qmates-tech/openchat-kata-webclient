import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegistrationForm } from '../../src/Registration/RegistrationForm';

describe('RegistrationForm Component', () => {

  it('disable the button when no data are filled', async () => {
    render(<RegistrationForm />);

    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  })

  it('enable the button when all the fields are filled', async () => {
    render(<RegistrationForm />);

    await userEvent.type(usernameInput(), "an user");
    await userEvent.type(passwordInput(), "a password");
    await userEvent.type(repeatPasswordInput(), "a password");

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