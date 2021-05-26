import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
// fonte: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
describe('testing all screen application of the Pokémon', () => {
  it('cheking render a pokémon with info', () => {
    const { getByTestId, getByAltText, getByText } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemon-type');
    const weight = getByTestId('pokemon-weight');
    const pokemonImg = getByAltText('Pikachu sprite');
    const link = getByText(/more details/i);
    expect(link).toBeInTheDocument();
    expect(name.innerHTML).toBe('Pikachu');
    expect(type).toHaveTextContent(pokemons[0].type);
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImg.src).toContain(pokemons[0].image);
  });
  it('Check if Pokémon card show on the Pokédex contain'
  + 'navigation link to view details Pokémons', () => {
    const { history, getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
    />);
    const link = getByRole('link', {
      name: /more details/i });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Check favorite Pokémon', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const pikachuAsFavorite = getByAltText(/is marked as favorite/i);
    expect(pikachuAsFavorite.src).toBe('http://localhost/star-icon.svg');
    expect(pikachuAsFavorite.alt).toBe('Pikachu is marked as favorite');
  });
});
