import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Test Pokemon', () => {
  test('shows the Pokemon details', () => {
    const { getByTestId, getByText, getByRole } = renderWithRouter(<App />);

    const name = getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();

    const type = getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();

    const weight = getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();

    const phrase = getByText(/average weight/i);
    expect(phrase).toBeInTheDocument();

    const image = getByRole('img', { name: /sprite/i });
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image).toHaveAttribute('alt', `${name.innerHTML} sprite`);
  });
  test('testing detail link', () => {
    const { getByRole } = renderWithRouter(<App />);

    const detLink = getByRole('link', {
      name: /more details/i,
    });

    expect(detLink).toBeInTheDocument();
    expect(detLink).toHaveAttribute('href', '/pokemons/25');
  });
  test('testing detail link', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const detButton = getByRole('link', { name: /more details/i });
    expect(detButton).toBeInTheDocument();

    userEvent.click(detButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  test('testing favorite', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const detButton = getByRole('link', {
      name: /more details/i,
    });
    expect(detButton).toBeInTheDocument();

    userEvent.click(detButton);

    const name = getByTestId('pokemon-name');

    const favorite = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favorite);

    const star = getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', `${name.innerHTML} is marked as favorite`);
  });
});
