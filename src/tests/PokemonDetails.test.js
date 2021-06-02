import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import Pokemon from '../components/Pokemon';

// const pokeType = 'pokemon-type';
const pokeName = 'pokemon-name';
const moreDetails = 'More details';

function gettingDragonairDetails() {
  const { history } = renderWithRouter(<App />);
  history.push('/pokemons/148');
}
function gettingDragonairDetails2() {
  renderWithRouter(<App />);
  const dragonButton = screen.getByRole('button', { name: /dragon/i });
  userEvent.click(dragonButton);
  const linkDetails = screen.getByRole('link', {
    name: moreDetails,
  });
  userEvent.click(linkDetails);
}

describe('Testes das informações detalhadas do Pokémon selecionado na tela.', () => {
  test('conter um texto <name> Details, onde <name> é o nome do Pokémon', () => {
    gettingDragonairDetails2();
    const pokemonName = screen.getByTestId(pokeName);
    const pokemonDetails = screen.getByRole('heading', {
      name: `${pokemonName.innerHTML} Details`,
      level: 2,
    });
    expect(pokemonDetails).toBeInTheDocument();
  });
  test('testa o dragonair details', () => {
    gettingDragonairDetails();
    const dragonairDetails = screen.getByRole('heading', { name: 'Dragonair Details' });
    expect(dragonairDetails).toBeInTheDocument();
  });
});
