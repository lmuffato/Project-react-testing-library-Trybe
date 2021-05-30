import React from 'react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';

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
  summary: 'This intelligent Pokémon roasts hard berries with electricity'
  + ' to make them tender enough to eat.',
};

test('show one card whith the correct information of the pokemon', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const { averageWeight } = pikachu;
  const pikachuName = screen.getByText(`${pikachu.name}`);
  expect(pikachuName).toBeInTheDocument();
  const eletric = screen.getAllByText(`${pikachu.type}`);
  expect(eletric[1]).toBeInTheDocument();
  const p = `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`;
  const weight = screen.getByText(p);
  expect(weight).toBeInTheDocument();
  const pikachuImg = screen.getByAltText(/Pikachu sprite/i);
  const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
  expect(pikachuImg).toHaveAttribute('src', src);
});

test('show a link to the details page', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const detailsLink = screen.getByRole('link', {
    name: /More details/i,
  });
  userEvent.click(detailsLink);
  const pikachuDetails = screen.getByText('Pikachu Details');
  expect(pikachuDetails).toBeInTheDocument();
});

test('test the details url', () => {
  renderWithRouter(<App />, { route: '/pokemons/25' });
  const pikachuDetails = screen.getByText('Pikachu Details');
  expect(pikachuDetails).toBeInTheDocument();
});

test('show the star icon for the favorites pokemons', () => {
  render(
    <BrowserRouter>
      <Pokemon isFavorite pokemon={ pikachu } showDetailsLink />
    </BrowserRouter>,
  );
  const starImg = screen.getByAltText(/Pikachu is marked as favorite/i);
  const src = '/star-icon.svg';
  expect(starImg).toHaveAttribute('src', src);
});
