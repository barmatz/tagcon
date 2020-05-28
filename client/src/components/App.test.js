import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders app container', () => {
  const { container: { firstChild }} = render(<App />);
  expect(firstChild.className).toBe('app');
});
