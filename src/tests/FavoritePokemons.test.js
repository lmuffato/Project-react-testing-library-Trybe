import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Favorite Pokemons', () => {
  test('Show no favorite pokémon message, if there is none', () => {
    render(<FavoritePokemons />);
    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  test('show all and only favorites pokémons', () => {
    const { history, getByRole, getAllByTestId } = renderWithRouter(<App />);
    const addNewFavoritePokemom = (pokemonID) => {
      history.push(`pokemons/${pokemonID}`);
      const favoriteCheckbox = getByRole('checkbox');
      userEvent.click(favoriteCheckbox);
      history.push('/');
    }; // Função tirada do projeto do Murrilo Golçalves https://github.com/tryber/sd-010-a-project-react-testing-library/pull/79/files
    addNewFavoritePokemom('25');
    addNewFavoritePokemom('4');

    history.push('/favorites');
    const pokemons = getAllByTestId(/pokemon-name/i);
    expect(pokemons.length).toBe(2);
    expect(pokemons[0].innerHTML).toBe('Pikachu');
    expect(pokemons[1].innerHTML).toBe('Charmander');
  });
});
