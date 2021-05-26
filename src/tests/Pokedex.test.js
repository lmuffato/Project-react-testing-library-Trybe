import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('página contém um heading h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<App />);
  const headingPage = screen.getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });
  expect(headingPage).toBeInTheDocument();
});

test('Teste se é exibido o próximo Pokémon ao clicar no botão Próximo pokémon.', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Próximo pokémon')).toBeInTheDocument();
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  fireEvent.click(getByText('All'));
});

test('botão de filtro para cada tipo de Pokémon', () => {
  const { getAllByTestId, getAllByRole, getByRole } = renderWithRouter(
    <App />,
  );
  const pokes = 7;
  const button = getAllByTestId('pokemon-type-button');
  expect(button).toHaveLength(pokes);

  const fire = getAllByRole('button', {
    name: /fire/i,
  });
  const psychic = getAllByRole('button', {
    name: /psychic/i,
  });
  const electric = getAllByRole('button', {
    name: /electric/i,
  });
  const normal = getAllByRole('button', {
    name: /normal/i,
  });
  expect(fire).toHaveLength(1);
  expect(psychic).toHaveLength(1);
  expect(electric).toHaveLength(1);
  expect(normal).toHaveLength(1);

  const all = getByRole('button', {
    name: /all/i,
  });
  expect(all).toBeInTheDocument();
});
