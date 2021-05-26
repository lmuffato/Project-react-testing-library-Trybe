import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';
// import { Pokemon } from '../components';

const selectRandomIndex = () => Math.round(Math.random() * pokemons.length - 1);
const randomPokemonIndex = selectRandomIndex();
const randomPokemon = pokemons[randomPokemonIndex];
const nextText = 'Próximo pokémon';
const moreDetailsText = 'More details';

describe('Test the component PokemonDetails', () => {
  it('verify if the info about the selected Pokemon are on the screen', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const moreDetails = getByText(moreDetailsText);
    const nextButton = getByText(nextText);

    for (let index = 0; index < randomPokemonIndex; index += 1) {
      userEvent.click(nextButton);
    }

    const { id } = randomPokemon;
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${id}`);

    userEvent.click(moreDetails);

    const heading = getAllByRole('heading', { level: 2 });
    expect(heading[0].textContent).toBe(`${randomPokemon.name} Details`);
    expect(moreDetails).not.toBeInTheDocument();
    expect(heading[1].textContent).toBe('Summary');
    expect(heading[2]).toBeInTheDocument();
  });

  it('verify if there is a map with the location of the Pokemon', () => {
    const { getByText, getAllByRole, getAllByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText(moreDetailsText);
    const nextButton = getByText(nextText);

    for (let index = 0; index < randomPokemonIndex; index += 1) {
      userEvent.click(nextButton);
    }

    const { id } = randomPokemon;
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${id}`);

    userEvent.click(moreDetails);

    const heading = getAllByRole('heading', { level: 2 });
    expect(heading[2].textContent).toBe(`Game Locations of ${randomPokemon.name}`);

    const locations = getAllByAltText(`${randomPokemon.name} location`);
    const { foundAt } = randomPokemon;
    for (let index = 0; index < locations.length; index += 1) {
      expect(locations[index]).toBeInTheDocument();
      expect(locations[index]).toHaveAttribute('src', `${foundAt[index].map}`);
      expect(locations[index]).toHaveAttribute('alt', `${randomPokemon.name} location`);
    }
  });

  it('verify if the user can favor a pokemon on the details page', () => {
    const { getByText, getByRole, getByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText(moreDetailsText);
    const nextButton = getByText(nextText);

    for (let index = 0; index < randomPokemonIndex; index += 1) {
      userEvent.click(nextButton);
    }

    const { id } = randomPokemon;
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${id}`);

    userEvent.click(moreDetails);

    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    const favStar = getByAltText(`${randomPokemon.name} is marked as favorite`);
    expect(checkbox).toBeTruthy();
    expect(favStar).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(favStar).not.toBeInTheDocument();
  });
});
