import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import pokemons from '../data';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste pokedex', () => {
  const found = pokemons[0].foundAt;
  test('O nome do pokémon é exibido', () => {
    const { getByText, getByRole, getAllByAltText,
      getByLabelText, getAllByRole } = renderWithRouter(<App />);
    const moreDetails = getByText('More details');
    userEvent.click(moreDetails);
    const name = getByRole('heading', { name: 'Pikachu Details' });
    expect(name).toBeInTheDocument();
    const summary = getByRole('heading', { name: 'Summary' });
    expect(summary).toBeInTheDocument();
    const summaryText = getByText('This intelligent', { exact: false });
    expect(summaryText).toBeInTheDocument();
    const location = getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(location).toBeInTheDocument();
    found.forEach((item, index) => {
      const map = getAllByAltText('Pikachu location');
      expect(getByText(item.location)).toBeInTheDocument();
      expect(map[index]).toBeInTheDocument();
      expect(getAllByRole('img')[index + 1]).toHaveAttribute('src', item.map);
      const label = getByLabelText('Pokémon favoritado?');
      expect(label).toBeInTheDocument();
      const checkBox = getByRole('checkbox');
      expect(checkBox).toBeInTheDocument();
    });
  });
});
