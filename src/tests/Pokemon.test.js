import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

const pikachuPokeball = pokemons[0];
const { value, measurementUnit } = pikachuPokeball.averageWeight;

describe('Testa o componente pokemon', () => {
  test('testa se a ficha do pokemon eh renderizada na pagina principal', () => {
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

  test('testa o link more details na pokedex', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const pikachuLink = `pokemons/${pikachuPokeball.id}`;
    const detailsLink = getByRole('link', { name: /More details/i });
    expect(detailsLink.href).toMatch(pikachuLink);
    userEvent.click(detailsLink);
    expect(history.location.pathname).toMatch(pikachuLink);
  });

  test('testa o icone de estrela nos pokemons favoritos', () => {
    const { getByAltText, getByRole, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favBttn = getByRole('checkbox');
    userEvent.click(favBttn);
    const starIcontext = getByAltText(/Pikachu is marked as favorite/i);
    const stariconSrc = '/star-icon.svg';
    expect(starIcontext.src).toMatch(stariconSrc);
  });
});
