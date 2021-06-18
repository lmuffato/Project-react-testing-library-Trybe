import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('tests on component <Pokedex />', () => {
  const pokemonsNameList = () => [
    'Pikachu',
    'Charmander',
    'Caterpie',
    'Ekans',
    'Alakazam',
    'Mew',
    'Rapidash',
    'Snorlax',
    'Dragonair',
  ];

  const pokemonTypeList = () => [
    'Electric',
    'Fire',
    'Bug',
    'Poison',
    'Psychic',
    'Normal',
    'Dragon'];

  test('renders text Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const textHome = screen.getByRole('heading',
      {
        name: /encountered pokémons/i,
        level: 2,
      });

    expect(textHome).toBeInTheDocument();
  });

  test('click on Proximo pokémon render next pokemon list'
  + 'and last pokemon skips to first on list', () => {
    renderWithRouter(<App />);

    const botaoProximo = screen.getByRole('button', { name: /próximo pokémon/i });

    pokemonsNameList().forEach((pokemon) => {
      expect(screen.getByText(pokemon)).toBeInTheDocument();
      userEvent.click(botaoProximo);
    });

    expect(screen.getByText(pokemonsNameList()[0])).toBeInTheDocument();
  });

  test('renders pokemon cards one by one', () => {
    renderWithRouter(<App />);

    const pokemonCards = screen.getAllByTestId('pokemon-name');

    expect(pokemonCards).toHaveLength(1);
  });

  test('renders a button for each pokemon type', () => {
    renderWithRouter(<App />);

    const buttons = screen.getAllByTestId('pokemon-type-button');
    const buttonsTypes = buttons.map((button) => button.innerHTML);

    pokemonTypeList().forEach((type, index) => expect(type).toMatch(buttonsTypes[index]));
  });

  test('renders a button named All to reset filter', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(buttonAll);
    expect(buttonAll).toBeInTheDocument();

    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });

    pokemonsNameList().forEach((pokemon) => {
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(pokemon);
      userEvent.click(buttonNext);
    });
  });

  test('Proximo pokémon button must be disable when type list has length one', () => {
    renderWithRouter(<App />);

    const normalFilter = screen.getByRole('button', { name: 'Normal' });
    userEvent.click(normalFilter);

    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });

    expect(nextButton).toBeDisabled();
  });
});
