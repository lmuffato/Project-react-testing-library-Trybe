import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests the Pokemon info', () => {
  const PATH = '/pokemons/25';
  test('there is a card with info of a pokémon ', () => {
    const srcImg = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    renderWithRouter(<App />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type').textContent).toBe('Electric');
    expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();

    expect(screen.getByAltText('Pikachu sprite')).toHaveAttribute('src', srcImg);
  });

  test('link more details', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('link', {
      name: /more details/i,
    })).toHaveAttribute('href', PATH);
  });

  test('go to details page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/more details/i));
    const { pathname } = history.location;
    expect(pathname).toBe(PATH);
    const detailsPage = getByText(/details/i);
    expect(detailsPage).toBeInTheDocument();
  });

  test('shows the favorite star icon', () => {
    const { history } = renderWithRouter(<App />);
    const favImg = '/star-icon.svg';
    history.push(PATH);
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByAltText('Pikachu is marked as favorite'))
      .toHaveAttribute('src', favImg);
  });
});
