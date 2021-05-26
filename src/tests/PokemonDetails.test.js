import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testando componente PokemonDetails', () => {
  test('testando detalhes do pokemon', () => {
    const { getByRole, getByAltText, getByTestId } = renderWithRouter(<App />);
    const detailsButton = getByRole('link', { name: 'More details' });
    expect(detailsButton).toBeInTheDocument();
    userEvent.click(detailsButton);
    const h2title = getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(h2title).toBeInTheDocument();
    const imgPokemon = getByAltText('Pikachu sprite');
    expect(imgPokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
  test('testando se renderiza detalhes do mapa referente ao pokemon', () => {
    const { getByRole, getAllByAltText, getByLabelText, getByText } = renderWithRouter(<App />);
    const detailsButton = getByRole('link', { name: 'More details' });
    expect(detailsButton).toBeInTheDocument();
    userEvent.click(detailsButton);
    const titleLocation = getByRole('heading', { level: 2,
      name: 'Game Locations of Pikachu' });
    expect(titleLocation).toBeInTheDocument();
    const imgs = getAllByAltText('Pikachu location');
    expect(imgs[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgs[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    const checkbox = getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    const h2Summary = getByRole('heading', { level: 2, name: 'Summary' });
    expect(h2Summary).toBeInTheDocument();
    const subSummary = getByText(
      'This intelligent Pokémon roasts hard berries'
      + ' with electricity to make them tender enough to eat.',
    );
    expect(subSummary).toBeInTheDocument();
  });
});
