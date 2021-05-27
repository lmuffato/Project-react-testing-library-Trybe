import React from 'react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const myRota = 'pokemons/25';

describe(`Teste se as informações detalhadas do Pokémon selecionado
  são mostradas na tela.`, () => {
  it('Testa se o texto (<name> Details) esta na tela', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push(myRota);

    const myText = getByRole('heading', {
      name: /Pikachu Details/i,
      level: 2,
    });
    expect(myText).toBeInTheDocument();
  });

  it('Testa se o texto Summary esta na tela', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push(myRota);

    const myText = getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });
    expect(myText).toBeInTheDocument();
  });

  it('Testa se exite uma descrição do Pokemon esta na tela', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push(myRota);

    const myText = getByText('This intelligent Pokémon roasts hard berries with'
    + ' electricity to make them tender enough to eat.');
    expect(myText).toBeInTheDocument();
  });

  it('Testa se o texto Game Locations of Pikachu esta na tela', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push(myRota);

    const myText = getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    expect(myText).toBeInTheDocument();
  });

  it('Testa se o texto Kanto Viridian Forest esta na tela', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push(myRota);

    const myText = getByText('Kanto Viridian Forest');
    expect(myText).toBeInTheDocument();
  });

  it('Testa se o texto Kanto Power Plant esta na tela', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push(myRota);

    const myText = getByText('Kanto Power Plant');
    expect(myText).toBeInTheDocument();
  });

  it('Testa se o texto Pokémon favoritado? esta na tela', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push(myRota);

    const myText = getByText('Pokémon favoritado?');
    expect(myText).toBeInTheDocument();
  });

  it('Testa se a imagem do mapa esta na tela', () => {
    const { getAllByAltText, history } = renderWithRouter(<App />);

    history.push('/pokemons/25');

    const myImage = getAllByAltText('Pikachu location');

    expect(myImage[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });
});
