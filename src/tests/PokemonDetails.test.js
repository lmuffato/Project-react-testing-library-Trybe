import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

// import pokemons from '../data';

describe('Teste se as informações detalhadas são mostradas na tela', () => {
  // const pokemon = pokemons[0];
  // const isPokemonFavoriteById = false;
  it('deve conter o texto Pikachu Details', () => {
    const { getByRole } = renderWithRouter(<App />);

    const btn = getByRole('link', {
      name: /more details/i,
    });

    fireEvent.click(btn);

    const pokeDetails = getByRole('heading', {
      name: /Pikachu Details/i,
    });

    expect(pokeDetails).toBeInTheDocument();
  });
  it('conter um heading h2 com o texto Summary', () => {
    const { getByRole } = renderWithRouter(<App />);

    const btn = getByRole('link', {
      name: /more details/i,
    });

    fireEvent.click(btn);

    const pokeDetails = getByRole('heading', {
      name: /Summary/i,
    });

    expect(pokeDetails).toBeInTheDocument();
  });
  it('conter um conter um parágrafo com o resumo do Pokémon', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const btn = getByRole('link', {
      name: /more details/i,
    });

    fireEvent.click(btn);

    const pokeDetails = getByText('This intelligent Pokémon roasts hard'
    + ' berries with electricity to make them tender enough to eat.');

    expect(pokeDetails).toBeInTheDocument();
  });
});
describe('Teste se existe os mapas contendo as localizações do pokémon', () => {
  // const pokemon = pokemons[0];
  // const isPokemonFavoriteById = false;
  it('deve conter o texto h2 Game Locations of Pikachu', () => {
    const { getByRole } = renderWithRouter(<App />);

    const btn = getByRole('link', {
      name: /more details/i,
    });

    fireEvent.click(btn);

    const pokeDetails = getByRole('heading', {
      name: /Game Locations of Pikachu/i,
    });

    expect(pokeDetails).toBeInTheDocument();
  });
  it('deve conter o texto Pikachu Details', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const btn = getByRole('link', {
      name: /more details/i,
    });

    fireEvent.click(btn);

    const pokeMap = getByText('Kanto Viridian Forest');

    expect(pokeMap).toBeInTheDocument();

    const pokeMap2 = getByText('Kanto Power Plant');

    expect(pokeMap2).toBeInTheDocument();
  });
  it('deve conter a imagem da localização', () => {
    const { getByRole, getAllByAltText } = renderWithRouter(<App />);

    const btn = getByRole('link', {
      name: /more details/i,
    });

    fireEvent.click(btn);

    const image = getAllByAltText('Pikachu location');

    expect(image[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });
});
describe('Teste se o usuário pode favoritar um pokémon', () => {
  // const pokemon = pokemons[0];
  // const isPokemonFavoriteById = false;
  it('deve conter o texto Pikachu Details', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />);

    const btn = getByRole('link', {
      name: /more details/i,
    });

    fireEvent.click(btn);

    const pokeDetails = getByLabelText('Pokémon favoritado?');

    expect(pokeDetails).toBeInTheDocument();
  });
});
