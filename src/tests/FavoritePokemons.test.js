import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Tests whether the information about the favorites pokemons is rendered', () => {
  it('renders the text (No favorite pokemon found) if no pokemon is favored.', () => {
    renderWithRouter(<FavoritePokemons />);
    const heading = screen.getByRole('heading', { name: /favorite pokémons/i });
    expect(heading).toBeInTheDocument();

    const text = screen.getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });

  it('renders favorite pokemons', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();
    userEvent.click(home);
    let pathResource = history.location.pathname;
    expect(pathResource).toBe('/');
    let moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    pathResource = history.location.pathname;
    expect(pathResource).toBe('/pokemons/25');
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const favorite = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);
    pathResource = history.location.pathname;
    expect(pathResource).toBe('/favorites');
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
    const pokemonType = screen.getByText(/electric/i);
    expect(pokemonType).toBeInTheDocument();
    const pokemonWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();
    moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    pathResource = history.location.pathname;
    expect(pathResource).toBe('/pokemons/25');
    const pokemonImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonImg).toBeInTheDocument();
    const imgURL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(pokemonImg).toHaveAttribute('src', imgURL);
    const favoriteStarImg = screen
      .getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoriteStarImg).toBeInTheDocument();
    const starURL = '/star-icon.svg';
    expect(favoriteStarImg).toHaveAttribute('src', starURL);
  });
});

it('Remove pokemon from favorites if it is disadvantaged', () => {
  renderWithRouter(<App />);
  const moreDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetails);
  const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  userEvent.click(checkbox);
  const favorite = screen.getByRole('link', { name: /favorite pokémons/i });
  userEvent.click(favorite);
  userEvent.click(moreDetails);
  userEvent.click(checkbox);
  userEvent.click(favorite);
  const text = screen.getByText(/no favorite pokemon found/i);
  expect(text).toBeInTheDocument();
});
