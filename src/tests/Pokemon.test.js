import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testing Pokemon Component', () => {
  it('', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Pokemon pokemon={ pokemons[0] } />
      </BrowserRouter>,
    );
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const type = getByText('Electric');
    expect(type).toBeInTheDocument();
    const weight = getByText('Average weight: 6.0 kg');
    expect(weight).toBeInTheDocument();
    const pokemonImg = getByRole('img', { name: 'Pikachu sprite' });
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
