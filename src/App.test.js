import { render, screen } from '@testing-library/react';
import Register from './Register';
import Login from './Login';

test('renders learn react link', () => {
  render(<Register />);
  render(<Login />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
