import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testes da pagina pokedex', () => {
  it('h2 com texto - Encountered pokémons', () => {
    renderWithRouter(<App />);
    const aga2 = screen.getByRole('heading', { level: 2 });

    expect(aga2).toHaveTextContent('Encountered pokémons');
  });

  it('botao com texto - All', () => {
    renderWithRouter(<App />);
    const bottonAll = screen.getByText('All');

    expect(bottonAll.textContent).toBe('All');
  });

  it('botao com texto - Próximo pokémon ', () => {
    renderWithRouter(<App />);
    const bottonNext = screen.getByTestId('next-pokemon');

    expect(bottonNext.textContent).toBe('Próximo pokémon');
  });

  it('botos de filtro - ire, Psychic, Electric, Bug, Poison, Dragon e Normal', () => {
    renderWithRouter(<App />);
    const bottonType = screen.getAllByTestId('pokemon-type-button');

    expect(bottonType[0].textContent).toBe('Electric');
    expect(bottonType[1].textContent).toBe('Fire');
    expect(bottonType[2].textContent).toBe('Bug');
    expect(bottonType[3].textContent).toBe('Poison');
    expect(bottonType[4].textContent).toBe('Psychic');
    expect(bottonType[5].textContent).toBe('Normal');
    expect(bottonType[6].textContent).toBe('Dragon');
  });

  it('teste do botao de resetar o filtro', () => {
    renderWithRouter(<App />);
    const bottonAll = screen.getByText('All');

    fireEvent.click(bottonAll);
  });
});
