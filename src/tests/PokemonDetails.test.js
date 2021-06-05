import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router';
import App from '../App';

test('should contains text More Details', () => {
  render(<App />, { wrapper: MemoryRouter });
  const detailsLink = screen.getByText(/More Details/i);
  expect(detailsLink).toBeInTheDocument();

  userEvent.click(detailsLink);

  const pokeDetails = screen.getByText(/Pikachu details/i);
  expect(pokeDetails).toBeInTheDocument();
});

test('should contain Summary text', () => {
  render(<App />, { wrapper: MemoryRouter });
  const detailsLink = screen.getByText(/More Details/i);
  expect(detailsLink).toBeInTheDocument();

  userEvent.click(detailsLink);

  const summaryText = screen.getByText(/Summary/);
  expect(summaryText).toBeInTheDocument();

  const pokeSummaryText = screen.getByText(/This intelligent Pokémon/);
  expect(pokeSummaryText).toBeInTheDocument();
});

test('should contain H2 text with Game Locations', () => {
  render(<App />, { wrapper: MemoryRouter });
  const detailsLink = screen.getByText(/More Details/i);
  expect(detailsLink).toBeInTheDocument();

  userEvent.click(detailsLink);

  const gameLocations = screen.getByText(/Game locations of Pikachu/i);
  expect(gameLocations).toBeInTheDocument();
});

test('should contains map locations', () => {
  render(<App />, { wrapper: MemoryRouter });
  const detailsLink = screen.getByText(/More Details/i);
  expect(detailsLink).toBeInTheDocument();

  userEvent.click(detailsLink);

  const mapImage = screen.getAllByAltText(/Pikachu location/i);
  expect(mapImage[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(mapImage[1].src).toContain('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

  const firstMapText = screen.getByText(/Kanto Viridian Forest/i);
  const secondMapText = screen.getByText(/Kanto Power Plant/i);
  expect(firstMapText).toBeInTheDocument();
  expect(secondMapText).toBeInTheDocument();
});

test('should contains a checkbox to set poke as favorite', () => {
  render(<App />, { wrapper: MemoryRouter });
  const detailsLink = screen.getByText(/More Details/i);
  expect(detailsLink).toBeInTheDocument();

  userEvent.click(detailsLink);

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();

  const checkboxLabel = screen.getByLabelText(/Pokémon favoritado?/);
  expect(checkboxLabel).toBeDefined();
});
