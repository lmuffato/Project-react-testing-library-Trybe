import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={ history }>{ui}</Router>),
    history,
  };
}

const moreDetail = 'More details';

test('Testa se nome correto do Pokémon deve ser mostrado na tela', () => {
  const { getByTestId, getByText } = renderWithRouter(<App />);
  const catchNameId = getByTestId('pokemon-name');
  const catchNamePok = getByText('Pikachu');
  expect(catchNamePok).toBeInTheDocument();
  expect(catchNameId).toBeInTheDocument();
});

test('Testa se tipo correto do pokémon é mostrado na tela. ', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const catchType = getByTestId('pokemon-type');
  expect(catchType).toBeInTheDocument();
  expect(catchType).toHaveTextContent('Electric');
});

test('Testa se peso médio do pokémon é exibido na tela', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const catchWeight = getByTestId('pokemon-weight');
  expect(catchWeight).toBeInTheDocument();
  expect(catchWeight).toHaveTextContent('6.0 kg');
});

test('Testa se a imagem do Pokémon  é exibido na tela', () => {
  const { getByAltText, getByRole } = renderWithRouter(<App />);
  const imagem = getByAltText('Pikachu sprite');
  expect(imagem).toBeInTheDocument();

  const imgSrc = getByRole('img');
  expect(imgSrc.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const catchWords = getByText(moreDetail);
  expect(catchWords).toBeInTheDocument();

  fireEvent.click(getByText(moreDetail));

  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { getByAltText, getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText(moreDetail));
  fireEvent.click(getByText('Pokémon favoritado?'));

  const imagemFavorite = getByAltText('Pikachu is marked as favorite');
  expect(imagemFavorite).toBeInTheDocument();
  expect(imagemFavorite.src).toContain('/star-icon.svg');
});
