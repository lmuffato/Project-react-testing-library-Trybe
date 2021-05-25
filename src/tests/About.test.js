import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { About } from '../components';

describe('tests for the <About> component', () => {
  test('renders a reading with the text `About Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <About />
      </MemoryRouter>,
    );
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders the image correctly', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <About />
      </MemoryRouter>,
    );
    const img = getByRole('img', { src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png' });
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
