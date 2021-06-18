import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';


describe('requisito 5 gigante', () => {
  const nextPokemon = 'next-pokemon';

  test('Teste se página contém um heading com texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  test('verifica se é exibido o próximo Pokémon da lista', () => {
    renderWithRouter(<App />);
    const botton = screen.getByTestId(nextPokemon);

    expect(botton.innerHTML).toMatch('Próximo pokémon');
    // logica feita com os colegas
    const numberClik = 8;
    const pokemonName = screen.getByTestId('pokemon-name');
    for (let index = 1; index <= numberClik; index += 1) {
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(botton);
    }

    const dragonair = screen.getByText('Dragonair');
    expect(dragonair).toBeInTheDocument();
    userEvent.click(botton);

  });

  test('Testa se é aparece apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const btnProximo = screen.getByTestId(nextPokemon);
    userEvent.click(btnProximo);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });

  test('Testa se a Pokédex possui os botões para filtrar', () => {
    renderWithRouter(<App />);
    const btnFire = screen
      .getByRole('button', { name: 'Fire' });

  });
  test('Testa se a Pokédex contém um botão de resetar o filtro', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();

    const btnFire = screen
      .getByRole('button', { name: 'Fire' });
    userEvent.click(btnFire);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    userEvent.click(btnAll);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    renderWithRouter(<App />);
    expect(pikachu).toBeInTheDocument();
  });
  test('Teste se é criado, dinamicamente, um botão de filtro', () => {
    renderWithRouter(<App />);

    const btnTypepokemon = screen.getAllByTestId('pokemon-type-button');
    const numberBtn = 7;
    expect(btnTypepokemon.length).toEqual(numberBtn);

    btnTypepokemon.forEach((btn) => {
      expect(btn).toBeInTheDocument();
    });

    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeVisible();
  });

});

// npx stryker run ./stryker/Pokedex.conf.json
