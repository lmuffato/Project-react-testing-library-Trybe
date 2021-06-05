import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router';
import App from '../App';

test('should display correct poke name', () => {
  render(<App />, { wrapper: MemoryRouter });
  const detailsLink = screen.getByText(/More Details/i);
  expect(detailsLink).toBeInTheDocument();
  userEvent.click(detailsLink);

  const pokeName = screen.getByTestId('pokemon-name');
  expect(pokeName.textContent).toBe('Pikachu');
});

test('should display correct poke type', () => {
  render(<App />, { wrapper: MemoryRouter });
  const detailsLink = screen.getByText(/More Details/i);
  expect(detailsLink).toBeInTheDocument();
  userEvent.click(detailsLink);

  const pokeType = screen.getByTestId('pokemon-type');
  expect(pokeType.textContent).toBe('Electric');
});

test('should display correct poke weight', () => {
  render(<App />, { wrapper: MemoryRouter });
  const detailsLink = screen.getByText(/More Details/i);
  expect(detailsLink).toBeInTheDocument();
  userEvent.click(detailsLink);

  const pokeWeight = screen.getByTestId('pokemon-weight');
  expect(pokeWeight.textContent).toBe('Average weight: 6.0 kg');
});

test('should display correct poke image', () => {
  render(<App />, { wrapper: MemoryRouter });
  const detailsLink = screen.getByText(/More Details/i);
  expect(detailsLink).toBeInTheDocument();
  userEvent.click(detailsLink);

  const pokeImage = screen.getByAltText('Pikachu sprite');
  const pokeImageSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
  expect(pokeImage).toBeInTheDocument();
  expect(pokeImage.src).toBe(pokeImageSrc);
  expect(pokeImage.alt).toBe('Pikachu sprite');
});

test('should contain details link', () => {
  render(<App />, { wrapper: MemoryRouter });
  const detailsLink = screen.getByText(/More Details/i);
  expect(detailsLink).toBeInTheDocument();
  expect(detailsLink.href).toContain('/pokemons/25');
});

test('should display star icon on fav pokes', () => {
  render(<App />, { wrapper: MemoryRouter });
  const detailsLink = screen.getByText(/More Details/i);
  expect(detailsLink).toBeInTheDocument();

  userEvent.click(detailsLink);

  const checkbox = screen.getByRole('checkbox');
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  const starIcon = screen.getByAltText('Pikachu is marked as favorite');
  expect(starIcon).toBeInTheDocument();
  expect(starIcon.src).toContain('/star-icon.svg');
});
