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

const moreDetails = () => screen.getByText('More details');

describe('Testa todo o Componente "PokemonDetails.js"', () => {
  test(`Verifiva se as informações detalhadas do Pokémon 
  selecionado são mostradas na tela`, () => {
    renderWithRouter(<App />);
    userEvent.click(moreDetails());

    const pokemonName = screen.getByText(/...Details/);
    expect(pokemonName.innerHTML).toMatch(`${pokemon.name} Details`);

    const link = screen.queryByText('More details');
    expect(link).not.toBeInTheDocument();

    const summary = screen.getAllByRole('heading')[2];
    expect(summary.innerHTML).toMatch('Summary');

    const resumeParagraph = screen.getByText(/This intelligent Pokémon roasts.../);
    expect(resumeParagraph.innerHTML).toMatch(pokemon.summary);
  });

  test(`Verifiva se existe na página uma seção com os mapas
   contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);
    userEvent.click(moreDetails());

    const pokemonName = screen.getByText(/Game Locations of.../);
    expect(pokemonName.innerHTML).toMatch(`Game Locations of ${pokemon.name}`);

    pokemon.foundAt.forEach((place) => {
      const locationName = screen.getByText(place.location);
      expect(locationName).toBeInTheDocument();
    });

    const imgMap1 = screen.getAllByRole('img')[1].getAttribute('src');
    const imgMap2 = screen.getAllByRole('img')[2].getAttribute('src');
    const arrMaps = [imgMap1, imgMap2];
    expect(arrMaps[0]).toMatch(pokemon.foundAt[0].map);
    expect(arrMaps[1]).toMatch(pokemon.foundAt[1].map);

    const imgAltMap1 = screen.getAllByRole('img')[1].getAttribute('alt');
    const imgAltMap2 = screen.getAllByRole('img')[2].getAttribute('alt');
    const arrAltMaps = [imgAltMap1, imgAltMap2];
    expect(arrAltMaps[0]).toMatch(`${pokemon.name} location`);
    expect(arrAltMaps[1]).toMatch(`${pokemon.name} location`);
  });

  test(`Verifiva se o usuário pode favoritar um pokémon 
  através da página de detalhes.`, () => {
    renderWithRouter(<App />);
    userEvent.click(moreDetails());

    const favoritePokemon = screen.getByText('Pokémon favoritado?');
    expect(favoritePokemon).toBeInTheDocument();

    const imgsLenght = 3;
    const allImgs = () => screen.getAllByRole('img').length;
    expect(allImgs()).toBe(imgsLenght);
    userEvent.click(favoritePokemon);
    expect(allImgs()).toBe(imgsLenght + 1);
    userEvent.click(favoritePokemon);
    expect(allImgs()).toBe(imgsLenght);

    const labelText = screen.getByLabelText('Pokémon favoritado?');
    expect(labelText).toBeInTheDocument();
  });
});
