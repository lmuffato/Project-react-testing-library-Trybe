import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Teste se é renderizado as informações de determinado pokémon', () => {
  const pokemon = pokemons[0];
  const isPokemonFavoriteById = false;
  it('deve renderizar o nome correto do Pokémon', () => {
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ isPokemonFavoriteById[pokemon.id] } />,
    );
    const pokeName = getByText('Pikachu');
    expect(pokeName).toBeInTheDocument();
  });
  it('deve renderizar o tipo correto do Pokémon', () => {
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ isPokemonFavoriteById[pokemon.id] } />,
    );
    const pokeType = getByText('Electric');
    expect(pokeType).toBeInTheDocument();
  });
  it('deve renderizar o peso médio do pokémon', () => {
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ isPokemonFavoriteById[pokemon.id] } />,
    );
    const pokeWeigth = getByText('Average weight: 6.0 kg');
    expect(pokeWeigth).toBeInTheDocument();
  });
  it('deve renderizar magem do Pokémon', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ isPokemonFavoriteById[pokemon.id] } />,
    );

    const image = getByAltText('Pikachu sprite');

    expect(image.src)
      .toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image).toBeInTheDocument();
  });
});
describe('Teste se o card contém um link para exibir detalhes deste Pokémon.', () => {
  const pokemon = pokemons[0];
  const isPokemonFavoriteById = false;
  it('deve renderizar o link more details', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ isPokemonFavoriteById[pokemon.id] } />,
    );
    const moreDetails = getByRole('link', {
      name: /More details/i,
      container: /pokemons\/pikachu/i,
    });
    expect(moreDetails).toBeInTheDocument();
  });
  it('deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon', () => {
    const { getByRole, history } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ isPokemonFavoriteById[pokemon.id] } />,
    );
    const moreDetails = getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);

    expect(history.location.pathname).toBe('/pokemons/25');
  });
});
// describe('Teste se é feito o redirecionamento para detalhes do Pokémon', () => {
//   const pokemon = pokemons[0];
//   const isPokemonFavoriteById = false;
//   it('deve redirecionar para detalhes do pokemon', () => {
//     const { getByRole, getByText } = renderWithRouter(
//       <Pokemon pokemon={ pokemon } isFavorite={ isPokemonFavoriteById[pokemon.id] } />,
//     );
//     const moreDetails = getByRole('link', {
//       name: /More details/i,
//       container: /pokemons\/pikachu/i,
//     });
//     fireEvent.click(moreDetails);

//     const h2 = getByText('Pikachu Details');
//     expect(h2).toBeInTheDocument();
//   });
// });
describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const pokemon = pokemons[0];
  const isPokemonFavoriteById = true;
  it('deve ter ícone com uma imagem do atributo', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ isPokemonFavoriteById } />,
    );
    const image = getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(image.src)
      .toContain('/star-icon.svg');
    expect(image).toBeInTheDocument();
  });
});
