import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Componente Pokemon', () => {
  test('Teste se é redenrizado um card com o nome correto do pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(pokemons[0].name);
  });

  test('Teste se é redenrizado um card com o tipe correto do pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const type = getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent(pokemons[0].type);
  });

  test('Teste se é redenrizado um card com o peso medio correto do pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const weight = getByTestId('pokemon-weight');
    const averageWeight = (
      `${pokemons[0].averageWeight.value} ${pokemons[0].averageWeight.measurementUnit}`
    );
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent(averageWeight);
  });

  test('Deve ter a img com src e alt corretos', () => {
    const { getByRole } = renderWithRouter(<App />);
    const img = getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(pokemons[0].image);
    expect(img.alt).toContain(`${pokemons[0].name} sprite`);
  });

  test('Teste se o link de navegação do Pokémon, redireciona para seus detalhes', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const url = `pokemons/${pokemons[0].id}`;
    const link = getAllByRole('link', { name: 'More details' });
    const linkMoreDatails = link[0];
    expect(linkMoreDatails).toBeInTheDocument();
    expect(linkMoreDatails.href).toContain(url);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getAllByRole, getByRole, getByAltText } = renderWithRouter(<App />);
    const imgs = getAllByRole('img');
    expect(imgs.length).toBe(1);
    const link = getAllByRole('link', { name: 'More details' });
    const linkMoreDatails = link[0];
    expect(linkMoreDatails).toBeInTheDocument();
    fireEvent.click(linkMoreDatails);
    expect(linkMoreDatails).not.toBeInTheDocument();
    const check = getByRole('checkbox');
    expect(check).toBeInTheDocument();
    expect(check.checked).toEqual(false);
    fireEvent.click(check);
    expect(check.checked).toEqual(true);
    const favoriteImg = getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favoriteImg).toBeInTheDocument();
    expect(favoriteImg.src).toContain('/star-icon.svg');
  });
});
