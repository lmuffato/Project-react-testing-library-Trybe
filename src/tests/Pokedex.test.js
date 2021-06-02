import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('renderizar Pokedex em App', () => {
  it('deve verificar o h2 contém a mensagem "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);

    const h2 = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(h2).toBeInTheDocument();
  });

  it('deve verificar se exibe próximo Pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const btn = getByTestId('next-pokemon');
    userEvent.type(btn);
    expect(btn).toHaveTextContent('Próximo pokémon');
  });

  it('deve verificar se exibe o botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(<App />);

    const btnAll = getByRole('button', {
      name: /All/i,
    });
    userEvent.type(btnAll);
    expect(btnAll).toBeInTheDocument();
  });

  it('deve verificar se é criado, um botão de filtro para cada tipo de Pokémon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const btnAllPokemons = getAllByTestId('pokemon-type-button');
    userEvent.type(btnAllPokemons);
    expect(btnAllPokemons[0]).toHaveTextContent('Electric');
  });
});
