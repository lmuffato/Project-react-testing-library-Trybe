import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('renders NotFound', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const heading = getByRole('heading', { name: /Page requested not found/i });
  const img = getByRole('img', { name: /Pikachu crying/i });

  expect(heading).toBeInTheDocument();
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
