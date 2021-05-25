import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testes do componente FavoritePokemons', () => {
  test('Testa se a mensagem No Favorite Pokemon é exibida na tela', () => {
    render(<FavoritePokemons />);
    const noFavPokemon = screen.getByText(/No favorite pokemon found/i);
    expect(noFavPokemon).toBeInTheDocument();
  });
  test('Testa se todos os Pokemons favoritados aparecem', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const moreDetailsLink = screen.getByText(/More details/i);
    // expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    // const favPokemon = screen.getByText(/Pokémon favoritado?/i);
    // expect(favPokemon).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const favPokemonComponent = screen.getByText(/Favorite Pokémon/i);
    userEvent.click(favPokemonComponent);
    const pokemonDetail = screen.getByText(/More details/i);
    expect(pokemonDetail).toBeInTheDocument();
  });
});
