import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test Pokemon card', () => {
  it('Test if card is rendered', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeight = getByTestId('pokemon-weight');
    const nextBtn = getByRole('button', { name: /Próximo Pokémon/i });
    expect(pokemonName.textContent).toMatch(/Pikachu/i);
    expect(pokemonType.textContent).toMatch(/Electric/i);
    expect(pokemonWeight.textContent).toMatch(/\d+ kg/i);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    expect(pokemonName.textContent).toMatch(/Alakazam/i);
    expect(pokemonType.textContent).toMatch(/Psychic/i);
    expect(pokemonWeight.textContent).toMatch(/Average weight: \d+.\d+ kg/i);
  });

  it('Test if card has a link to \'More Details\'', () => {
    const { getByRole } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /More Details/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href).toMatch(/\/pokemons\/\d+/i);
    expect(detailsLink.textContent).toMatch(/More Details/i);
  });

  it('Test \'More Details\' page and \'Favorite\' icon', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /More Details/i });
    fireEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favoriteCheck = getByRole('checkbox', { name: /pokémon favoritado/i });
    fireEvent.click(favoriteCheck);
    const homeLink = getByRole('link', { name: /home/i });
    fireEvent.click(homeLink);
    const favoriteIcon = getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
  });

  it('Test if Pokémon\'s image is rendered', () => {
    const { getByRole } = renderWithRouter(<App />);
    const pikachuImage = getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pikachuImage.alt).toMatch(/Pikachu sprite/i);
  });
});
