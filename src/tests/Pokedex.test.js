import React from 'react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';
import mockIsPokemonFavoriteById from '../mocks/mockIsPokemonFavoriteById';

describe('5. Testando componente <Pokedex />', () => {
  test('Página contém um heading h2 com o texto Encountered pokémon', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockIsPokemonFavoriteById }
      />,
    );
    const pokedexHeading = getByRole('heading', { level: 2 });
    expect(pokedexHeading).toBeInTheDocument();
    expect(pokedexHeading).toHaveTextContent('Encountered pokémons');
  });

  test('é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {});
  test('é mostrado apenas um Pokémon por vez', () => {});
  test('a Pokédex tem os botões de filtro', () => {});
  test('a Pokédex contém um botão para resetar o filtro', () => {});
  test('é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {});
  test('Botão Próximo deve ser desabilitado quando a lista tiver só um pokémon', () => {});
});
