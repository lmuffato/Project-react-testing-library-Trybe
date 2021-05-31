import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
  const { getByTestId, getByRole, getByAltText } = renderWithRouter(<App />);
  const allButton = getByRole('button', { name: /All/i });
  userEvent.click(allButton);
  expect(getByTestId('pokemon-name')).toHaveTextContent(/pikachu/i);
  expect(getByTestId('pokemon-type')).toHaveTextContent(/electric/i);
  const weightInfo = getByTestId('pokemon-weight');
  const weigtString = 'Average weight: 6.0 kg';
  expect(weightInfo).toHaveTextContent(weigtString);
  expect(getByRole('img').src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(getByAltText(/Pikachu sprite/i)).toBeInTheDocument();
});

test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
  const { getByRole } = renderWithRouter(<App />);
  const allButton = getByRole('button', { name: /All/i });
  userEvent.click(allButton);
  const moreDetails = getByRole('link', { name: /more details/i });
  expect(moreDetails.href).toBe('http://localhost/pokemons/25');
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getByRole, getByLabelText, getByAltText } = renderWithRouter(<App />);
  const allButton = getByRole('button', { name: /All/i });
  userEvent.click(allButton);
  const moreDetails = getByRole('link', { name: /more details/i });
  userEvent.click(moreDetails);
  const favButton = getByLabelText(/Pokémon favoritado?/i);
  userEvent.click(favButton);
  const imgStar = getByAltText('Pikachu is marked as favorite');
  expect(imgStar.src).toBe('http://localhost/star-icon.svg');
});
