import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import data from '../data';

describe('Requisito 7 Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do Pokémon', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    userEvent.click(getByText(/more details/i));
    const detailsName = getByRole('heading', { level: 2, name: /Pikachu Details/i });
    const summary = getByRole('heading', { level: 2, name: /Summary/i });
    const describePoke = getByText(/This intelligent Pokémon roasts hard berries/i);
    const locationPoke = getAllByAltText('Pikachu location');
    const locationGame = getByRole('heading', {
      level: 2, name: /Game Locations of Pikachu/i,
    });

    expect(detailsName).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(describePoke).toBeInTheDocument();
    expect(locationPoke).toHaveLength(2);
    expect(locationPoke[0].src).toMatch(data[0].foundAt[0].map);
    expect(locationGame).toBeInTheDocument();
  });

  it('Teste se o usuário pode favoritar um pokémon', () => {
    const { getByText, history, getByTestId } = renderWithRouter(<App />);
    userEvent.click(getByText(/more details/i));
    userEvent.click(getByText(/Pokémon favoritado?/i));
    history.push('/favorites');
    const pokeName = getByTestId('pokemon-name');

    expect(pokeName).toHaveTextContent('Pikachu');
  });
});
