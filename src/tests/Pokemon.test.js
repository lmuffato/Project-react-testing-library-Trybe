import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

// agradecimento ao pessoal que me ajudou depois do horario;
describe('requisito 6', () => {
  const getPokemonById = (id) => {
    const convert = Number(id);
    return pokemons.find((pokemon) => pokemon.id === convert);
  };
  test('Testa se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);
    const { type, name, image,
      averageWeight: { value, measurementUnit } } = getPokemonById('25');
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(screen.getByAltText(`${name} sprite`).src).toMatch(image);
  });
  test('testa link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const { id } = getPokemonById('25');
    const link = screen.getByRole('link', { name: 'More details' });
    expect(link.href).toMatch(`/pokemons/${id}`);
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toMatch(`/pokemons/${id}`);
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const inputFav = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(inputFav);
    const imgFav = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgFav.src).toMatch('/star-icon.svg');
    expect(imgFav).toBeInTheDocument();
  });
});

// npx stryker run ./stryker/Pokemon.conf.json
