import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

test('Testa se aparece card com as informações do pokémon', () => {
  const { getByAltText, getByTestId } = renderWithRouter(<App />);
  const name = getByTestId('pokemon-name')
  const type = getByTestId('pokemon-type')
  const weight = getByTestId('pokemon-weight')
  const sprite = getByAltText('Pikachu sprite')
  expect(name).toHaveTextContent('Pikachu');
  expect(type).toHaveTextContent('Electric');
  expect(weight).toHaveTextContent('Average weight: 6.0 kg');
  expect(sprite.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Testa se contém um link de navegação para exibir detalhes', () => {
  const historyMock = createMemoryHistory();
  render(
    <Router history={ historyMock }>
      <App />
    </Router>
  )
  historyMock.push('/pokemons/4');

  const charmander = screen.getByText('Charmander');
  expect(charmander).toBeInTheDocument();
});

// Dica de marcar pokemon favorito pela label vista no repositório
// do Adelino - https://github.com/tryber/sd-010-a-project-react-testing-library/pull/55
test('Testa se marca favoritos', async () => {
  const { getByRole, getByAltText, getByLabelText } = renderWithRouter(<App />);
  const selectPikachu = getByRole('button', {
    name:'Electric',
  });
  userEvent.click(selectPikachu);
  const selectDetails = getByRole('link', {
    name:'More details',
  });
  userEvent.click(selectDetails);
  const labelFavorite = getByLabelText('Pokémon favoritado?');
  userEvent.click(labelFavorite);
  const sprite = getByAltText('Pikachu is marked as favorite')
  expect(sprite.src).toContain('/star-icon.svg');
  expect(sprite).toBeInTheDocument();
});
