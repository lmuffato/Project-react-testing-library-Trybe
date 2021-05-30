import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente "PokemonDetails"', () => {
  it(`Teste se as informações detalhadas do Pokémon 
    selecionado são mostradas na tela.`, () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const details = getByText('More details');
    const pokeSummary = 'This intelligent Pokémon roasts hard berries'
      + ' with electricity to make them tender enough to eat.';

    userEvent.click(details);
    const mainText = getByText('Pikachu Details');
    const summary = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const paragraph = getByText(pokeSummary);

    expect(mainText).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
});
