import { render, screen } from '@testing-library/react';
import App from './App';

test('renders subscriptions navbar', () => {
  render(<App />);
  const navBrand = screen.getByText(/subscriptions/i);
  expect(navBrand).toBeInTheDocument();
});
