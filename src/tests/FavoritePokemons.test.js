import React from 'react';
// import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Test the <FavoritePokemons /> component', () => {
  const toFavoritePage = '/favorites';

  it(`Test if the message is displayed, if the person does
   not have favorite pokemon.`, () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push(toFavoritePage);
    expect(history.location.pathname).toBe(toFavoritePage);
    expect(getByText(/no favorite pokemon found/i)).toBeInTheDocument();
  });

  it('Test if all your favorite Pokémon cards are displayed.', () => {
    const { history, getByRole, queryByText,
      getByText, container } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');

    const checkboxFavorite = getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    userEvent.click(checkboxFavorite);

    expect(checkboxFavorite).toBeChecked();

    history.push(toFavoritePage);
    expect(queryByText(/no favorite pokemon found/i)).not.toBeInTheDocument();

    const pokemonName = getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();

    const pokemonImg = getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pokemonImg).toBeInTheDocument();

    const cardPokemon = container.querySelector('.pokemon');

    expect(cardPokemon).toContainElement(pokemonName);
    expect(cardPokemon).toContainElement(pokemonImg);
  });
});
