import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const mapSrc = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
it('should have a "name Details" `', () => {
  const { getByRole } = renderWithRouter(<App />);
  const moreDetails = getByRole('link', { name: /more details/i });
  expect(moreDetails).toBeInTheDocument();
  userEvent.click(moreDetails);
  const detailsPage = getByRole('heading', { name: /pikachu details/i, level: 2 });
  expect(detailsPage).toBeInTheDocument();
});

it('should have a Summary" `', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const moreDetails = getByRole('link', { name: /more details/i });
  expect(moreDetails).toBeInTheDocument();
  userEvent.click(moreDetails);
  const summary = getByRole('heading', { name: /summary/i, level: 2 });
  expect(summary).toBeInTheDocument();
  const pSummary = getByText(/This intelligent/);
  expect(pSummary).toBeInTheDocument();
});

it('should have a section showing maps', () => {
  const { getByRole, getAllByRole, getByText } = renderWithRouter(<App />);
  const moreDetails = getByRole('link', { name: /more details/i });
  expect(moreDetails).toBeInTheDocument();
  userEvent.click(moreDetails);
  const gameLocations = getByRole('heading',
    { name: /game locations of pikachu/i, level: 2 });
  expect(gameLocations).toBeInTheDocument();
  const mapImg = getAllByRole('img');
  expect(mapImg[1]).toHaveAttribute('src', mapSrc);
  expect(mapImg[1]).toHaveAttribute('alt', 'Pikachu location');
  const gameName = getByText('Kanto Power Plant');
  expect(gameName).toBeInTheDocument();
});

it('should br possible to favorite a Pokemon `', () => {
  const { getByRole, getByLabelText } = renderWithRouter(<App />);
  const moreDetails = getByRole('link', { name: /more details/i });
  userEvent.click(moreDetails);
  const favChecked = getByLabelText('Pokémon favoritado?');
  expect(favChecked).toBeInTheDocument();
});
