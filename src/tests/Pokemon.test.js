import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
	const { getByTestId, getByRole } = renderWithRouter(<App />);
  
  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent('Pikachu');
  const pokemonType = getByTestId('pokemon-type');
  expect(pokemonType).toHaveTextContent('Electric');
  const pokemonWeight = getByTestId('pokemon-weight');
  expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
	const image = getByRole('img')
  expect(image).toHaveAttribute('src',
	  expect.stringMatching('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png'));
});

test('Testa si ao clikar no link leva para uma pagina detalhada.', () => {
	const { getByRole, history } = renderWithRouter(<App />);
  
	const linkDetails = getByRole('link', {
    name: /More details/i,
  });

  expect(linkDetails).toBeInTheDocument();
  userEvent.click(linkDetails);

  const { pathname } = history.location;

  expect(pathname).toBe('/pokemons/25');
});

test('Testa se ao selecionar um pokemon como favorito ele recebe um icon star', () => {
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