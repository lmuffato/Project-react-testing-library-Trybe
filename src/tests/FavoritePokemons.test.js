import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests the favorites page', () => {
  test('shows no favorites when the route is `/favorites`', () => {
    render(
      <MemoryRouter initialEntries={ ['/favorites'] }>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('shows favorites when there is favorites', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/10');
    const isFavorite = screen.getByRole('checkbox');
    userEvent.click(isFavorite);
    expect(isFavorite).toBeChecked();

    history.push('/pokemons/23');
    const isFavorite2 = screen.getByRole('checkbox');
    userEvent.click(isFavorite2);
    expect(isFavorite2).toBeChecked();

    history.push('/favorites');
    expect(screen.getAllByTestId('pokemon-name').length);
  });
});
