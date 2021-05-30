import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente "PokemonDetails"', () => {
  it(`Teste se as informações detalhadas do Pokémon 
    selecionado são mostradas na tela.`, () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const details = getByText('More details');
    const pokeSummary = 'This intelligent Pokémon roasts hard berries'
      + ' with electricity to make them tender enough to eat.';

    userEvent.click(details);
    const mainText = getByText('Pikachu Details');
    const summary = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const paragraph = getByText(pokeSummary);

    expect(mainText).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  it(`Teste se existe na página uma seção com 
    os mapas contendo as localizações do pokémon`, () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    const details = getByText('More details');

    userEvent.click(details);
    const maps = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });

    const map1 = getByText('Kanto Viridian Forest');
    const map2 = getByText('Kanto Power Plant');

    const imagesMap = getAllByAltText('Pikachu location');

    const srcMap1 = imagesMap[0].src;
    const srcMap2 = imagesMap[1].src;

    expect(maps).toBeInTheDocument();
    expect(map1).toBeInTheDocument();
    expect(map2).toBeInTheDocument();
    expect(imagesMap.length).toBe(2);
    expect(srcMap1).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(srcMap2).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it(`Teste se o usuário pode favoritar 
    um pokémon através da página de detalhes.`, () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const details = getByText('More details');

    userEvent.click(details);
    const checkFavorite = getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });

    expect(checkFavorite).toBeInTheDocument();

    userEvent.click(checkFavorite);
    const checkedBox = getByRole('checkbox', { checked: true });

    expect(checkedBox).toBeInTheDocument();

    userEvent.click(checkFavorite);
    const unCheckedBox = getByRole('checkbox', { checked: false });

    expect(unCheckedBox).toBeInTheDocument();
  });
});
