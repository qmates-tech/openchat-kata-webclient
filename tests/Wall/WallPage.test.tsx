import { render, screen } from '@testing-library/react';
import { WallPage } from '../../src/Wall/WallPage';
import { mockUserSession } from '../utils/MockUserSession';

describe('WallPage', () => {
  it('renders the username', async () => {
    mockUserSession({ currentUser: { id: '1', username: 'John Doe', about: '' } });

    render(<WallPage />);

    expect(screen.getByText('John Doe\'s wall')).toBeInTheDocument();
  });

  it('renders the user bio transforming \n with separate paragraphs', async () => {
    mockUserSession({ currentUser: { id: '1', username: 'John Doe', about: 'I am a\ndeveloper' } });

    render(<WallPage />);

    expect(screen.getByText("I am a", { selector: 'p' })).toBeInTheDocument();
    expect(screen.getByText("developer", { selector: 'p' })).toBeInTheDocument();
  });
})
