import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, userEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../Render/renderWithRouter';

/// Com ajuda de colega

describe('Requisito Pokedex', () => {
  test('Teste se contem um h2', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const title = getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });
  it('Ação botão proximo.', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const btnNext = getByTestId('next-pokemon');
    fireEvent.click(btnNext);
    expect(btnNext).toHaveTextContent('Próximo pokémon');
  });
  it('Testa se há um botão que resete o tipo de pokemon.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const resetButton = getByRole('button', {
      name: /All/i,
    });
    fireEvent.click(resetButton);
    expect(resetButton).toBeInTheDocument();
  });
  it('Testa se existe botões para cada tipo de pokemon.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttonForType = getAllByTestId('pokemon-type-button');
    userEvent.type(buttonForType);
    expect(buttonForType[1]).toHaveTextContent('Fire');
  });
});
