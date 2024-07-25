import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegistrationForm } from '../../src/Registration/RegistrationForm';
import { mockUseRegistrationState } from '../utils/MockRegistrationState';

describe('RegistrationForm Component', () => {

  it('should not call the validate function at the first render', async () => {
    const state = mockUseRegistrationState();
    render(<RegistrationForm {...state} />);

    expect(state.validate).not.toHaveBeenCalled();
  });

  it('should call the validate function with some empty data', async () => {
    const state = mockUseRegistrationState();
    render(<RegistrationForm {...state} />);

    await userEvent.type(usernameInput(), "an user");

    expect(state.validate).toHaveBeenCalledWith({
      username: "an user",
      password: "",
      repeatPassword: "",
      about: ""
    });
  });

  it('should call the validate function with some data', async () => {
    const state = mockUseRegistrationState();
    render(<RegistrationForm {...state} />);

    await userEvent.type(usernameInput(), "an user");
    await userEvent.type(passwordInput(), "a password");
    await userEvent.type(repeatPasswordInput(), "a password");
    await userEvent.type(aboutTextarea(), "about");

    expect(state.validate).toHaveBeenCalledWith({
      username: "an user",
      password: "a password",
      repeatPassword: "a password",
      about: "about"
    });
  });

  it('should call the validate function on every input change', async () => {
    const state = mockUseRegistrationState();
    render(<RegistrationForm {...state} />);

    await userEvent.type(usernameInput(), "12");
    await userEvent.type(passwordInput(), "34");
    await userEvent.type(repeatPasswordInput(), "5");

    expect(state.validate).toHaveBeenCalledTimes(5);
  });

  it('should disable the registration and show an error when the form has a FIELDS_MISSING error', async () => {
    const state = mockUseRegistrationState({ validate: () => "FIELDS_MISSING" });
    render(<RegistrationForm {...state} />);

    await userEvent.type(usernameInput(), "any");

    expect(registerButton()).toHaveAttribute('disabled');
    expect(screen.getByText('Please fill in all fields')).toBeVisible();
    expect(passwordInput()).not.toHaveAttribute('aria-invalid');
    expect(repeatPasswordInput()).not.toHaveAttribute('aria-invalid');
  });

  it('should disable the registration and show an error when the form has a PASSWORDS_MISMATCH error', async () => {
    const state = mockUseRegistrationState({ validate: () => "PASSWORDS_MISMATCH" });
    render(<RegistrationForm {...state} />);

    await userEvent.type(usernameInput(), "any");

    expect(registerButton()).toHaveAttribute('disabled');
    expect(screen.getByText('Passwords do not match')).toBeVisible();
    expect(passwordInput()).toHaveAttribute('aria-invalid', 'true');
    expect(repeatPasswordInput()).toHaveAttribute('aria-invalid', 'true');
  });

  it('should disable the registration button on the first load ', async () => {
    const state = mockUseRegistrationState({});
    render(<RegistrationForm {...state} />);

    const button = registerButton();

    expect(button).toHaveAttribute('disabled');
  });

  it('should enable the button when the form is valid', async () => {
    const state = mockUseRegistrationState({ validate: () => undefined });
    render(<RegistrationForm {...state} />);

    await userEvent.type(usernameInput(), "any");

    expect(registerButton()).not.toHaveAttribute('disabled');
  });

  it('should call the registration function accordingly when register button is clicked', async () => {
    const state = mockUseRegistrationState({});
    render(<RegistrationForm {...state} />);
    await fillRegistrationForm();

    await userEvent.click(registerButton());

    expect(state.register).toHaveBeenCalledWith({
      username: "an user",
      password: "a password",
      repeatPassword: "a password",
      about: "about"
    });
  });

  it('should disable and show the loading when the registration is in progress', async () => {
    const state = mockUseRegistrationState({ register: successfullRegistration(20) });
    render(<RegistrationForm {...state} />);
    await fillRegistrationForm();

    await act(() => userEvent.click(registerButton()));

    expect(registerButton()).toHaveAttribute('disabled');
    expect(registerButton()).toHaveAttribute('aria-busy', 'true');
  });

  it('should not call the registration function while registering', async () => {
    const state = mockUseRegistrationState({ register: successfullRegistration(20) });
    render(<RegistrationForm {...state} />);
    await fillRegistrationForm();

    await act(() => userEvent.click(registerButton()));
    await act(() => userEvent.click(registerButton()));

    expect(state.register).toHaveBeenCalledTimes(1);
  });

  it('should not call the registration function when validation errors are present', async () => {
    const state = mockUseRegistrationState({});
    render(<RegistrationForm {...state} />);

    await act(() => userEvent.click(registerButton()));

    expect(state.register).not.toHaveBeenCalled();
  });

  it('should show an error when the registration fails', async () => {
    const state = mockUseRegistrationState({ register: () => Promise.resolve('Generic error') });
    render(<RegistrationForm {...state} />);
    await fillRegistrationForm();

    await userEvent.click(registerButton());

    expect(screen.queryByText('Generic error')).toBeInTheDocument();
  });

  it('hide the registration error when username input changes', async () => {
    const state = mockUseRegistrationState({ register: () => Promise.resolve('Generic error') });
    render(<RegistrationForm {...state} />);
    await fillRegistrationForm();
    await userEvent.click(registerButton());

    await userEvent.type(usernameInput(), "other text");

    expect(screen.queryByText('Generic error')).not.toBeInTheDocument();
  });

  it('hide the registration error when passwords input change', async () => {
    const state = mockUseRegistrationState({ register: () => Promise.resolve('Generic error') });
    render(<RegistrationForm {...state} />);
    await fillRegistrationForm();
    await userEvent.click(registerButton());

    await userEvent.type(passwordInput(), "other");
    await userEvent.type(repeatPasswordInput(), "other");

    expect(screen.queryByText('Generic error')).not.toBeInTheDocument();
  });

  it('hide the registration error when about textarea changes', async () => {
    const state = mockUseRegistrationState({ register: () => Promise.resolve('Generic error') });
    render(<RegistrationForm {...state} />);
    await fillRegistrationForm();
    await userEvent.click(registerButton());

    await userEvent.type(aboutTextarea(), "other text");

    expect(screen.queryByText('Generic error')).not.toBeInTheDocument();
  });

  it('focus the username input when the registration fails', async () => {
    const state = mockUseRegistrationState({ register: () => Promise.resolve('Generic error') });
    render(<RegistrationForm {...state} />);
    await fillRegistrationForm();

    await userEvent.click(registerButton());

    expect(usernameInput()).toHaveFocus();
  })

  it('focus the username input on first load', async () => {
    const state = mockUseRegistrationState();
    render(<RegistrationForm {...state} />);

    expect(usernameInput()).toHaveFocus();
  })

  it('focus the password input when enter is pressed in the username field', async () => {
    const state = mockUseRegistrationState();
    render(<RegistrationForm {...state} />);

    await userEvent.type(usernameInput(), '[enter]');

    expect(passwordInput()).toHaveFocus();
  })

  it('focus the repeatPassword input when enter is pressed in the password field', async () => {
    const state = mockUseRegistrationState();
    render(<RegistrationForm {...state} />);

    await userEvent.type(passwordInput(), '[enter]');

    expect(repeatPasswordInput()).toHaveFocus();
  })

  it('focus the about textarea when enter is pressed in the repeatPassword field', async () => {
    const state = mockUseRegistrationState();
    render(<RegistrationForm {...state} />);

    await userEvent.type(repeatPasswordInput(), '[enter]');

    expect(aboutTextarea()).toHaveFocus();
  })
});

async function fillRegistrationForm() {
  await userEvent.type(usernameInput(), "an user");
  await userEvent.type(passwordInput(), "a password");
  await userEvent.type(repeatPasswordInput(), "a password");
  await userEvent.type(aboutTextarea(), "about");
}

function usernameInput() {
  return screen.getByPlaceholderText('username');
}

function passwordInput() {
  return screen.getByPlaceholderText('password');
}

function repeatPasswordInput() {
  return screen.getByPlaceholderText('repeat password');
}

function aboutTextarea() {
  return screen.getByPlaceholderText('Write something about yourself');
}

function registerButton() {
  return screen.getByRole('button');
}

function successfullRegistration(delayMs: number = 0) {
  return vi.fn().mockImplementation(async () => {
    await new Promise(resolve => setTimeout(resolve, delayMs));
  });
}
