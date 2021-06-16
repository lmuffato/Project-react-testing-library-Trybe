import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// Em alguns pontos, consultei o repositório do Vinicius:
// https://github.com/tryber/sd-010-a-project-react-testing-library/pull/83

test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
  const { getByTestId, getByRole } = renderWithRouter(<App />);

  const name = getByTestId('pokemon-name');
  const type = getByTestId('pokemon-type');
  const weight = getByTestId('pokemon-weight');
  const img = getByRole('img', { name: /Pikachu sprite/i });

  expect(name).toHaveTextContent('Pikachu');
  expect(type).toHaveTextContent('Electric');
  expect(weight).toHaveTextContent('Average weight: 6.0 kg');
  expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test(`Teste se ao clicar no link de navegação do Pokémon,
é feito o redirecionamento da aplicação para a página de
detalhes de Pokémon`, () => {
  const { getByRole } = renderWithRouter(<App />);

  const link = getByRole('link', { name: /More details/i });
  userEvent.click(link);
  const favorite = getByRole('heading', { name: /Summary/i, level: 2 });

  expect(favorite).toBeInTheDocument();
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getByRole } = renderWithRouter(<App />);

  const link = getByRole('link', { name: 'More details' });
  userEvent.click(link);

  const checkbox = getByRole('checkbox');
  userEvent.click(checkbox);
  const img = getByRole('img', { name: /Pikachu is marked as favorite/i });
  expect(img).toBeInTheDocument();
  expect(img.src).toContain('/star-icon.svg');
});
