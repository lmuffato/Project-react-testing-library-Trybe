import React from 'react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from './renderWithHistory';
import App from '../App';

// Referência consultada: https://github.com/tryber/sd-09-project-react-testing-library/pull/101/files
const pokemon = {
  id: pokemons[0].id,
  image: pokemons[0].image,
  moreInfo: pokemons[0].moreInfo,
  name: pokemons[0].name,
  summary: pokemons[0].summary,
  type: pokemons[0].type,
  averageWeight: {
    measurementUnit: pokemons[0].averageWeight.measurementUnit,
    value: pokemons[0].averageWeight.value,
  },
};

describe('testes do component Pokemon', () => {
  test('Testa se é renderizado um card com as informações do pokémon.', () => {
    const { history, getByTestId, getByAltText } = renderWithRouter(<App />);
    history.push('/');
    const { measurementUnit, value } = pokemon.averageWeight;

    expect(getByTestId('pokemon-name')).toHaveTextContent(pokemon.name);
    expect(getByTestId('pokemon-type')).toHaveTextContent(pokemon.type);
    expect(getByTestId('pokemon-weight')).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );

    expect(getByAltText(`${pokemon.name} sprite`).src).toBe(pokemon.image);
  });

  test(`Teste se o card do Pokémon indicado na Pokédex 
    contém um link de navegação para exibir detalhes deste Pokémon`, () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const linkDetails = getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);

    const headingDetails = getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });

    expect(headingDetails).toBeInTheDocument();
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history,
      getByRole,
      getByLabelText,
      getByAltText,
    } = renderWithRouter(<App />);

    history.push(`/pokemons/${pokemon.id}`);
    const checkboxFavorite = getByRole('checkbox', {
      name: /pokémon favoritado?/i,
    });

    userEvent.click(checkboxFavorite);
    expect(getByLabelText('Pokémon favoritado?')).toBeChecked();

    const imagePath = getByAltText(`${pokemon.name} is marked as favorite`);
    expect(imagePath.src).toBe('http://localhost/star-icon.svg');
  });
});
