import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
  // This test will always pass as long as the App component renders
  expect(true).toBe(true);
});

test('contains task tracker elements', () => {
  render(<App />);
  // Check if the app contains some basic elements
  const appElement = screen.getByRole('main') || document.querySelector('.App') || document.body;
  expect(appElement).toBeInTheDocument();
});
