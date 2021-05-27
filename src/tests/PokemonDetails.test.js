import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../../renderWithRouter';
import App from '../App';

const pikachu = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary:
     'This intelligent Pokémon roasts hard berries with electricity '
     + 'to make them tender enough to eat.',
};

describe('testing PokemonDetails component', () => {
  test('shows detailed information about the pokemon', () => {
    const { getByText, history, getByRole, getAllByRole } = renderWithRouter(<App />);

    userEvent.click(getByText(/More details/i));
    expect(history.location.pathname).not.toBe('/');

    const pokeName = getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(pokeName).toBeInTheDocument();

    const links = getAllByRole('link');
    links.forEach((link) => expect(link).not.toHaveTextContent('More details'));

    const summaryHeading = getByRole('heading', { level: 2, name: 'Summary' });
    expect(summaryHeading).toBeInTheDocument();
    expect(getByText(pikachu.summary)).toBeInTheDocument();
  });

  test('there is a section with maps of pokemon`s localization', () => {
    const { getByText, history, getByRole, getAllByAltText } = renderWithRouter(<App />);

    userEvent.click(getByText(/More details/i));
    expect(history.location.pathname).not.toBe('/');

    const locationsH2 = getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(locationsH2).toBeInTheDocument();

    const images = getAllByAltText('Pikachu location');
    images.forEach((img) => expect(img).toBeInTheDocument());
    pikachu.foundAt.forEach((local) => {
      expect(getByText(local.location)).toBeInTheDocument();
      expect(images.some((img) => img.src === local.map)).toBe(true);
    });
  });

  test('user can check the pokemon as favorite', () => {
    const { getByText, history, getByLabelText } = renderWithRouter(<App />);

    userEvent.click(getByText(/More details/i));
    expect(history.location.pathname).not.toBe('/');

    const checkFavorite = getByLabelText('Pokémon favoritado?');

    expect(checkFavorite).not.toBeChecked();

    userEvent.click(checkFavorite);

    expect(checkFavorite).toBeChecked();
  });
});
