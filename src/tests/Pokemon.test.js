import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testing Pokemon Component', () => {
  it('Testa a renderização do pokemon', () => {
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
  it('testa se o componente possui um link para a URL pokemons/:id', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={ history }>
        <Pokemon pokemon={ pokemons[0] } />
      </Router>,
    );
    const detailsBtn = getByRole('link', { name: 'More details' });
    userEvent.click(detailsBtn);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/pokemons/25');
  });
  it('testa se existe o icone de estrela para os pokemons favoritados', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <Pokemon pokemon={ pokemons[0] } isFavorite />
      </BrowserRouter>,
    );
    const star = getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
