import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
  const { getByTestId, getByAltText } = renderWithRouter(<App />);

  const name = getByTestId('pokemon-name');
  const type = getByTestId('pokemon-type');
  const weight = getByTestId('pokemon-weight');
  const image = getByAltText('Pikachu sprite');

  expect(name).toHaveTextContent('Pikachu');
  expect(type).toHaveTextContent('Electric');
  expect(weight).toHaveTextContent('Average weight: 6.0 kg');
  expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Teste se o card do Pokémon indicado na Pokédex contém um link...', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  const Details = getByRole('link', { name: /More details/i });

  expect(Details).toBeInTheDocument();
  userEvent.click(Details);

  const { pathname } = history.location;

  expect(pathname).toBe('/pokemons/25');
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getByRole, history, getByLabelText, getByAltText } = renderWithRouter(<App />);

  const Details = getByRole('link', { name: /More details/i });

  userEvent.click(Details);

  const { pathname } = history.location;

  expect(pathname).toBe('/pokemons/25');

  const labelFavorite = getByLabelText('Pokémon favoritado?');

  userEvent.click(labelFavorite);

  const estrela = getByAltText('Pikachu is marked as favorite');
  expect(estrela.src).toContain('/star-icon.svg');
});
