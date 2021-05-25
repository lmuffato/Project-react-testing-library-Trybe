import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('Testa si aparece o pokemon corretamente', () => {
  const { getByTestId, getByAltText } = renderWithRouter(<App />);

  const name = getByTestId('pokemon-name');
  const type = getByTestId('pokemon-type');
  const weight = getByTestId('pokemon-weight');
  const img = getByAltText('Pikachu sprite');

  expect(name).toHaveTextContent('Pikachu');
  expect(type).toHaveTextContent('Electric');
  expect(weight).toHaveTextContent('Average weight: 6.0 kg');
  expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Testa si ao clikar no link leva para uma pagina detalhada', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  const linkDetails = getByRole('link', {
    name: /More details/i,
  });

  expect(linkDetails).toBeInTheDocument();
  userEvent.click(linkDetails);

  const { pathname } = history.location;

  expect(pathname).toBe('/pokemons/25');
});

test('Testa si ao marca um pokemon como favorito ele recebe um icon star', () => {
  const { getByRole, history, getByLabelText, getByAltText } = renderWithRouter(<App />);

  const linkDetails = getByRole('link', {
    name: /More details/i,
  });
  userEvent.click(linkDetails);

  const { pathname } = history.location;

  expect(pathname).toBe('/pokemons/25');

  const labelFavorite = getByLabelText('Pokémon favoritado?');

  userEvent.click(labelFavorite);

  const linkHome = getByRole('link', {
    name: /home/i,
  });
  userEvent.click(linkHome);

  const iconsStar = getByAltText('Pikachu is marked as favorite');
  expect(iconsStar.src).toContain('/star-icon.svg');
});
