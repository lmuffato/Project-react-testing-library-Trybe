import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente <Pokemon.js />', () => {
  const screen = renderWithRouter(<App />);
  const pokemonNome = screen.getByTestId('pokemon-name');
  const pokemonWeight = screen.getByTestId('pokemon-weight');
  const pokemonType = screen.getByTestId('pokemon-type');
  const linkDetails = screen.getByRole('link', { name: /More details/i });

  const {
    name,
    type,
    image,
    id,
    averageWeight: { value, measurementUnit },
  } = pokemons[0];

  const pokemonImage = screen.getByAltText(/sprite/i);

  test('verifica se o \'nome\' do pokemon é renderizado corretamente', () => {
    expect(pokemonNome.innerHTML).toBe(name);
  });

  test('verifica se o \'tipo\' do pokemon é renderizado corretamente', () => {
    expect(pokemonType.innerHTML).toBe(type);
  });

  test(`verifica se o peso médio do pokémon deve ser
  exibido no formato correto`, () => {
    expect(pokemonWeight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
  });

  test('A imagem do Pokémon deve ser renderizada corretamente', () => {
    expect(pokemonImage.src).toBe(image);
    expect(pokemonImage.alt).toBe(`${name} sprite`);
  });

  test(`verifica se o card Pokémon indicado no Pokédex contém uma navegação
  link para ver os detalhes deste Pokémon`, () => {
    expect(linkDetails.href).toBe(`http://localhost/pokemons/${id}`);
  });

  userEvent.click(linkDetails);

  test(`verifica se o link de detalhes do Pokémon redireciona corretamente para 
  a página de detalhes de Pokémon.`, () => {
    const { history: { location: { pathname } } } = screen;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  userEvent.click(screen.getByRole('checkbox'));

  const starOfFavorited = screen.getByAltText(`${name} is marked as favorite`);

  test('verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    expect(starOfFavorited.src).toBe('http://localhost/star-icon.svg');
  });
});
