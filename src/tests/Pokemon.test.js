import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import data from '../data';
import App from '../App';

const btnDetails = 'More details';

describe('test pokemon', () => {
  test('teste card com informações do pokemon', () => {
    RenderWithRouter(<App />);
    const detailsLink = screen.getByText(btnDetails);
    userEvent.click(detailsLink);

    const name = screen.getByTestId('pokemon-name');
    expect(name.innerHTML).toBe(data[0].name);

    const type = screen.getByTestId('pokemon-type');
    expect(type.innerHTML).toBe(data[0].type);

    const weight = screen.getByTestId('pokemon-weight');
    const pokemon = data[0].averageWeight;
    expect(weight.innerHTML)
      .toBe(`Average weight: ${pokemon.value} ${pokemon.measurementUnit}`);

    const image = screen.getByAltText(`${data[0].name} sprite`);
    expect(image.src).toContain(data[0].image);
  });

  test('teste link de navegação', () => {
    const { history } = RenderWithRouter(<App />);

    const detailsLink = screen.getByText(btnDetails);
    userEvent.click(detailsLink);
    // entro no card do pokemon

    const { location: { pathname } } = history;
    console.log(pathname);
    expect(pathname).toBe(`/pokemons/${data[0].id}`);
  });

  test('teste icone estrela', () => {
    RenderWithRouter(<App />);
    // clico no more datails link
    const detailsLink = screen.getByText(btnDetails);
    userEvent.click(detailsLink);

    // clico na checkbok para adicionar as favoritos
    const addFavorito = screen.getByRole('checkbox');
    userEvent.click(addFavorito);

    // clico no link de pokemons favoritos
    const favoritePokemon = screen.getByText('Favorite Pokémons');
    userEvent.click(favoritePokemon);

    const image = screen.getByAltText(`${data[0].name} is marked as favorite`);
    expect(image.src).toContain('/star-icon.svg');
  });
});
