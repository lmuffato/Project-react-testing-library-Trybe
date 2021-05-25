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
    const { history, getByRole, queryByText, getByText } = renderWithRouter(<App />);

    const moreDeatilsLink = getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(moreDeatilsLink);
    expect(history.location.pathname).toBe('/pokemons/25');

    const checkboxFavorite = getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    userEvent.click(checkboxFavorite);

    history.push(toFavoritePage);
    expect(queryByText(/no favorite pokemon found/i)).not.toBeInTheDocument();

    expect(getByText(/pikachu/i)).toBeInTheDocument();
    expect(getByRole('img', {
      name: /pikachu sprite/i,
    })).toBeInTheDocument();
  });
});
