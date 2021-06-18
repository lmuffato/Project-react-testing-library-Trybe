import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Render/renderWithRouter';
import App from '../App';

describe('Testes do componente pokedex.', () => {
  it('Testa se existe uma tag h2 com texto `Encountered Pokémons`', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const heading = getAllByRole('heading', {
      Name: /Encauntered pokémons/i,
    });
    expect(heading[1]).toHaveTextContent('Encountered pokémons');
  });

  it('Testa se ao clicar no botão o proximo pokemon é exibido.', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const buttonNextPokemon = getByTestId('next-pokemon');
    userEvent.click(buttonNextPokemon);
    expect(buttonNextPokemon).toHaveTextContent('Próximo pokémon');
  });

  it('Testa se há um botão que resete o tipo de pokemon.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const resetButton = getByRole('button', {
      name: /All/i,
    });
    userEvent.click(resetButton);
    expect(resetButton).toBeInTheDocument();
  });

  it('Testa se existe botões para cada tipo de pokemon.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttonForType = getAllByTestId('pokemon-type-button');
    userEvent.type(buttonForType);
    expect(buttonForType[1]).toHaveTextContent('Fire');
  });
});
