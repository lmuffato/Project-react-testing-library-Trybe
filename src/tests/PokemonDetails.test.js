import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

const idRouter = '/pokemons/65';

it('Teste se as informações detalhadas do Pokémon são mostradas na tela', () => {
  const { getByRole, getByTestId, getByText, history } = renderWithRouter(<App />);

  history.push(idRouter);

  const title1 = getByRole('heading', { name: /Alakazam Details/i });

  const title2 = getByRole('heading', { name: /Game Locations of Alakazam/i });

  const title3 = getByRole('heading', { name: /Summary/i });

  const string = /Closing both its eyes heightens all its other senses/i;

  const textSumary = getByText(string);

  const name = getByTestId('pokemon-name');
  const type = getByTestId('pokemon-type');

  expect(title1).toBeInTheDocument();
  expect(title2).toBeInTheDocument();
  expect(title3).toBeInTheDocument();
  expect(textSumary).toHaveTextContent(string);
  expect(name.innerHTML).toBe('Alakazam');
  expect(type.innerHTML).toBe('Psychic');
});

it('Testa si a imagem carrega corretamente', () => {
  const { history, getByAltText } = renderWithRouter(<App />);

  history.push(idRouter);

  const imgSprite = getByAltText(/Alakazam sprite/i);
  const mapAlakazam = getByAltText(/Alakazam location/i);

  expect(mapAlakazam.src).toContain('https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png');
  expect(imgSprite.src).toContain('https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png');
});

it('Testa si é um pokemon favorito', () => {
  const { history, getByLabelText, getByRole } = renderWithRouter(<App />);

  history.push(idRouter);

  const labelFavorite = getByLabelText('Pokémon favoritado?');
  const inputFavorite = getByRole('checkbox');

  userEvent.click(labelFavorite);

  expect(inputFavorite.checked).toBe(true);
});

it('Testa si a pagina contem links para rotas', () => {
  const { history, getByRole } = renderWithRouter(<App />);

  history.push(idRouter);

  const linkHome = getByRole('link', { name: /home/i });

  const linkAbout = getByRole('link', { name: /about/i });

  const linkFavorite = getByRole('link', { name: /favorite/i });

  expect(linkHome).toBeInTheDocument();
  expect(linkAbout).toBeInTheDocument();
  expect(linkFavorite).toBeInTheDocument();
});
