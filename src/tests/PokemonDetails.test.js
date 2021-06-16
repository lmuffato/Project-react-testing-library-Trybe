import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// Em alguns pontos, consultei o repositório do Vinicius:
// https://github.com/tryber/sd-010-a-project-react-testing-library/pull/83

const route = '/pokemons/25';

test(`Teste se as informações detalhadas do Pokémon
selecionado são mostradas na tela`, () => {
  const { getByRole, getByText, history } = renderWithRouter(<App />);
  history.push(route);

  const title = getByRole('heading', { name: /Pikachu Details/i, level: 2 });
  const summary = getByRole('heading', { name: /Summary/i, level: 2 });
  const summaryText = getByText('This intelligent Pokémon roasts hard berries'
  + ' with electricity to make them tender enough to eat.');

  expect(title).toBeInTheDocument();
  expect(summary).toBeInTheDocument();
  expect(summaryText).toBeInTheDocument();
});

test(`Teste se existe na página uma seção com os mapas
contendo as localizações do pokémon`, () => {
  const { getAllByRole, getByText, history } = renderWithRouter(<App />);
  history.push(route);

  const gameLocation = getByText('Game Locations of Pikachu');
  const img = getAllByRole('img', { name: /Pikachu location/i });

  expect(gameLocation).toBeInTheDocument();
  expect(img[0]).toBeInTheDocument();
  expect(img[0].alt).toBe('Pikachu location');
  expect(img[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
});

test('Testa se o "Pokémon Favoritado?" está sendo exibido', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push(route);

  const text = getByText('Pokémon favoritado?');

  expect(text).toBeInTheDocument();
});
