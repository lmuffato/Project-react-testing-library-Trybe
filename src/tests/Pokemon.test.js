import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const pokemonSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

it('renders the average weight of a pokemon`', () => {
  const { getByText } = renderWithRouter(<App />);
  const average = getByText(/average weight/i);
  expect(average).toBeInTheDocument();
  expect(average.textContent).toBe('Average weight: 6.0 kg');
});

it('renders the name of a pokemon`', () => {
  const { getByText } = renderWithRouter(<App />);
  const pokemonName = getByText(/pikachu/i);
  expect(pokemonName).toBeInTheDocument();
  expect(pokemonName.textContent).toBe('Pikachu');
});

it('renders the type of a pokemon`', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const pokemonType = getByTestId('pokemon-type');
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonType.textContent).toBe('Electric');
});

it('renders the img of a pokemon`', () => {
  const { getByRole } = renderWithRouter(<App />);
  const pokemonImg = getByRole('img');
  expect(pokemonImg).toHaveAttribute('src', pokemonSrc);
  expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
});

it('should have a link "More Details" and brings the user to "Details Page" `', () => {
  const { getByRole } = renderWithRouter(<App />);
  const moreDetails = getByRole('link', { name: /more details/i });
  expect(moreDetails).toBeInTheDocument();
  userEvent.click(moreDetails);
  const detailsPage = getByRole('heading', { name: /pikachu details/i, level: 2 });
  expect(detailsPage).toBeInTheDocument();
});

it('should have a "start icon" on favorites Pokemons `', () => {
  const { getByRole, getAllByRole } = renderWithRouter(<App />);
  const moreDetails = getByRole('link', { name: /more details/i });
  userEvent.click(moreDetails);
  const favChecked = getByRole('checkbox', { id: 'favorite' });
  expect(favChecked).toBeInTheDocument();
  userEvent.click(favChecked);
  const pokemonImg = getAllByRole('img');
  expect(pokemonImg[1]).toHaveAttribute('src', '/star-icon.svg');
  expect(pokemonImg[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
