import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

const rotaDetails = '/pokemons/23';

test('Testa si contem informações de um pokemon espesifico', () => {
  const { getByRole, getByTestId, history } = renderWithRouter(<App />);

  history.push(rotaDetails);

  const title1 = getByRole('heading', {
    level: 2,
    name: /Ekans Details/i,
  });

  const title2 = getByRole('heading', {
    level: 2,
    name: /Game Locations of Ekans/i,
  });

  const title3 = getByRole('heading', {
    level: 2,
    name: /Summary/i,
  });

  const string = /It can freely detach its jaw to swallow large prey whole/i;

  const textSumary = getByTestId('text-summary');

  const name = getByTestId('pokemon-name');
  const type = getByTestId('pokemon-type');

  expect(title1).toBeInTheDocument();
  expect(title2).toBeInTheDocument();
  expect(title3).toBeInTheDocument();
  expect(textSumary).toHaveTextContent(string);
  expect(name.innerHTML).toBe('Ekans');
  expect(type.innerHTML).toBe('Poison');
});

test('Testa si a imagem carrega corretamente', () => {
  const { history, getByAltText } = renderWithRouter(<App />);

  history.push(rotaDetails);

  const imgSprite = getByAltText(/Ekans sprite/i);
  const imgEkans = getByAltText(/Ekans location/i);

  expect(imgEkans.src).toContain('https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png');
  expect(imgSprite.src).toContain('https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png');
});

test('Testa si é um pokemon favorito', () => {
  const { history, getByLabelText, getByRole } = renderWithRouter(<App />);

  history.push(rotaDetails);

  const labelFavorite = getByLabelText('Pokémon favoritado?');
  const inputFavorite = getByRole('checkbox');

  userEvent.click(labelFavorite);

  expect(inputFavorite.checked).toBe(true);
});

test('Testa si a pagina contem links para rotas', () => {
  const { history, getByRole } = renderWithRouter(<App />);

  history.push(rotaDetails);

  const linkHome = getByRole('link', {
    name: /home/i,
  });

  const linkAbout = getByRole('link', {
    name: /about/i,
  });
  const linkFavorite = getByRole('link', {
    name: /favorite/i,
  });

  expect(linkHome).toBeInTheDocument();
  expect(linkAbout).toBeInTheDocument();
  expect(linkFavorite).toBeInTheDocument();
});
