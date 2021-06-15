import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
// import Pokedex from '../components/Pokedex';
import RenderWithRouter from './RenderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se contém um heading h2 com o texto Encountered pokémons', () => {
    RenderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  // Ref: https://github.com/tryber/sd-010-a-project-react-testing-library/pull/15/files
  test('Teste se é exibido o próximo Pok da lista qnq o botão Próx poké é clic', () => {
    RenderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(nextButton);
  });

  const pokName = screen.getByTestId('pokemon-name');
  console.log(pokName.innerHTML);
  console.log(data[1].pokName);
  expect(pokName.innerHTML).toBe(data[1].pokName);
});

test('Teste se é mostrado apenas um Pokémon por vez', () => {
  const { getByRole, getByText } = RenderWithRouter(<App />);

  const proximoPokemon = getByRole('button', {
    name: /Próximo pokémon/i,
  });

  fireEvent.click(proximoPokemon);
  const secondPok = getByText('Charmander');
  expect(secondPok).toBeInTheDocument();
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByRole } = RenderWithRouter(<App />);
  const resetBtn = getByRole('button', {
    name: /All/i,
  });
  userEvent.type(resetBtn);
  expect(resetBtn).toBeInTheDocument();
});

test('deve verificar se é criado, um botão de filtro para cada tipo de Pokémon', () => {
  const { getAllByTestId } = RenderWithRouter(<App />);

  const btnAllPokemons = getAllByTestId('pokemon-type-button');
  userEvent.type(btnAllPokemons);
  expect(btnAllPokemons[0]).toHaveTextContent('Electric');
});
