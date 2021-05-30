import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemon from '../data';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';

describe('Verifica se:', () => {
  const pikachu = pokemon[0];

  it('é renderizado um card com as informações corretas do pokémon', () => {
    const { name, type, image, averageWeight: {
      value,
      measurementUnit,
    } } = pikachu;

    const { container } = renderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ false } />,
    );
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImage = screen.getByAltText(`${name} sprite`);
    const pokeFavoriteIcon = container.querySelector('favorite-icon');
    expect(pokeFavoriteIcon).not.toBeInTheDocument();
    expect(pokeName).toHaveTextContent(name);
    expect(pokeType).toHaveTextContent(type);
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage).toHaveAttribute('src', image);
  });

  it('se há um link que redireciona para /pokemon/id mostrando mais detalhes', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemon[2] } isFavorite />);
    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkMoreDetails).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
    userEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pokemon[2].id}`);
  });

  it('se há um ícone de estrela nos pokémons favoritados', () => {
    const { name } = pikachu;
    renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite />);
    const pokeFavoriteIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(pokeFavoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
