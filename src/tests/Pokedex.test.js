import React from 'react';
import { getByRole, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Pokedex } from '../components';
import { createBrowserHistory } from 'history';
import App from '../App';
import pokemons from '../data';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';

test('Contains the heading text "Encountered pokémons"', () => {
  const historyMock = createBrowserHistory();
  render(
    <Router history={historyMock}>
      <App />
    </Router>
  );

  const headingText = screen.getByRole('heading', {
    level: 2,
    name: /encountered pokémons/i
  })

  expect(headingText).toBeInTheDocument();
});

test('The next pokémon is showed'
+ ' when "Próximo pokémon" button is clicked', () => {
  const historyMock = createBrowserHistory();
  render(
    <Router history={historyMock}>
      <App />
    </Router>
  );
  
  const nextPokemonButton = screen.getByRole('button', {
    name: /Próximo pokémon/i
  });
  expect(nextPokemonButton).toBeInTheDocument();

  for(let i=0;i<pokemons.length;i++) {
    userEvent.click(nextPokemonButton);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeDefined();
  }
});

test('Pokédex has the filter buttons', () => {
  const historyMock = createBrowserHistory();
  render(
    <Router history={historyMock}>
      <App />
    </Router>
  );

  const nextPokemonButton = screen.getByRole('button', {
    name: /Próximo pokémon/i
  });

  const allPokemonTypes = pokemons.map(({type}) => type);

  const resetFilterButton = screen.getByRole('button', {
    name: /all/i,
  });

  const allButton = () => {
    pokemons.forEach(({name, type}) => {
      const pokeName = screen.getByTestId('pokemon-name');
      const pokeType = screen.getByTestId('pokemon-type');
      expect(pokeName).toHaveTextContent(name);
      expect(pokeType).toHaveTextContent(type);
      userEvent.click(nextPokemonButton);
    });
  };
  allButton();
  userEvent.click(resetFilterButton);
  allButton();
  
  function findTypeInCard(type) {
    const pokemonTypeOnCardEl = screen.getByTestId('pokemon-type');
    const pokemonType = pokemonTypeOnCardEl.innerHTML;
    expect(pokemonType).toEqual(type);
    expect(resetFilterButton).toBeDefined(); 
  }
  
  const filterButtons = screen.getAllByTestId('pokemon-type-button');
  filterButtons.forEach((button) => {
    userEvent.click(button);
    const isTypeIncluded = allPokemonTypes.includes(button.innerHTML);
    findTypeInCard(button.innerHTML);
    expect(button).toBeInTheDocument();
    expect(isTypeIncluded).toBeTruthy();
  });
  
  
  const normalTypeButton = screen.getByRole('button', {
    name: /normal/i
  });
  userEvent.click(normalTypeButton);
  const pokemonTypeOnCardEl = screen.getByTestId('pokemon-type');
  const pokemonType = pokemonTypeOnCardEl.innerHTML;
  expect(pokemonType).toEqual('Normal');
  expect(nextPokemonButton).toHaveAttribute('disabled'); 
});
