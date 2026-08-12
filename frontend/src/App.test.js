import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the executive workspace heading', () => {
  render(<App />);
  const heading = screen.getByText(/executive sales workspace/i);
  expect(heading).toBeInTheDocument();
});
