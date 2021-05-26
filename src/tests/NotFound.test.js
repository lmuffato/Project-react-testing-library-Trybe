import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from '../components';

describe('Test the component <NotFound.js>', () => {
  it('Test if page contains an heading with text', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(getByRole('heading', {
      name: /page requested not found Crying emoji/i,
    })).toBeInTheDocument();
  });

  it('Test if the page shows the image', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const image = getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
