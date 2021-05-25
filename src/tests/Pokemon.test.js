import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requirement 6', () => {
  const POKEMON_NAME = 'pokemon-name';
  const POKEMON_TYPE = 'pokemon-type';
  const POKEMON_WEIGHT = 'pokemon-weight';
  const MORE_DETAILS = 'More details';

  it('if a card is rendered with the information of a certain Pokémon', () => {
    const { getByRole, queryByTestId } = renderWithRouter(<App />);

    // name
    const pokemonDataName = pokemons[0].name;
    const renderPokemonObjName = queryByTestId(POKEMON_NAME);
    const renderPokemonName = renderPokemonObjName[
      Object.keys(renderPokemonObjName)[1]].children;

    expect(renderPokemonName).toBe(pokemonDataName);

    // type
    const pokemonDataType = pokemons[0].type;
    const renderPokemonObjType = queryByTestId(POKEMON_TYPE);
    const renderPokemonType = renderPokemonObjType[
      Object.keys(renderPokemonObjType)[1]].children;

    expect(renderPokemonType).toBe(pokemonDataType);

    // averageWeight: {value, measurementUnit}
    const weightValue = pokemons[0].averageWeight.value;
    const weighttUnit = pokemons[0].averageWeight.measurementUnit;
    const weightPokemonData = `Average weight: ${weightValue} ${weighttUnit}`;

    const renderedPokemonObjectByWeight = queryByTestId(POKEMON_WEIGHT);
    const renderedPokemonWeight = renderedPokemonObjectByWeight[
      Object.keys(renderedPokemonObjectByWeight)[1]].children;

    expect(renderedPokemonWeight).toBe(weightPokemonData);

    // <img src={ `${image}` } alt={ `${name} sprite` }
    const dataPokemonImgURL = pokemons[0].image;
    const dataPokemonImgAlt = `${pokemonDataName} sprite`;

    const renderPokemonImgURL = getByRole('img').src;
    const renderPokemonImgAlt = getByRole('img').alt;

    expect(dataPokemonImgURL).toBe(renderPokemonImgURL);
    expect(dataPokemonImgAlt).toBe(renderPokemonImgAlt);
  });

  it('Pokémon card contains a navigation link to display details', () => {
    const { getByRole } = renderWithRouter(<App />);
    const moreDetailsLink = getByRole('link', { name: MORE_DETAILS });

    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink.href).toContain(pokemons[0].id);
  });

  it('Application is redirected to the details page after the click', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const moreDetailsLink = getByRole('link', { name: MORE_DETAILS });

    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Star icon on favorite Pokémon', () => {
    const { getByRole, queryByText, queryByAltText } = renderWithRouter(<App />);
    const moreDetailsLink = getByRole('link', { name: MORE_DETAILS });

    userEvent.click(moreDetailsLink);
    const favoritePokemonCheckbox = queryByText(/Pokémon favoritado/i);
    userEvent.click(favoritePokemonCheckbox);
    const favoritePokemon = queryByAltText(`${pokemons[0].name} is marked as favorite`);

    expect(favoritePokemon).toBeInTheDocument();
    expect(favoritePokemon).toHaveAttribute('src', '/star-icon.svg');
  });
});
