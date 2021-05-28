import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Requisito 6', () => {
  test('Testando se o card renderiza na tela', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ pokemons[0] }
      />,
    );

    const { averageWeight, name, type } = pokemons[0];
    const { value, measurementUnit } = averageWeight;

    const textWeight = `Average weight: ${value} ${measurementUnit}`;
    const imgText = getByAltText(`${name} sprite`);
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    const pokemonName = getByText(name);
    const pokemonType = getByText(type);
    const pokemonWeight = getByText(textWeight);

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(imgText.src).toContain(url);
  });

  test('Testando se o card do Pokémon contém um link de navegação para detalhes', () => {
    const { getByText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ pokemons[0] }
      />,
    );

    const { id } = pokemons[0];

    const url = `/pokemons/${id}`;
    const link = getByText('More details');
    expect(link.href).toContain(url);
  });

  test('Testando se ao clicar no link, a página é redirecionada', () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite
      />,
    );
    const { name } = pokemons[0];

    const detailsTextLink = getByRole('link', {
      name: /More details/i,
    });

    userEvent.click(detailsTextLink);

    const headingDetails = getByText(name);

    expect(headingDetails).toBeInTheDocument();
  });

  test('Testando se existe um ícone de estrela nos Pokémons Favoriados', () => {
    const { getByRole, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite
      />,
    );

    const { name } = pokemons[0];

    const detailsTextLink = getByRole('link', {
      name: 'More details',
    });
    userEvent.click(detailsTextLink);

    const imgText = getByAltText(`${name} is marked as favorite`);
    const url = '/star-icon.svg';
    expect(imgText.src).toContain(url);
  });
});
