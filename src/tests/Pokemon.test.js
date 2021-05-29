import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

const pikachuPokeball = pokemons[0];
const { value, measurementUnit } = pikachuPokeball.averageWeight;

describe('test the pokemon component', () => {
  test('test if a pokemon card is rendered in the main page', () => {
    const { getByAltText, getByTestId, getByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const pokeName = getByTestId('pokemon-name');
    const pokeType = getByTestId('pokemon-type');
    const pokeWeight = getByTestId('pokemon-weight');
    const pokeImg = getByRole('img');
    const pokeImgAlt = getByAltText(`${pikachuPokeball.name} sprite`);

    expect(pokeName.textContent).toBe(pikachuPokeball.name);
    expect(pokeType.textContent).toBe(pikachuPokeball.type);
    expect(pokeWeight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(pokeImg.src).toBe(pikachuPokeball.image);
    expect(pokeImgAlt).toBeInTheDocument();
  });

  // esclarecendo o exercício abaixo, caso fosse utilizado o toBe no expect, ele não funcionaria pois no toBe a comparação
  // precisa ser perfeita, então só funcionaria caso o pikachuLink contivesse o link completo. Já no toMatch, basta que
  // um trecho (desde que correto) esteja contido no link passado, o que facilita a produção do código.

  test('test if the pokemon in the pokédex has a matching `More details` link', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const pikachuLink = `pokemons/${pikachuPokeball.id}`;
    const detailsLink = getByRole('link', { name: /More details/i });
    expect(detailsLink.href).toMatch(pikachuLink);
    userEvent.click(detailsLink);
    expect(history.location.pathname).toMatch(pikachuLink);
  });

  test('test if there is a star icon in the favorite pokemons', () => {
    const { getByAltText, getByRole, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favBtn = getByRole('checkbox');
    userEvent.click(favBtn);
    const starIcon = getByAltText(/Pikachu is marked as favorite/i);
    const starSrc = '/star-icon.svg';
    expect(starIcon.src).toMatch(starSrc);
  });
});
