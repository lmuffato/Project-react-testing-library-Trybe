import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import alias from './utils/alias';
import App from '../App';

describe('Testes para o componente "PokemonDetails.js"', () => {
  const { link, expectToBeInTheDocument } = alias;
  test('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    userEvent.click(link(/more details/i));

    expect(screen.queryByRole(/more details/i)).toBeNull();
    const pikachuSummary = 'This intelligent Pokémon roasts hard'
    + ' berries with electricity to make them tender enough to eat.';
    const summary = screen.getByText(pikachuSummary);
    expectToBeInTheDocument(
      screen.getByText('Pikachu Details'),
      screen.getByRole('heading', {
        name: 'Summary',
        level: 2,
      }),
      summary,
    );

    expect(summary.textContent).toBe(pikachuSummary);
  });

  test('Existe na página uma seção com os mapas contendo as'
  + ' localizações do pokémon', () => {
    renderWithRouter(<App />);

    userEvent.click(link(/more details/i));

    const locations = screen.getAllByRole('img', { name: 'Pikachu location' });
    const checkbox = screen.getByLabelText(/pokémon favoritado/i);
    expectToBeInTheDocument(
      screen.getByRole('heading', { name: 'Game Locations of Pikachu' }),
      locations[0],
      locations[1],
      checkbox,
    );

    expect(locations[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});
