import { render, screen } from '@testing-library/react';
import { RegistrationForm } from '../../src/Registration/RegistrationForm';

describe('RegistrationForm Component', () => {

  it('disable the button when no data are filled', async () => {
    render(<RegistrationForm />);

    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  })
})
