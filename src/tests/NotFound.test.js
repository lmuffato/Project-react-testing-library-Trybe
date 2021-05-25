import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { NotFound } from '../components';

describe('Tests for the <NotFound> component', () => {
  test('render an h2 heading with the text Page requested not found 😭', () => {
    const { getByRole, getByLabelText } = render(
      <MemoryRouter initialEntries={ ['/page-that-doesnt-exist'] }>
        <NotFound />
      </MemoryRouter>,
    );
    const heading = getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(heading).toBeInTheDocument();

    const img = getByLabelText(/Crying emoji/i);
    expect(img).toBeDefined();

    const gifContainer = document.querySelector('.not-found-image');
    expect(gifContainer.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
