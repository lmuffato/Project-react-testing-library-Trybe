import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';
// Requisito feito com o auxílio de Guilherme Dornelles e Pollyana Oliveira - Ambos da magnífica turma 10-A. Amém! Graças a Deus! vem REDUX!
describe('Test if Pokemon Cards with Pokemon Details is on Screen', () => {
  test('Test Pokemon Status and Image', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(pokemons[0].type);
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(/average weight: 6.0 kg/i);
    const pokemonGif = getByAltText(/sprite*/i);
    expect(pokemonGif.src).toContain(pokemons[0].image);
  });

  test('Test "More Details" link Button,', () => {
    const { getByText, history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
    />);
    const pokemonDetails = getByText(/more details/i);
    expect(pokemonDetails).toBeInTheDocument();
    userEvent.click(pokemonDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Test if fav. pokemons get Favorite Star, Ahoray!!!! ;D ', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const ashKetchumLifeTimePokemon = getByAltText(/is marked as favorite/i);
    expect(ashKetchumLifeTimePokemon.src).toBe('http://localhost/star-icon.svg');
    expect(ashKetchumLifeTimePokemon.alt).toBe('Pikachu is marked as favorite');
  });
});
