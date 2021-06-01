import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokeMock = pokemons[0];

describe('PokemonDetails.test.js', () => {
  test('Exibe um text com "(Nome do Pokemon) Detalhes"', () => {
    const { getByRole } = renderWithRouter(<App />);
    userEvent.click(getByRole('link', { name: /more details/i }));
    const detailsTitle = getByRole('heading', {
      level: 2,
      name: `${pokeMock.name} Details`,
    });
    expect(detailsTitle).toBeInTheDocument();
  });
  test('Não deve existir nenhum link de navegação', () => {
    const { getAllByRole, getByRole } = renderWithRouter(<App />);
    userEvent.click(getByRole('link', { name: /more details/i }));
    const expectedLength = 3;
    const links = getAllByRole('link');
    expect(links).toHaveLength(expectedLength);
  });
  test('Exibe titulo escrito "Summary"', () => {
    const { getByRole } = renderWithRouter(<App />);
    userEvent.click(getByRole('link', { name: /more details/i }));
    const summaryTitle = getByRole('heading', { name: /summary/i });
    expect(summaryTitle).toBeInTheDocument();
  });
  test('Exibe titulo escrito "Summary"', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    userEvent.click(getByRole('link', { name: /more details/i }));
    expect(getByText(pokeMock.summary)).toBeInTheDocument();
  });
  test('Exibe as localidades dos pokemons no jogo', () => {
    const { getByRole } = renderWithRouter(<App />);
    userEvent.click(getByRole('link', { name: /more details/i }));
    const gameLocationsTitle = getByRole('heading',
      { name: `Game Locations of ${pokeMock.name}` });
    expect(gameLocationsTitle).toBeInTheDocument();
  });
  test('Exibe os Mapas com nomes e links de images corretamente', () => {
    const { getByRole, getAllByAltText, getByText } = renderWithRouter(<App />);
    userEvent.click(getByRole('link', { name: /more details/i }));
    const locationImage = getAllByAltText(`${pokeMock.name} location`);
    for (let index = 0; index < locationImage.length; index += 1) {
      expect(locationImage[index].src).toBe(pokeMock.foundAt[index].map);
      const locationName = getByText(pokeMock.foundAt[index].location);
      expect(locationName).toBeInTheDocument();
    }
  });
  test('Exibe uma CheckBox para favoritar o pokemon', () => {
    const { getByLabelText, getByRole } = renderWithRouter(<App />);
    userEvent.click(getByRole('link', { name: /more details/i }));
    const checkboxInput = getByRole('checkbox');
    const checkboxLabel = getByLabelText(/pokémon favoritado/i);
    expect(checkboxInput).toBeInTheDocument();
    expect(checkboxInput.id).toBe('favorite');
    expect(checkboxLabel).toBeInTheDocument();
  });
  test('Ao clicar adiciona ou remove item da lista de favoritos', () => {
    const { getByRole } = renderWithRouter(<App />);
    userEvent.click(getByRole('link', { name: /more details/i }));
    const checkboxInput = getByRole('checkbox');
    userEvent.click(checkboxInput);
    expect(JSON.parse(localStorage.getItem('favoritePokemonIds'))[0]).toBe(pokeMock.id);
    userEvent.click(checkboxInput);
    expect(JSON.parse(localStorage.getItem('favoritePokemonIds'))[0]).toBeUndefined();
  });
});
