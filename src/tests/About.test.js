import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { About } from '../components';

describe('Test the component <About.js>', () => {
  it('Test if the page contains information about Pokédex', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    expect(getByRole('heading', {
      name: /about pokédex/i,
    })).toBeInTheDocument();

    expect(getByText(/this application simulates a pokédex,/i)).toBeInTheDocument();

    expect(getByText(/one can filter pokémons by type/i)).toBeInTheDocument();

    const imagem = getByRole('img', {
      name: /pokédex/i,
    });

    expect(imagem).toBeInTheDocument();

    expect(imagem.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
