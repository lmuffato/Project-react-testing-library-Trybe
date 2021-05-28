import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
// Utilizei o codigo do colega Sergio Martins para fazer abstração desse requisito
const myPoke = {
  id: 148,
  name: 'Dragonair',
  type: 'Dragon',
  averageWeight: {
    value: '16.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
};

const pokeRender = (isFavorite = false) => (<Pokemon
  pokemon={ myPoke }
  isFavorite={ isFavorite }
  showDetailsLink
/>);

test('Basic infos show', () => {
  const { getByTestId, getByAltText } = renderWithRouter(pokeRender());

  const { innerHTML: pokemonName } = getByTestId('pokemon-name');
  const { innerHTML: pokemonType } = getByTestId('pokemon-type');
  const { innerHTML: pokemonWeight } = getByTestId('pokemon-weight');
  const { value, measurementUnit } = myPoke.averageWeight;
  const pokeImage = getByAltText(`${myPoke.name} sprite`);
  expect(pokemonName).toBe(myPoke.name);
  expect(pokemonType).toBe(myPoke.type);
  expect(pokemonWeight).toBe(`Average weight: ${value} ${measurementUnit}`);
  expect(pokeImage.src).toBe(myPoke.image);
});

test('exibir detalhes deste Pokémon', () => {
  const { getByRole } = renderWithRouter(pokeRender());
  const details = getByRole('link');
  expect(details).toBeInTheDocument();
  expect(details.href).toMatch(`pokemons/${myPoke.id}`);
});

test('Teste se ao clicar em navegação a aplicação vai para detalhes. ', () => {
  const { history, getByRole } = renderWithRouter(pokeRender());
  const details = getByRole('link');
  userEvent.click(details);
  const { pathname } = history.location;

  expect(pathname).toBe(`/pokemons/${myPoke.id}`);
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { getByAltText } = renderWithRouter(pokeRender(true));
  const getImage = getByAltText(`${myPoke.name} is marked as favorite`);

  expect(getImage).toBeInTheDocument();
  expect(getImage.src).toMatch('/star-icon.svg');
});
