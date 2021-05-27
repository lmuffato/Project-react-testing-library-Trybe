import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with'
  + ' electricity to make them tender enough to eat.',
};

describe('Testa todo o Componente "Pokemon.js"', () => {
  test('Verifica se se é renderizado um card com as '
  + 'informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toMatch('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toMatch('Electric');

    const pokemonWheight = screen.getByText(/Average weight.../);
    const wheight = pokemon.averageWeight.value;
    const meansureUnit = pokemon.averageWeight.measurementUnit;
    expect(pokemonWheight.innerHTML)
      .toMatch(`Average weight: ${wheight} ${meansureUnit}`);

    const pokemonImage = screen.getByRole('img');
    const pokemonImageSrc = pokemonImage.getAttribute('src');
    const pokemonImageAlt = pokemonImage.getAttribute('alt');
    expect(pokemonImageSrc.length).toBeGreaterThan(1);
    expect(pokemonImageAlt.length).toBeGreaterThan(1);
  });

  test(`Verifica se o card do Pokémon indicado na Pokédex
  contém um link de navegação para exibir detalhes deste
  Pokémon. O link deve possuir a URL /pokemons/<id>, onde
  <id> é o id do Pokémon exibido.`, () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByText(/More details/i);
    const linkMoreDetailsId = linkMoreDetails.getAttribute('href');

    userEvent.click(linkMoreDetails);
    const { pathname } = history.location;

    expect(linkMoreDetailsId).toMatch(pathname);
  });

  test(`Verifica se ao clicar no link de navegação do Pokémon, 
  é feito o redirecionamento da aplicação para a página de detalhes de Pokémon`, () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByText(/More details/i);
    userEvent.click(linkMoreDetails);

    const { pathname } = history.location;
    expect(pathname).toMatch(/pokemons.../);
  });

  test(`Verifica se a URL exibida no navegador muda para /pokemon/<id>,
   onde <id> é o id do Pokémon cujos detalhes se deseja ver;`, () => {
    renderWithRouter(<App />);

    const firstlinkMoreDetails = screen.getByText(/More details/);
    const firstMoreDetailsId = firstlinkMoreDetails.getAttribute('href');
    const nextPokemon = screen.getByText(/Próximo pokémon/);
    userEvent.click(nextPokemon);
    const secondlinkMoreDetails = screen.getByText(/More details/);
    const secondMoreDetailsId = secondlinkMoreDetails.getAttribute('href');

    expect(firstMoreDetailsId).not.toMatch(secondMoreDetailsId);
  });

  test('Verifica se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const firstlinkMoreDetails = screen.getByText(/More details/);
    userEvent.click(firstlinkMoreDetails);
    const nextPokemon = screen.getByText(/Pokémon favoritado/);
    userEvent.click(nextPokemon);

    const favoriteIcon = screen.getAllByRole('img')[1];
    const favoriteIconSrc = favoriteIcon.getAttribute('src');
    expect(favoriteIconSrc).toMatch('/star-icon.svg');

    const favoriteIconAlt = favoriteIcon.getAttribute('alt');
    expect(favoriteIconAlt).toMatch(/...is marked as favorite/);
  });
});
