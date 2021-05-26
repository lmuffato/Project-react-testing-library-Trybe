import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';
import Pokemon from '../components/Pokemon';
import FavoritePokemons from '../components/FavoritePokemons';

const selectRandomIndex = () => Math.round(Math.random() * pokemons.length - 1);
const randomPokemonIndex = selectRandomIndex();
const randomPokemon = pokemons[randomPokemonIndex];

describe('Test the infos provided by the component Pokemon', () => {
  it('verify if shows the right info about a random Pokemon', () => {
    const { getByTestId, getByRole, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ randomPokemon }
      showDetailsLink={ false }
      isFavorite={ false }
    />);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonAverageWeight = getByTestId('pokemon-weight');
    const pokemonImage = getByRole('img');
    const pokemonAlt = getByAltText(`${randomPokemon.name} sprite`);
    const { value, measurementUnit } = randomPokemon.averageWeight;

    expect(pokemonName.textContent).toBe(randomPokemon.name);
    expect(pokemonType.textContent).toBe(randomPokemon.type);
    expect(pokemonAverageWeight.textContent)
      .toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonImage.src).toBe(randomPokemon.image);
    expect(pokemonAlt).toBeInTheDocument();
  });

  it(`verify if the Pokemon card on the Pokedex has a navigation link
  to show more detail about that Pokemom`, () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText('More details');
    const nextButton = getByText('Próximo pokémon');

    for (let index = 0; index < randomPokemonIndex; index += 1) {
      userEvent.click(nextButton);
    }

    const { id } = randomPokemon;
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it('verify if the link of "More details" redirects to the details page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const moreDetails = getByText('More details');

    userEvent.click(moreDetails);
    const summary = getByText('Summary');
    const { pathname } = history.location;

    expect(summary).toBeInTheDocument();
    expect(pathname).toBe('/pokemons/25');
  });

  it('verify if there is a star icon on the favorite Pokemons', () => {
    const { getByAltText } = renderWithRouter(<FavoritePokemons
      pokemons={ pokemons }
    />);
    const favStar = getByAltText(`${randomPokemon.name} is marked as favorite`);

    expect(favStar).toBeInTheDocument();
    expect(favStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
