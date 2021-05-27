import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Testa se no card é exibido o nome do pokemon', () => {
  const { getByTestId } = renderWithRouter(<App />);

  const myTestId = getByTestId('pokemon-name');
  expect(myTestId.dataset.testid).toBe('pokemon-name');
  expect(myTestId.textContent).toBe('Pikachu');
});

test('Testa se no card é exibido o tipo do pokemon', () => {
  const { getByTestId } = renderWithRouter(<App />);

  const myTestId = getByTestId('pokemon-type');
  expect(myTestId.dataset.testid).toBe('pokemon-type');
  expect(myTestId.textContent).toBe('Electric');
});

test('Testa se no card é exibido o peso do pokemon', () => {
  const { getByTestId } = renderWithRouter(<App />);

  const myTestId = getByTestId('pokemon-weight');
  expect(myTestId.dataset.testid).toBe('pokemon-weight');
});

test('Testa se a forma de exibição e a correta', () => {
  const { getByText } = renderWithRouter(<App />);

  const myText = getByText('Average weight: 6.0 kg');
  expect(myText.innerHTML).toBe('Average weight: 6.0 kg');
});

test('Testa se existe um link no card', () => {
  const { getByRole } = renderWithRouter(<App />);

  const myLink = getByRole('link', {
    name: /More details/i,
  });
  expect(myLink).toBeInTheDocument();
});

test(`Testa se quando clicado no link do card é direcionado
      para um pagia de detalhes`, () => {
  const { getByRole } = renderWithRouter(<App />);

  const myLink = getByRole('link', {
    name: /More details/i,
  });
  userEvent.click(myLink);

  const favoriteText = getByRole('heading', {
    name: /Summary/i,
    level: 2,
  });

  expect(favoriteText).toBeInTheDocument();
});

test('Testa se um gif do Pokemon aparece no card', () => {
  const { getByRole } = renderWithRouter(<App />);

  const myImage = getByRole('img', {
    name: 'Pikachu sprite',
  });

  expect(myImage).toBeInTheDocument();
  expect(myImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test(`Testa se quando eu clico em Pokémon favoritado? aparece o icone
  e se icone de favorito esta correto`, () => {
  const { getByRole, history } = renderWithRouter(<App />);

  history.push('/pokemons/25');

  const myCheckBox = getByRole('checkbox', {
    name: /Pokémon favoritado?/i,
  });
  userEvent.click(myCheckBox);

  const myImage = getByRole('img', {
    name: 'Pikachu is marked as favorite',
  });

  expect(myImage).toBeInTheDocument();
  expect(myImage.src).toBe('http://localhost/star-icon.svg');
});
